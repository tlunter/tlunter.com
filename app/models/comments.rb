class Comment
  include DataMapper::Resource

  property :id, Serial
  property :email, String, :length => 255, :index => true
  property :body, Text, :required => true, :lazy => false
  property :created_at, DateTime
  property :updated_at, DateTime, :index => true

  belongs_to :post

  before :create do |post|
    post.created_at = DateTime.now
    post.updated_at = post.created_at
  end

  before :update do |post|
    post.updated_at = DateTime.now
  end
end

