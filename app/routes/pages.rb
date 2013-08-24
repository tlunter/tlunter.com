require 'json'

before '*' do
  unless request.path_info.end_with?(".json")
    request.path_info = '/'
  end
end

get '/' do
  erb :index
end

