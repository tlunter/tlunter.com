/** @jsx React.DOM */ var Menu = React.createClass({
  render: function() {
    return (
      <ul className="nav">
        <MenuItem href="/" link="Home" />
        <MenuItem href="/about" link="About" />
        <MenuItem href="/contributions" link="Contributions" />
      </ul>
    );
  }
});
