require 'spec_helper'

describe Comment do
  let(:comment) { FactoryGirl.build :comment }
  fields = [ :id, :user, :post, :body, :created_at, :updated_at]
  required_fields = [ :user, :post, :body ]

  subject { comment }

  fields.each do |field|
    it "responds to #{field}" do
      expect(subject).to respond_to field
    end
  end

  it "is valid" do
    expect(subject.valid?).to be_true
  end

  required_fields.each do |field|
    it "without #{field} is not valid" do
      subject.send(:"#{field}=", nil)

      expect(subject.valid?).to be_false
    end
  end

  it 'before save has no timestamps' do
    expect(subject.created_at).to be_nil
    expect(subject.updated_at).to be_nil
  end

  it 'after save has timestamps' do
    subject.save

    expect(subject.created_at).to_not be_nil
    expect(subject.updated_at).to_not be_nil
  end
end
