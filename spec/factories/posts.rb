FactoryGirl.define do
  factory :post, :class => Post do
    user
    sequence(:title) { |n| "test post #{n}" }
    sequence(:body) { |n| "contents of a test post #{n}!" }
    published true
 end
end
