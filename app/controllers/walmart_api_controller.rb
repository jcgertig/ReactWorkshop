class WalmartApiController < ApplicationController
  respond_to :json

  def item_search
    require "walmart_open"

    client = WalmartOpen::Client.new do |config|
      ## Product API
      config.product_api_key = ENV["WALMART_KEY"]

      # This value defaults to 5.
      config.product_calls_per_second = 4

      # Set this to true for development mode.
      config.debug = true
    end

    result = client.search(params["query"])

    # binding.pry
    respond_with result.as_json
  end
end
