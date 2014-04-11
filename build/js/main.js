var application = {

/*

 ######   #######  ##    ## ######## ####  ######   
##    ## ##     ## ###   ## ##        ##  ##    ##  
##       ##     ## ####  ## ##        ##  ##        
##       ##     ## ## ## ## ######    ##  ##   #### 
##       ##     ## ##  #### ##        ##  ##    ##  
##    ## ##     ## ##   ### ##        ##  ##    ##  
 ######   #######  ##    ## ##       ####  ######   

*/

	config : {

		animationTime : 0, // This is calculated and set within buildFlaps()
		flapsTotal : 300

	}, // config

/*

#### ##    ## #### ######## 
 ##  ###   ##  ##     ##    
 ##  ####  ##  ##     ##    
 ##  ## ## ##  ##     ##    
 ##  ##  ####  ##     ##    
 ##  ##   ###  ##     ##    
#### ##    ## ####    ##    

*/

	init : function(){
		var self = this;

		self.buildFlaps();

	}, // init

/*

########  ##     ## #### ##       ########     
##     ## ##     ##  ##  ##       ##     ##    
##     ## ##     ##  ##  ##       ##     ##    
########  ##     ##  ##  ##       ##     ##    
##     ## ##     ##  ##  ##       ##     ##    
##     ## ##     ##  ##  ##       ##     ##    
########   #######  #### ######## ########     
######## ##          ###    ########   ######  
##       ##         ## ##   ##     ## ##    ## 
##       ##        ##   ##  ##     ## ##       
######   ##       ##     ## ########   ######  
##       ##       ######### ##              ## 
##       ##       ##     ## ##        ##    ## 
##       ######## ##     ## ##         ######  

*/

	buildFlaps : function(){
		var self = this;

		for (var i = 0; i < self.config.flapsTotal; i++) {
			
			var source = $("#flap").html(),
				template = Handlebars.compile(source),
				html = template({
					colour : "#b9b9b9"
				});

			$(".container").append(html);

		};

		self.config.animationTime = parseFloat(window.getComputedStyle(document.querySelector('.flap'), ':after').getPropertyValue('content').replace(/["']/g, "")) * 1000;

		self.switch($(".flap").eq(Math.round(Math.random()*self.config.flapsTotal)), self.randomColour());
		

	}, // buildFlaps


/*

 ######  ##      ## #### ########  ######  ##     ## 
##    ## ##  ##  ##  ##     ##    ##    ## ##     ## 
##       ##  ##  ##  ##     ##    ##       ##     ## 
 ######  ##  ##  ##  ##     ##    ##       ######### 
      ## ##  ##  ##  ##     ##    ##       ##     ## 
##    ## ##  ##  ##  ##     ##    ##    ## ##     ## 
 ######   ###  ###  ####    ##     ######  ##     ## 

*/

	switch : function($element, colour){
		var self = this;

		console.log(colour, $element);

		// Reset the element before we do anything
		if($element.hasClass("complete")){

			$element.find(".top.original, .bottom").css("background",$element.find(".top.next").css("backgroundColor"));

		};

		$element.css("background", colour).find(".top.next").css("background", colour);

		$element.addClass("trigger");

		$element.find(".top.original").bind("transitionend", function(){

			$element.find(".split").hide();

			setTimeout(function(){

				$element.find(".split").show();

			}, self.config.animationTime * 0.1);

			setTimeout(function(){

				$element.find(".top.next").addClass("bounce");

				setTimeout(function(){

					$element.removeClass("trigger").addClass("complete");

				}, self.config.animationTime * 0.2);

				var next = Math.round(Math.random()*self.config.flapsTotal);

				self.switch($(".flap").eq(next), self.randomColour());

			}, self.config.animationTime * 0.8);

		});

	}, // switch

/*

########     ###    ##    ## ########   #######  ##     ## 
##     ##   ## ##   ###   ## ##     ## ##     ## ###   ### 
##     ##  ##   ##  ####  ## ##     ## ##     ## #### #### 
########  ##     ## ## ## ## ##     ## ##     ## ## ### ## 
##   ##   ######### ##  #### ##     ## ##     ## ##     ## 
##    ##  ##     ## ##   ### ##     ## ##     ## ##     ## 
##     ## ##     ## ##    ## ########   #######  ##     ## 
 ######   #######  ##        #######  ##     ## ########   
##    ## ##     ## ##       ##     ## ##     ## ##     ##  
##       ##     ## ##       ##     ## ##     ## ##     ##  
##       ##     ## ##       ##     ## ##     ## ########   
##       ##     ## ##       ##     ## ##     ## ##   ##    
##    ## ##     ## ##       ##     ## ##     ## ##    ##   
 ######   #######  ########  #######   #######  ##     ##  

*/

	randomColour : function(){
		// Returns a random hex colour value

		return '#'+Math.floor(Math.random()*16777215).toString(16);

	} // randomColour

};

application.init();