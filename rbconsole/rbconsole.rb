require "rubygems"   
require "sinatra"

get "/" do                                            
  erb :index
end

@@cmd = {
  "env" => "self.env.sort.join(' ')",
  "ip" => "self.env['HTTP_X_REAL_IP']",
  "t" => "Time.now",
  "help" => "@@cmd.map {|k,v| ('%s = %s<' + 'br>') % [k,v]}",
  "clear" => "clear output"
}
                                      
def myalias(text)
  return @@cmd[text] if @@cmd[text]
  return text       
end                                   
                                   
post "/process" do
  begin
    output = eval(myalias(params[:text])).to_s
  rescue => e
    output = e.inspect.gsub("<","").gsub(">","") #ugly
  end
  output = output.gsub("<","").gsub(">","") if output.scan(/^#<.*/).length != 0
  return output.to_s
end