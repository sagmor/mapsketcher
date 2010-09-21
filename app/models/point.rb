class Point
  include Mongoid::Document
  
  field :position, :type => Integer
  field :latitude, :type => Float
  field :longitude, :type => Float
  
  embedded_in :sketch, :inverse_of => :points

  def as_json(options = {})
    {
      :position => position.to_i,
      :latitude => latitude.to_f,
      :longitude => longitude.to_f 
    }
  end
end
