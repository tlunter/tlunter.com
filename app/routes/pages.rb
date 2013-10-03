require 'json'

IP_WHITELIST_PAGES = ['/posts/new']
IP_WHITELIST = [
  /127.0.0.1/,
  /192\.168\.1\.\d{1,3}/,
  /192\.168\.2\.\d{1,3}/,
  /24.218.39.32/
]

IP_WHITELIST_PAGES.each do |page|
  before page do
    send_home = true
    IP_WHITELIST.each do |ip|
      if request.env['HTTP_X_REAL_IP'] =~ ip
        send_home = false
      end
    end
    redirect '/' if send_home
  end
end

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

