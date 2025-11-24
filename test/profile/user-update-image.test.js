const { api } = require("../../index.js");
const FormData = require("form-data");
const fs = require("fs");

/**
 * @author VAMPETA
 * @brief ROTA QUE SALVA A NOVA FOTO DE PERFIL DO CLIENTE
 * @method PATCH
 * @route /user/update-image
 * @warning ESSE TESTE NECESSECITA DE 1 VARIAVEL DE AMBIENTE
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("PATCH /user/update-image", () => {
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("204 - Imagem atualizada corretamente", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("204 - Dentro de 'Conten-Type' não contém boundary", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				"Content-Type": "multipart/form-data"
			},
			data: form
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});

	test("400 - Imagem nao enviada", async () => {
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				"Content-Type": "multipart/form-data"
			}
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é null", async () => {
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				"Content-Type": "multipart/form-data"
			},
			data: null
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é um array", async () => {
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				"Content-Type": "multipart/form-data"
			},
			data: []
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Body é uma stirng", async () => {
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				"Content-Type": "multipart/form-data"
			},
			data: "string"
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("400 - Nome do campo da imagem incorreto", async () => {
		const form = new FormData();
		form.append("nome errado", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(400);
		expect(res.data).toBe("Bad Request");
	});

	test("415 - Formato de imagem não suportado", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/webp.webp`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(415);
		expect(res.data).toBe("Unsupported Media Type");
	});

	test("415 - Content-Type inválido ou inesperado", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				"Content-Type": "application/json"
			},
			data: form
		});

		expect(res.status).toBe(415);
		expect(res.data).toBe("Unsupported Media Type");
	});

	test("401 - Header não contém 'Authorization'", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O campo 'Authorization' está vazio", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				Authorization: "",
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - Token é inválido", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				Authorization: "Bearer token inválido",
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - O token está vazio", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				Authorization: "Bearer ",
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' não contém o formato 'Bearer <token>'", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				Authorization: process.env.REFRESH_TOKEN,
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("401 - 'Authorization' inválido e imagem não enviada (testa se body é lido sem o cliente estar autenticado)", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/toji.jpg`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				Authorization: "Bearer token inválido",
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(401);
		expect(res.data).toBe("Unauthorized");
	});

	test("413 - Imagem excede é maior que 5MB", async () => {
		const form = new FormData();
		form.append("fotoPerfil", fs.createReadStream(`${process.cwd()}/assets/5MB.png`));
		const res = await api({
			method: "PATCH",
			url: "/user/update-image",
			headers: {
				authorization: `Bearer ${process.env.REFRESH_TOKEN}`,
				...form.getHeaders()
			},
			data: form
		});

		expect(res.status).toBe(413);
		expect(res.data).toBe("Payload Too Large");
	});
});