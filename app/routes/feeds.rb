class App < Sinatra::Application
  get '/github.json' do
    GitHub.latest.to_json
  end

  get '/stack_overflow.json' do
    StackOverflow.latest.to_json
  end

  get '/twitter.json' do
    TwitterItem.latest.to_json
  end
end

