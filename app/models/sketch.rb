class Sketch
  include Mongoid::Document
  include Mongoid::Timestamps
  
  embeds_many :points
end
