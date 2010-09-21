MapSketcher::Application.routes.draw do
  root :to => 'sketcher#index'
  
  get '/config.js', :to => 'sketcher#app_config', :format => 'js'
  post '/go_to', :to => 'sketcher#go_to'

  resources :sketches
end
