class Point
  include Mongoid::Document
  
  field :position, :type => Integer
  field :latitude, :type => Float
  field :longitude, :type => Float
  
  embedded_in :sketch, :inverse_of => :points
  
  default_scope, order_by([:position, :asc])
end
