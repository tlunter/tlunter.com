/** @jsx React.DOM */

var Views = Views || {};
Views.CommentForm = React.createClass({
  getInitialState: function() {
    return { loggedIn: loginManager.loggedInStatus() };
  },
  componentDidMount: function() {
    loginManager.register(this.checkLogin);
  },
  componentWillUnmount: function() {
    loginManager.unregister(this.checkLogin);
  },
  checkLogin: function (user) {
    if (user.id) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  },
  handleSubmit: function (evt) {
    evt.preventDefault();

    var comment = this.refs.comment.getDOMNode().value;
    this.attemptComment(comment);
  },
  attemptComment: function (comment) {
    var xsrfToken = Cookies.get('XSRF-TOKEN');
    reqwest({
      url: '/comments/' + this.props.id + '.json',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify({ body: comment }),
      headers: {
        'X-XSRF-TOKEN': xsrfToken
      },
      success: function (resp) {
        Aviator.refresh();
      }
    });
  },
  renderForm: function() {
    return (
      <div className="pure-form pure-form-stacked">
        <form onSubmit={this.handleSubmit}>
          <textarea ref="comment" className="comment" required></textarea>
          <span className="pull-right">Supports Markdown</span>
          <button type="submit" className="pure-button pure-button-primary">Comment</button>
        </form>
      </div>
    );
  },
  render: function() {
    if (this.state.loggedIn) {
      return this.renderForm();
    } else {
      return <div></div>;
    }
  }
});
