/** @jsx React.DOM */
var Views = Views || {};
Views.CommentList = React.createClass({
  getInitialState: function() {
    return { comments: [], users: {} };
  },
  componentWillMount: function() {
    this.loadComments();
  },
  loadComments: function() {
    reqwest({
      url: '/comments/' + this.props.id + '.json',
      method: 'get',
      type: 'json',
      success: function (resp) {
        this.setComments(resp);
      }.bind(this)
    });
  },
  setComments: function (comments) {
    this.setState({ comments: comments });
    this.loadUsers();
    setTimeout(this.loadComments, 5000);
  },
  loadUsers: function() {
    if (this.state.comments) {
      this.state.comments.map(function (c) {
        reqwest({
          url: '/users/' + c.user_id + '.json',
          method: 'get',
          type: 'json',
          success: this.setUserForCommentId(c.id)
        });
      }, this);
    }
  },
  setUserForCommentId: function (commentId) {
    return function (user) {
      if (this.state.comments) {
        var users = this.state.users || {};
        users[commentId] = user;
        this.setState({ users: users });
      }
    }.bind(this);
  },
  showComments: function() {
    if (this.state.comments && this.state.comments.length > 0) {
      return this.renderComments();
    } else {
      return this.renderNoComments();
    }
  },
  renderComments: function() {
    comments = this.state.comments.map(function(comment) {
      var updated_at = moment(comment.updated_at).format('MMMM Do YYYY, h:mm a z');
      var userFormatted;
      if (this.state.users && this.state.users[comment.id]) {
        var u = this.state.users[comment.id];
        userFormatted = <a href={"mailto:" + u.email}>{u.username}</a>;
      }
      return (
        <li key={comment.id}>
          <p id={"comment-" + comment.id}>
            {userFormatted} says:
          </p>
          <p dangerouslySetInnerHTML={{__html: comment.body}} />
          <p><small>at {updated_at}</small></p>
        </li>
      );
    }, this);

    return (
      <ul>
        {comments}
      </ul>
    );
  },
  renderNoComments: function() {
    return <p>No comments yet!</p>;
  },
  render: function() {
    return (
      <div>
        {this.showComments()}
      </div>
    );
  }
});
