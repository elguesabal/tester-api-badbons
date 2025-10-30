const axios = require("axios");
require("dotenv").config({ quiet: true });

module.exports.api = axios.create({
	baseURL: process.env.URL,
	timeout: 10000,
	validateStatus: () => true
});