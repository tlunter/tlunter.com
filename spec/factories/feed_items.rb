FactoryGirl.define do
  factory :feed_item do
    sequence(:title) { |n| "title-#{n}" }
    sequence(:link) { |n| "link-#{n}" }
    published { DateTime.now }
    type GitHubItem
  end
end
