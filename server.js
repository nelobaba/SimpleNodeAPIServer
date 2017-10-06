var express = require('express'),    
	bodyParser = require('body-parser'),    
	_ = require('underscore'),
	request = require('request'),   
	json = require('./movies.json'),
	index = require('./controller/index'),    
	app = express();

	var router = new express.Router();

	app.set('port', process.env.PORT || 3800);

app.use(bodyParser.urlencoded({ extended: false})); 
app.use(bodyParser.json());
app.use(router);
app.use('/', index);
app.use('/:Id', index);
app.use('/external-api', index);


 

// TO DO: Setup endpoints ... app.use('/', router);
/*
router.get('/test', function(req, res) {    
	var data = {        
		name: 'Jason Krol',        
		website: 'http://kroltech.com'    
	};

    res.json(data); 
});

router.get('/', function(req, res) {    
	res.json(json); 
});
*/


var server = app.listen(app.get('port'), function() {    
	console.log('Server up: http://localhost:' + app.get('port')); 
});