$LOAD_PATH << File.dirname(__FILE__)

require 'rubygems'
require 'resque'
require 'feedzirra'
require 'clockwork'
require 'app'

module Clockwork
  handler { |job|
    Resque.enqueue(job)
  }

  def feed_success(url, feed, type, options={})
    unless feed.nil?
      feed.entries.each do |entry|
        url    = entry.url || entry.links[0]
        record = type.first(:link => url) || type.new

        unless record.id
          if options[:title]
            record.title   = options[:title].call(entry)
          else
            record.title   = entry.title
          end
          record.link      = url
          record.published = entry.published.to_s
          unless record.save
            record.errors.each do |error|
              puts error
            end
          end
        end
      end
    else
      puts "URL: #{url} hasn't change"
    end
  end

  def feed_failure(url, res_code, res_header, res_body)
    puts "URL: #{url} ResCode: #{res_code}"
  end

  every(15.minute, 'feeds.refresh') do
    Feedzirra::Feed.fetch_and_parse(
      "https://www.github.com/tlunter.atom",
      :on_success => lambda { |url, feed| feed_success(url, feed, GitHub) },
      :on_failure => method(:feed_failure)
    )

    Feedzirra::Feed.fetch_and_parse(
      "http://stackoverflow.com/feeds/user/714452",
      :on_success => lambda { |url, feed| feed_success(url, feed, StackOverflow) },
      :on_failure => method(:feed_failure)
    )

    Feedzirra::Feed.fetch_and_parse(
      "http://rss4twitter.appspot.com/getrss?name=tlunter",
      :on_success => lambda do |url, feed|
        feed_success(url, feed, Twitter,
                     { :title => lambda { |e| e.summer } })
      end,
      :on_failure => method(:feed_failure)
    )
  end
end
