/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : sendMoney.js
*/

Vue.component("send-money", {
	template: `
		<div>
			<form action="/api/sendMoney" method="GET">
				<p>Adresse : <input type="text" name="to" /></p>
				<p>Montant : <input type="number" name="amount" min="1" max="5"></p>
				<button type="submit">Send Money Bro</button>
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