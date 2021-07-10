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
        <navigacija></navigacija>
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
		 
        posaljiKupca(por){
            this.pomocniKupac = por;
            this.porudzbine = this.pomocniKupac.porudzbine;
            this.imeKupca = this.pomocniKupac.ime;
            this.prezimeKupca = this.pomocniKupac.prezime;
            console.log(this.pomocniKupac)
        },
		 
    }
  });