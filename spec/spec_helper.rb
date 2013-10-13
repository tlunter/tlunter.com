ENV['RACK_ENV'] = 'test'

require File.join(File.dirname(__FILE__), '..', 'app.rb')
require 'rack/test'
require 'factory_girl'

FactoryGirl.find_definitions

# setup test environment
set :run, false
set :raise_errors, true
set :logging, false

class App < Sinatra::Application
  Dir[File.join(App.root, "spec/config/**/*.rb")].each {|f| require f}
end

def app
  App
end

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include Rack::Test::Methods

  config.before(:each) do
    repository(:default) do
      transaction = DataMapper::Transaction.new(repository)
      transaction.begin
      repository.adapter.push_transaction(transaction)
    end 
  end
 
  config.after(:each) do
    repository(:default).adapter.pop_transaction.rollback
  end
end

def csrf_env
  {
    'rack.session' => { 'csrf.token' => 'token' },
    'HTTP_X_XSRF_TOKEN' => 'token' 
  }
end
