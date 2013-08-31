require 'json'

IP_WHITELIST_PAGES = ['/posts/new']

IP_WHITELIST_PAGES.each do |page|
  before page do
    unless request.env['HTTP_X_REAL_IP'] == '127.0.0.1' || request.env['HTTP_X_REAL_IP'] =~ /192\.168\.1\.\d{1,3}/
      redirect '/'
    end
  end
end

before '*' do
  unless request.path_info.end_with?(".json")
    request.path_info = '/'
  end
end

get '/' do
  erb :index
end

after '*' do
  response.set_cookie(:'XSRF-TOKEN', value: Rack::Csrf.token(request.env), expires: Time.now + 3600*24)
end

