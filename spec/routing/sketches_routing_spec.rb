require "spec_helper"

describe SketchesController do
  describe "routing" do

    it "recognizes and generates #index" do
      { :get => "/sketches" }.should route_to(:controller => "sketches", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/sketches/new" }.should route_to(:controller => "sketches", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/sketches/1" }.should route_to(:controller => "sketches", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/sketches/1/edit" }.should route_to(:controller => "sketches", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/sketches" }.should route_to(:controller => "sketches", :action => "create")
    end

    it "recognizes and generates #update" do
      { :put => "/sketches/1" }.should route_to(:controller => "sketches", :action => "update", :id => "1")
    end

    it "recognizes and generates #destroy" do
      { :delete => "/sketches/1" }.should route_to(:controller => "sketches", :action => "destroy", :id => "1")
    end

  end
end
