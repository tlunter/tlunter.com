class App < Sinatra::Application
  before %{/posts/edit/([\w-]+)} do
    unless request.env['HTTP_X_REAL_IP'] =~ /127\.0\.0\.1/ || request.env['HTTP_X_REAL_IP'] =~ /192\.168\.1\.\d{1,3}/
      halt 404
    end
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
end
