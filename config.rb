require 'pry'
###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def inline_svg(file)
    File.open("#{root}/source/images/#{file}", 'rb') do |f|
      f.read.chomp
    end
  end

  def page_btn(forward)
    dir_class = forward ? 'next-btn' : 'back-btn'
    return <<~HTML
      <button type="button"
              class="page-btn #{dir_class}"
              title="#{forward ? 'Next' : 'Previous'} Page">
        #{inline_svg('next1.svg')}
      </button>
    HTML
  end
end

# Sprockets
sprockets.append_path("#{root}/source/components")

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify HTML on build
  activate :minify_html

  # Minify Javascript on build
  # activate :minify_javascript
end
