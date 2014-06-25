/** @jsx React.DOM */ var Menu = React.createClass({
  getInitialState: function() {
    return { loggedIn: false };
  },
  componentDidMount: function() {
    this.loadLogin();
  },
  loadLogin: function() {
    reqwest({
      url: '/sessions.json',
      method: 'get',
      type: 'json',
      success: function(resp) {
        this.setState({ loggedIn: true });
      }.bind(this),
      error: function(err) {
        this.setState({ loggedIn: false });
      }.bind(this)
    });
    setTimeout(this.loadLogin, 5000);
  },
  render: function() {
    var login, logout, register;
    if (this.state.loggedIn) {
      logout = <MenuItem href="/logout" link="Logout"/>;
    } else {
      login = <MenuItem href="/login" link="Login"/>;
      register = <MenuItem href="/register" link="Register"/>;
    }

    return (
      <ul className="nav">
        <MenuItem href="/" link="Home" />
        <MenuItem href="/about" link="About" />
        <MenuItem href="/contributions" link="Contributions" />
        {logout}{login}{register}
      </ul>
    );
  }
});
