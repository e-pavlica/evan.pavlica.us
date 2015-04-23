KeyMS::App.class_eval do
  require 'jsonify'
  require 'jsonify/tilt'
  require 'pry'
  helpers do
    def inject(file)
      File.read(self.settings.root + file)
    end

    def jsonify(*args)
      render(:jsonify, *args)
    end
  end
end
