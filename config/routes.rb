Rails.application.routes.draw do
	
  resources :messages
  resources :chat_rooms
  resources :games

  root	'chat_rooms#index'
  get 	'/play', to: 'games#play'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
