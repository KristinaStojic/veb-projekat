Vue.component("sviKorisnici", { 
	data: function () {
	    return {
        korisnici: [],

        greska: "",
        search: "",
        filterText: '',
        sort: '',
        filteri: "",
        logo : "slike/logo_final2.png",
        filterTip : "",
        sakrij : false
        
        //kor : [{"id":"7446a900-1c64-448f-86cf-ad8703ac8ecb","logickoBrisanje":0,"korisnickoIme":"MEN2","lozinka":"men","ime":"izmenaIme","prezime":"prezimeIzmena","pol":"MUSKI","datumRodjenja":917913600000,"uloga":"MENADZER","restoran":{"id":"e9854e0e-65b0-4a05-bbb7-b3ef8fb29211","logickoBrisanje":0,"naziv":"mrs","tipRestorana":"RAZNO","artikliUPonudi":[],"status":true,"lokacija":{"geografskaDuzina":12.0,"geografskaSirina":12.0,"ulica":"sad","broj":12,"mesto":"sfdsf","postanskiBroj":32434},"logo":"McDonald's.png"}},{"id":"c5585d9d-1efa-40a3-8ac1-f3be1469114e","logickoBrisanje":0,"korisnickoIme":"men","lozinka":"men","ime":"Marko","prezime":"Markovic","pol":"MUSKI","datumRodjenja":920332800000,"uloga":"MENADZER","restoran":null},{"id":"23c955c6-6d27-4687-b839-9a8766d61624","logickoBrisanje":0,"korisnickoIme":"men1","lozinka":"men1","ime":"Petar","prezime":"Petrovic","pol":"MUSKI","datumRodjenja":925603200000,"uloga":"MENADZER","restoran":null},{"id":"eee76e73-88f9-4ee8-9c76-50979d35fa53","logickoBrisanje":0,"korisnickoIme":"nikola","lozinka":"nikola","ime":"Nikola","prezime":"Stojic","pol":"MUSKI","datumRodjenja":1622514000000,"uloga":"MENADZER","restoran":null},{"id":"66a4472e-f58d-4014-9222-5646048c114b","logickoBrisanje":0,"korisnickoIme":"j","lozinka":"j","ime":"m","prezime":"m","pol":"ZENSKI","datumRodjenja":1622576400000,"uloga":"MENADZER","restoran":null}]
	    }

      

      
	},
  filters: {
    upper: function(value) {
      return value.toUpperCase();
    }
  },

  
	    template: ` 

      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
          <a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/">
            <img :src="logo" alt="" width="100" height="80">
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
      
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                  <li class="nav-item nav-link active">
                      <a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeRestorana">Dodaj restoran</a>
                    </li>

                  <li class="nav-item nav-link active">
                      <a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeMenadzera">Dodaj menadžera</a>
                    </li>

                  <li class="nav-item nav-link active">
                    <a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeDostavljaca">Dodaj dostavljača</a>
                  </li>

                  <li class="nav-item nav-link active">
                    <a class="nav-link" href="http://localhost:8080/DostavaREST/#/sviKorisnici">Prikaži sve korisnike</a>
                  </li>

                  


                  <li class="nav-item dropdown">
                      <div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                          <i class="zmdi zmdi-account zmdi-hc-2x"></i>
                      </div>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
								<div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
							</div>
                  </li>

                  
              </ul>
          </div>

          <div id="greska" class="snackbar">{{greska}}</div>

        </nav>

        
        <div class="bottom ">
            <div >
            &nbsp&nbsp
              <label style="font-size:15px">Pretraga: </label>
              <input v-model="search" style="height:36px; width:260px" placeholder="Pretražite korisnike">
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              
                  <label style="font-size:15px;">Sortiranje: </label>
                   <div class="btn-group">
                  <dugme class="btn btn-secondary dropdown-toggle dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                      Izaberite kriterijum
                  </dugme>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('ime', 'asc')">Ime-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('ime', 'desc')">Ime-silazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('prezime', 'asc')">Prezime-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('prezime', 'desc')">Prezime-silazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('korisnickoIme', 'asc')">Korisničko ime-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('korisnickoIme', 'desc')">Korisničko ime-silazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('brojBodova', 'asc')">Broj bodova kupca-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('brojBodova', 'desc')">Broj bodova kupca-silazno</dugme>
                  </div>
                  </div>
                  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                  
                  <label style="font-size:15px">Filtriranje: </label>
                  <div class="btn-group">
                  <dugme class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Izaberite ulogu
                  </dugme>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilter('')">Svi</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilter('Kupac')">Kupac</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilter('Administrator')">Administrator</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilter('Menadžer')">Menadžer</dugme>

                
                  </div>



                  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                  
 
                  <div class="btn-group">
                  <dugme class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Izaberite tip kupca
                  </dugme>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('')">Svi</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Bronzani')">Bronzani</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Srebrni')">Srebrni</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Zlatni')">Zlatni</dugme>

                
                  </div>
                  </div>
            </div>

            <div class="row">
                <div style="margin: 20px;" v-for="k in filteredGames">
                    <div class="card">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><b>{{k.imePrezime}}</b>        
                          </li>
                          <li v-if="k.uloga === 'Kupac'" class="list-group-item">Uloga: {{k.uloga}} (Tip: {{k.tipKupca}}, Broj bodova: {{k.brojBodova}})</li>
                          <li v-else class="list-group-item">Uloga: {{k.uloga}}</li>

                          <li class="ime list-group-item">Korisničko ime: {{k.korisnickoIme}}</li>
                          <li class="list-group-item">Pol: {{k.pol}}</li>
                          <li class="list-group-item">Datum rođenja: {{k.datumRodjenja}}</li>
                          <li v-if="k.uloga !== 'Administrator' && k.blokiran === 0" class="list-group-item">                         
                           <button type="button" id="dugme" class="btn btn-info btn-sm" @click="blokirajKorisnika(k.korisnickoIme)">Blokiraj</button>
                          </li>                 
                          <li v-if="k.blokiran === 1" class="list-group-item">                         
                           Korisnik je već blokiran!
                          </li>
                          <li  v-if="k.uloga === 'Administrator'" class="list-group-item">Administratori ne mogu biti blokirani!</li>

                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
   </div>
    	`
    	, 
      
      mounted() {
        axios
          .get('rest/korisnici/')
          .then(response => (this.korisnici = response.data))
      },


      computed: {
        filteredGames(){
          console.log(this.filteri);
          console.log(this.filterTip);
          if(this.search.length > 0)
          return this.korisnici.filter((k) => {
            return (k.ime.toLowerCase().includes(this.search.toLowerCase()) || k.prezime.toLowerCase().includes(this.search.toLowerCase()));
          })
          else if(this.filterTip.length > 0){
            return this.korisnici.filter((k) => {
              if(k.tipKupca !== null){
              return (k.tipKupca.toLowerCase().includes(this.filterTip.toLowerCase()));
              }
            })
          }
          else{
            return this.korisnici.filter((k) => {
              return (k.uloga.toLowerCase().includes(this.filteri.toLowerCase()));
            })
          }
        }},

        /*computed: {
          filteredGames() {
            let filter = new RegExp(this.filterText, 'i')
            return ( this.korisnici.filter(el => el.ime.match(filter) || el.prezime.match(filter)))
          }
        },*/

	methods : {

        odjava : function() {
    		axios 
    			.post('/DostavaREST/rest/korisnici/odjava')
    			.then(response => {
					window.localStorage.removeItem("korisnik");
					window.localStorage.removeItem("uloga");
					this.greska = "Uspesna odjava!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
    				this.$router.push("/")
    			})
				.catch(err => {
					this.greska = "Neuspjesna odjava!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					console.log(err);
				  })
    		
    	},

      sortTable(key, direction){
        this.sort = `${key} > ${direction}`
        if (direction === 'asc') {
          this.korisnici.sort((a, b) => a[key] > b[key] ? 1: -1)
        } else {
          this.korisnici.sort((a, b) => a[key] < b[key] ? 1: -1)
        }
      },

      postaviFilter(value){
        this.filteri = value;
     },

     postaviFilterTip(value){
      this.filterTip = value;
   }, 

   blokirajKorisnika : function(korisnickoIme){
     this.sakrij = true;
    var k = {
      "korisnickoIme": korisnickoIme
      }
    axios 
    .post('/DostavaREST/rest/korisnici/blokirajKorisnika', k)
    .then(response => {
      this.greska = "Korisnik uspjesno blokiran!";
      var x = document.getElementById("greska");
      x.className = "snackbar show";
      setTimeout(function(){x.className = x.className.replace("show","");},1800);
    })
  .catch(err => {
    this.greska = "Neuspjesna odjava!";
    var x = document.getElementById("greska");
    x.className = "snackbar show";
    setTimeout(function(){x.className = x.className.replace("show","");},1800);
    console.log(err);
    })
    this.$router.go()

   }

   
	},

  
  
});