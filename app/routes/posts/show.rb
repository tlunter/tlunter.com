['/posts', '/posts/latest', %r{/posts/i/([\w-]+)}].each do |r|
  get r do
    erb :index
  end
end

get '/post/latest.json' do
  posts = Post.latest.map do |p|
    post = p.as_json
    post[:body] = App.markdown.render post[:body]
    post
  end
  
  {
    :next => nil,
    :current => posts[0],
    :previous => posts[1]
  }.to_json
end

get %r{/post/i/([\w-]+)\.json} do |post_link|
  post            = Post.first(:link => post_link)
  halt 404 unless post
  next_post       = Post.first(:published => true, :updated_at.gt => post.updated_at, :order => :updated_at.asc)
  previous_post   = Post.first(:published => true, :updated_at.lt => post.updated_at, :order => :updated_at.desc)
  posts = {
    :next => next_post,
    :current => post,
    :previous => previous_post
  }

  posts.each do |key, p|
    next nil if p.nil?
    post = p.as_json
    post[:body] = App.markdown.render post[:body]
    posts[key] = post
  end.to_json
end

