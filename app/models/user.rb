class User < ActiveRecord::Base
  include Gravtastic
  gravtastic

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable, :validatable

  def token_expired?
    if token_created.nil?
      return true
    end
    self.token_created < 20.days.ago
  end

  def large_profile_image
    gravitar = self.gravatar_url(rating: 'G', size: 100)
    unless gravitar
      return "http://lorempixel.com/100/100/"
    end
    gravitar
  end

  def profile_image
    gravitar = self.gravatar_url(rating: 'G', size: 44)
    unless gravitar
      return "http://lorempixel.com/44/44/"
    end
    gravitar
  end

end
