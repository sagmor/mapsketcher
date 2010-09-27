require 'spec_helper'

describe Point do
  before(:each) do
    @point = Factory(:point)
  end

  it "should be valid" do
    @point.should be_valid
  end

  it "should have a position" do
    @point.position = nil
    @point.should_not be_valid
  end

  it "should have a latitude" do
    @point.latitude = nil
    @point.should_not be_valid
  end

  it "should have a longitude" do
    @point.longitude = nil
    @point.should_not be_valid
  end

end
