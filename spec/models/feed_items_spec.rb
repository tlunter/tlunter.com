require 'spec_helper'

describe Comment do
  let(:feed_item) { FactoryGirl.build :feed_item }
  fields = [ :id, :title, :link, :published, :type ]
  required_fields = [ :title, :link, :published, :type ]

  subject { feed_item }

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
end

