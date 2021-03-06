$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'sinatra'
require 'rack/csrf'
require 'redcarpet'
require 'pry'
require 'prerender_rails'

if ENV['RACK_ENV'] == "production"
  require 'oboe'

  Oboe::Config[:tracing_mode] = 'through'
  Oboe::Config[:sample_rate] = 1000000
end

class App < Sinatra::Application
  set :protection, :origin_whitelist => ['http://localhost']
  set :views, File.join(App.root, 'app', 'views')

  before %r{.*\.json$} do
    content_type :json
  end

  def self.markdown
    @@markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
  end

  Dir[File.join(App.root, "config/**/*.rb")].each {|f| require f}

  require 'digest/sha1'

  Dir[File.join(App.root, "app/models/**/*.rb")].each {|f| require f}
  DataMapper.finalize

  Dir[File.join(App.root, "app/helpers/**/*.rb")].each {|f| require f}

  Dir[File.join(App.root, "app/routes/**/*.rb")].each {|f| require f}

  use Rack::Session::Cookie, :secret => 'A1 sauce 1s so good you should use 1t on a11 yr st34ksssss'
  use Rack::Csrf, :raise => true, :header => 'X_XSRF_TOKEN'
  use Rack::Prerender, :prerender_service_url => 'http://prerender.tlunter.com/'
end

