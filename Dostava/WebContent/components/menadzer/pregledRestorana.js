Vue.component("pregledRestorana", {
    data: function () {
      return {
		restoran: {
				id : "",
				naziv: "",
				tipRestorana: 7,
				logo: "",
				artikli: [],
				status: "",
				geografskaDuzina: "",
				geografskaSirina: "",
				ulica: "",
				broj: "",
				mesto: "",
				postanskiBroj: "",
				ocena: ""

		},
        greska: "",
        kj : "slike/logo_final2.png",
		tabs: {
			'Artikli': {
			  title: 'Artikli',
			  body: 'Artikli',
			},
			'Komentari': {
			  title: 'Komentari',
			  body: 'Komentari',
			},
			'Lokacija': {
			  title: 'Lokacija',
			  body: 'Lokacija',
			},
		},
		  activeTab: 'Artikli',
		}
    },
    template: ` 
  <div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
			<a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/">
				<img :src="kj" alt="" width="100" height="80">
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
  		<div class="top1 info-restoran">
			<div class="desno">
				
				<div class="inner1">
					<form>
						<h3>{{restoran.naziv}}  <span v-if="restoran.status == false" class="dot" style="background-color: red;"></span>  
												<span v-if="restoran.status === true" class="dot" style="background-color: green;"></span>
						</h3>
                		<div>
		                    <label for="tip" >Tip</label>
		                    <label id="tip" class="form-control">{{restoran.tipRestorana}}</label>
                		</div>
                		<div>
		                    <label for="lokacija" > Adresa</label>
		                    <label id="lokacija" class="form-control">{{restoran.ulica}} {{restoran.broj}}, {{restoran.mesto}}</label>
                		</div>
                		
					</form>
					
					<form>
						<h3>   </br>    </h3>
						<div>
		                    <label for="status" >&nbsp;Status</label>
		                    <label v-if="restoran.status === true" id="status" style="color: green; width: 230px;" class="form-control">Otvoren&nbsp;</label>
		                    <label v-if="restoran.status === false" id="status" style="color: red; width: 230px;" class="form-control">Zatvoren&nbsp;</label>
                		</div>
                		<div>
		                    <label for="ocena" >&nbsp;Ocena</label>
		                    <label v-if="restoran.ocena === '0.0'" id="ocena" style="width: 230px;" class="form-control">Nema ocena za restoran&nbsp;    </label>
		                    <label v-if="restoran.ocena !== '0.0'" id="ocena" style="width: 230px;" class="form-control">{{restoran.ocena}}&nbsp;      </label>
                		</div>
					</form>
					
				</div>
			
			</div
			<div class="levo">
			<img :src="restoran.logo" class="slikaRestoran">
			<div/>
			
		</div>
		<div class="bottom1">
			<nav>
					<ul class="nav nav-tabs">
						<li
							v-for="(tab, tabName) in tabs"
							:key="tabName"
							
							>
						<a href="#" 
							class="tab dugmeTab nav-link" 
							@click="setTabActive(tabName)"
							:class="{'active': tabName === activeTab}"
						>
							<span class="tab-copy">{{ tabName }}</span>
							<span class="tab-background">
							<span class="tab-rounding left"></span>
							<span class="tab-rounding right"></span>
							</span>
						</a>
						</li>
					</ul>
			</nav>
			<div>
					<transition
						name="fade"
						mode="out-in"
						appear
						:duration="500"
					>
					<tab-content
						v-for="(tabContent, t) in tabs" 
						:data="tabContent"
						:key="'content'+t"
						v-if="t === activeTab"
						inline-template
					>
						<div class="content">
						<h3>{{data.title}}</h3>
						<p>{{data.body}}</p>
						
						</div>
					</tab-content>
					</transition>
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
	computed:{
		tabContent() {
		  return this.tabs[this.activeTab];
		},
	  },

	components:{
		'TabContent': {
		  props: {
			data: Object,
		  },
		}
	},
    mounted () {
        axios 
        .get('rest/korisnici/restoranMenadzera/' + window.localStorage.getItem("korisnik"))
        .then(response => {
            if(response.data != null)
            {     
                this.restoran = response.data;
                console.log(this.restoran);
            }
        })
    },
    methods: {
		setTabActive(tab) {
			this.activeTab = tab; 
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