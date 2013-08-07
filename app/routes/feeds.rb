get '/feeds/github.json' do
  GitHub.latest.to_json
end

get '/feeds/stack_overflow.json' do
  StackOverflow.latest.to_json
end

get '/feeds/twitter.json' do
  TwitterItem.latest.to_json
end

