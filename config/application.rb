require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "action_controller/railtie"
require "active_resource/railtie"

# Loads local settings in the environment 
envfile = File.expand_path('../config.yml', __FILE__)
ENV.replace( YAML.load_file(envfile).merge(ENV) ) if File.exist?(envfile)

# If you have a Gemfile, require the gems listed there, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env) if defined?(Bundler)

module MapSketcher
  class Application < Rails::Application
    # config.i18n.default_locale = :es

    # JavaScript files you want as :defaults (application.js is always included).
    config.action_view.javascript_expansions[:defaults] = %w( jquery rails )

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]
    
    # Configure generators values.
    config.generators do |g|
       g.template_engine :haml
       g.test_framework  :rspec, :fixture => false
       g.fixture_replacement :factory_girl, :dir => "spec/factories"
    end
  end
end
