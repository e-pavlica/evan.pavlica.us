# This is a generator for the secrets.rb file required for xicreative.net
# Run me whenever you need to refresh client-side tokens or when you are
# installing a new instance of the app.

require 'digest'

class Secret

  def initialize
    puts 'Welcome, agent zero. Please generate your new secret by entering a passcode:'
    input = gets.chomp
    secret_hash = Digest::SHA1.hexdigest(input)
    if File.write('secrets.rb', "ENV['SECRET'] = '#{secret_hash}'")
      puts 'Thank you. Your secret is safe with me.'
    else
      puts 'I can\'t save your secret now. Please fix me.'
    end
  end
end

Secret.new

