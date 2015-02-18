require 'jsonify'
require 'jsonify/tilt'
helpers do
  def inject(file)
    File.read  
  end

  def jsonify(*args)
    render(:jsonify, *args)
  end
end
