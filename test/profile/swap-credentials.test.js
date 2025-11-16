const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE TROCA AS CREDENCIAIS DO USUARIO
 * @method PATCH
 * @route /swap-credentials
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("PATCH /swap-credentials", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("204 - Todas as informações são enviadas corretamente", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("204 - Todas as informações são enviadas corretamente (formato de 'phone' +00 00 00000-0000)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 21 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("204 - Todas as informações são enviadas corretamente (formato de 'phone' +0000000000000)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+5521971178764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("204 - Todas as informações são enviadas corretamente (sem pontuação no campo 'cpf')", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "07068093868",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Body não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: null
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é undefined", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: undefined
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é um objeto vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {

			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é um array vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: []
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é um array não vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: [
				"not",
				"empty"
			]
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'name' não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'name' vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	// test("400 - Campo 'name' é null", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: null,
	// 			phone: "+55 (21) 97117-8764",
	// 			cpf: "070.680.938-68",
	// 			date: "07/12/1989",
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	});

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	// test("400 - Campo 'name' é undefined", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: undefined,
	// 			phone: "+55 (21) 97117-8764",
	// 			cpf: "070.680.938-68",
	// 			date: "07/12/1989",
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	});

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	// test("400 - Campo 'name' é um array", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: [],
	// 			phone: "+55 (21) 97117-8764",
	// 			cpf: "070.680.938-68",
	// 			date: "07/12/1989",
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	});

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	// test("400 - Campo 'name' é um objeto", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: {},
	// 			phone: "+55 (21) 97117-8764",
	// 			cpf: "070.680.938-68",
	// 			date: "07/12/1989",
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	});

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	// test("400 - Campo 'name' é um número", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: 42,
	// 			phone: "+55 (21) 97117-8764",
	// 			cpf: "070.680.938-68",
	// 			date: "07/12/1989",
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	});

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	test("400 - Campo 'phone' não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'phone' vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Código de país ausente em 'phone'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "(21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'phone' inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "Número inválido",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	// test("400 - O campo 'phone' é um array", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: "Satoru Gojo",
	// 			phone: [],
	// 			cpf: "070.680.938-68",
	// 			date: "07/12/1989",
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	})

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	test("400 - Campo 'cpf' não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Cpf inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "Cpf inválido",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		})

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão DD-MM-AAAA", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07-12-1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão AAAA-MM-DD", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "1989-12-07",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão AAAA/MM/DD", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "1989/12/07",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' segue o padrão MM/DD/AAAA (Pode funcionar em alguns casos que o dia é menor que 12, mas de forma erronea)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "12/21/1952",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'date' é inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "Data inválida",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	// test("400 - Campo 'date' é um número", async () => {
	// 	const res = await api({
	// 		method: "PATCH",
	// 		url: "/swap-credentials",
	// 		headers: {
	// 			Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
	// 		},
	// 		data: {
	// 			name: "Satoru Gojo",
	// 			phone: "+55 (21) 97117-8764",
	// 			cpf: "070.680.938-68",
	// 			date: 42,
	// 			nationality: "Japão",
	// 			sex: "Masculino"
	// 		}
	// 	});

	// 	expect(res.status).toBe(400);
	// 	expect(res.data).toBe("Bad Request");
	// });

	test("400 - Campo 'nationality' não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Campo 'sex' não enviado", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: ""
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: "Bearer token inválido"
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: "Bearer "
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: process.env.REFRESH_TOKEN
			},
			data: {
				name: "Satoru Gojo",
				phone: "+55 (21) 97117-8764",
				cpf: "070.680.938-68",
				date: "07/12/1989",
				nationality: "Japão",
				sex: "Masculino"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e body não enviado (testa se o body é lido sem o cliente estar autenticado)", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-credentials",
			headers: {
				Authorization: "Bearer token inválido"
			}
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});
});