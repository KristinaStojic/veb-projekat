Vue.component("sviKorisnici", { 
	data: function () {
	    return {
        korisnici: [],

        greska: "",
        search: "",
        filterText: '',
        sort: '',
        
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
        <nav class="navbar navbar-expand-lg navbar-light bg-light navigacija">
        <a class="navbar-brand" href="#">K&J</a>
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
                        <label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
                    </div>
                </li>

                
            </ul>
        </div>

        <div id="greska" class="snackbar">{{greska}}</div>

      </nav>

      
      <div>
          <label>Pretraga: </label>
          <input v-model="search" placeholder="Pretražite korisnike">
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
           <label>Sortiranje: </label>

            <dugme class="btn-info btn-sm" @click="sortTable('ime', 'asc')">Ime-uzlazno</dugme>
            <dugme class="btn-info btn-sm" @click="sortTable('ime', 'desc')">Ime-silazno</dugme>
            <dugme class="btn-info btn-sm" @click="sortTable('prezime', 'asc')">Prezime-uzlazno</dugme>
            <dugme class="btn-info btn-sm" @click="sortTable('prezime', 'desc')">Prezime-silazno</dugme>
            <dugme class="btn-info btn-sm" @click="sortTable('korisnickoIme', 'asc')">Korisnicko ime-uzlazno</dugme>
            <dugme class="btn-info btn-sm" @click="sortTable('korisnickoIme', 'desc')">Korisnicko ime - silazno</dugme>
            </div>

            <div class="row">
              <div style="margin: 20px;" v-for="k in filteredGames">
                  <div class="card">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>{{k.imePrezime}}</b></li>
                        <li class="list-group-item">Uloga: {{k.uloga}}</li>
                        <li class="ime list-group-item">Korisničko ime: {{k.korisnickoIme}}</li>
                        <li class="list-group-item">Pol: {{k.pol}}</li>
                        <li class="list-group-item">Datum rođenja: {{k.datumRodjenja}}</li>
                      </ul>
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
          return this.korisnici.filter((k) => {
            return (k.korisnickoIme.toLowerCase().includes(this.search.toLowerCase()) || k.ime.toLowerCase().includes(this.search.toLowerCase()) || k.prezime.toLowerCase().includes(this.search.toLowerCase()));
          })
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


	},

  
  
});