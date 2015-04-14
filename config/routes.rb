Rails.application.routes.draw do
  devise_for :users
  get 'pages/index'

  scope :api do
    scope :v1 do
      get '/auth/sign_in', to: 'token_api#sign_in'
      get '/auth/sign_out', to: 'token_api#sign_out'
      get '/amazon/search', to: 'amazon_api#item_search'
      get '/walmart/search', to: 'walmart_api#item_search'
    end
  end

  get '*any', to: 'pages#not_found'
  root 'pages#index'
end
