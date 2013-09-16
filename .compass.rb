http_images_path= '../images'
generated_images_dir = ".tmp/images"
http_generated_images_path = "../images/"
asset_cache_buster :none

on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.mv filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end
