/** @jsx React.DOM */

var Views = Views || {};
Views.PostListItem = React.createClass({
  handleClick: function (evt) {
    evt.preventDefault();

    Aviator.navigate('/posts/' + this.props.post.link);
  },
  render: function() {
    var updated_at = moment(this.props.post.updated_at).format('MMMM Do YYYY [at] h a');
    return (
      <li key={this.props.post.id}>
        <a href={"/posts/"+this.props.post.link} onClick={this.handleClick}>
          <h1>{this.props.post.title}</h1>
        </a>
        {updated_at}
      </li>
    );
  }
});
