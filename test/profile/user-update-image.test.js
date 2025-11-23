const { api } = require("../../index.js");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

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

	test("200 - Imagem atualizada corretamente", async () => {	// PAREI AKI ENVIANDO A IMAGEM		// PROXIMO PASSO E COLOCAR A IMAGEM EM OUTRO DIRETORIO
		const form = new FormData();
		const imagePath = path.join(__dirname, "toji.jpg");
		form.append("fotoPerfil", fs.createReadStream(imagePath));
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
});