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



// describe("POST /test", () => {
// 	test("204 - Todos os campos preenchidos", async () => {
// 		const res = await api({
// 			method: "POST",
// 			url: "/test",
// 			headers: {
// 				test: "test"
// 			},
// 			params: {
// 				test: "test"
// 			},
// 			data: {
// 				test: "test"
// 			}
// 		});

// 		expect(res.status).toBe(204);
// 		expect(res.data).toBe("");
// 	});

// 	test("400 - Body não é enviado", async () => {
// 		const res = await api({
// 			method: "POST",
// 			url: "/test",
// 			headers: {
// 				test: "test"
// 			},
// 			params: {
// 				test: "test"
// 			}
// 		});

// 		expect(res.status).toBe(400);
// 		expect(res.data).toBe("Bad Request");
// 	});

// 	test("400 - Body não é enviado", async () => {
// 		const res = await api({
// 			method: "POST",
// 			url: "/test",
// 			headers: {
// 				test: "test"
// 			},
// 			params: {
// 				test: "test"
// 			},
// 			data: {
// 				test: "test"
// 			}
// 		});

// 		expect(res.status).toBe(204);
// 		expect(res.data).toBe("");
// 	});
// });



// EU PODERIA TESTAR VARIAS SITUACOES E ESPERAR Q NAO RETORNE STATUS 500

// const routes = [
// 	{
// 		path: "/auth/login",
// 		method: "POST",
// 		query: false,
// 		body: true,
// 		header: false
// 	}
// ];



describe("Testes gerais de comportamento do express na rota /test", () => {
	// test("", async () => {
	// 	const res = await api({
	// 		method: "POST",
	// 		url: "/test",
	// 		headers: {

	// 		},
	// 		params: {

	// 		},
	// 		data: {

	// 		}
	// 	});

		// expect(res.status).toBe(204);
	// });

	test("Headers, query e body preenchidos como esperado na api", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {
				headersTest: "test"
			},
			params: {
				queryTest: "test"
			},
			data: {
				bodyTest: "test"
			}
		});

		expect(res.status).toBe(204);
	});

	test("Headers, query e body preenchidos mas o nome do campo em letra minúscula", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {
				headerstest: "test"
			},
			params: {
				querytest: "test"
			},
			data: {
				bodytest: "test"
			}
		});

		expect(res.status).toBe(204);
	});

	test("Headers, query e body vazios", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {},
			params: {},
			data: {}
		});

		expect(res.status).toBe(204);
	});

	test("Query malformada", async () => {
		const res = await api({
			method: "POST",
			url: "/test?%E0%A4%A",
			headers: {

			},
			params: {

			},
			data: {

			}
		});

		expect(res.status).toBe(204);
	});
	
	test("Body malformado", async () => {
		const res = await api({
			method: "POST",
			url: "/test",
			headers: {

			},
			params: {

			},
			data: "malformado"
		});

		expect(res.status).toBe(204);
	});
});