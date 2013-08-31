require 'json'

ALLOWED_FIELDS = ['email', 'body']

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

get %r{/comments/([\w-]+)/new\.json} do |post_link|
  { :csrf_token => csrf_token }.to_json
end

post %r{/comments/([\w-]+)\.json} do |post_link|
  post = Post.first(:link => post_link)

  halt 404 unless post

  data = JSON.parse request.body.read
  fields = data.select { |key, val| ALLOWED_FIELDS.include? key }
  comment = Comment.new(fields.merge(:post => post))

  if comment.save
    comment.to_json
  else
    halt 400
  end
end
