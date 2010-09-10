class Sketch
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :latitude
  field :longitude
  
  before_save :calculate_center
  
  embeds_many :points
  
  protected
    def calculate_center
      
    end
end
