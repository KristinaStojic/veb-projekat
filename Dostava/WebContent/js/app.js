const PocetnaStrana = { template: '<pocetna></pocetna>' }
const Prijava = { template: '<prijava></prijava>' }
const Registracija = { template: '<registracija></registracija>' }
const PocetnaStranaKupac = { template: '<pocetnaStranaKupac></pocetnaStranaKupac>' }
const PocetnaStranaAdministrator = { template: '<pocetnaStranaAdministrator></pocetnaStranaAdministrator>' }
const PocetnaStranaMenadzer = { template: '<pocetnaStranaMenadzer></pocetnaStranaMenadzer>' }
const PocetnaStranaDostavljac = { template: '<pocetnaStranaDostavljac></pocetnaStranaDostavljac>' }
const LicniPodaci = { template: '<licniPodaci></licniPodaci>' }
const DodavanjeMenadzera = { template: '<dodavanjeMenadzera></dodavanjeMenadzera>' }
const DodavanjeRestorana = { template: '<dodavanjeRestorana></dodavanjeRestorana>' }
const DodavanjeDostavljaca = { template: '<dodavanjeDostavljaca></dodavanjeDostavljaca>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'glavna', component: PocetnaStrana},
		{ path: '/prijava', component: Prijava},
		{ path: '/registracija', component: Registracija},
		{ path: '/pocetnaStranaKupac', component: PocetnaStranaKupac},
		{ path: '/pocetnaStranaAdministrator', component: PocetnaStranaAdministrator},
		{ path: '/pocetnaStranaMenadzer', component: PocetnaStranaMenadzer},
		{ path: '/pocetnaStranaDostavljac', component: PocetnaStranaDostavljac},
		{ path: '/licniPodaci', component: LicniPodaci},
		{ path: '/dodavanjeMenadzera', component: DodavanjeMenadzera},
		{ path: '/dodavanjeRestorana', component: DodavanjeRestorana},
		{ path: '/dodavanjeDostavljaca', component: DodavanjeDostavljaca}
		
		
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});