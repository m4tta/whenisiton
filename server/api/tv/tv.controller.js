import _ from 'lodash';
import moment from 'moment';
const tmdb = require('moviedb')(process.env.TMDB_KEY);

exports.getTVById = function (req, res) {
  // TODO: check mongo cache for the show details
  // if they don't exist then do a external api call
  tmdb.tvInfo({id: req.params.id}, function(err, results){
    if (err) return res.status(err.status).json({error: err});
    return res.status(200).json(results);
  });
}

exports.searchTV = function (req, res) {
  // TODO: after i preload my own DB with popular shows switch this from external api call to local db call
  tmdb.searchTv({ query: req.body.query }, (err, results) => {
    if (err) return res.status(err.status).json({error: err});
    return res.status(200).json({results: results});
  });
}

exports.nextEpisode = function (req, res) {
  // expects an show id
  tmdb.tvSeasonInfo({ id: req.params.id, season_number: req.params.season }, (err, results) => {
    if (err) return res.status(err.status).json({error: err});
    const indexOfEpisode = _.findIndex(results.episodes, function (episode) {
      const airDate = moment(episode.air_date);
      return airDate.isSameOrAfter(moment(), 'day');
    });
    res.status(200).json({results: results.episodes[indexOfEpisode]});
  });
}
