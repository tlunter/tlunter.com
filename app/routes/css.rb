require 'less'

class App < Sinatra::Application
  get '/stylesheets/:style.css' do
    less :"stylesheets/#{params[:style]}"
  end
end
