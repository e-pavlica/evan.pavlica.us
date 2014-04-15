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

  before_save :set_created_time
  before_update :set_updated_time

  private

  def current_time
    current_time = lambda { Time.now }
    current_time.call
  end

  def set_created_time
    self.created = current_time
  end

  def set_updated_time
    self.updated = current_time
  end

end
