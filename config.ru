require 'bundler/setup'

Bundler.require(:default)

require File.dirname(__FILE__) + "/xicreative.rb"

map '/' do
  use Rack::Deflater
  run KeyMS::App
end

