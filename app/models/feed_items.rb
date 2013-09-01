class FeedItem
  include DataMapper::Resource

  property :id,        Serial
  property :title,     String, :length => 255, :required => true
  property :link,      String, :length => 255, :required => true
  property :published, DateTime, :required => true
  property :type,      Discriminator

  def self.latest
    all(:order => :published.desc, :limit => 5)
  end
end

class GitHubItem        < FeedItem; end
class StackOverflowItem < FeedItem; end
class TwitterItem       < FeedItem; end

