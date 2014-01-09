
require 'sinatra'
require 'haml'
  
class Xicreative < Sinatra::Application
  
  get '/' do
    haml :index, :format => :html5
  end
  
  get '/resume' do
    haml :resume, :format => :html5
  end
  
  get '/about' do
    haml :about, :format => :html5
  end
  
end