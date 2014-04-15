class KeyMS::App < Sinatra::Application
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

  # base page for blog (angular index page)
  get '/blog' do
    haml :blog
  end
end