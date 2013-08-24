get '/post/latest.json' do
  posts = Post.latest.each do |p|
    p[:body] = App.markdown.render p[:body]
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
    p[:body] = App.markdown.render p[:body]
  end.to_json
end

