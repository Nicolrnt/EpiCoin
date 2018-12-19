Vue.component("oauth", {
    template: `
		<div>
			<a :href="url">
				<button>CLICK HERE TO LOGIN</button>
			</a>
		</div>
	`,
    data: function () {
        return ({
            url: "https://github.com/OfficeDev/Office-Add-in-NodeJS-ServerAuth",
        })
    },
    created: function () {
        console.log("Tu passes ?")

    },
    methods: {}
});