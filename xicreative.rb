module SERVER

  ##########################
  # Define the data models #
  ##########################
  Dir.glob(File.dirname(__FILE__) + '/models/*.rb') { |file| require file}

  # TODO: add assets (paperclip??) for posts


  ####################################
  # Define the main server process   #
  ####################################

  class Main < Sinatra::Base
    register Sinatra::Contrib
    register Sinatra::Subdomain

    ##### application configuration #####
    set :root, File.dirname(__FILE__)
    set :haml, :format => :html5
    Mongoid.load!(File.dirname(__FILE__) + '/mongoid.yml')
    configure :development do
      enable :sessions, :logging, :dump_errors
    end

    ##### Helpers #####
    current_time = lambda { Time.now }


    ###### Static Pages ######
    before do
      content_type :html
    end

    get '/' do
      haml :index
    end

    get '/resume' do
      haml :resume
    end

    get '/about' do
      haml :about
    end

    get '/blog' do
      # base page for blog this portion is a SPA
      haml :blog
    end

    ### These will be the template partials for the angular.js portion of the site
    get '/templates/:name' do
      haml "/blog_templates/#{params[:name]}".to_sym, :format => :html5
    end

    ### Stylus templates for styling ###
    get '/css/:name' do
      stylus "../stylus/#{params[:name]}".to_sym
    end


    #### API calls for front-end MVVC ####
    subdomain :api do
      respond_to :html, :json

      ## CRUD for blog posts ##
      get '/posts.?:format?' do
        content_type :json
        @posts = Post.where(published:true)
        @posts.to_json
      end

      post '/posts.?:format?' do
        content_type :json
        if !session[:user] || session[:user] == ''
          halt 401, {error:'Login required'}.to_json
        else 
          @user = User.find(session[:user])
          @post = Post.new(params) #TODO: Add strong params for posts
          @post.user = @user
          @post.created = current_time.call
          if @post.save
            halt 201, @post.to_json
          else
            halt 500
          end
        end
      end

      get '/posts/:id.?:format?' do
        content_type :json
        @post = Post.find(params[:id])

        if @post
          @post.to_json
        else
          halt 404
        end
      end

      put '/posts/:id.?:format?' do
        content_type :json
        @post = Post.find(params[:id])
        if (!session[:user] || session[:user] == '')
          halt 401, {error:'Login required'}.to_json
        elsif @post.user != session[:user]
          halt 401, {error:'You don\'t have permission to edit this post'}.to_json
        else
          if @post.update(params)
            halt 201, @post
          else
            halt 500, @post.errors.messages
          end
        end
      end

      ###### Users Controller ######
      post '/users.?:format?' do # create a new user
        content_type :json
        @user = User.new(params)
        if @user.save
          halt 201, @user.id.to_json
        else
          halt 500, @user.errors.messages.to_json
        end
      end

      post '/login.?:format?' do #authenticate user
        content_type :json
        if @user = User.find_by(email: params[:email])
          # binding.pry

          if @user.authenticate(params[:password])
            session[:user] = @user
            @user.id.to_json
          else
            halt 500, "Invalid Password.".to_json
          end
        end
      end

      post '/logout.?:format?' do
        content_type :json
        session[:user] = ''
      end

      # TODO: password reset

    end # subdomain :api

  end


end