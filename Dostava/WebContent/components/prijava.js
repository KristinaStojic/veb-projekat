Vue.component("prijava", { 
	data: function () {
	    return {
            noviKorisnik: {
                korisnickoIme: "",
                lozinka: ""             
              }
	    }
	},
	    template: ` 

      <div class="slika-registracija" >
      <div class="inner">
        <div class="image-holder">
          <div class="pica"></div>
        </div>
        <form @submit="proveriPodatke" method='post'>
          <h3>Prijava</h3>
          <div class="form-wrapper">
            <input type="text" placeholder="Korisničko ime" class="form-control" v-model="noviKorisnik.korisnickoIme">
            <i class="zmdi zmdi-account"></i>
          </div>
          <div class="form-wrapper">
            <input type="password" placeholder="Lozinka" class="form-control" v-model="noviKorisnik.lozinka">
            <i class="zmdi zmdi-lock"></i>
          </div>
          <button>Prijava
            <i class="zmdi zmdi-arrow-right"></i>
          </button>

          <div id="pogresno" class="snackbar">Niste uneli ispravne podatke!</div>
          <div id="obaveznoKorIme" class="snackbar">Obavezno uneti korisničko ime!!</div>
          <div id="obaveznaLozinka" class="snackbar">Obavezno uneti lozinku!!</div>
        </form>
      </div>
</div>
    	`
    	, 
	methods : {
        proveriPodatke: function (event) {
            event.preventDefault();
      
            /*if (!this.noviKorisnik.korisnickoIme) {
                    var x = document.getElementById("obaveznoKorIme");
                    x.className = "snackbar show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            } else if (!this.noviKorisnik.lozinka) {
                    var x = document.getElementById("obaveznaLozinka");
                    x.className = "snackbar show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            } */
              axios
                .post('/DostavaREST/rest/korisnici/prijava', this.noviKorisnik)
                .then(response => {
                  if(response.data.length == 0){

                    var x = document.getElementById("pogresno");
                    x.className = "snackbar show";
                    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1800);

                  }else{
                    if(response.data.uloga.localeCompare("KUPAC") == 0){
                        this.$router.push("/pocetnaStranaKupac")
                    }
                    else if(response.data.uloga.localeCompare("MENADZER") == 0){
                        this.$router.push("/pocetnaStranaMenadzer")
                    }else if(response.data.uloga.localeCompare("DOSTAVLJAC") == 0){
                        this.$router.push("/pocetnaStranaDostavljac")
                    }
                    else if(response.data.uloga.localeCompare("ADMINISTRATOR") == 0){
                        this.$router.push("/pocetnaStranaAdministrator")
                    }
                    
                  }
                })
                .catch(err => {
                  alert("NESTO JE POGRESNO!");
                  console.log(err);
                })
              return true;
            }
	}
});