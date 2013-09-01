get '/feeds/github.json' do
  GitHubItem.latest.to_json
end

get '/feeds/stack_overflow.json' do
  StackOverflowItem.latest.to_json
end

get '/feeds/twitter.json' do
  TwitterItem.latest.to_json
end

