class SketchesController < ApplicationController
  respond_to :json
  
  # GET /sketches(.:format)
  def index
    @sketches = Sketch.active
    respond_with @sketches
  end

  # GET /sketches/:id(.:format)
  def show
    @sketch = Sketch.find(params[:id])
    respond_with @sketch
  end

  # POST /sketches(.:format)
  def create
    @sketch = Sketch.create(params[:sketch])
    
    respond_with @sketch
  end

  # DELETE /sketches/:id(.:format)
  def destroy
    @sketch = Sketch.find(params[:id])
    @sketch.delete!

    respond_with @sketch.id
  end
end
