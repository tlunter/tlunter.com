$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'sinatra'
require 'pry'

class App < Sinatra::Application
  set :protection, :origin_whitelist => ['http://localhost', 'http://home.tlunter.com']

  before %r{.+\.json$} do
        content_type 'application/json'
  end
end

Dir[File.join(App.root, "config/**/*.rb")].each {|f| require f}

require 'digest/sha1'

Dir[File.join(App.root, "models/**/*.rb")].each {|f| require f}

DataMapper.finalize

Dir[File.join(App.root, "routes/**/*.rb")].each {|f| require f}
