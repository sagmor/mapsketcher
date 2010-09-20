require 'compass'
require 'compass/app_integration/rails'
Compass::AppIntegration::Rails.initialize!

Sass::Plugin.options[:template_location] = { 'app/stylesheets' => 'public/stylesheets' }