FactoryGirl.define do
  factory :comment do
    sequence(:email) { |n| "commenter-#{n}@example.com" }
    sequence(:body) { |n| "Body of comment-#{n}" }
    post
  end
end
