var PasswordForm = React.createClass({displayName: "PasswordForm",

    getInitialState: function() {
        return { password: '', newPassword: '', confirmation: '',
                 errorNewPassword: '', errorConfirmation: '',
                 newPassClass:'form-group', confirmationClass:'form-group',
                 labelNewPass: '', labelConfirm: '', percent: 0, disabled: 'disabled'}
    },

    componentWillMount: function () {
        this.changeLabelNewPass = _.debounce(function (error) {
            var className = classNames({'form-group': true,
                                        'has-error': error})
            this.setState({ labelNewPass: error,
                            newPassClass: className})
        }, 750);
        this.changeLabelConfirm = _.debounce(function (error) {
            var className = classNames({'form-group': true,
                                        'has-error': error})
            this.setState({ labelConfirm: error,
                            confirmationClass: className})
        }, 750);
    },

    validateNewPassword: function(pass1, pass2) {
        var error;
        if (pass1 == pass2 && pass1 && pass2) {
            error = "Пароль должен отличатся от прошлого";
        } else {
            error = '';
        }
        this.setState({ errorNewPassword: error });
        this.changeLabelNewPass(error);
    },

    validateConfirmation: function(pass1, pass2) {
        var error;
        if (pass1 == pass2 || !pass1 || !pass2 ) {
            error =  '';
        } else {
            error =  'Подтверждение отличается от пароля';
        }
        this.setState({ errorConfirmation: error });
        this.changeLabelConfirm(error);
    },

    disabledButton: function(e) {
        if (!this.state.password ||
            !this.state.newPassword ||
            !this.state.confirmation ||
            this.state.errorNewPassword ||
            this.state.errorConfirmation) {

            return 'disabled'
        } else {
            return ''
        }
    },

    changePassword: function(e) {
        this.setState({ password: e.target.value });
        this.validateNewPassword(e.target.value, this.state.newPassword);
    },

    changeNewPassword: function(e) {
        this.setState({ newPassword: e.target.value });
        this.validateNewPassword(e.target.value, this.state.password);
        this.validateConfirmation(e.target.value, this.state.confirmation);
        this.passComplexity(e.target.value);
    },

    changeConfirmation: function(e) {
        this.setState({ confirmation: e.target.value });
        this.validateConfirmation(e.target.value, this.state.newPassword);
    },

    passComplexity: function(pass) {
        var complexity = 0;
        if (/[a-z]/.test(pass)) {complexity++};
        if (/[A-Z]/.test(pass)) {complexity++};
        if (/[0-9]/.test(pass)) {complexity++};
        if (pass.length > 7) {complexity++};
        this.setState({ percent: complexity * 25 })
    },

    render: function() {
        bar = React.createElement(ProgressBar, {percent: this.state.percent})
        var disabled = this.disabledButton()
        return (
            React.DOM.form({onSubmit: this.handleSubmit},
                React.createElement(InputField, {divClass: "form-group", placeholder: "Пароль",
                    value: this.state.password, onChange: this.changePassword}),
                React.createElement(InputField, {divClass: this.state.newPassClass, placeholder: "Новый пароль",
                    value: this.state.newPassword, onChange: this.changeNewPassword,
                    label: this.state.labelNewPass, progressBar: bar}),
                React.createElement(InputField, {divClass: this.state.confirmationClass, placeholder: "Подтверждение",
                    value: this.state.confirmation, onChange: this.changeConfirmation,
                    label: this.state.labelConfirm}),
                React.DOM.div({className: "form-group"},
                    React.DOM.div(null,
                    React.DOM.br(null),
                    React.DOM.button({type: "submit", className: "btn btn-default",
                        disabled: disabled}, "Submit")
                    )
                )
            )
        )
    }
})

var InputField = React.createClass({

    getInitialState: function() {
        return { eyeClass: "glyphicon glyphicon-eye-close", type: 'password' }
    },

    handleEye: function() {
        var type = this.state.type;
        var className;
        if (type == 'password') {
            type = 'text';
            className = classNames({'glyphicon': true,
                'glyphicon-eye-open': true});
        } else {
            type = 'password';
            className = classNames({'glyphicon': true,
                'glyphicon-eye-close': true});
        }
        this.setState({ type: type, eyeClass: className})
    },

    render: function() {
        return (
            React.DOM.div({className: this.props.divClass},
                React.DOM.label({className: "control-label"},
                    React.DOM.span({className: "label label-danger"}, this.props.label),
                    React.DOM.div({className: "input-group"},
                        React.DOM.input({type: this.state.type, className: "form-control",
                                         placeholder: this.props.placeholder, value: this.props.value,
                                         onChange: this.props.onChange}),
                        React.DOM.span({className: "input-group-btn"},
                            React.DOM.button({type: "button", className: "btn btn-default", onClick: this.handleEye},
                                React.DOM.span({className: this.state.eyeClass})
                            )
                        )
                    ),
                    this.props.progressBar
                )
            )
        )
    }

})


var ProgressBar = React.createClass({displayName: "ProgressBar",

    getClass: function() {
        var per = this.props.percent
        if (per < 26) {return 'danger'}
        else if (per < 51) {return 'warning'}
        else if (per < 76) {return 'info'}
        else {return 'success'}
    },

    render: function() {
        var progClass = "progress-bar progress-bar-" + this.getClass();
        var percent = this.props.percent + '%';
        return (
            React.DOM.div({className: "progress", style:{height: 5, margin: 0}},
                React.DOM.div({className: progClass, style:{width: percent}})
            )
        )
    }

})


node = document.getElementById('password_form');
React.render(React.createElement(PasswordForm, null), node);