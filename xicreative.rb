require 'sinatra'
require 'haml'


get '/' do 
  haml :index, :format => :html5
end

get '/resume' do
  haml :resume, :format => :html5
end
