const PocetnaStrana = { template: '<pocetna></pocetna>' }
const Prijava = { template: '<prijava></prijava>' }
const Registracija = { template: '<registracija></registracija>' }
const UspesnaPrijava = { template: '<uspesnaPrijava></uspesnaPrijava>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'glavna', component: PocetnaStrana},
		{ path: '/prijava', component: Prijava},
		{ path: '/registracija', component: Registracija},
		{ path: '/uspesnaPrijava', component: UspesnaPrijava}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});