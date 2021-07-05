const PocetnaStrana = { template: '<pocetna></pocetna>' }
const Prijava = { template: '<prijava></prijava>' }
const Registracija = { template: '<registracija></registracija>' }
const LicniPodaci = { template: '<licniPodaci></licniPodaci>' }
const IzmenaPodataka = { template: '<izmenaPodataka></izmenaPodataka>' }
const DodavanjeMenadzera = { template: '<dodavanjeMenadzera></dodavanjeMenadzera>' }
const DodavanjeRestorana = { template: '<dodavanjeRestorana></dodavanjeRestorana>' }
const DodavanjeDostavljaca = { template: '<dodavanjeDostavljaca></dodavanjeDostavljaca>' }
const SviKorisnici = { template: '<sviKorisnici></sviKorisnici>' }
const PregledRestorana = { template: '<pregledRestorana></pregledRestorana>' }
const DodavanjeArtikla = { template: '<dodavanjeArtikla></dodavanjeArtikla>' }
const InformacijeRestoran = { template: '<informacijeRestoran></informacijeRestoran>' }
const IzmenaArtikla = { template: '<izmenaArtikla></izmenaArtikla>' }
const PregledKorpe = { template: '<pregledKorpe></pregledKorpe>' }
const PregledPorudzbina = { template: '<pregledPorudzbina></pregledPorudzbina>' }
const PregledKupaca = { template: '<pregledKupaca></pregledKupaca>' }
const SumnjiviKorisnici = { template: '<sumnjiviKorisnici></sumnjiviKorisnici>' }
const MapViewOnlyContainer = {template: "<map-view-container></map-view-container>"};
const MapContainer = {template: "<map-container></map-container>"};

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'glavna', component: PocetnaStrana},
		{ path: '/prijava', component: Prijava},
		{ path: '/registracija', component: Registracija},
		{ path: '/licniPodaci', component: LicniPodaci},
		{ path: '/izmenaPodataka', component: IzmenaPodataka},
		{ path: '/dodavanjeMenadzera', component: DodavanjeMenadzera},
		{ path: '/dodavanjeRestorana', component: DodavanjeRestorana},
		{ path: '/dodavanjeDostavljaca', component: DodavanjeDostavljaca},
		{ path: '/sviKorisnici', component: SviKorisnici},
		{ path: '/pregledRestorana', component: PregledRestorana},
		{ path: '/dodavanjeArtikla', component: DodavanjeArtikla},
		{ path: '/informacijeRestoran/:id', component: InformacijeRestoran},
		{ path: '/izmenaArtikla/:id/:naziv', component: IzmenaArtikla},
		{ path: '/pregledKorpe/:id', component: PregledKorpe},
		{ path: '/pregledPorudzbina/:id', component: PregledPorudzbina},
		{ path: '/pregledKupaca/:id', component: PregledKupaca},
		{ path: '/sumnjiviKorisnici', component: SumnjiviKorisnici}



	  ]
});

var app = new Vue({
	router,
	el: '#app'
});
