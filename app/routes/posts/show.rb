get '/posts/latest.json' do
  posts = Post.latest

  post = posts[0].as_json
  post[:body] = App.markdown.render post[:body]
  
  post[:previous] = posts[1].link unless posts[1].nil?
  post.to_json
end

get %r{/posts/([\w-]+)\.json} do |link|
  post            = Post.first(:link => link).as_json
  halt 404 if post.nil?
  next_post       = Post.first(:published => true, :updated_at.gt => post[:updated_at], :order => :updated_at.asc)
  previous_post   = Post.first(:published => true, :updated_at.lt => post[:updated_at], :order => :updated_at.desc)

  post[:body] = App.markdown.render post[:body]
  post[:next] = next_post.link unless next_post.nil?
  post[:previous] = previous_post.link unless previous_post.nil?
  post.to_json
end

