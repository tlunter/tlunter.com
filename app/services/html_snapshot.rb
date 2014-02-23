require 'capybara'
require 'capybara/dsl'
require 'capybara/webkit'

Capybara.default_driver = :webkit
#Capybara.app_host = 'http://tlunter.com'
Capybara.app_host = 'http://localhost'
Capybara.run_server = false
Capybara.default_wait_time = 5

class App::Services::HtmlSnapshot
  include Capybara::DSL

  def get_page(path)
    visit(path)
    page.body
  end
end
