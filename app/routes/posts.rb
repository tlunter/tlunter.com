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

# new
post '/posts.json' do
  puts "Request: #{}"
  data = JSON.parse request.body.read
  fields = data.select { |key, val| ALLOWED_POST_FIELDS.include? key }
  post = Post.new(fields)
  post.save

  post.to_json
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
