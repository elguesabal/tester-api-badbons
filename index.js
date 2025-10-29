const axios = require("axios");

module.exports.api = axios.create({
	baseURL: "http://localhost:3000",
	// baseURL: "https://api-teste-app-badbons.vercel.app",
	// baseURL: "https://api-badbons-app.onrender.com",
	timeout: 10000,
	validateStatus: () => true
});