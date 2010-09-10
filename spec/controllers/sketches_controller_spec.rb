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

  describe "GET new" do
    it "assigns a new sketch as @sketch" do
      Sketch.stub(:new) { mock_sketch }
      get :new
      assigns(:sketch).should be(mock_sketch)
    end
  end

  describe "GET edit" do
    it "assigns the requested sketch as @sketch" do
      Sketch.stub(:find).with("37") { mock_sketch }
      get :edit, :id => "37"
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

      it "redirects to the created sketch" do
        Sketch.stub(:new) { mock_sketch(:save => true) }
        post :create, :sketch => {}
        response.should redirect_to(sketch_url(mock_sketch))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved sketch as @sketch" do
        Sketch.stub(:new).with({'these' => 'params'}) { mock_sketch(:save => false) }
        post :create, :sketch => {'these' => 'params'}
        assigns(:sketch).should be(mock_sketch)
      end

      it "re-renders the 'new' template" do
        Sketch.stub(:new) { mock_sketch(:save => false) }
        post :create, :sketch => {}
        response.should render_template("new")
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested sketch" do
        Sketch.should_receive(:find).with("37") { mock_sketch }
        mock_sketch.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :sketch => {'these' => 'params'}
      end

      it "assigns the requested sketch as @sketch" do
        Sketch.stub(:find) { mock_sketch(:update_attributes => true) }
        put :update, :id => "1"
        assigns(:sketch).should be(mock_sketch)
      end

      it "redirects to the sketch" do
        Sketch.stub(:find) { mock_sketch(:update_attributes => true) }
        put :update, :id => "1"
        response.should redirect_to(sketch_url(mock_sketch))
      end
    end

    describe "with invalid params" do
      it "assigns the sketch as @sketch" do
        Sketch.stub(:find) { mock_sketch(:update_attributes => false) }
        put :update, :id => "1"
        assigns(:sketch).should be(mock_sketch)
      end

      it "re-renders the 'edit' template" do
        Sketch.stub(:find) { mock_sketch(:update_attributes => false) }
        put :update, :id => "1"
        response.should render_template("edit")
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested sketch" do
      Sketch.should_receive(:find).with("37") { mock_sketch }
      mock_sketch.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the sketches list" do
      Sketch.stub(:find) { mock_sketch }
      delete :destroy, :id => "1"
      response.should redirect_to(sketches_url)
    end
  end

end
