require 'bcrypt'

class User
  include DataMapper::Resource

  attr_accessor :password, :password_confirmation

  property :id, Serial
  property :username, String, :length => 255, :required => true
  property :email, String, :length => 255, :required => true, :unique => true, :format => :email_address
  property :password_encrypted, String, :length => 255, :required => true
  property :created_at, DateTime
  property :updated_at, DateTime
  property :is_admin, Boolean, :default => false

  has n, :posts
  has n, :comments

  def self.create(fields)
    user = User.new(fields)
    user.password_encrypted = User.encrypt_password(user.password)
    user
  end

  def self.encrypt_password(password)
    if !password.nil? && !password.empty?
      BCrypt::Password.create(password)
    end
  end

  def authenticate(password)
    BCrypt::Password.new(self.password_encrypted) == password
  end

  def to_json
    self.as_json.reject { |k, v| k == :password_encrypted }.to_json
  end
  
  def to_json_with_password
    self.as_json.to_json
  end

  before :create do |user|
    if user.password != user.password_confirmation
      throw :halt
    end

    if !password.nil? && !password.empty?
      user.password_encrypted = User.encrypt_password(password)
    end
    user.created_at = DateTime.now
    user.updated_at = user.created_at
  end

  before :update do |user|
    if user.password != user.password_confirmation
      throw :halt
    end

    if !password.nil? && !password.empty?
      user.password_encrypted = User.encrypt_password(password)
    end
    user.updated_at = DateTime.now
  end
end
