Vue.component("registracija", { 
	data: function () {
	    return {
            noviKorisnik: {},
            greske: []
	    }
	},
	    template: ` 

    <div>
    <form class="row g-3">
  <div class="col-md-6">
    <label for="ime" class="form-label">Ime</label>
    <input type="text" class="form-control" id="ime">
  </div>
  <div class="col-md-6">
    <label for="prezime" class="form-label">Prezime</label>
    <input type="text" class="form-control" id="prezime">
  </div>
  <div class="col-12">
    <label for="korIme" class="form-label">Korisničko ime</label>
    <input type="text" class="form-control" id="korIme">
  </div>
  <div class="col-12">
    <label for="lozinka" class="form-label">Lozinka</label>
    <input type="password" class="form-control" id="lozinka">
  </div>
  <div class="col-md-4">
    <label for="pol" class="form-label">Pol</label>
    <select id="pol" class="form-select">
      <option selected>ŽENSKI</option>
      <option>MUŠKI</option>
    </select>
  </div>
  <div class="container mt-5 mb-5" style="width: 400px">
    <label for="datum" class="form-label">Datum rođenja</label>
    <input type="date" id="datum" class="form-control">
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Registruj se</button>
  </div>

  
</form>
  </div>

    	`
    	, 
	methods : {
        
    }
});