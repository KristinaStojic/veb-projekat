const PocetnaStrana = { template: '<pocetna></pocetna>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'glavna', component: PocetnaStrana}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});