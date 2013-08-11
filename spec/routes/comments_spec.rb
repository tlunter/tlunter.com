require 'spec_helper'
require 'json'

describe 'comments routes' do
  let!(:new_post) { FactoryGirl.build(:post).tap { |p| p.save } }
  let!(:comment1) { FactoryGirl.build(:comment, :post => new_post).tap { |c| c.save } }
  let!(:comment2) { FactoryGirl.build(:comment, :post => new_post).tap { |c| c.save } }

  let!(:markdown_comments) do
    [ comment1, comment2 ].each do |c|
      c[:body] = App.markdown.render c[:body]
    end
  end

  context 'for a posts comment index' do
    context 'with a good post-link' do
      before do
        get "/comments/#{new_post.link}.json"
      end

      it "responds ok" do
        expect(last_response).to be_ok
      end

      it "body should be the comments as json" do
        expect(last_response.body).to be == markdown_comments.to_json
      end

      it "to have the json content type" do
        expect(last_response.content_type).to include "application/json"
      end
    end

    context 'with a bad post-link' do
      before do
        get "/comments/a-known-bad-link.json"
      end

      it "responds not found" do
        expect(last_response).to be_not_found
      end
    end
  end

  context 'for a posts comment show' do
    context 'with a good post-link' do
      context 'with a good comment-id' do
        before do
          get "/comments/#{new_post.link}/#{comment1.id}.json"
        end

        it "responds ok" do
          expect(last_response).to be_ok
        end

        it "body should have the comment" do
          expect(last_response.body).to be == markdown_comments.first.to_json
        end
      end

      context 'with a bad comment-id' do
        before do
          get "/comments/#{new_post.link}/0.json"
        end

        it "responds not found" do
          expect(last_response).to be_not_found
        end
      end
    end

    context 'with a bad post-link' do
      before do
        get "/comments/a-known-bad-link/#{comment1.id}.json"
      end

      it "responds not found" do
        expect(last_response).to be_not_found
      end
    end
  end
end

