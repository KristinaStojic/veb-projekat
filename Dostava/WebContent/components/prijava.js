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
    <div class="mb-3">
      <label for="korIme" class="form-label">Korisničko ime</label>
      <input v-model="noviKorisnik.korisnickoIme" type="text" class="form-control" id="korIme">
    </div>
    <div class="mb-3">
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
                .post('rest/korisnici/prijava',{"korisnickoIme":''+ this.newUser.userName, "lozinka":''+this.newUser.password})
                .then(response=>{
                    this.message = response.data;
                    console.log("\n\n ------- PODACI -------\n");
                    console.log(response.data);
                    toastr["success"]("Let's go, travel around world !!", "Success log in!");
                    console.log("\n\n ----------------------\n\n");
                    //TODO 11: Napraviti bolju resenje od ovoga, jer je ovo bas HC redirektovanje na dashboard.
                    /**
                     * Isto kao i TODO 10 problem. 
                     *
                     * author: Vaxi
                     */
                    location.href = response.data; // we get from backend redirection to login with this

                    
                })
                .catch(err =>{ 
                    console.log("\n\n ------- ERROR -------\n");
                    console.log(err);
                    toastr["error"]("Password, username are incorrect, or your account is blocked!", "Fail");
                    console.log("\n\n ----------------------\n\n");
                })
                return true;
            }

            /**
             * For each error, push notification to user, to inform him about it.
             */
            this.errors.forEach(element => {
                console.log(element)
                toastr["error"](element, "Fail")
            });
             
        }
        
    }
});