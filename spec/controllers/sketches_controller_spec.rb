require 'spec_helper'

describe SketchesController do

  def mock_sketch(stubs={})
    @mock_sketch ||= mock_model(Sketch, stubs).as_null_object
  end

  describe "GET index" do
    it "assigns all sketches as @sketches" do
      Sketch.stub(:all) { [mock_sketch] }
      get :index
      assigns(:sketches).should eq([mock_sketch])
    end
  end

  describe "GET show" do
    it "assigns the requested sketch as @sketch" do
      Sketch.stub(:find).with("37") { mock_sketch }
      get :show, :id => "37"
      assigns(:sketch).should be(mock_sketch)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created sketch as @sketch" do
        Sketch.stub(:new).with({'these' => 'params'}) { mock_sketch(:save => true) }
        post :create, :sketch => {'these' => 'params'}
        assigns(:sketch).should be(mock_sketch)
      end

    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved sketch as @sketch" do
        Sketch.stub(:new).with({'these' => 'params'}) { mock_sketch(:save => false) }
        post :create, :sketch => {'these' => 'params'}
        assigns(:sketch).should be(mock_sketch)
      end

    end

  end

  describe "DELETE destroy" do
    it "destroys the requested sketch" do
      Sketch.should_receive(:find).with("37") { mock_sketch }
      mock_sketch.should_receive(:destroy)
      delete :destroy, :id => "37"
    end
  end

end
