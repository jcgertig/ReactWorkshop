class WalmartApiController < ApplicationController
  respond_to :json

  def item_search
    require "walmart_open"

    client = WalmartOpen::Client.new do |config|
      config.product_api_key = ENV["WALMART_KEY"]
      config.product_calls_per_second = 5

      # Set this to true for development mode.
      config.debug = true
    end

    options = { numItems: 25, start: 1}
    if params["page"] && params["page"].to_i > 0
      options[:start] = 1 + (25 * (params["page"].to_i - 1))
    end

    result = client.search(params["query"], options)

    respond_with result.items.as_json(
      only: [
        "id",
        "name",
        "price",
        "upc",
        "category_node",
        "short_description",
        "long_description",
        "ship_rate",
        "model_number",
        "url",
        "available_online",
        "thumbnail_image"
      ]
    )

  end
end
