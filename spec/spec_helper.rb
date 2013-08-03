require File.join(File.dirname(__FILE__), '..', 'app.rb')
require 'rack/test'

# setup test environment
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false
set :views, Proc.new { File.join(Dir.pwd, 'spec', 'views') }

def app
  App
end

RSpec.configure do |config|
  config.include Rack::Test::Methods
end

