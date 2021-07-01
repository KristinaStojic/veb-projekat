Vue.component("pregledKorpe", {
    data: function () {
      return {
		korpa : {
			artikli:[],
			korisnik : "",
			cena : 0.0,
			tipKupca : 0
		},
        greska: "",
        logo : "slike/logo_final2.png"
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
		<div style="padding-right:30px;" class="izmena">
			<h3>Pregled korpe</h3>
			<table  class="table table-hover">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">Naziv artikla</th>
			      <th scope="col">Tip</th>
			      <th scope="col">Količina po porciji</th>
				  <th scope="col">Cena po porciji</th>
				  <th scope="col">Količina</th>
				  <th scope="col">Ukupna cena</th>
		
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for="(a, i) in this.korpa.artikli">
			      <th scope="row">{{i+1}}</th>
			      <td>{{a.naziv}}</td>
			      <td>{{a.tipArtikla}}</td>
			      <td>{{a.kolicina}}</td>
			      <td>{{a.cena}} RSD</td>
			      <td>{{a.kolicinaKorpa}}</td>
			      <td>{{a.ukupnoCena}} RSD</td>
				  <td style="border-style:none" v-if="a.kolicinaKorpa > '1'"><button  @click="a.kolicinaKorpa--; a.ukupnoCena -= a.cena ;korpa.cena -= a.cena"  
							 class="okruglo">-</button></td>
     			  <td style="border-style:none" v-else><button class="okruglo">-</button></td>
				  <td style="border-style:none"><input type="number" min="0" style="width:50px; text-align:center;" v-model="a.kolicinaKorpa"></td>
				  <td style="border-style:none"><button @click="a.kolicinaKorpa++; a.ukupnoCena += a.cena; korpa.cena += a.cena" class="okruglo">+</button></td>
				  <td style="border-style:none"><a @click="korpa.artikli.splice(i, 1); korpa.cena -= a.ukupnoCena" href="#" style="text-decoration: underline; color:black;">Ukloni</a></td>
			    </tr>
			  </tbody>
			  <tfoot style="margin-top:20px;">
					<td colspan="3"><td/>
   					<td style="font-size: large;"><b>Ukupno:</b> </td>
					<td colspan="2" style="color:coral; font-size: large;text-align:right;"><b>{{this.korpa.cena}} RSD</b></td>
					<td style="border-style:none"></td>
					<td style="border-style:none" colspan="3"><button @click="poruci" class="dugme1" style=" width:170px" >Poruči</button> <td/>
  			  </tfoot>
			</table>
		</div>
  		</div>
  	</div>
  </div>
  `
    ,
    mounted () {
			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiKorpu/' + this.$route.params.id )
    			.then(response => {
					this.korpa = response.data;
					console.log(this.korpa)
					
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
		poruci : function(event) {
			event.preventDefault();
			
			if(this.korpa.artikli.length === 0){
					console.log("radi")
					this.greska = "Korpa ne može biti prazna!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
			}else{
				
				axios 
    			.post('/DostavaREST/rest/porudzbine/', this.korpa)
    			.then(response => {
					
					this.greska = "Uspešno izvršena porudžbina!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
					
    			})
				.catch(err => {
					this.greska = "Neuspešno!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })
				
			}
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
    		
    	}
    }
  });