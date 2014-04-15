require 'bcrypt'
require 'jwt'

class User
  include Mongoid::Document
  include BCrypt

  before_save :hash_password
  attr_accessor :password

  field :first_name
  field :last_name
  field :email
  field :location
  field :hashed_password

  has_many :posts
  has_many :comments

  validates :email, uniqueness: true, presence: true, format: {:with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/}


  def authenticate(password)
    if Password.new(self.hashed_password) == password
      true
    else
      false
    end
  end

  def self.check_token(request)
    token = request.env['HTTP_AUTHORIZATION']
    payload = JWT.decode(token, ENV['SECRET'])
    User.find(payload['id'])
  end

  private
  def hash_password
    if password.present?
      self.hashed_password = Password.create(password)
    end
  end

end