/*
 http://example.com:8080/jira/rest/api/2/search [GET, POST]
*/

var querystring = require('querystring');


module.exports = function(connect) {

	return {

		search : function(query, callback) {
			if(query && callback) {
				connect._get('search', query, callback);
			} else {
				console.log('not args');
			}
		}

	}

};