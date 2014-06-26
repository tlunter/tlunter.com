/** @jsx React.DOM */

var Flash = React.createClass({
  getInitialState: function() {
    return {
      index: 0,
      flashes: []
    };
  },
  componentDidMount: function() {
    setTimeout(this.clearOldFlashes, 5000);
  },
  clearNotificationFn: function (index) {
    return function() {
      var notif = _.find(this.state.flashes, function (f) {
        return f.index == index;
      });

      this.setState({ flashes: _.without(this.state.flashes, notif) });
    };
  },
  renderFlashes: function() {
    return this.state.flashes.map(function (notice) {
      return <FlashNotice key={notice.index}
                          type={notice.type}
                          text={notice.text}
                          callbackFn={this.clearNotificationFn(notice.index).bind(this)} />;
    }, this);
  },
  addNotice: function (text) {
    var newIndex = this.state.index + 1;
    var flashes = this.state.flashes;
    flashes.push({index: newIndex, type: 'success', text: text});
    this.setState({ index: newIndex, flashes: flashes });
  },
  addError: function (text) {
    var newIndex = this.state.index + 1;
    var flashes = this.state.flashes;
    flashes.push({index: newIndex, type: 'error', text: text});
    this.setState({ index: newIndex, flashes: flashes });
  },
  render: function() {
    return (
      <div>
        {this.renderFlashes()}
      </div>
    );
  }
});
