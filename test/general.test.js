const { api } = require("../index.js");

// describe("Testes gerais", () => {
// 	test("400 - Query é malformada", async () => {
// 		const res = await api.get("/ping?%E0%A4%A");

// 		expect(res.status).toBe(400);
// 		expect(res.data).toBe("Bad Request");
// 	});

// 	test("400 - Body é um JSON malformado", async () => {
// 		const body = "{ JSON malformado }";
// 		const config = {
// 			header: {
// 				"Content-Type": "application/json"
// 			}
// 		};
// 		const res = await api.post("/auth/login", body, config);

// 		expect(res.status).toBe(400);
// 		expect(res.data).toBe("Bad Request");
// 	});

// 	// test("", async () => {

// 	// });
// });



// const routes = [
// 	{
// 		path: "/auth/login",
// 		method: "post",
// 		query: false,
// 		body: true,
// 		header: false
// 	}
// ];

// routes.forEach((route) => {
// 	if (route.body) {
// 		describe(`Body --> ${route.path}`, () => {
// 			test("400 - Body não é enviado", async () => {
// 				const res = await api[route.method](route.path);

// 				expect(res.status).toBe(400);
// 				expect(res.data).toBe("Bad Request");
// 			});

// 			test("400 - Body é um JSON malformado", async () => {
// 				const body = "{ JSON malformado }";
// 				const config = {
// 					header: {
// 						"Content-Type": "application/json"
// 					}
// 				};
// 				const res = await api[route.method](route.path, body, config);

// 				expect(res.status).toBe(400);
// 				expect(res.data).toBe("Bad Request");
// 			});
// 		});
// 	}
// });



describe("POST /test", () => {
	test("204 - Todos os campos preenchidos", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {
				test: "test"
			},
			params: {
				test: "test"
			},
			data: {
				test: "test"
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Body não é enviado", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {
				test: "test"
			},
			params: {
				test: "test"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body não é enviado", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {
				test: "test"
			},
			params: {
				test: "test"
			},
			data: {
				test: "test"
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});
});