class Feed
  include DataMapper::Resource

  property :id,        Serial
  property :title,     String, :length => 255, :index => true
  property :link,      String, :length => 255, :index => true
  property :published, DateTime
  property :type,      Discriminator

  def self.latest
    all(:order => :published.desc, :limit => 5)
  end
end

class GitHub        < Feed; end
class StackOverflow < Feed; end
class TwitterItem   < Feed; end

