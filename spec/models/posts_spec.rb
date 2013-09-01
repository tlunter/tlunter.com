require 'spec_helper'

describe Post do
  let(:post) { FactoryGirl.build :post }
  fields = [:id, :title, :body, :created_at, :updated_at, :link]
  required_fields = [:title, :body]

  subject { post }

  describe 'fields' do
    fields.each do |field|
      it "responds to #{field}" do
        expect(subject).to respond_to field
      end
    end
  end

  it 'is valid' do
    expect(subject.valid?).to be_true
  end

  describe 'required_fields' do
    required_fields.each do |field|
      it "without #{field} is not valid" do
        subject.send(:"#{field}=", nil)

        expect(subject.valid?).to be_false
      end
    end
  end

  describe '#save' do
    context 'before :save' do
      it 'has no timestamps' do
        expect(subject.created_at).to be_nil
        expect(subject.updated_at).to be_nil
      end

      it 'has no link' do
        expect(subject.link).to be_nil
      end
    end

    context 'after :save' do
      before do
        subject.save
      end

      it 'has timestamps' do
        expect(subject.created_at).to_not be_nil
        expect(subject.updated_at).to_not be_nil
      end

      it 'has link' do
        expect(subject.link).to be == post.linkify_title
      end
    end
  end
end
