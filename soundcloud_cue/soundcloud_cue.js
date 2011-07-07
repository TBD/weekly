$.cue = {
	db: [],
	pos: 1,
	player: $('div.player'),	
	
	cleanup: function(){
		$("#side-content").remove();
		$("#secondary-content").remove();
		$("#footer").remove();	

		// remove comments
		$("li.timestamped-comment").each(function(x){$(this).remove();});
	},
	
	addMarker: function(number, timestamp){
		var left = $.cue.player.data("scPlayer").$playhead.width();
		$("ol.timestamped-comments").append('<li class="timestamped-comment" data-sc-comment-timestamp="'+timestamp+'" style="left:'+ left +'px;"><div class="marker" style="width: 1px"><a href="#">'+number+'</a></div></li>');		
	},
	
	getTimecode: function(){
		var timecode = 0;
		if ($("div.seekhead div").css("display") === "none")
		{
			timecode = $.helpers.timeToMillis($.cue.player.data('scPlayer').$position.text());
		}	else {
			timecode = $('div.seekhead:first').data("scrubber").position;
		}
		return (timecode);		
	},
	
	seek: function(position){
		$.cue.player.trigger('onSeekClick', position);		
	},
	
	addCue: function(pos){
		var timecode = $.cue.getTimecode();
		if (!$.cue.db[pos]) {
			$.cue.db[pos] = timecode;
			$.cue.addMarker(pos, timecode);
			$.helpers.notice("added cue " + pos + " at "+timecode);
		}
		$.cue.seek($.cue.db[pos]);				
	},
	
	removeCue: function(pos){
	  $('li[data-sc-comment-timestamp=' + $.cue.db[pos] + ']').remove();
	  $.cue.db[pos] = null;
	  $.helpers.notice("removed cue " + pos);		
	},
	
	injectKeyboard: function(){
		$(document).keypress(function() {
			switch(true)
			{
				// --- cue handling 1 - 9
				case (event.which >= 49) && (event.which <= 57):
					$.cue.pos = event.which - 48;
					if (event.ctrlKey) {
							$.cue.removeCue($.cue.pos);
					}	else {
							$.cue.addCue($.cue.pos);
					}
					break;				
				// --- "O" - cue - adjustment	
				case (event.which === 111):
					$.cue.db[$.cue.pos] -= 500;
					$.cue.seek($.cue.db[$.cue.pos]);			
					break;
				// --- "P" - cue + adjustment				
				case (event.which === 112):
					$.cue.db[$.cue.pos] += 500;
					$.cue.seek($.cue.db[$.cue.pos]);			
					break;
				// --- "C" - clear cue list				
				case (event.which === 99):
				  $.cue.db = [];
					$.cue.cleanup();			
					break;
			}
		});			
	},
	
	attachHelp: function() {
		var hlp = "<div>1-6 = play/set cue points<br>CTRL+1-6 = remove cue points<br>O,P = finetune last cue point<br>C = clear cue list</div>";
		$(document.body).append($(hlp).css("font-size","2em").css("text-align","center"));
	},
	
	attachHost: function(){
		if ($("div.player.mode.large").length === 1)
		{
				$.cue.cleanup();
				$.cue.attachHelp();
				$.cue.injectKeyboard();
		} else {
				$.helpers.notice("only 1 track page is supported for now :(")
		}
	}
};

$.cue.attachHost();