require File.join(File.dirname(__FILE__), '..', 'app.rb')
require 'rack/test'
require 'factory_girl'

FactoryGirl.find_definitions

# setup test environment
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

class App < Sinatra::Application
  DataMapper.setup(:default, 'mysql://tluntercom:@localhost/test_tluntercom')
  DataMapper.auto_migrate!
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

