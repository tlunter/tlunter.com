/** @jsx React.DOM */

var FlashNotice = React.createClass({
  handleClick: function (evt) {
    this.hideNotice();
  },
  hideNotice: function() {
    this.props.callbackFn();
  },
  componentDidMount: function() {
    setTimeout(this.hideNotice, 3000);
  },
  render: function() {
    return (
      <div className={"alert alert-" + this.props.type} ref="alert">
        <button type="button" className="close" onClick={this.handleClick}>&times;</button>
        <strong>Well done!</strong> {this.props.text}
      </div>
    );
  }
});
