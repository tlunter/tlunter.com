get %r{/comments/([\w-]+)\.json} do |post_link|
  post = Post.first(:link => post_link)

  halt 404 unless post

  comments = post.comments.all(:order => :created_at.asc)
  
  comments.each do |c|
    c[:body] = App.markdown.render c[:body]
  end.to_json
end

get %r{/comments/([\w-]+)/(\d+)\.json} do |post_link, comment_id|
  post = Post.first(:link => post_link)

  halt 404 unless post

  comment = post.comments.first(:id => comment_id)

  halt 404 unless comment

  comment[:body] = App.markdown.render comment[:body]
  comment.to_json
end
