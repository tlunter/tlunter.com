require 'spec_helper'
require 'json'

describe 'users' do
  let (:user1) { FactoryGirl.create(:user) }
  let (:user2) { FactoryGirl.create(:user) }

  let (:sanitized_users) do
    User.all.map { |u| u.as_json.reject { |k, v| k.to_s =~ /password/ } }
  end

  describe '#show' do
    context 'with a good user-id' do
      before do
        get "/users/#{user1.id}.json"
      end

      it "responds ok" do
        expect(last_response).to be_ok
      end

      it "body should have the sanitized user-hash" do
        expect(last_response.body).to be == sanitized_users.first.to_json
      end
    end

    context 'with a bad user-id' do
      before do
        get "/users/0.json"
      end

      it "responds not found" do
        expect(last_response).to be_not_found
      end
    end
  end

  describe '#create' do
    let (:attrs) { {} }
    let (:env) { {} }
    let (:new_user) do
      post "/users.json", {}, csrf_env.merge(env).merge('rack.input' => StringIO.new(attrs.to_json))
    end

    context 'with a csrf token' do
      context 'with good data' do
        let (:attrs) { {:email => 'test@test.com', :password => 'password', :password_confirmation => 'password'} }

        it "responds with ok" do
          expect(new_user).to be_ok
          change(User.count).by(1)
        end
      end

      context 'with missing email' do
        let (:attrs) { {:password => 'password', :password_confirmation => 'password'} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with badly formatted email' do
        let (:attrs) { {:email => 'test', :password => 'password', :password_confirmation => 'password'} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with missing password' do
        let (:attrs) { {:email => 'test@example.com', :password_confirmation => 'password'} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with missing password confirmation' do
        let (:attrs) { {:email => 'test@example.com', :password => 'password' } }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with unequal passwords' do
        let (:attrs) { {:email => 'test@example.com', :password => 'password', :password_confirmation => 'other_password'} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with empty passwords' do
        let (:attrs) { {:email => 'test@example.com', :password => '', :password_confirmation => ''} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end
    end

    context 'without a csrf token' do
      let (:env) { { 'rack.session' => { 'csrf.token' => '' } } }
      it 'raises an error' do
        expect { new_user }.to raise_error(Rack::Csrf::InvalidCsrfToken)
      end
    end
  end
end

