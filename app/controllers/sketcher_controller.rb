class SketcherController < ApplicationController
  def index
    
  end
  
  def app_config
    
  end
  
  def go_to
    Pusher['mapsketcher'].trigger('go_to', {
      :latitude => params[:latitude], 
      :longitude => params[:longitude]
    })
    
    render :status => 200, :text => ''
  end
end
