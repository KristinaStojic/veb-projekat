Vue.component("licniPodaci", {
    data: function () {
      return {
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
        pol: 0,
        datumRodjenja: "",
        novaLozinka: "",
        msg: "",
        greska: "",
        logo : "slike/logo_final2.png", uloga : ""
      }
    },
    template: ` 
  <div>
  <navigacija></navigacija>

<div class="bottom">

  <div class="slika-registracija" >
    <div class="inner">
        <div class="image-holder">
            <div class="pica"></div>
            </div>

            <form>
                <h3>Lični podaci</h3>

                <div class="form-wrapper">
                    <label for="imeprez" >Ime i prezime</label>
                    <label id="imeprez" class="form-control">{{ime}} {{prezime}}</label>
                    <i class="zmdi zmdi-account-circle"></i>
                </div>

                <div class="form-wrapper">
                    <label for="korIme" >Korisničko ime</label>
                    <label id="korIme" class="form-control">{{korisnickoIme}}</label>
                    <i class="zmdi zmdi-account"></i>
                </div>

                <div class="form-wrapper">
                <label for="datum" >Datum</label>
                <vuejs-datepicker id="datum" v-model="datumRodjenja" class="form-control" style="padding-center:35px;" disabled></vuejs-datepicker>
                    <i class="zmdi zmdi-calendar"></i>
                </div>

                <div class="form-wrapper">
                    <label for="pol" >Pol</label>
                    <label id="pol" class="form-control">{{pol}}</label>
                    <i class="zmdi zmdi-male-female"></i>
                </div>

                <div class="form-group">
                    <button class="button1">
                    
                        <a style="color:white;" v-on:click="izmenaPodataka()">Izmeni podatke</a>
                        <i class="zmdi zmdi-arrow-right"></i>
                    </button>
                </div>
                
                <div id="greska" class="snackbar">{{greska}}</div>
            </form>
        </div>
  </div>

  </div>
  </div>
  `
    ,
    components: {
      vuejsDatepicker
    }
    ,

    mounted () {
    	this.uloga = window.localStorage.getItem("uloga")
			
        axios 
        .get('rest/korisnici/' + window.localStorage.getItem("korisnik"))
        .then(response => {
            if(response.data != null)
            {     
                this.korisnickoIme = response.data.korisnickoIme;
                this.lozinka = response.data.lozinka;
                this.ime = response.data.ime;
                this.prezime = response.data.prezime;
                this.pol = response.data.pol;
                this.datumRodjenja = response.data.datumRodjenja;

                if(this.pol.localeCompare("ZENSKI") == 0){
                    this.pol = "Ženski";
                }
                else if(this.pol.localeCompare("MUSKI") == 0){
                    this.pol = "Muški";
                }
            }


            
    
        })
    },
    methods: {
        
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
    		
    	}
	
    }
  });