Vue.component("prijava", { 
	data: function () {
	    return {
            noviKorisnik: {},
            greske: []
	    }
	},
	    template: ` 

    <div>
    <form @submit="proveriPodatke" method='post'>
    <div class="col-md-4">
      <label for="korIme" class="form-label">Korisničko ime</label>
      <input v-model="noviKorisnik.korisnickoIme" type="text" class="form-control" id="korIme">
    </div>
    <div class="col-md-4">
      <label for="lozinka" class="form-label">Lozinka</label>
      <input v-model="noviKorisnik.lozinka" type="password" class="form-control" id="lozinka">
    </div>
    <button type="submit" class="btn btn-primary">Prijavi se</button>
  </form>
  </div>

    	`
    	, 
	methods : {
        proveriPodatke: function(event){
            event.preventDefault();

           
            this.greske = [];
         
            if (!this.noviKorisnik.korisnickoIme) {
                this.greske.push('Unesite korisničko ime!');
            }

            if (!this.noviKorisnik.lozinka) {
                this.greske.push('Unesite lozinku!');
            }


            if (!this.greske.length) {
                axios
                .post('rest/korisnici/prijava',{"korisnickoIme":''+ this.noviKorisnik.korisnickoIme, "lozinka":''+this.noviKorisnik.lozinka})
                .then(response=>{
                    this.message = response.data;
                    console.log("\n\n ------- PODACI -------\n");
                    console.log(response.data);
                
                    location.href = response.data; 

                    
                })
                .catch(err =>{ 
                    console.log(err);
                })
                return true;
            }

            
            this.greske.forEach(element => {
                console.log(element)
            });
             
        }
        
    }
});