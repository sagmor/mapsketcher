Factory.sequence :position do |n| n; end
Factory.sequence :location do |n| n.to_f; end

Factory.define :point, :default_strategy => :build do |p|
  p.position Factory.next(:position)
  p.latitude Factory.next(:location)
  p.longitude Factory.next(:location)
end

Factory.define :sketch, :default_strategy => :build do |s|
  s.points [Factory(:point), Factory(:point)]
end
