require 'json'

ALLOWED_POST_FIELDS = ['title', 'body', 'published']

# index
get '/posts.json' do
  posts = Post.all(:order => :updated_at.desc)

  posts.each do |p|
    p.body = App.markdown.render p.body
  end
  
  posts.to_json
end

get %r{/posts.rss} do
  @posts = Post.all(:order => :updated_at.desc)

  @posts.each do |p|
    p.body = App.markdown.render p.body
  end
  
  erb :rss, layout: false
end

# new
post '/posts.json' do
  halt 400, ['You must be logged in!'].to_json unless session[:user]

  data = JSON.parse request.body.read
  fields = data.select { |key, val| ALLOWED_POST_FIELDS.include? key }
  user = User.first(:id => session[:user])
  post = Post.new(fields.merge(:user => user))
  if post.save
    post.to_json
  else
    halt 400, post.errors.full_messages.to_json
  end
end

# edit
#post %r{/posts/edit/} do |link|
#end

# show
get %r{/posts/([\w-]+)\.json} do |link|
  post = Post.first(:link => link)
  halt 404 if post.nil?

  post.body = App.markdown.render post.body
  post.to_json
end
