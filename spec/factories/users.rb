FactoryGirl.define do
  factory :user, :class => User do
    sequence(:email) { |n| "user#{n}@example.com" }
    password "password"
    password_confirmation "password"
    password_encrypted { User.encrypt_password(password) }
 end
end

