/** @jsx React.DOM */
var MenuItem = React.createClass({
  handleClick: function(evt) {
    evt.preventDefault();

    Aviator.navigate(this.props.href);
  },
  render: function() {
    return (
      <li>
        <a href={this.props.href} onClick={this.handleClick}>{this.props.link}</a>
      </li>
    );
  }
});
