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

		// The speed at which the animation takes place
		speed : 250,

		// The number of flaps to display on the screen
		flaps : 30,

		// These colours are flipped through before the final one is shown
		baseColours : [ 
			"#B5787D",
			"#C2C2A6",
			"#BDBBDA",
			"#FDD5B9",
			"#D7C5B8",
			"#B5787D"
		]

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

		self.animateSplit($(".flap:first"), "orange");

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
		var self = this,
			template = Handlebars.compile($("#flap").html());

		for(var i = 0; i < self.config.flaps; i++) {

			var html = template({
				colour: self.config.baseColours[Math.floor(Math.random() * self.config.baseColours.length)]
			});

	        $(".container").append(html);

	    };

	}, // buildFlaps

/*

   ###    ##    ## #### ##     ##    ###    ######## ######## 
  ## ##   ###   ##  ##  ###   ###   ## ##      ##    ##       
 ##   ##  ####  ##  ##  #### ####  ##   ##     ##    ##       
##     ## ## ## ##  ##  ## ### ## ##     ##    ##    ######   
######### ##  ####  ##  ##     ## #########    ##    ##       
##     ## ##   ###  ##  ##     ## ##     ##    ##    ##       
##     ## ##    ## #### ##     ## ##     ##    ##    ######## 
 ######  ########  ##       #### ########                     
##    ## ##     ## ##        ##     ##                        
##       ##     ## ##        ##     ##                        
 ######  ########  ##        ##     ##                        
      ## ##        ##        ##     ##                        
##    ## ##        ##        ##     ##                        
 ######  ##        ######## ####    ##                        

*/

	animateSplit : function($flap, colour){
		var self = this,
			template = Handlebars.compile($("#split").html()),
			colours = self.config.baseColours,
			z = 99;

		var html = template({
			colours: colours,
			last: $flap.css("backgroundColor"),
			first: colour
		});

        $flap.append(html).css("background");

    	var $splits = $($flap.find(".split").get().reverse());

		$splits.each(function(key, value){
			var $split = $(this);

			setTimeout(function(){

				$split.next().removeClass("animate").addClass("complete");

				if(key + 1 !== $splits.length){

					$split.addClass("animate").css("z-index", z + key);

				}

				setTimeout(function(){

					$split.css("backgroundColor", $split.prev().css("backgroundColor"));

				}, self.config.speed / 2);

				if(key === $splits.length - 2){
					// Finished

					setTimeout(function(){

						$splits.remove();

					}, self.config.speed * 3);

					var random = Math.round(Math.random()*self.config.flaps);

					self.animateSplit($(".flap").eq(random), "green");

				};

			}, self.config.speed * key);

		});

		setTimeout(function(){

			$flap.css("background", colour);

		}, self.config.speed);

	} // animateSplit

};

application.init();