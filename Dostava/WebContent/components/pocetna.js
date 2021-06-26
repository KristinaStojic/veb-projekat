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
        <li class="nav-item"></li>
        <li class="nav-item">
        <router-link to="/registracija" exact> Registracija </router-link>
        </li>
      </ul>
    </div>
  </div>
 
	</nav>

	<div class="row row-cols-1 row-cols-md-3 g-4" v-for="(r, i) in restorani">
  		<div class="card" style="width: 18rem;">
        <img :src="r.logo" class="card-img-top" alt="">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">{{r.naziv}}</li>
              <li class="list-group-item">{{r.tipRestorana}}</li>
              <li class="list-group-item">{{r.status}}</li>
            </ul>
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