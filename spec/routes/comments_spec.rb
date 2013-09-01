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

  context 'for a posts comment new' do
    let (:new_comment) do
      post "/comments/#{post_link}.json", {}, {
        'rack.input' => StringIO.new(attrs.to_json),
        'rack.session' => { 'csrf.token' => 'token' },
        'HTTP_X_XSRF_TOKEN' => csrf_token
      }
    end

    context 'with a csrf token' do
      let (:csrf_token) { 'token' }

      context 'with a good post-link' do
        let (:post_link) { new_post.link }

        context 'with good data' do
          let (:attrs) { {:email => 'test', :body => 'full test'} }

          it "responds with ok" do
            expect(new_comment).to be_ok
            change(Comment.count).by(1)
          end
        end

        context 'with missing email' do
          let (:attrs) { {:body => 'test'} }
          it "responds with client error" do
            expect(new_comment).to be_client_error
          end
        end

        context 'with missing body' do
          let (:attrs) { {:email => 'test'} }
          it "responds with client error" do
            expect(new_comment).to be_client_error
          end
        end
      end

      context 'with a bad post-link' do
        let (:post_link) { "a-known-bad-link" }
        let (:attrs) { {} }

        it "responds not found" do
          expect(new_comment).to be_not_found
        end
      end
    end

    context 'without a csrf token' do
      let (:csrf_token) { 'asjf' }
      let (:post_link) { "a-known-bad-link" }
      let (:attrs) { {} }
      it 'raises an error' do
        expect { new_comment }.to raise_error(Rack::Csrf::InvalidCsrfToken)
      end
    end
  end
end

