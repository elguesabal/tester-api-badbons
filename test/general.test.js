const { api } = require("../index.js");

describe("Testes gerais", () => {
	test("400 - Query é malformada", async () => {
		const res = await api.get("/ping?%E0%A4%A");

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é um JSON malformado", async () => {
		const body = "{ JSON malformado }";
		const config = {
			header: {
				"Content-Type": "application/json"
			}
		};
		const res = await api.post("/auth/login", body, config);

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	// test("", async () => {

	// });
});