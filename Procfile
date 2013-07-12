web: bundle exec unicorn -l /tmp/tluntercom.sock
resque-web: bundle exec resque-web --foreground
resque: bundle exec rake jobs:work
clock: bundle exec clockwork ./clock.rb
