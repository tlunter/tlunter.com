$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'sinatra'
require 'rack-flash'
require 'redcarpet'
require 'twitter'
require 'pry'

class App < Sinatra::Application
  set :protection, :origin_whitelist => ['http://localhost']

  before %r{.*\.json$} do
    content_type :json
  end

  before "*" do
    @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
  end
end

Dir[File.join(App.root, "config/**/*.rb")].each {|f| require f}

require 'digest/sha1'

Dir[File.join(App.root, "app/models/**/*.rb")].each {|f| require f}

DataMapper.finalize

Dir[File.join(App.root, "app/routes/**/*.rb")].each {|f| require f}

use Rack::Session::Cookie, :secret => 'A1 sauce 1s so good you should use 1t on a11 yr st34ksssss'
use Rack::Flash;
