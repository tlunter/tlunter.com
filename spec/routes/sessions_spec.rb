require 'spec_helper'
require 'json'

describe 'sessions' do
  let (:user) { FactoryGirl.create(:user) }

  describe '#create' do
    let (:attrs) { {} }
    let (:env) { {} }
    let (:new_user) do
      post "/sessions.json", {}, csrf_env.merge(env).merge('rack.input' => StringIO.new(attrs.to_json))
    end

    context 'with a csrf token' do
      context 'with good data' do
        let (:attrs) { {:email => user.email, :password => user.password} }
        it "responds with ok" do
          expect(new_user).to be_ok
          change(User.count).by(1)
        end
      end

      context 'with missing email' do
        let (:attrs) { {:password => user.password} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with missing password' do
        let (:attrs) { {:email => user.email} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with a bad email' do
        let (:attrs) { {:email => 'test', :password => user.password} }
        it "responds with client error" do
          expect(new_user).to be_client_error
        end
      end

      context 'with a bad password' do
        let (:attrs) { {:email => user.email, :password => 'test'} }
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

  describe '#destroy' do
    let (:env) { {} }
    let (:destroy) do
      delete "/sessions.json", {}, csrf_env.merge(env)
    end

    context 'with a csrf token' do
      let (:env) { { 'rack.session' => csrf_env['rack.session'].merge(:user => user.id) } }
      it 'deletes the user session' do
        expect(destroy).to be_ok
      end
    end

    context 'without a csrf token' do
      let (:env) { { 'rack.session' => { 'csrf.token' => '' } } }
      it 'raises an error' do
        expect { destroy }.to raise_error(Rack::Csrf::InvalidCsrfToken)
      end
    end
  end
end
