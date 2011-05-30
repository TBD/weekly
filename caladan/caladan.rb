require 'rubygems'
require 'ruby-tmdb'

# setup your API key - get one from http://www.themoviedb.org/account/signup and create a _config.txt file with the key
Tmdb.api_key = begin File.read("_config.txt")

def get_movie(movie_name)
  movie_data = {}  
  begin
    item = TmdbMovie.find(:title => movie_name.gsub("[HD]","").strip, :limit => 1)     
    movie_data["name"]   = item.name
    movie_data["rating"] = item.rating
    movie_data["genres"] = item.genres.map{|x| x.name}
    movie_data["poster"] = item.posters[3].url
    movie_data["actors"] = item.cast.find_all{|x| x.department=="Actors"}[0..2].map{|x| x.name}  
    movie_data["release"] = item.released[0..3]
    movie_data["HD"] = true if movie_name.index("HD")
  rescue
    movie_data["name"] = movie_name
    movie_data["error"] = "failed"
  end
  movie_data
end

all_movies = []                  

movies_to_parse = File.open("./caladan movie list.txt").readlines
movies_to_parse_length = movies_to_parse.length
                              
movies_to_parse.each_index do |i|            
  puts "%s / %s - %s" % [i,movies_to_parse_length,movies_to_parse[i]]
  all_movies.push get_movie(movies_to_parse[i])
end

File.open("./caladan_json.txt","w+") do |f|
  f.write "parse_json("
  f.write all_movies.to_json
  f.write ")"
end