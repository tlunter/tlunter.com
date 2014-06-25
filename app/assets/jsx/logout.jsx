/** @jsx React.DOM */

var Views = Views || {};
Views.Logout = React.createClass({
  componentDidMount: function() {
    this.handleLogout();
  },
  handleLogout: function() {
    var xsrfToken = Cookies.get('XSRF-TOKEN');

    reqwest({
      url: '/sessions.json',
      method: 'delete',
      headers: {
        'X-XSRF-TOKEN': xsrfToken
      },
      success: function (resp) {
        menu.loadLogin();
        Aviator.navigate('/');
      },
      error: function (err) {
        console.log("Could not logout");
      }
    });
  },
  render: function() {
    return (
      <div>
        <h1>Goodbye!</h1>
        <p>
          We're logging you out now!
        </p>
      </div>
    );
  }
});
