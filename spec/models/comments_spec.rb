require 'spec_helper'

describe Comment do
  let(:comment) { FactoryGirl.build :comment }
  fields = [ :id, :email, :post, :body, :created_at, :updated_at]
  required_fields = [ :post, :body ]

  subject { comment }

  fields.each do |field|
    it { should respond_to field }
  end

  context 'is valid' do
    its(:valid?) { should be_true }
  end

  required_fields.each do |field|
    context "without #{field} is not valid" do
      before do
        subject.send(:"#{field}=", nil)
      end

      its(:valid?) { should be_false }
    end
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
end
