#require 'json'

class App < Sinatra::Application
  before '/posts/new' do
    halt 404 unless request.env["HTTP_X_REAL_IP"] =~ /192\.168\.1\.\d{1,3}/
  end

  get %r{/posts/edit/([\w-]+)} do |post_link|
    p = Post.first(:link => post_link)
    action = "/posts/edit/#{post_link}"
    title = p.title
    body = p.body
    published = p.published
    erb :new_post, :locals => {
      :action => action,
      :title => title,
      :body => body,
      :published => published
    }
  end

  post %r{/posts/edit/([\w-]+)} do |post_link|
    action = "/posts/edit/#{post_link}"
    title     = params['title']
    body      = params['body']
    published = true if params['published'] == "on"
    link      = title.tr('^A-Za-z0-9 ', '').tr(' ', '-')
    unless title.empty? || body.empty?
      p = Post.first(:link => post_link)
      
      p.title = title
      p.body = body
      p.published = published
      p.link = link

      if p.save
        redirect "/posts/i/#{p.link}"
      else
        errors = p.errors.values.inject("") do |string, error|
          string + error.inject("") { |s, e| s + "<li>#{e}</li>" }
        end
        flash[:error] = "The post was not able to be saved because:<ul>#{errors}</ul>"
      end
    else
      flash[:error] = "The title or body of the post are empty, please fill"
    end
    erb :new_post, :locals => {
      :action => action,
      :title => title,
      :body => body,
      :published => published
    }
  end

  get '/posts/new' do
    action = '/posts/new'
    title = ''
    body = ''
    published = true
    erb :new_post, :locals => {
      :action => action,
      :title => title,
      :body => body,
      :published => published
    }

  end

  post '/posts/new' do
    action = '/posts/new'
    title     = params['title']
    body      = params['body']
    published = true if params['published'] == "on"
    link      = title.tr('^A-Za-z0-9 ', '').tr(' ', '-')
    unless title.empty? || body.empty?
      p = Post.new(:title => title,
                   :body => body,
                   :published => published,
                   :link => link)
      if p.save
        redirect "/posts/i/#{p.link}"
      else
        errors = p.errors.values.inject("") do |string, error|
          string + error.inject("") { |s, e| s + "<li>#{e}</li>" }
        end
        flash[:error] = "The post was not able to be saved because:<ul>#{errors}</ul>"
      end
    else
      flash[:error] = "The title or body of the post are empty, please fill"
    end
    erb :new_post, :locals => {
      :action => action,
      :title => title,
      :body => body,
      :published => published
    }
  end

  get '/posts/*' do
    call env.merge('PATH_INFO' => '/posts')
  end

  get '/posts' do
    erb :index
  end

  get '/post/latest.json' do
    posts = Post.latest.each do |post|
      post.body = @markdown.render post.body
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
    next_post       = Post.first(:updated_at.gt => post.updated_at, :order => :updated_at.asc)
    previous_post   = Post.first(:updated_at.lt => post.updated_at, :order => :updated_at.desc)
    posts = {
      :next => next_post,
      :current => post,
      :previous => previous_post
    }

    posts.each do |key, p|
      p.body = @markdown.render p.body unless p.nil?
      posts[key] = p
    end.to_json
  end
end
