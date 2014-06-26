/** @jsx React.DOM */ var Menu = React.createClass({
  getInitialState: function() {
    return { loggedIn: false };
  },
  componentDidMount: function() {
    loginManager.register(this.checkLogin);
  },
  componentWillUnmount: function() {
    loginManager.unregister(this.checkLogin);
  },
  checkLogin: function(user) {
    if (user.id) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
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
