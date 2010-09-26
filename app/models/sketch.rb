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
      # This is ineficient but works for now.
      :points => points.sort_by(&:position),
      :created_at => created_at
    }
  end
  
  protected
    def calculate_center
      return if points.length.zero?
      
      self.latitude = points.collect(&:latitude).sum / points.length
      self.longitude = points.collect(&:longitude).sum / points.length
    end
end
