require 'json'

get '/' do
  redirect to('/posts')
end

get '/requests' do
  request.ip
end

get '/about' do
  erb :about
end

get '/about/feed/*' do
  call env.merge("PATH_INFO" => '/about')
end

