var PasswordForm = React.createClass({

    getInitialState: function() {
        return { password: '', newPassword: '', confirmation: '',
                 errorNewPassword: '', errorConfirmation: ''}
    },

    validateNewPassword: function() {
        if (this.state.password == this.state.newPassword) {
            this.setState({ errorNewPassword: "Новый пароль должен отличатся от прошлого" })
        } else {
            this.setState({ errorNewPassword: "" })
        }
    },

    changePassword: function(e) {
        this.setState({ password: e.target.value });
        this.validateNewPassword();
    },

    changeNewPassword: function(e) {
        this.setState({ newPassword: e.target.value });
        this.validateNewPassword();
    },

    changeConfirmation: function(e) {
        this.setState({ confirmation: e.target.value })
    },

    render: function() {
        var divClass = "form-group "

        return (
            <form className={divClass}>
              <div className="form-group">
                <label className="control-label" htmlFor="inputPassword1"></label>
                <input type="password" className="form-control" id="inputPassword1"
                 placeholder="Пароль" value={this.state.password} onChange={this.changePassword} />
              </div>
              <div className={divClass}>
                <label htmlFor="inputPassword2" className="control-label">{this.state.errorNewPassword}</label>
                <input type="password" className="form-control" id="inputPassword2"
                placeholder="Новый пароль" value={this.state.newPassword} onChange={this.changeNewPassword} />
              </div>
              <div className={divClass}>
                <label htmlFor="inputPassword3" className="control-label"></label>
                <input type="password" className="form-control" id="inputPassword3" placeholder="Подтверждение" />
              </div>
              <div className="form-group">
                <div>
                  <button type="submit" className="btn btn-default">Submit</button>
                </div>
              </div>
            </form>
        )
    }
})


React.render(<PasswordForm />, document.getElementById('password_form'))