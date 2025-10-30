const { api } = require("../../index.js");

describe("GET /ping", () => {
	test("Retorna 400 quando 'version' não é passada", async () => {
		const res = await api.get("/ping");

		expect(res.status).toBe(400);
	});

	test("Retorna 426 quando 'version' não está na lista de versões compatíveis", async () => {
		const params = {
			version: "0.0.0"
		}
		const res = await api.get("/ping", { params });

		expect(res.status).toBe(426);
	})

	test("Retorna 200 quando 'version' é compatível", async () => {
		const params = {
			version: "1.0.1"
		}
		const res = await api.get("/ping", { params });

		expect(res.status).toBe(200);
	});
});