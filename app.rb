$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'sinatra'
require 'rack-flash'
require 'rack/csrf'
require 'redcarpet'
require 'twitter'
require 'pry'

class App < Sinatra::Application
  set :protection, :origin_whitelist => ['http://localhost']
  set :views, File.join(App.root, 'app', 'views')

  before %r{.*\.json$} do
    content_type :json
  end

  before "*" do
    @markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
  end

  Dir[File.join(App.root, "config/**/*.rb")].each {|f| require f}

  require 'digest/sha1'

  Dir[File.join(App.root, "app/models/**/*.rb")].each {|f| require f}
  DataMapper.finalize

  Dir[File.join(App.root, "app/helpers/**/*.rb")].each {|f| require f}

  Dir[File.join(App.root, "app/routes/**/*.rb")].each {|f| require f}

  set :sessions, true
  use Rack::Flash;
  use Rack::Csrf, :raise => true
end

