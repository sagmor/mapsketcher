require 'spec_helper'

describe Sketch do
  before(:each) do
    @sketch = Factory(:sketch)
  end

  it "should have at least 2 points" do
    @sketch.points = [Factory.build(:point)]
    @sketch.should_not be_valid
  end

  it "Should notify it's creation" do
    Pusher['mapsketcher'].should_receive(:trigger).with('create', anything)
    @sketch.save!
  end
end
