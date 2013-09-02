require 'json'

ALLOWED_SESSION_FIELDS = ['email', 'password']

get '/sessions.json' do
  user = User.first(:id => session[:user])

  halt 400 unless user
  puts "User: #{user}"
  user.to_json
end

post '/sessions.json' do
  data = JSON.parse request.body.read
  fields = data.select { |key, val| ALLOWED_SESSION_FIELDS.include? key }
  user = User.first(:email => fields['email'])

  halt 400 unless user

  if user.authenticate(fields['password'])
    session[:user] = user.id
    user.to_json
  else
    session[:user] = nil
    halt 400
  end
end

delete '/sessions.json' do
  session[:user] = nil
end

