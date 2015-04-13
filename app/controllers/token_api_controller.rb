class TokenApiController < ApplicationController
  respond_to :json

  before_action :authenticate_user
  skip_before_action :authenticate_user, only: [:sign_in, :sign_out]

  def sign_in
    user = User.where(email: request.headers["User-Email"]).first
    json = {message: "Could not find user with that email and password"}
    if user
      if user.valid_password?(request.headers["User-Password"])
        if user.token_expired?
          uuid = user.uuid
          unless uuid
            uuid = SecureRandom.base64(20);
          end
          user.update_attributes(uuid: uuid, token: gen_token, token_created: DateTime.now);
        end
        json = {
          message: "Signed in successfully",
          user: user.as_json(
              only: [:id, :uuid, :token, :email, :profile_image],
              methods: [:profile_image]
            )
        }
      end
    end
    respond_with json.to_json
  end

  def sign_out
    user = User.where(uuid: request.headers[:uuid]).first
    user.update_attributes(token_created: 20.day.ago);
    render json: {messgae: "Signed out successfully"}
  end

  private
    def authenticate_user
      user = current_user
      if user.nil?
        respond_with json: {messgae: "Token Expired"}, status: :unathorized
      end
      if user.token_expired?
        render json: {messgae: "Token Expired"}, status: :unathorized
      end
    end

    def current_user
      user = User.where(uuid: request.headers["User-Uuid"]).first
      if user.token != request.headers["User-Token"]
        return nil
      end
      user
    end

    def gen_token
      salt = BCrypt::Engine.generate_salt
      BCrypt::Engine.hash_secret(DateTime.now.to_s, salt)
    end
end
