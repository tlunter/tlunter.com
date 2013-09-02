FactoryGirl.define do
  factory :comment do
    user
    sequence(:body) { |n| "Body of comment-#{n}" }
    post
  end
end
