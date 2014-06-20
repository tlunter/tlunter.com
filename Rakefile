require 'resque'
require 'resque/tasks'
require 'rspec/core/rake_task'

task "resque:setup" do
    ENV['QUEUE'] = '*'
    ENV['TERM_CHILD'] = '1'
end

task "resque:setup" do
  Resque.redis = Redis.new(
    :host => '172.17.42.1',
    :port => 6379
  )
end

desc "Alias for resque:work (To run workers on Heroku)"
task "jobs:work" do
  Rake::Task["resque:setup"].invoke
  Rake::Task["resque:work"].invoke
end

RSpec::Core::RakeTask.new(:spec)
task :default => :spec

