require 'spec_helper'
require 'json'

describe 'comments routes' do
  let!(:new_post) { FactoryGirl.build(:post).tap { |p| p.save } }
  let!(:comment1) { FactoryGirl.build(:comment, :post => new_post).tap { |c| c.save } }
  let!(:comment2) { FactoryGirl.build(:comment, :post => new_post).tap { |c| c.save } }

  context 'for a posts comment index' do
    before do
      get "/comments/#{new_post.link}.json"
    end

    it "responds ok" do
      expect(last_response).to be_ok
    end

    it "body should be the comments as json" do
      expect(last_response.body).to be == [comment1, comment2].map { |c| c[:body] = App.markdown.render c[:body]; c }.to_json
    end

    it "to have the json content type" do
      expect(last_response.content_type).to include "application/json"
    end
  end
end
