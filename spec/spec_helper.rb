require File.join(File.dirname(__FILE__), '..', 'app.rb')
require 'rack/test'
require 'factory_girl'

FactoryGirl.find_definitions

# setup test environment
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

def app
  App
end

set :views, Proc.new { File.join(App.root, 'spec', 'views') }

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include Rack::Test::Methods
end

