/** @jsx React.DOM */

var Views = Views || {};
Views.Posts = React.createClass({
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
    var posts = this.state.posts.map(function(post) {
      var updated_at = moment(post.updated_at).format('MMMM Do YYYY [at] h a');
      return (
        <li>
          <a href={"/posts/"+post.link}>
            <h1>{post.title}</h1>
          </a>
          {updated_at}
        </li>
      );
    });
    return <ul className="posts">{posts}</ul>;
  }
});
