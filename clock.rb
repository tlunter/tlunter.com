$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'resque'
require 'clockwork'
require 'app'

module Clockwork
  handler { |job|
    Resque.enqueue(job)
  }

  every(1.day, 'dumps.refresh') do
    database_file = File.join(DUMP_LOCATION, "#{Time.now.to_i.to_s}.sql")
    raise "Dump failed!" unless system("mysqldump -h '#{DATABASE_HOST}' -u '#{DATABASE_USER}' -p'#{DATABASE_PASSWORD}' '#{DATABASE_DB}' > #{database_file}")
  end
end
