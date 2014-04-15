require 'bundler/setup'

Bundler.require(:default)

require File.dirname(__FILE__) + "/xicreative.rb"

map '/' do
  run KeyMS::App
end

