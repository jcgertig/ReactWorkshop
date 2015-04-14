class AmazonApiController < ApplicationController
  respond_to :json

  def item_search
    api_request = Vacuum.new

    api_request.configure(
      aws_access_key_id: ENV["AWS_KEY"],
      aws_secret_access_key: ENV["AWS_SECRET"],
      associate_tag: ENV["AWS_ASSOCIATE_TAG"]
    )

    results = api_request.item_search(
      query: {
        'Keywords' => params[:keywords]
      }
    )

    binding.pry
    respond_with results.as_json
  end

end
