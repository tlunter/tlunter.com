require 'spec_helper'

describe User do
  let(:user) { FactoryGirl.build :user }
  fields = [ :id, :email, :password_encrypted, :created_at, :updated_at]
  required_fields = [ :email, :password_encrypted ]

  subject { user }

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
    end

    context 'after :save' do
      before do
        subject.save
      end

      it 'has timestamps' do
        expect(subject.created_at).to_not be_nil
        expect(subject.updated_at).to_not be_nil
      end
    end
  end

  describe '#authenticate' do
    context 'with a valid password' do
      it 'returns a successful authentication' do
        expect(user.authenticate('password')).to be_true
      end
    end

    context 'with an invalid password' do
      it 'returns a successful authentication' do
        expect(user.authenticate('password2')).to be_false
      end
    end
  end
end

