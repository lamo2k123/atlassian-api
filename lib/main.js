var querystring = require('querystring');

var Atlassian = {
	init : function(type, options) {
		this.options = options;
		this.http = require(this.options.protocol || 'http');

		switch(type) {
			case 'jira' :
				this.systemPath = '/jira/rest/api/' + this.options.api || 2;
				break;
		}

		return this;
	},

	_request : function(method, path, data, callback) {
		var params = {
			hostname: this.options.host,
			port    : this.options.port,
			method  : method || 'GET',
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		if(method === 'GET') {
			if(data) {
				path = [path, querystring.stringify(data)].join('?');
			}

		}

		if(this.systemPath) {
			params.path = [this.systemPath, path].join('/');
		}

		if(this.options.user && this.options.password) {
			params.auth = [this.options.user, this.options.password].join(':');
		}

		var req = this.http.request(params, function(res) {
			var data = [];

			if(res.statusCode !== 200) {
				console.log('HEADERS: ' + JSON.stringify(res.headers));
			}

			res.on('data', function(chunk) {
				data.push(chunk);
			});

			res.on('end', function() {
				var result = null;

				try {
					result = JSON.parse(data.join(''));
				} catch(e) {
					result = data.join('');
				}

				callback && callback(result);
			});

		});

		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		req.end();
	},

	_get : function(path, data, callback) {
		this._request('GET', path, data, callback);
	},

	_post : function(path, data, callback) {
		this._request('POST', path, data, callback);
	}

}

module.exports = function(type, options) {
	var connect = Atlassian.init(type, options);

	return {
		jira : {
			project : require('./jira/project')(connect),
			version : require('./jira/version')(connect),
			search : require('./jira/search')(connect)
		}
	};

};