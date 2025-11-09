const { api } = require("../../index.js");

/**
 * @author VAMPETA
 * @brief ROTA QUE TROCA A SENHA DO USUARIO
 * @method PATCH
 * @route /swap-password
 * @warning ESSE TESTE NECESSECITA DE 2 VARIAVEL DE AMBIENTE
 * @property {stirng} PASSWORD SENHA DE USUARIO
 * @property {string} REFRESH_TOKEN TOKEN DE AUTENTICACAO DO USUARIO
*/
describe("PATCH /swap-password", () => {
	test("204 - 'authorization', 'newPassword' e 'password' são enviadas corretamente", async () => {
		const res = await api({
			method: "PATCH",
			url: "/swap-password",
			headers: {
				Authorization: `Bearer ${process.env.REFRESH_TOKEN}`
			},
			data: {
				newPassword: "12345",
				password: process.env.PASSWORD
			}
		});

		expect(res.status).toBe(204);
		expect(res.data).toBe("");
	});
});