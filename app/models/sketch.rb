class Sketch
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :latitude
  field :longitude
  
  before_save :calculate_center
  after_create :push_create

  embeds_many :points

  validates_length_of :points, :minimum => 2

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

    def push_create
       Pusher['mapsketcher'].trigger('create', self.as_json)
    end
end
