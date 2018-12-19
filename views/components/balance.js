/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : balance.js
*/

Vue.component("balance", {
	template: `
		<div>
			<p>Balance : {{ balance }} EPC</p>
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
				console.log("BALANCE", response);
				let balanceHex = response.balance._hex;
                let parsed = parseInt(balanceHex, "16");
				this.balance = parsed / (10 ** 18);
			});
		}
	}
})