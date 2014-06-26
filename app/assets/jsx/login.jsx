/** @jsx React.DOM */

var Views = Views || {};
Views.Login = React.createClass({
  handleLogin: function (evt) {
    evt.preventDefault();

    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;

    this.attemptLogin(email, password);
  },
  attemptLogin: function (email, password) {
    var xsrfToken = Cookies.get('XSRF-TOKEN');

    reqwest({
      url: '/sessions.json',
      method: 'post',
      type: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ email: email, password: password }),
      headers: {
        'X-XSRF-TOKEN': xsrfToken
      },
      success: function (resp) {
        loginManager.checkLogin();
        Aviator.navigate('/');
        flash.addNotice("You're now logged in!");
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
        <h1 id="title">Login</h1>
        <form className="pure-form pure-form-stacked form-center" onSubmit={this.handleLogin}>
          <fieldset>
            <input type="text" ref="email" placeholder="Email" />
            <input type="password" ref="password" placeholder="Password" />
            <button type="submit" className="pure-button pure-button-primary">Login</button>
          </fieldset>
        </form>
      </div>
    );
  }
});
