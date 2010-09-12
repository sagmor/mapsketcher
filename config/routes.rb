MapSketcher::Application.routes.draw do
  root :to => 'sketcher#index'
  get '/config.js', :to => 'sketcher#app_config', :format => 'js'
  resources :sketches
end
