'use strict';

const Hapi = require('hapi');

const routes = require('./routes/index');

const server = new Hapi.Server();

server.connection({ port: 3000 });
server.route(routes);

server.start(err => {

	if (err) {
		throw err;
	}

});
