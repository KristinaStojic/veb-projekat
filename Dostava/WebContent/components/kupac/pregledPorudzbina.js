Vue.component("pregledPorudzbina", {
    data: function () {
      return {
		logo : "slike/logo_final2.png",
        greska: "",

        porudzbine: {
            artikli:[],			
			cena : 0.0,
            datumVreme : "",
            id: "",
            kupac: "",
            restoran: null,
			status: ""
			
        },

        pomocnaPorudzbina : []


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
							<li class="nav-item dropdown">
								<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
									<i class="zmdi zmdi-account zmdi-hc-2x"></i>
								</div>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
									<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
                                    <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
									<div class="dropdown-divider"></div>
									<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
								</div>
							</li>

							</ul>
				</div>

	        </nav>




            <div class="bottom">
                <div class="slika-registracija">
                    <div id="greska" class="snackbar">{{greska}}</div>
                        <div style="padding-right:30px;" class="korpa ">
                            
                            <table  class="table table-hover align-middle">
                                
                                <colgroup span="11"></colgroup>
                                <colgroup span="4"></colgroup>
                            <thead>
                                <tr >
                                    <th style="border-style:none" colspan="11" scope="colgroup"><div style="background:white: text-decoration: underline; color:gray;">
                                <h3>Pregled porudžbina:</h3></br>
                                
                                </div></th>
                                </tr>
                                
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Datum i vreme</th>
                                <th scope="col">Restoran</th>			      
                                <th scope="col">Ukupna cena</th>
                                <th scope="col">Status</th>
                                <th scope="col">Detalji</th>
                                <th colspan="4" scope="colgroup"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(p, i) in this.porudzbine">
                                    <th style="vertical-align:middle;text-align: center" scope="row">{{i+1}}</th>
                                    <td style="vertical-align:middle;text-align: center">{{p.datumVreme}}</td>
                                    <td style="vertical-align:middle;text-align: center">{{p.restoran}}</td>
                                    <td style="vertical-align:middle;text-align: center">{{p.cena}}</td>
                                    <td style="vertical-align:middle;text-align: center">{{p.status}}</td>
                                    <td style="vertical-align:middle;text-align: center">
                                    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal" @click="posaljiPorudzbinu(p.artikli)">
                                    Detalji
                                  </button>                 
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div> 


                <div class="modal" id="myModal">
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" style="max-width: 50%;">
                        <div class="modal-content">

                        

                        <!-- Modal body -->
                        <div class="modal-body">
                        <table  class="table table-hover align-middle">
                                
                        <colgroup span="11"></colgroup>
                        <colgroup span="4"></colgroup>
                    <thead>
                        <tr >
                            <th style="border-style:none" colspan="11" scope="colgroup"><div style="background:white: text-decoration: underline; color:gray;">
                        <h4>Spisak artikala:</h4></br>
                        
                        </div></th>
                        </tr>
                        
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fotografija</th>
                        <th scope="col">Naziv artikla</th>
                        <th scope="col">Količina po porciji</th>
                        <th scope="col">Cena po porciji</th>
                        <th scope="col">Količina poručenih</th>
                        <th scope="col">Ukupna cena</th>
                        <th colspan="4" scope="colgroup"></th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr v-for="(p, i) in this.pomocnaPorudzbina">
                            <th style="vertical-align:middle;text-align: center" scope="row">{{i+1}}</th>
                            <td style="vertical-align:middle;text-align: center"><img :src="p.slika" style= "width:100px;height:80px; max-width:100%; max-height:100%;"></td>
                            <td style="vertical-align:middle;text-align: center">{{p.naziv}}</td>
                            <td style="vertical-align:middle;text-align: center" v-if="p.tip === 'JELO'">{{p.kolicina}}g</td>
                            <td style="vertical-align:middle;text-align: center" v-else>{{p.kolicina}}ml</td>
                            <td style="vertical-align:middle;text-align: center">{{p.cena}} RSD</td>
                            <td style="vertical-align:middle;text-align: center">{{p.kolicinaPorucenih}}</td>
                            <td style="vertical-align:middle;text-align: center">{{p.kolicinaPorucenih * p.cena}} RSD</td>
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



        

    ` 
    ,
	
    mounted () {
		
        axios 
    			.get('/DostavaREST/rest/korisnici/nadjiPorudzbine/' + this.$route.params.id)
    			.then(response => {
					
                    console.log(response.data)
                    this.porudzbine = response.data
                    console.log(this.porudzbine)
                    console.log(this.porudzbine[0].artikli)
					
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


        posaljiPorudzbinu(por){
            this.pomocnaPorudzbina = por;
            console.log(this.pomocnaPorudzbina.naziv)
            console.log(this.pomocnaPorudzbina.cena)
            console.log(this.pomocnaPorudzbina.kolicina)
        }
        
    
    }
  });