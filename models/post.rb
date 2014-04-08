class Post
  include Mongoid::Document

  field :category
  field :title
  field :content
  field :published, type: Boolean
  field :created
  field :updated
  belongs_to :user
  has_many :comments
end
