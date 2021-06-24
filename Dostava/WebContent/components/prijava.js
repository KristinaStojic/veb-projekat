Vue.component("prijava", {
	data: function() {
		return {
		}
	},
	template: ` 

	<form>
    <div class="mb-3">
      <label for="korIme" class="form-label">Korisničko ime</label>
      <input type="text" class="form-control" id="korIme">
    </div>
    <div class="mb-3">
      <label for="lozinka" class="form-label">Lozinka</label>
      <input type="password" class="form-control" id="lozinka">
    </div>
    <button type="submit" class="btn btn-primary">Prijavi se</button>
  </form>
    	`
	,
	methods: {

	}
});