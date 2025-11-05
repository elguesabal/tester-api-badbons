const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE TROCA O EMAIL DO USUARIO
 * @method POST
 * @route /swap-email
 * @warning ESSE TESTE NECESSECITA DE 3 VARIAVEL DE AMBIENTE
 * @property {string} EMAIL EMAIL DE LOGIN
 * @property {stirng} PASSWORD SENHA DE USUARIO
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("POST /swap-email", () => {
	expect(process.env.EMAIL).toBeDefined();
	expect(process.env.PASSWORD).toBeDefined();
	expect(process.env.REFRESH_TOKEN).toBeDefined();

	test("Retorna 204 quando as informações 'authorization', 'newEmail' e 'password' são enviadas corretamente", async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			}
		};
		const body = {
			newEmail: "novo-email@email.com",
			password: process.env.PASSWORD
		};
		const res = await api.patch("/swap-email", body, config);

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});
});