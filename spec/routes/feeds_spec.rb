require 'spec_helper'
require 'json'

describe 'feeds routes' do
  let(:feed_item1) do
    feed_type.new({
      :id => 1,
      :title => "feed item 1",
      :link => "http://www.google.com",
      :published => DateTime.now,
    })
  end

  let(:feed_item2) do
    feed_type.new({
      :id => 1,
      :title => "feed item 1",
      :link => "http://www.google.com",
      :published => DateTime.now,
    })
  end

  context 'for a GitHub feed' do
    let(:feed_type) { GitHub }

    before do
      feed_type.stub(:latest) do
        [
          feed_item1,
          feed_item2
        ]
      end
    end

    it 'properly returns a GitHub json response' do
      get '/feeds/github.json'
      expect(last_response).to be_ok
      expect(last_response.content_type).to include "application/json"
      expect(last_response.body).to be == [ feed_item1, feed_item2 ].to_json
    end
  end

  context 'for a StackOverflow feed' do
    let(:feed_type) { StackOverflow }

    before do
      feed_type.stub(:latest) do
        [
          feed_item1,
          feed_item2
        ]
      end
    end

    it 'properly returns a GitHub json response' do
      get '/feeds/stack_overflow.json'
      expect(last_response).to be_ok
      expect(last_response.content_type).to include "application/json"
      expect(last_response.body).to be == [ feed_item1, feed_item2 ].to_json
    end
  end

  context 'for a Twitter feed' do
    let(:feed_type) { TwitterItem }

    before do
      feed_type.stub(:latest) do
        [
          feed_item1,
          feed_item2
        ]
      end
    end

    it 'properly returns a GitHub json response' do
      get '/feeds/twitter.json'
      expect(last_response).to be_ok
      expect(last_response.content_type).to include "application/json"
      expect(last_response.body).to be == [ feed_item1, feed_item2 ].to_json
    end
  end
end
