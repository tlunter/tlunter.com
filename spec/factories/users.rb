FactoryGirl.define do
  factory :user, :class => User do
    sequence(:email) { |n| "user#{n}@example.com" }
    password_encrypted "password"
 end
end

