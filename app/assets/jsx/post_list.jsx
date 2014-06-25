/** @jsx React.DOM */

var Views = Views || {};
Views.PostList = React.createClass({
  getInitialState: function() { return { posts: [] } },
  loadPosts: function() {
    reqwest({
      url: '/posts.json',
      method: 'get',
      type: 'json',
      success: function(resp) {
        this.setPosts(resp);
      }.bind(this)
    });
  },
  setPosts: function(posts) {
    this.setState({ posts: posts });
  },
  componentWillMount: function() {
    this.loadPosts();
  },
  render: function() {
    var PLI = Views.PostListItem;
    var posts = this.state.posts.map(function(post) {
      return <PLI post={post} />;
    });
    return <ul className="posts">{posts}</ul>;
  }
});
