function filter(elem){
  var filtercode = elem.id;
  var items = $(".alert"+filtercode);
  if ($(items[0]).css('display') == 'none')
  {
    $(elem).removeClass("tbddisabled");
    items.show();
  }
  else
  {
    $(elem).addClass("tbddisabled");
    items.hide();
  }
}

buttons = [
  {text:"issues", filter:"[class*='issues']"},
  {text:"follow", filter:".follow"},
  {text:"push",   filter:".push"},
  {text:"watch",  filter:".watch_started"},
  {text:"create", filter:".create"},  
];

var nav = document.createElement("div");
nav.className = "tbdnav";

$.each(buttons, function(index, obj) {
  var item = document.createElement("button");
  item.className = "tbdfilter";
  item.innerHTML = obj.text;
  item.id = obj.filter;
  item.onclick = function(){filter(this);};
  nav.appendChild(item);
}); 

$('<style type="text/css"></style>').html("\
.tbdfilter {margin: 0.5em;border:1px solid #aaa;border-radius:5px;padding: 0.3em 0.8em 0.3em 0.8em;cursor:hand;background:#ddd;}\
.tbddisabled {text-decoration: line-through;}\
.tbdnav{margin: 0 0 0.5em 0;}").appendTo("head");
$(".news").prepend(nav);