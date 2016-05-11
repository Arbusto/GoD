'use strict';

module.exports = function(app, mongoose){

	var configSchema = mongoose.Schema({
		neededRounds: Number,
		moves: Object
	});

	var config = mongoose.model('config', configSchema);
	var original = mongoose.model('original', configSchema);

	app.get('/api/getConfig', function(req, res) {
		config.find({}, function (err, config) {
			if(err){
				res.status(500).send(err);
			}
			res.json(config);
		});
	});

	app.get('/api/getOriginalConfig', function(req, res) {
		original.find({}, function (err, originalConfig) {
			if(err){
				res.status(500).send(err);
			}
			res.json(originalConfig);
		});
	});

	app.post('/api/updateConfig', function(req, res) {
		var configuration = req.body;
		config.findOneAndUpdate({'neededRounds': 3}, configuration, function(err, updatedConfig){
			if (err){
            	res.status(500).send(err);
			} else{
                res.json(updatedConfig);
			}
		});
	});

	// app.post('/api/saveScpre', function(req, res) {
	// 	var ScoreToSave = req.body;
	//
	// 	var newScore = new Score(ScoreToSave); //Need to define Schema
	//
	// 	newScore.save(function(err, newScore){
	// 		if (err){
	//			res.status(500).send(err);
	// 		} else{
	// 			res.json(newCandidate);
	// 		}
	// 	});
	// });
};
