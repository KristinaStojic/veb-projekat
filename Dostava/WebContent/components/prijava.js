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

        <form class="row g-3" @submit="proveriPodatke" method='post'>
        <div class="col-12">
          <label for="korIme" class="form-label mx-auto center">Korisničko ime</label>
          <input type="text" class="form-control mx-auto" id="korIme" v-model="noviKorisnik.korisnickoIme" required style="width:250px">
        </div>
        <div class="col-12">
          <label for="lozinka" class="form-label mx-auto center">Lozinka</label>
          <input type="password" class="form-control mx-auto" id="lozinka" v-model="noviKorisnik.lozinka" required style="width:250px">
          <br/>
        </div>
        
        <div class="col-12 center">
          <br/>
          <button type="submit" class="btn btn-primary">Prijavi se</button>
        </div>	
        
        </form>
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
                    alert("Uspešna prijava!");
                    this.$router.push("/uspesnaPrijava")
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