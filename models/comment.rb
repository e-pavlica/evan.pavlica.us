class Comment
  include Mongoid::Document

  field :text
  belongs_to :user
  belongs_to :post
end