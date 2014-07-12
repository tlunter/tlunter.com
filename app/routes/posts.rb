require 'json'

ALLOWED_POST_FIELDS = [:title, :body, :published]

# index
get '/posts.json' do
  posts = Post.all(:order => :updated_at.desc, :published => true)

  posts.each do |p|
    p.body = App.markdown.render p.body
  end
  
  posts.to_json
end

get '/posts.rss' do
  @posts = Post.all(:order => :updated_at.desc, :published => true)

  @posts.each do |p|
    p.body = App.markdown.render p.body
  end
  
  erb :rss, layout: false
end

# show
get %r{/posts/([\w-]+)\.json} do |link|
  post = Post.first(:link => link)
  halt 404 if post.nil?

  post.body = App.markdown.render post.body unless request.params["clean"] == "true"
  post.to_json
end
