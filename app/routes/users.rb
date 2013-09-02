require 'json'

ALLOWED_USER_FIELDS = ['username', 'email', 'password', 'password_confirmation']

get %r{/users/(\d+)\.json} do |user_id|
  user = User.first(:id => user_id)
  
  halt 404 unless user

  user.to_json
end

post '/users.json' do
  data = JSON.parse request.body.read
  fields = data.select { |key, val| ALLOWED_USER_FIELDS.include? key }
  user = User.create(fields)

  if user.save
    user.to_json
  else
    halt 400
  end
end
