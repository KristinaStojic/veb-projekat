Vue.component("pocetna", { 
	data: function () {
	    return {
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
        <li class="nav-item active">
        <router-link to="/prijava" exact> Prijava </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Registracija</a>
        </li>
      </ul>
    </div>
  </div>
 
  
</nav>

<div
  class="bg-image"
  style="
    background-image: url('https://image.shutterstock.com/shutterstock/photos/466836764/display_1500/stock-photo-chinese-food-on-white-background-noodles-fried-rice-dumplings-stir-fry-chicken-dim-sum-spring-466836764.jpg');
    height: 400px
	
  "
></div>
</div>		
    	`
    	, 
	methods : {
    
	}
});