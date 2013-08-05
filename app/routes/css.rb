require 'less'

get '/stylesheets/:style.css' do
  less :"stylesheets/#{params[:style]}"
end

