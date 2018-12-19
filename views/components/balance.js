/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : balance.js
*/

Vue.component("balance", {
	template: `
		<div>
			<p>Balance : {{ balance }}</p>
		</div>
	`,
	data: function () {
		return ({
			balance: ""
		})
	},
	created: function () {
		this.getBalance();
	},
	methods: {
		getBalance: function () {
			fetch("/api/balance")
			.then(response => response.json())
			.then(response => {
				this.balance = response.balance;
			});
		}
	}
})