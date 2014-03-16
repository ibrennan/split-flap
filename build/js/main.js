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
		speed : 350, // The speed at which the animation takes place
		baseColours : ["#B5787D", "#C2C2A6", "#BDBBDA", "#FDD5B9", "#D7C5B8"],
		templateSplit : "<div></div><div></div>",
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

		setTimeout(function(){

			self.drop($(".flap:first"), self.config.baseColours[0]);

		}, self.config.speed);

		setTimeout(function(){

			self.drop($(".flap:first"), self.config.baseColours[1]);

		}, self.config.speed * 2);

		setTimeout(function(){

			self.drop($(".flap:first"), self.config.baseColours[2]);

		}, self.config.speed * 3);
		

	}, // init

/*

########  ########   #######  ########  
##     ## ##     ## ##     ## ##     ## 
##     ## ##     ## ##     ## ##     ## 
##     ## ########  ##     ## ########  
##     ## ##   ##   ##     ## ##        
##     ## ##    ##  ##     ## ##        
########  ##     ##  #######  ##        

*/

	drop : function($flap, colour){
		var self = this;

		$flap.html(self.config.templateSplit).addClass("animate");
			
		$splitTop = $flap.find("div:first");
			
		$splitBottom = $flap.find("div:last");
		
		
	} // drop

};

application.init();

/*

##     ## ######## ##       ########  ######## ########   ######  
##     ## ##       ##       ##     ## ##       ##     ## ##    ## 
##     ## ##       ##       ##     ## ##       ##     ## ##       
######### ######   ##       ########  ######   ########   ######  
##     ## ##       ##       ##        ##       ##   ##         ## 
##     ## ##       ##       ##        ##       ##    ##  ##    ## 
##     ## ######## ######## ##        ######## ##     ##  ######  

*/

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};