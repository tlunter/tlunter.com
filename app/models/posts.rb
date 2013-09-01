class Post
  include DataMapper::Resource

  property :id,         Serial
  property :title,      String,  :required => true, :length => 255
  property :body,       Text,    :required => true, :lazy => false
  property :link,       String,  :length => 255
  property :published,  Boolean, :default => false
  property :created_at, DateTime
  property :updated_at, DateTime

  has n, :comments

  def self.latest
    all(:published => true, :order => :updated_at.desc, :limit => 2)
  end

  def linkify_title
    title.tr('^A-Za-z0-9 ', '').tr(' ', '-')
  end

  before :create do |post|
    post.created_at = DateTime.now
    post.updated_at = post.created_at
    post.link = linkify_title
  end

  before :update do |post|
    post.updated_at = DateTime.now
  end
end

