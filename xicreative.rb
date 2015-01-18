module KeyMS
  ##########################
  # Define the data models #
  ##########################
  Dir.glob(File.dirname(__FILE__) + '/models/*.rb') { |file| require file }

  # TODO: add assets (paperclip??) for posts

  # TODO: implement a minify scheme like this: https://github.com/sinefunc/sinatra-minify

  ####################################
  # Define the main KeyMS process   #
  ####################################

  class App < Sinatra::Application
    register Sinatra::Contrib
    register Sinatra::Subdomain
    register Sinatra::CrossOrigin
    register Sinatra::Partial

    ##### application configuration #####
    require(File.dirname(__FILE__) + '/secrets')
    set :root, File.dirname(__FILE__)
    set :haml, { :format => :html5, :ugly => true }
    Mongoid.load!(File.dirname(__FILE__) + '/mongoid.yml')
    # set :stylus, {:compress => true} # gzip compression

    configure do
      enable :logging, :dump_errors, :cross_origin #:sessions
      set :allow_origin, :any # TODO: lock this down before deploy
      set :allow_credentials, true
      set :allow_methods, [:get, :post, :put]
    end

    require 'jsonify'
    require 'jsonify/tilt'
    helpers do
      def jsonify(*args)
        render(:jsonify, *args)
      end
    end

    ##### Routes #####
    Dir.glob(File.dirname(__FILE__) + '/routes/*.rb') { |file| require file }
  end
end
