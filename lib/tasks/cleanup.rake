namespace :db do
  desc "Cleans the database"
  task :cleanup => [:environment] do
    Mongoid.master.collections.select do |collection|
      collection.name !~ /system/
    end.each(&:drop)
  end
end
