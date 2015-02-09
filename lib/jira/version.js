/*
 http://example.com:8080/jira/rest/api/2/version [POST]
 http://example.com:8080/jira/rest/api/2/version/{id}/move [POST]
 http://example.com:8080/jira/rest/api/2/version/{id} [DELETE, GET, PUT]
 http://example.com:8080/jira/rest/api/2/version/{id}/relatedIssueCounts [GET]
 + http://example.com:8080/jira/rest/api/2/version/{id}/unresolvedIssueCount [GET]
 http://example.com:8080/jira/rest/api/2/version/{versionId}/remotelink [GET, POST, DELETE]
 http://example.com:8080/jira/rest/api/2/version/{versionId}/remotelink/{globalId} [GET, POST, DELETE]
 http://example.com:8080/jira/rest/api/2/version/remotelink [GET]
*/

module.exports = function(connect) {

	return {

		unresolvedIssueCount : function(id, callback) {
			if(id && callback) {
				connect._get(['version', id, 'unresolvedIssueCount'].join('/'), null, callback);
			}
		}

	};

};