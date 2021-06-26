Vue.component("pocetna", {
	data: function() {
		return {
			restorani: null
		}
	},
	template: ` 

	<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light static-top mb-5 shadow">
  <div class="container">
    <a class="navbar-brand" href="#">K&J</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
        <router-link to="/prijava" exact> Prijava </router-link>
        </li>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <li class="nav-item"></li>
        <li class="nav-item">
        <router-link to="/registracija" exact> Registracija </router-link>
        </li>
      </ul>
    </div>
  </div>
 
	</nav>

	<div class="container-fluid content-row">
	<div class="row">
		<div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px" v-for="(r, i) in restorani">
  		<div class="card" >
        <img :src="r.logo" class="card-img-top" alt="Card image cap">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><b>{{r.naziv}}</b></li>
              <li class="list-group-item">{{r.tipRestorana}}</li>
              <li v-if="r.status === 'Otvoreno'" style="color:green;" class="list-group-item">{{r.status}}</li>
              <li v-if="r.status === 'Zatvoreno'" style="color:red;" class="list-group-item">{{r.status}}</li>
              <li class="list-group-item">{{r.lokacija}}</li>
            </ul>
            </div>
      </div>
     </div>
  </div>
</div>		
    	`
	,
	mounted() {
		axios
			.get('rest/restorani/')
			.then(response => (this.restorani = response.data))
	}
	,
	methods: {

	}
});