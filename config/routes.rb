MapSketcher::Application.routes.draw do
  root :to => 'sketcher#index'
  resources :sketches
end
