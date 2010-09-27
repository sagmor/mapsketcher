require 'spec_helper'

describe "Sketches" do
  describe "GET /" do
    it "should render the home screen" do
      get root_path
      response.status.should == 200
    end
  end

  describe "POST /go_to" do
    it "should push a new location" do
      location = { :latitude => 1.0, :longitude => 2.0 }

      Pusher['mapsketcher'].should_receive(:trigger).with('go_to', location)

      post go_to_path, location
      response.status.should == 200
    end
  end

  describe "GET /config.js" do
    it "should render the config script" do
      get '/config.js' 
      response.status.should == 200
    end
  end
end
