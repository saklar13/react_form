var PasswordForm = React.createClass({

    getInitialState: function() {
        return { password: '', newPassword: '', confirmation: '',
                 errorNewPassword: '', errorConfirmation: '', divClass:'form-group',
                 newPassClass:'form-group', confirmationClass:'form-group',
                 eyeClass:"glyphicon glyphicon-eye-close", type:"password"}
    },

    validateNewPassword: function(pass1, pass2) {
        if (pass1 == pass2) {
            this.setState({ errorNewPassword: "Пароль должен отличатся от прошлого",
                            });
        } else {
            this.setState({ errorNewPassword: "" });
        }
    },

    validateConfirmation: function(pass1, pass2) {
        if (pass1 == pass2) {
            this.setState({ errorConfirmation: '' });
        } else {
            this.setState({ errorConfirmation: 'Подтверждение отличается от пароля' });
        }
    },

    handleSubmit: function(e) {
        if (this.state.password == '' ||
            this.state.newPassword == '' ||
            this.state.confirmation == '') {
                e.preventDefault()
                alert('Все поля должны быть заполнены')
            }
    },

    handleEye: function(e) {
        if (this.state.type == 'password') {
            this.setState({ type:'text', eyeClass:"glyphicon glyphicon-eye-open" })
        } else {
            this.setState({ type:"password", eyeClass:"glyphicon glyphicon-eye-close"})
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
    },

    changeConfirmation: function(e) {
        this.setState({ confirmation: e.target.value });
        this.validateConfirmation(e.target.value, this.state.newPassword);
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit} >
              <div className={this.state.divClass}>
                <label className="control-label" htmlFor="inputPassword1"></label>
                <input type={this.state.type} className="form-control" id="inputPassword1"
                 placeholder="Пароль" value={this.state.password} onChange={this.changePassword} />
              </div>
              <div className={this.state.newPassClass}>
                <label htmlFor="inputPassword2" className="control-label">{this.state.errorNewPassword}</label>
                <input type={this.state.type} className="col-sm-11 form-control" id="inputPassword2"
                placeholder="Новый пароль" value={this.state.newPassword} onChange={this.changeNewPassword} />
                <div className="col-sm-offset-12 col-sm-12">
                  <a href="#" onClick={this.handleEye}><span className={this.state.eyeClass}></span></a>
                </div>
              </div>
              <div className={this.state.confirmationClass}>
                <label htmlFor="inputPassword3" className="control-label">{this.state.errorConfirmation}</label>
                <input type={this.state.type} className="form-control" id="inputPassword3"
                placeholder="Подтверждение" value={this.state.confirmation} onChange={this.changeConfirmation} />
              </div>
              <div className={this.state.divClass}>
                <div>
                  <br />
                  <button type="submit" className="btn btn-default">Submit</button>
                </div>
              </div>
            </form>
        )
    }
})


React.render(<PasswordForm />, document.getElementById('password_form'))