Vue.component("pocetnaStranaKupac", { 
	data: function () {
	    return {
            greska: "",
			selektovan : "false",






			message: 'Hello',
    tabs: {
      'Tab 1': {
        title: 'Cao TAB1',
        body: 'Evo u tabu 1',
      },
      'Tab 2': {
        title: 'Cao TAB2',
        body: 'Evo u tabu 2',
      },
      'Tab 3': {
        title: 'Cao TAB3',
        body: 'Evo u tabu 3',
      },
      'Tab 4': {
        title: 'Cao TAB4',
        body: 'Evo me u tabu 4'
      },
    },
    activeTab: 'Tab 1',
	    }
	},
	    template: ` 
		<div>
			<nav class="navbar navbar-expand-lg navbar-light bg-light navigacija">
				<a class="navbar-brand" href="#">K&J</a>
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
								<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
							</div>
						</li>

						
					</ul>

					
				</div>

				<div id="greska" class="snackbar">{{greska}}</div>
			</nav>

		


				<div>
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
				</div>


			
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
						<h3>{{data.title}}</h1>
						<p>{{data.body}}</p>
						
						</div>
					</tab-content>
					</transition>
					</div>
			



		</div>
    	`
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
	methods : {
			
		setTabActive(tab) {
			this.activeTab = tab; 
		  },

		odjava : function() {
    		axios 
    			.post('/DostavaREST/rest/korisnici/odjava')
    			.then(response => {
					window.localStorage.removeItem("korisnik");
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