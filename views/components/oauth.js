Vue.component("oauth", {
    template: `
		<div>
			<a target="_blank" :href="authUrl">
				<button>CLICK HERE TO LOGIN</button>
			</a>
		</div>
	`,
    data: function () {
        return ({
            authUrl: "",
        })
    },
    created: function () {
        console.log("Tu passes ?")
        this.getAuthUrl();

    },
    methods: {
        getAuthUrl: function () {
            fetch("/api/oauth")
                .then(response => response.json())
                .then(response => {
                    console.log("JE SUIS LA REPOSNE", response)
                    this.authUrl = response.authUrl;
                });
        }
    }
});