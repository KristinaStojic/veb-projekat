Vue.component("prijava", { 
	data: function () {
	    return {
            noviKorisnik: {
                korisnickoIme: "",
                lozinka: ""             
              },


              korIme: false,
              lozinka: false,
              msg: "",
              greska: ""
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
            <input v-on:click="korImePromena" type="text" placeholder="Korisničko ime" class="form-control" v-model="noviKorisnik.korisnickoIme" 
            v-bind:class="[{ invalid: korIme && !this.noviKorisnik.korisnickoIme}, { 'form-control': !korIme || this.noviKorisnik.korisnickoIme}]"
            >
            <i class="zmdi zmdi-account"></i>
          </div>
          <div class="form-wrapper">
            <input v-on:click="lozinkaPromena"
            v-bind:class="[{ invalid: lozinka && !this.noviKorisnik.lozinka }, { 'form-control': !lozinka || this.noviKorisnik.lozinka}]"
            type="password" placeholder="Lozinka" class="form-control" v-model="noviKorisnik.lozinka">
            <i class="zmdi zmdi-lock"></i>
          </div>

          <div class="form-wrapper">
            <label style="color:red;">{{msg}}</label>
          </div>
          <button>Prijava
            <i class="zmdi zmdi-arrow-right"></i>
          </button>

          <div id="greska" class="snackbar">{{greska}}</div>
        </form>
      </div>
</div>
    	`
    	, 
	methods : {

        lozinkaPromena: function(event) {
          event.preventDefault();
          this.lozinka = true;
        },
        korImePromena: function(event) {
          event.preventDefault();
          this.korIme = true;
        },


        proveriPodatke: function (event) {
            event.preventDefault();
            this.msg = "";
            if (!this.noviKorisnik.korisnickoIme) {
                    this.msg = "Obavezno uneti korisničko ime!";
            } else if (!this.noviKorisnik.lozinka) {
                     this.msg = "Obavezno uneti lozinku!";
            } 
            else{
              axios
                .post('/DostavaREST/rest/korisnici/prijava', this.noviKorisnik)
                .then(response => {
                  if(response.data.length == 0){
                    this.greska = "Korisnik sa ovim podacima ne postoji!";
							      var x = document.getElementById("greska");
							      x.className = "snackbar show";
							      setTimeout(function(){x.className = x.className.replace("show","");},1800);
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
	}
});