var json = require('../movies.json');
var express = require('express');
var request = require('request');
var router = new express.Router(); 
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

app.use(bodyParser.json());

router.get('/',  function(req, res){
	res.json(json);
});

router.post('/', function(req, res) {
	 if(req.body.Id && req.body.Title && req.body.Director && req.body. Year && req.body.Rating) {        
	 	json.push(req.body);        
	 	res.json(json);    
	 } else {        
	 	//res.json(500, { error: 'There was an error!' });
	 	res.status(500).json({error: 'There was an error'});    
	 } 
});

router.put('/:Id', function(req, res) {
	//update the item in the collection
	console.log('This route is functioning');
	 if(req.body.Title && req.body.Director && req.body. Year && req.body.Rating) {        
	 	_.each(json, function(elem, index) {            
	 	// find and update:            
	 		if (elem.Id === req.params.Id) {                
	 			elem.Title = req.body.Title;
	 			elem.Director = req.body.Director;                
	 			elem.Year = req.body.Year;                
	 			elem.Rating = req.body.Rating;            
	 		}        
	 	});

	 	    res.json(json); 
	 } else{
	 	res.status(500).json({error: 'There was an error'});
	 }
});

router.delete('/:Id', function(req, res) {
	 var indexToDel = -1;
	 //iterate over json array and hold array index if a match is found     
	 _.each(json, function(elem, index) {        
	 	if (elem.Id === req.params.Id) {            
	 		indexToDel = index;        
	 	}    
	 });    

	 if (~indexToDel) {        
	 	json.splice(indexToDel, 1);    
	 } 

	 res.json(json);

});


//Note the endpoint is our own server/localhost
router.get('/external-api', function(req, res) {
	 request({   
	 	// GET route here returns the movies.json file we created in the root of this project i.e the first GET route we created         
	 	method: 'GET',            
	 	uri: 'http://localhost:' + (process.env.PORT || 3800),        
	 },  function(error, response, body) {            
	 		if (error) { throw error; }

	 		//convert the returned String data to JSON and add it to the movies array that is to be returned
	 		 var movies = [];            
	 		 _.each(JSON.parse(body), function(elem, index) { 
	 		 		// we are interested in the collection containing the Title and Rating only               
	 		 		movies.push({                    
						Title: elem.Title,                    
						Rating: elem.Rating                
					});            
	 		 }); 

	 		  res.json(_.sortBy(movies, 'Rating').reverse());        
	    });
 
});

app.use(router);
module.exports = router;