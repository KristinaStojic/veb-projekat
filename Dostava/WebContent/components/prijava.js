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
              greska: "",
              logo: "slike/logo_final2.png"
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
										<a class="nav-link" href="http://localhost:8080/DostavaREST/#/registracija">Registracija</a>
									</li>
								</ul>
							</div>
						</nav>
		<div class="bottom">
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
          <button class="button1">Prijava
            <i class="zmdi zmdi-arrow-right"></i>
          </button>

          <div id="greska" class="snackbar">{{greska}}</div>
        </form>
      </div>
      </div>
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
						      }else if(response.data.blokiran == 1){
                    this.greska = "Korisnik je blokiran, nije moguća prijava!";
							      var x = document.getElementById("greska");
							      x.className = "snackbar show";
							      setTimeout(function(){x.className = x.className.replace("show","");},1800);
                    
                  }else{
                    window.localStorage.setItem("korisnik", response.data.id);
                    window.localStorage.setItem("uloga", response.data.uloga);
                    this.$router.push("/");
                    
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