require 'spec_helper'
require 'json'

describe 'posts' do
  let!(:post1) { FactoryGirl.build(:post).tap { |c| c.save } }
  let!(:post2) { FactoryGirl.build(:post).tap { |c| c.save } }

  let!(:markdown_posts) do
    [ post1, post2 ].each do |p|
      p[:body] = App.markdown.render p[:body]
    end
  end

  describe '#index' do
    before do
      get '/posts.json'
    end

    it "responds ok" do
      expect(last_response).to be_ok
    end

    it "body should be the posts as json" do
      expect(last_response.body).to be == markdown_posts.to_json
    end

    it "to have the json content type" do
      expect(last_response.content_type).to include "application/json"
    end
  end

  describe '#show' do
    context 'with a good post-link' do
      before do
        get "/posts/#{post1.link}.json"
      end

      it "responds ok" do
        expect(last_response).to be_ok
      end

      it "body should have the post" do
        expect(last_response.body).to be == markdown_posts.first.to_json
      end
    end

    context 'with a bad post-link' do
      before do
        get "/posts/0.json"
      end

      it "responds not found" do
        expect(last_response).to be_not_found
      end
    end
  end

  describe '#create' do
    let (:attrs) { {} }
    let (:env) { {} }
    let (:new_post) do
      post "/posts.json", {}, csrf_env.merge(env).merge('rack.input' => StringIO.new(attrs.to_json))
    end

    context 'with a csrf token' do
      context 'with good data' do
        let (:attrs) { {:title => 'test', :body => 'full test'} }

        it "responds with ok" do
          expect(new_post).to be_ok
          change(Post.count).by(1)
        end
      end

      context 'with missing title' do
        let (:attrs) { {:body => 'test'} }
        it "responds with client error" do
          expect(new_post).to be_client_error
        end
      end

      context 'with missing body' do
        let (:attrs) { {:title => 'test'} }
        it "responds with client error" do
          expect(new_post).to be_client_error
        end
      end
    end

    context 'without a csrf token' do
      let (:env) { { 'rack.session' => { 'csrf.token' => '' } } }
      it 'raises an error' do
        expect { new_post }.to raise_error(Rack::Csrf::InvalidCsrfToken)
      end
    end
  end
end
