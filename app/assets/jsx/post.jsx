/** @jsx React.DOM */

var Views = Views || {};
Views.Post = React.createClass({
  getInitialState: function() { return {} },
  loadPost: function() {
    reqwest({
      url: '/posts/' + this.props.id + '.json',
      method: 'get',
      type: 'json',
      success: function (resp) {
        this.setPost(resp);
      }.bind(this)
    });
  },
  setPost: function (post) {
    this.setState({ post: post });
  },
  componentWillMount: function() {
    this.loadPost();
  },
  renderPost: function() {
    if (this.state.post) {
      var updated_at = moment(this.state.post.updated_at).format('MMMM Do YYYY, h a z');
      return (
        <div>
          <h1>{this.state.post.title}</h1>
          {updated_at}
          <div className="body" dangerouslySetInnerHTML={{__html: this.state.post.body}} />
        </div>
      );
    }
  },
  render: function() {
    var CommentList = Views.CommentList,
        CommentForm  = Views.CommentForm;
    return (
      <div className="post">
        {this.renderPost()}
        <div className="comments">
          <CommentList id={this.props.id} />
          <CommentForm id={this.props.id} />
        </div>
      </div>
    );
  }
});
