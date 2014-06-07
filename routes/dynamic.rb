class KeyMS::App < Sinatra::Application
  require 'stylus'
  Stylus.compress = true

  ### These will be the template partials for the angular.js portion of the site
  get '/templates/:name.:format?' do
    haml "/blog_templates/#{params[:name]}".to_sym, :format => :html5
  end

  ### Stylus templates for styling ###
  get '/css/:name.:format?' do
    content_type :css
    stylus "../stylus/#{params[:name]}".to_sym
  end

  ### Stylus templates for styling ###
  get '/scripts/:name.:format?' do
    content_type :js
    coffee "../coffee/#{params[:name]}".to_sym
  end
end
