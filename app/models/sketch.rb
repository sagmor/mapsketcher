class Sketch
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :latitude
  field :longitude
  field :address
  field :deleted_at
  
  before_save :calculate_center
  before_save :get_address
  after_create :push_create

  embeds_many :points

  scope :active, where(:deleted_at => nil)
  scope :deleted, excludes(:deleted_at => nil)

  validates_length_of :points, :minimum => 2, :if => :active?

  def delete!
    self.deleted_at = Time.now
    self.points = []
    self.save
    self.push_delete
  end

  def active?
    !deleted_at
  end

  def as_json(options = {})
    if active?
      {
        :id => id,
        :latitude => latitude,
        :longitude => longitude,
        # This is ineficient but works for now.
        :points => points.sort_by(&:position),
        :created_at => created_at,
        :address => address
      }
    else
      {
        :id => id,
        :deleted_at => deleted_at
      }
    end
  end
  
  protected
    def calculate_center
      return if points.length.zero?
      
      self.latitude = points.collect(&:latitude).sum / points.length
      self.longitude = points.collect(&:longitude).sum / points.length
    end

    def get_address
      url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=#{latitude},#{longitude}&sensor=false"
      r = JSON.parse(Net::HTTP.get(URI.parse(url)))

      self.address = r['results'][0]['formatted_address']
    rescue
      # just don't scale the error.
    end

    def push_create
       Pusher['mapsketcher'].trigger('create', self.as_json)
    end

    def push_delete
       Pusher['mapsketcher'].trigger('delete', self.id)
    end
end
