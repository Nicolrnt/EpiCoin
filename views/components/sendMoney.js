/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : sendMoney.js
*/

Vue.component("send-money", {
	template: `
		<div>
			<form action="/api/sendMoney" method="GET">
				<p>Adresse : <input type="text" /></p>
				<p>Montant : <input type="number" name="quantity" min="1" max="5"></p>
			</form>
		</div>
	`,
	data: function () {
		return ({
			info: ""
		})
	},
	created: function () {
		this.sendMoney();
	},
	methods: {
		sendMoney: function () {
			console.log("Ok");
		}
	}
})