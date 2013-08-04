require 'spec_helper'

describe Post do
  let(:post) { FactoryGirl.build(:post) }

  subject { post }

  context 'post is valid' do
    its(:valid?) { should be_true }
  end

  context 'before save has no timestamps' do
    its(:created_at) { should be_nil }
    its(:updated_at) { should be_nil }
  end

  context 'after save has timestamps' do
    before do
      subject.save
    end

    its(:created_at) { should_not be_nil }
    its(:updated_at) { should_not be_nil }
  end

  context 'before save has no link' do
    its(:link) { should be_nil }
  end

  context 'after save has link' do
    before do
      post.save
    end

    its(:link) { should == post.linkify_title }
  end
end
