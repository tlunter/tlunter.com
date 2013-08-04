class App < Sinatra::Application
  before '/posts/new' do
    unless request.env['HTTP_X_REAL_IP'] =~ /127\.0\.0\.1/ || request.env['HTTP_X_REAL_IP'] =~ /192\.168\.1\.\d{1,3}/
      halt 404
    end
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
    unless title.empty? || body.empty?
      p = Post.new(:title => title,
                   :body => body,
                   :published => published)
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
end
