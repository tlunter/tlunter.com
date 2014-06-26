/** @jsx React.DOM */

var Views = Views || {};
Views.Register = React.createClass({
  handleRegister: function (evt) {
    evt.preventDefault();

    var username = this.refs.username.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var passwordConfirmation = this.refs.passwordConfirmation.getDOMNode().value;

    this.attemptRegister(username, email, password, passwordConfirmation);
  },
  attemptRegister: function (username, email, password, passwordConfirmation) {
    var xsrfToken = Cookies.get('XSRF-TOKEN');

    reqwest({
      url: '/users.json',
      method: 'post',
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }),
      headers: {
        'X-XSRF-TOKEN': xsrfToken
      },
      success: function (resp) {
        loginManager.checkLogin();
        Aviator.navigate('/');
        flash.addNotice("You're registered, logged in and ready to go.");
      },
      error: function (resp) {
        var errors = JSON.parse(resp.response);
        errors.forEach(flash.addError);
      }
    });
  },
  render: function() {
    return (
      <div>
        <h1 id="title">Register</h1>
        <form className="pure-form pure-form-stacked form-center" onSubmit={this.handleRegister}>
          <fieldset>
            <input type="text" ref="username" placeholder="Username" />
            <input type="text" ref="email" placeholder="Email" />
            <input type="password" ref="password" placeholder="Password" />
            <input type="password" ref="passwordConfirmation" placeholder="Confirmation" />
            <button type="submit" className="pure-button pure-button-primary">Register</button>
          </fieldset>
        </form>
      </div>
    );
  }
});
