class App < Sinatra::Application
  get '/' do
    erb :index
  end

  get '/feed/*' do
    call env.merge("PATH_INFO" => '/')
  end

  get '/about' do
    erb :about
  end
end

