Vue.component("pregledKupaca", {
    data: function () {
      return {
		kupci : [],
        logo : "slike/logo_final2.png",
        greska: "",
        pomocniKupac: null,
        porudzbine: null,
        imeKupca : "",
        prezimeKupca: ""
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
							<a class="nav-link" href="" v-on:click="menadzerRestoran">Moj restoran</a>
							</li>
							
							<li class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="pregledPorudzbina()">Moje porudžbine</a>
							</li>
							
							
							<li class="nav-item dropdown">
							<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
								<i class="zmdi zmdi-account zmdi-hc-2x"></i>
							</div>
							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
							<label class="dropdown-item" v-on:click="mojiPodaci()">Moji podaci</label>
							<div class="dropdown-divider"></div>
							<label class="dropdown-item" v-on:click="izmenaPodataka()">Izmena podataka</label>
							<div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
							</div>
						</li>
					</ul>
				</div>

        </nav>



        <div class="slika-registracija">
                    <div id="greska" class="snackbar">{{greska}}</div>
                        <div style="padding-right:30px;" class="korpa ">
                            
                            <table  class="table table-hover align-middle">
                                
                                <colgroup span="11"></colgroup>
                                <colgroup span="4"></colgroup>
                            <thead>
                                <tr >
                                    <th style="border-style:none" colspan="11" scope="colgroup"><div style="background:white: text-decoration: underline; color:gray;">
                                <h3>Pregled kupaca iz Vašeg restoran:</h3></br>
                                
                                
                                </div></th>
                                </tr>
                                
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ime i prezime</th>
                                <th scope="col">Korisničko ime</th>
                                <th scope="col">Pol</th>			      
                                <th scope="col">Datum rođenja</th>
                                <th scope="col">Porudžbine</th>
 
                                <th colspan="4" scope="colgroup"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(p, i) in kupci">
                                    <th style="vertical-align:middle;text-align: center" scope="row">{{i+1}}</th>
                                    <td style="vertical-align:middle;text-align: center">{{p.ime + " " + p.prezime}}</td>
                                    <td style="vertical-align:middle;text-align: center">{{p.korisnickoIme}}</td>
                                    <td style="vertical-align:middle;text-align: center">{{p.pol}}</td>
                                    <td style="vertical-align:middle;text-align: center">{{p.datumRodjenja}}</td>
                                    <td style="vertical-align:middle;text-align: center">
                                    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal" @click="posaljiKupca(p)">
                                    Detalji
                                    </button>                 
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>

                        <div class="modal" id="myModal">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style="max-width: 40%;">
                            <div class="modal-content">
    
                                
                            <!-- Modal body -->
                            <div class="modal-body">
                            <table  class="table table-hover align-middle">
                                    
                            <colgroup span="11"></colgroup>
                            <colgroup span="4"></colgroup>
                        <thead>
                            <tr >
                                <th style="border-style:none" colspan="11" scope="colgroup"><div style="background:white: text-decoration: underline; color:gray;">
                            <h4>Porudžbine kupca: {{imeKupca + " " + prezimeKupca}}</h4></br>
                            
                            </div></th>
                            </tr>
                            
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id porudžbine</th>
                            <th scope="col">Datum</th>
                            <th scope="col">Ukupna cena</th>
                            <th colspan="2" scope="colgroup"></th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for="(p, i) in this.porudzbine">
                                <th style="vertical-align:middle;text-align: center" scope="row">{{i+1}}</th>
                                <td style="vertical-align:middle;text-align: center">{{p.idPorudzbine}}</td>
                                <td style="vertical-align:middle;text-align: center">{{p.datum}}</td>                           
                                <td style="vertical-align:middle;text-align: center">{{p.ukupnaCena}} RSD</td>
                                </tr>
                        </tbody>
                        </table>
                                
                            </div>
    
                            <!-- Modal footer -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">Zatvori</button>
                            </div>
    
                            </div>
                        </div>
                    </div>
                        </div>
                       
                </div> 



  </div>
  `
    ,
    mounted () {
    		
            this.uloga = window.localStorage.getItem("uloga");

			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiKupce/' + window.localStorage.getItem("korisnik"))
    			.then(response => {
					console.log(response.data.length)
                    if(response.data.length == 0){
                        this.greska = "Ne postoji nijedan kupac u Vašem restoranu!";
					    var x = document.getElementById("greska");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800);
                        //this.$router.push("/")
                    }
                    else{
                       this.kupci = response.data
                       console.log(this.kupci)
                    }
                   
					
    			})
				.catch(err => {
					this.greska = "Neuspesno!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })


    	
    },
    methods: {
		menadzerRestoran : function(event){
            event.preventDefault();
            axios 
           .get('rest/korisnici/restoranMenadzera/' + window.localStorage.getItem("korisnik"))
           .then(response => {
               if(response.data.length == 0)
               {     
                   this.greska = "Trenutno Vam nije dodeljen nijedan restoran!";
                   var x = document.getElementById("greska");
                   x.className = "snackbar show";
                   setTimeout(function(){x.className = x.className.replace("show","");},1800);
               }else{
                   this.$router.push("/pregledRestorana")
               }
           })
        },
        izmenaPodataka(){
			this.$router.push("/izmenaPodataka/"+ window.localStorage.getItem("korisnik"));
		  },
        mojiPodaci(){
            this.$router.push("/licniPodaci/"+ window.localStorage.getItem("korisnik"));
            console.log("moji podaci")
          },
        posaljiKupca(por){
            this.pomocniKupac = por;
            this.porudzbine = this.pomocniKupac.porudzbine;
            this.imeKupca = this.pomocniKupac.ime;
            this.prezimeKupca = this.pomocniKupac.prezime;
            console.log(this.pomocniKupac)
        },
		pregledPorudzbina(){
    		

			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiPorudzbine/' + window.localStorage.getItem("korisnik") + "/" + window.localStorage.getItem("uloga"))
    			.then(response => {
					console.log(response.data.length)
                    if(response.data.length == 0){
                        this.greska = "Nemate nijednu porudžbinu!";
					    var x = document.getElementById("greska");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800);
                        //this.$router.push("/")
                    }
                    else{
                        this.$router.push("/pregledPorudzbina/"+ window.localStorage.getItem("korisnik"))
                    }
                   
					
    			})
				.catch(err => {
					this.greska = "Neuspesno!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })


    	},
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
    }
  });