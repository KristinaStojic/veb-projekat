Vue.component("pregledKorpe", {
    data: function () {
      return {
		korpa : {
			artikli:[],
			korisnik : "",
			cena : 0.0,
			tipKupca : 0,
			nedostaje : 0,
			restoran : ""
		},
        greska: "",
		poruka: "",
        logo : "slike/logo_final2.png"
      }
    },
    template: ` 
  <div>
  <navigacija></navigacija>

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
				<h3>Trenutni status naloga: {{this.korpa.tipKupca}}</h3></br>
				<h4 v-if="this.korpa.tipKupca === 'SREBRNI' ">Popust koji je obračunat: 5%</h4>
				<h4 v-if="this.korpa.tipKupca === 'SREBRNI' && this.korpa.nedostaje > 0 ">Potrebno bodova za Zlatni status: {{(this.korpa.nedostaje).toFixed(2)}}</h4>
				<h4 v-if="this.korpa.tipKupca === 'ZLATNI' ">Popust koji je obračunat: 10%</h4>
				<h4 v-if="this.korpa.tipKupca === 'BRONZANI' && this.korpa.nedostaje > 0">Potrebno bodova za Srebrni status: {{(this.korpa.nedostaje).toFixed(2)}}</h4>
				<h4 v-if="this.korpa.nedostaje < 0 ">Sakupljeno dovoljno bodova za sledeći nivo!</h4>
				</div></th>
				</tr>
				<tr style="border-style:none"><th style="border-style:none" colspan="11" scope="colgroup">
					<h3>Pregled korpe</h3>
				</th></tr>
			    <tr>
			      <th scope="col">#</th>
				  <th scope="col">Fotografija</th>
			      <th scope="col">Naziv artikla</th>
			      <th scope="col">Količina po porciji</th>
				  <th scope="col">Cena po porciji</th>
				  <th scope="col">Količina</th>
				  <th scope="col">Ukupna cena</th>
				  <th colspan="4" scope="colgroup"></th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr v-for="(a, i) in this.korpa.artikli">
			      <th style="vertical-align:middle;text-align: center" scope="row">{{i+1}}</th>
				  <td style="vertical-align:middle;text-align: center"><img :src="a.slika" style= "width:100px;height:80px; max-width:100%; max-height:100%;"></td>
			      <td style="vertical-align:middle;text-align: center">{{a.naziv}}</td>
			      <td style="vertical-align:middle;text-align: center" v-if="a.tipArtikla === 'Jelo'">{{a.kolicina}}g</td>
				  <td style="vertical-align:middle;text-align: center" v-else>{{a.kolicina}}ml</td>
			      <td style="vertical-align:middle;text-align: center">{{a.cena}} RSD</td>
			      <td style="vertical-align:middle;text-align: center">{{a.kolicinaKorpa}}</td>
			      <td style="vertical-align:middle;text-align: center">{{a.ukupnoCena}} RSD</td>
				  <td style="border-style:none;vertical-align:middle" v-if="a.kolicinaKorpa > '1'"><button  @click="a.kolicinaKorpa--; a.ukupnoCena -= a.cena ;korpa.cena -= a.cena"  
							 v-on:click="azurirajKorpu(a)" class="okruglo">-</button></td>
     			  <td style="border-style:none;vertical-align:middle" v-else><button class="okruglo">-</button></td>
				  <td style="border-style:none;vertical-align:middle"><input type="number" min="0" @keyup="korpa.cena -= a.ukupnoCena; a.ukupnoCena = a.kolicinaKorpa * a.cena; korpa.cena += a.ukupnoCena" 
					v-on:keyup="azurirajKorpu(a)" style="width:50px; text-align:center;" v-model="a.kolicinaKorpa"></td>
				  <td style="border-style:none;vertical-align:middle"><button @click="a.kolicinaKorpa++; a.ukupnoCena += a.cena; korpa.cena += a.cena" 
					v-on:click="azurirajKorpu(a)" class="okruglo">+</button></td>
				  <td style="border-style:none;vertical-align:middle"><a @click="korpa.artikli.splice(i, 1); korpa.cena -= a.ukupnoCena" href="#" 
					v-on:click="brisanje(a.naziv)" style="text-decoration: underline; color:black;">Ukloni</a></td>
			    </tr>
			  </tbody>
			  <tfoot style="margin-top:20px;">
					<td colspan="3"><td/>
   					<td style="font-size: large;"><b>Ukupno:</b> </td>
					<td colspan="2" style="color:coral; font-size: large;text-align:right;"><b>{{this.korpa.cena}} RSD</b></td>
					<td></td>
					<td  colspan="3"><button @click="poruci" class="dugme1" style=" width:170px" >Poruči</button> <td/>
  			  </tfoot>
			</table>
		</div>
  		</div>
  	</div>

			<div class="modal" id="promenaStanja">
                    <div class="modal-dialog modal-dialog-centered" style="max-width: 50%;">
                        <div class="modal-content">
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: center">
							<h5 class="modal-title">{{poruka}}</h5>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal" @click="potvrdiPorudzbinu">Potvrdi</button>
                        </div>

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
		 
		brisanje(ime){
			
			const artikal = {naziv: ime, kolicinaKorpa : 0, cena: 0, restoran: this.korpa.restoran}
			this.azurirajKorpu(artikal);
			
		},
		azurirajKorpu(artikal){
			if (!artikal.kolicinaKorpa) { if(artikal.kolicinaKorpa != 0){console.log("izbacio sam"); return }}
			console.log(this.korpa.cena)
			axios 
    			.post('/DostavaREST/rest/korisnici/azurirajKorpu/' + this.korpa.korisnik, artikal)
    			.then(response => {
					console.log("Uspešno")
    			})
				.catch(err => {
					this.greska = "Neuspešno!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
				  })
			if(this.korpa.artikli.length === 0){
					
					this.greska = "Korpa ne može biti prazna!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
			}
		},
		potvrdiPorudzbinu(){
			this.$router.push("/pregledPorudzbina/" + window.localStorage.getItem("korisnik"));
		}
		,
		poruci : function(event) {
			event.preventDefault();
			
			if(this.korpa.artikli.length === 0){
					
					this.greska = "Korpa ne može biti prazna!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
			}else{
				
				axios 
    			.post('/DostavaREST/rest/porudzbine/', this.korpa)
    			.then(response => {
					if(response.data != 0){
						this.poruka = response.data;
					$('#promenaStanja').modal('show'); 
					}else{
					this.greska = "Uspešno izvršena porudžbina!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/pregledPorudzbina/" + window.localStorage.getItem("korisnik"))}
					
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
        
    }
  });