const PocetnaStrana = { template: '<pocetna></pocetna>' }
const Prijava = { template: '<prijava></prijava>' }
const Registracija = { template: '<registracija></registracija>' }
const PocetnaStranaKupac = { template: '<pocetnaStranaKupac></pocetnaStranaKupac>' }
const PocetnaStranaAdministrator = { template: '<pocetnaStranaAdministrator></pocetnaStranaAdministrator>' }
const PocetnaStranaMenadzer = { template: '<pocetnaStranaMenadzer></pocetnaStranaMenadzer>' }
const PocetnaStranaDostavljac = { template: '<pocetnaStranaDostavljac></pocetnaStranaDostavljac>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'glavna', component: PocetnaStrana},
		{ path: '/prijava', component: Prijava},
		{ path: '/registracija', component: Registracija},
		{ path: '/pocetnaStranaKupac', component: PocetnaStranaKupac},
		{ path: '/pocetnaStranaAdministrator', component: PocetnaStranaAdministrator},
		{ path: '/pocetnaStranaMenadzer', component: PocetnaStranaMenadzer},
		{ path: '/pocetnaStranaDostavljac', component: PocetnaStranaDostavljac}
		
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});