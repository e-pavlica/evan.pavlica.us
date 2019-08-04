# frozen_string_literal: true

require 'iodine'

module LiveReload
  extend self

  def on_open(client)
    client.subscribe(:live_reload)
    client.write('hello')
    puts 'client subscribed.'
  end

  def on_message(client, message)
    puts "Recieved: #{message}"
    client.write('thanks')
  end

  def ping(*args)
    puts "recieved ping: #{args}"
  end
end

App = proc do |env|
  if env['rack.upgrade?'] == :websocket
    env['rack.upgrade'] = LiveReload
    [0, {}, []]
  else
    ['200', { 'Content-Type' => 'text/html' }, ['A barebones rack app.']]
  end
end

class DummyHandler
  def self.call
    self
  end
end

Iodine.workers = 1
Iodine.listen :service => :http, :public => 'src', :handler => App, :ping => 40
Iodine.threads = 1
Iodine.start
