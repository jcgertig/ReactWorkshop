# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([
  {email: "jcgertig@gmail.com", password: "testpassword", password_confirmation: "testpassword"},
  {email: "example@example.com", password: "testpassword", password_confirmation: "testpassword"},
  {email: "test@test.com", password: "testpassword", password_confirmation: "testpassword"}
])
