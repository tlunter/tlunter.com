$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'sinatra'
require 'rack-flash'
require 'pry'

class App < Sinatra::Application
  set :template_engine, 'erb'
  set :sinatra_authentication_view_path, File.join(self.root, "views/auth/")
  set :protection, :origin_whitelist => ['http://localhost', 'http://home.tlunter.com']
end

Dir[File.join(App.root, "config/**/*.rb")].each {|f| require f}

require 'digest/sha1'
require 'sinatra-authentication'

Dir[File.join(App.root, "models/**/*.rb")].each {|f| require f}
Dir[File.join(App.root, "routes/**/*.rb")].each {|f| require f}

use Rack::Session::Cookie, :secret => 'A1 sauce 1s so good you should use 1t on a11 yr st34ksssss'
use Rack::Flash
