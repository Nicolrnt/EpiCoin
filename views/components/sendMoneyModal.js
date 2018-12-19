/*
** Made by : Nicolas Laurent <nicolas-laurent@outlook.fr>
** Project : EpiCoin
** File : sendMoneyModal.js
*/

Vue.component("sendMoneyModal", {
	template: `
		<div>
			<p>Wesh Alors</p>
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
			console.log("Ok");
		}
	}
})