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

  get '/fonts/:file' do
    headers(
      "Access-Control-Allow-Origin" => "*",
      "Requested-File" => params[:file] )
    send_file "fonts/#{params[:file]}"
  end

  # base page for blog (angular index page)
  get '/blog' do
    haml :blog
  end
end
