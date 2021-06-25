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
        </form>
      </div>
</div>
    	`
    	, 
	methods : {
        proveriPodatke: function (event) {
            event.preventDefault();
      
            if (!this.noviKorisnik.korisnickoIme) {
              alert('Obavezno uneti korisničko ime!');
            } else if (!this.noviKorisnik.lozinka) {
              alert('Obavezno uneti lozinku!');
            } 
              axios
                .post('/DostavaREST/rest/korisnici/prijava', this.noviKorisnik)
                .then(response => {
                  if(response.data.length == 0){
                    alert("Niste uneli ispravne podatke!");
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