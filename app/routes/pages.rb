require 'json'

before '*' do
  unless request.path_info =~ /\.(\w+)$/
    request.path_info = '/'
  end
end

get '/' do
  erb :index
end

after '*' do
  response.set_cookie(:'XSRF-TOKEN', value: Rack::Csrf.token(request.env), expires: Time.now + 3600*24)
end

