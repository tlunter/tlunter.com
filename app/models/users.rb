require 'bcrypt'

class User
  include DataMapper::Resource

  property :id, Serial
  property :email, String, :length => 255, :required => true
  property :password_encrypted, String, :length => 255, :required => true
  property :created_at, DateTime
  property :updated_at, DateTime

  def self.encrypt_password(password)
    BCrypt::Password.create(password)
  end

  def authenticate(password)
    BCrypt::Password.new(self.password_encrypted) == password
  end

  before :create do |post|
    post.created_at = DateTime.now
    post.updated_at = post.created_at
  end

  before :update do |post|
    post.updated_at = DateTime.now
  end
end
