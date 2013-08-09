get %r{/comments/([\w-]+)\.json} do |post_link|
  post = Post.first(:link => post_link)
  comments = post.comments.all(:order => :created_at.asc)
  
  comments.map do |comment|
    c = comment.as_json
    c[:body] = App.markdown.render c[:body]
    c
  end.to_json
end
