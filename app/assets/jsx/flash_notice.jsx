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
  renderSuccess: function() {
    return (
      <div className="alert alert-success" ref="alert">
        <button type="button" className="close" onClick={this.handleClick}>&times;</button>
        <strong>Well done!</strong> {this.props.text}
      </div>
    );
  },
  renderError: function() {
    return (
      <div className="alert alert-error" ref="alert">
        <button type="button" className="close" onClick={this.handleClick}>&times;</button>
        <strong>Oh no!</strong> {this.props.text}
      </div>
    );
  },
  render: function() {
    if (this.props.type == "success") {
      return this.renderSuccess();
    } else {
      return this.renderError();
    }
  }
});
