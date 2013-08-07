require 'spec_helper'

describe 'css routes' do
  it "given a real uri loads properly" do
    get '/stylesheets/x.css'
    expect(last_response).to be_ok
  end

  it "given a bad uri doesn't load properly" do
    get '/stylesheets/x'
    expect(last_response).to be_not_found
  end
end
