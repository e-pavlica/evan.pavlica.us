class KeyMS::App < Sinatra::Application

  #### API calls for front-end MVVC ####
  subdomain :api do
    respond_to :html, :json

    options '/posts.?:format?' do
      cross_origin :allow_credentials => true,
        :allow_methods => [:get, :post]
    end

    ## CRUD for blog posts ##

    # return all blog posts that are published
    get '/posts.?:format?' do
      content_type :json
      @posts = Post.where(published: true)
      jsonify :posts
    end

    # create new blog post
    post '/posts.?:format?' do
      content_type :json
      @user = User.check_token(request)
      payload = JSON.parse(request.body.read)
      if @user
        @post = Post.new(payload) # TODO: Add strong params for posts
        @post.user = @user
        if @post.save
          halt 201, @post.to_json
        else
          halt 500
        end
      else 
        halt 401, { error: 'Login required' }.to_json
      end
    end

    options '/posts/:id.?:format?' do
      cross_origin :allow_credentials => true,
        :allow_methods => [:get, :put]
    end

    get '/posts/:id.?:format?' do
      content_type :json
      @post = Post.find(params[:id])
      if @post
        @post.to_json
      else
        halt 404, { error: 'Not found.' }.to_json
      end
    end

    put '/posts/:id.?:format?' do
      content_type :json
      @post = Post.find(params[:id])
      if !@user = User.check_token(request)
        halt 401, { error: 'Login required.'}.to_json
      elsif @post.user != @user
        halt 401, {error:'You don\'t have permission to edit this post'}.to_json
      else
        payload = JSON.parse(request.body.read)
        if @post.update(payload)
          halt 201, @post
        else
          halt 500, @post.errors.messages
        end
      end
    end

    ###### Users Controller ######
    options '/users.?:format?' do
      cross_origin :allow_methods => [:post]
    end

    post '/users.?:format?' do # create a new user
      content_type :json
      @user = User.new(params)
      if @user.save
        halt 201, @user.id.to_json # TODO: generate a token 
      else
        halt 500, @user.errors.messages.to_json
      end
    end

    options '/login.?:format?' do
      cross_origin :allow_methods => [:post]
    end

    post '/login.?:format?' do #authenticate user
      content_type :json
      payload = JSON.parse(request.body.read)
      puts payload.inspect
      if @user = User.find_by(email: payload['email'])

        if @user.authenticate(payload['password'])
          @user.create_token
        else
          halt 401, {error:"Invalid Password."}.to_json
        end
      end
    end

    post '/logout.?:format?' do
      content_type :json
      # TODO: delete the token (from the front end???)
    end

    # TODO: password reset

  end # subdomain :api

end
