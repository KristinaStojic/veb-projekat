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
            restoran: "",
			status: ""
			
        },

        pomocnaPorudzbina : [],

        pomocne: [],

        checked: false,
        obrada : "",
        priprema: "",
        cekaDostavu: "",
        transport: "",
        otkazana: "",
        uloga: "",
        search: "",
        filterTip: "",
        filterStatus: ""


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
									<a class="dropdown-item">Moje porudžbine</a>
									<div class="dropdown-divider"></div>
									<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
								</div>
							</li>

							</ul>
				</div>

	        </nav>




            <div class="bottom" v-if="uloga === 'KUPAC'">
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
                                
                                <label style="font-size:15px">Pretraga: </label>
				                <input type="text" v-model="search" style="height:36px; width:180px" placeholder="Pretražite porudžbine"/>
                                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                <label style="font-size:15px">Nedostavljene: </label>
                                <input type="checkbox" id="checkbox" value="Nedostavljene" v-model="checked" >
                                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp



                                <label style="font-size:15px">Filtriranje: </label>
                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Tip restorana
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('')">Svi</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('BRZA_HRANA')">Brza hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('RAZNO')">Raznolika kuhinja</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('ITALIJANSKI')">Italijanska hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('KINESKI')">Kineska hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('ROSTILJ')">Jela sa roštilja</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('SRPSKI')">Srpska hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('GRCKI')">Grčka hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('VEGETARIJANSKI')">Vegetarijanska hrana</button>

                                </div>


                                
                                </div>

                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Status porudžbine
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('')">Svi</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('OBRADA')">Obrada</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('PRIPREMA')">Priprema</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('CEKA_DOSTAVU')">Čeka dostavu</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('TRANSPORT')">Transport</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('DOSTAVLJENA')">Dostavljena</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('OTKAZANA')">Otkazana</button>

                                </div>
                                </div>

                                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp


                                <label style="font-size:15px;">Sortiranje: </label>
                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                    Izaberite kriterijum
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('restoran', 'asc')">Naziv restorana-uzlazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('restoran', 'desc')">Naziv restorana-silazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('cena', 'asc')">Cena-uzlazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('cena', 'desc')">Cena-silazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('datumVreme', 'asc')">Datum-uzlazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('datumVreme', 'desc')">Datum-silazno</button>
                                 
                                </div>
                                </div>
                                </div></th>
                                </tr>
                                
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Datum i vreme</th>
                                <th scope="col">Restoran</th>			      
                                <th scope="col">Ukupna cena</th>
                                <th scope="col">Status</th>
                                <th scope="col">Detalji</th>
                                <th scope="col">Otkaži</th>
                                <th colspan="4" scope="colgroup"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(p, i) in pronadjene">
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
                                    <td style="vertical-align:middle;text-align: center">
                                    <button v-if="p.status === 'OBRADA'" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#otkazivanje" @click="posaljiPorudzbinu(p)">
                                    Otkaži
                                  </button>                 
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div> 





                <div class="bottom" v-if="uloga === 'DOSTAVLJAC'">
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
                                
                               

                                <label style="font-size:15px">Nedostavljene: </label>
                                <input type="checkbox" id="checkbox" value="Nedostavljene" v-model="checked" >

                                <label style="font-size:15px">Filtriranje: </label>
                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Status porudžbine
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('')">Svi</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('OBRADA')">Obrada</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('PRIPREMA')">Priprema</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('CEKA_DOSTAVU')">Čeka dostavu</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('TRANSPORT')">Transport</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('DOSTAVLJENA')">Dostavljena</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('OTKAZANA')">Otkazana</button>

                                </div>
                                </div>
                                
                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Tip restorana
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('')">Svi</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('BRZA_HRANA')">Brza hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('RAZNO')">Raznolika kuhinja</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('ITALIJANSKI')">Italijanska hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('KINESKI')">Kineska hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('ROSTILJ')">Jela sa roštilja</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('SRPSKI')">Srpska hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('GRCKI')">Grčka hrana</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('VEGETARIJANSKI')">Vegetarijanska hrana</button>

                                </div>
                                </div>

                                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp


                                <label style="font-size:15px;">Sortiranje: </label>
                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                    Izaberite kriterijum
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('restoran', 'asc')">Naziv restorana-uzlazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('restoran', 'desc')">Naziv restorana-silazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('cena', 'asc')">Cena-uzlazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('cena', 'desc')">Cena-silazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('datumVreme', 'asc')">Datum-uzlazno</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('datumVreme', 'desc')">Datum-silazno</button>
                                 
                                </div>
                                </div>
                                </div></th>
                                </tr>
                                
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Datum i vreme</th>
                                <th scope="col">Restoran</th>			      
                                <th scope="col">Ukupna cena</th>
                                <th scope="col">Status</th>
                                <th scope="col">Detalji</th>
                                <th scope="col">Promeni status</th>
                                <th colspan="4" scope="colgroup"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(p, i) in pronadjene">
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
                                    <td style="vertical-align:middle;text-align: center">
                                    <button v-if="p.status === 'CEKA_DOSTAVU' || p.status === 'TRANSPORT'" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal" @click="posaljiPorudzbinu(p.artikli)">
                                    Promeni status
                                  </button>                 
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
                

                <div class="bottom" v-if="uloga === 'MENADZER'">
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
                                <label style="font-size:15px">Filtriranje: </label>
                                <div class="btn-group">
                                <button class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Status porudžbine
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('')">Svi</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('OBRADA')">Obrada</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('PRIPREMA')">Priprema</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('CEKA_DOSTAVU')">Čeka dostavu</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('TRANSPORT')">Transport</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('DOSTAVLJENA')">Dostavljena</button>
                                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterStatus('OTKAZANA')">Otkazana</button>

                                </div>
                                </div>
                                

                                </div></th>
                                </tr>
                                
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Datum i vreme</th>
                                <th scope="col">Restoran</th>			      
                                <th scope="col">Ukupna cena</th>
                                <th scope="col">Status</th>
                                <th scope="col">Detalji</th>
                                <th scope="col">Promeni status</th>
                                <th colspan="4" scope="colgroup"></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr v-for="(p, i) in pronadjene">
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
                                    <td style="vertical-align:middle;text-align: center">
                                    <button v-if="p.status === 'OBRADA' || p.status === 'PRIPREMA'" type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal" @click="posaljiPorudzbinu(p.artikli)">
                                    Promeni status
                                  </button>                 
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div> 


                <div class="modal" id="otkazivanje">
                    <div class="modal-dialog modal-dialog-centered" style="max-width: 50%;">
                        <div class="modal-content">
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: center">
							<h5 class="modal-title">Da li ste sigurni da želite da otkažete porudžbinu iz restorana '<b>{{this.pomocnaPorudzbina.restoran}}</b>'?</h5>
							<hr class="mt-2 mb-3"/>
                        	<p style="font-size:19px">Izgubićete {{(this.pomocnaPorudzbina.cena/1000*133*4).toFixed(2)}} poena</p>
                        </div>

                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Odustani</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal" @click="otkazi()">Potvrdi</button>
                        </div>

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
		this.uloga = window.localStorage.getItem("uloga");
        axios 
                .get('/DostavaREST/rest/korisnici/nadjiPorudzbine/' + this.$route.params.id + "/" + window.localStorage.getItem("uloga"))
    			.then(response => {
					console.log("dsdsd")
                    if(response.data.length == 0){
                        this.greska = "Nemate nijednu porudžbinu!";
					    var x = document.getElementById("greska");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800);
                        //this.$router.push("/")
                    }
                    else{
                        this.porudzbine = response.data
                        console.log(this.porudzbine)
                        this.pomocne = response.data
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
    computed: {
		pronadjene() {
            
			if(this.checked){
				this.otkazana = "OTKAZANA";
                this.priprema = "PRIPREMA";
                this.cekaDostavu = "CEKA_DOSTAVU";
                this.transport = "TRANSPORT";
                this.obrada = "OBRADA"
			}else{
				this.otkazana = "";
                this.priprema = "";
                this.cekaDostavu = "";
                this.transport = "";
                this.obrada = "";
			}
			let filter1 = new RegExp(this.otkazana, 'i');
            let filter2 = new RegExp(this.priprema, 'i');
            let filter3 = new RegExp(this.cekaDostavu, 'i');
            let filter4 = new RegExp(this.transport, 'i');
            let filter5 = new RegExp(this.obrada, 'i');

            let filter6 = new RegExp(this.search, 'i');
            let filter7= new RegExp(this.filterTip, 'i');
            let filter8= new RegExp(this.filterStatus, 'i');
         
            if(this.uloga === "KUPAC"){
                return ( this.pomocne.filter(el => (el.status.match(filter1) 
                || el.status.match(filter2)
                || el.status.match(filter3)
                || el.status.match(filter4)
                || el.status.match(filter5))
                && el.restoran.match(filter6)
                && el.tipRestorana.match(filter7)
                && el.status.match(filter8)
                ));
            }
            else if(this.uloga === "MENADZER"){
                return ( this.pomocne.filter(el => (el.status.match(filter8))
                ));
            }
            else if(this.uloga === "DOSTAVLJAC"){
                return ( this.pomocne.filter(el => (el.status.match(filter8)
                && el.tipRestorana.match(filter7))
                ));
            }
            
          }
        },
    methods: {
		otkazi : function(){
			axios 
    			.post('/DostavaREST/rest/porudzbine/otkaziPorudzbinu/' + this.pomocnaPorudzbina.id)
    			.then(response => {
					this.greska = "Uspešno otkazana porudžbina!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.go();
    			})
				.catch(err => {
					this.greska = "Neuspešno otkazana porudžbina! Pokušajte ponovo.";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					console.log(err);
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


        posaljiPorudzbinu(por){
            this.pomocnaPorudzbina = por;
        },

        postaviFilterTip(value){
            this.filterTip = value;
         },
         postaviFilterStatus(value){
            this.filterStatus = value;
         },

         sortTable(key, direction){
            this.sort = `${key} > ${direction}`
            if (direction === 'asc') {
              this.porudzbine.sort((a, b) => a[key] > b[key] ? 1: -1)
            } else {
              this.porudzbine.sort((a, b) => a[key] < b[key] ? 1: -1)
            }
          },
        
    
    }
  });