/*
 http://example.com:8080/jira/rest/api/2/project [GET]
 + http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey} [GET]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/avatar [POST, PUT]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/avatar/{id} [DELETE]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/avatar/temporary [POST, POST]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/avatars [GET]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/components [GET]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/statuses [GET]
 http://example.com:8080/jira/rest/api/2/project/{projectIdOrKey}/versions [GET]
*/
module.exports = function(connect) {

	return {

		project : function(projectIdOrKey, callback) {
			if(projectIdOrKey && callback) {
				connect._get(['project', projectIdOrKey].join('/'), callback);
			} else {
				console.log('not args');
			}
		}

	}

};