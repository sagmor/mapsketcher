class Sketch
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :latitude
  field :longitude
  
  before_save :calculate_center
  
  embeds_many :points

  def as_json(options = {})
    {
      :id => id,
      :latitude => latitude,
      :longitude => longitude,
      :points => points.ordered
    }
  end
  
  protected
    def calculate_center
      return if points.length.zero?
      
      self.latitude = points.collect(&:latitude).sum / points.length
      self.longitude = points.collect(&:longitude).sum / points.length
    end
end
