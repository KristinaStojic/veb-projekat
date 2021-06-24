Vue.component("registracija", {
  data: function () {
    return {
      noviKorisnik: {
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
        pol: 0,
        datumRodjenja: "",
        uloga: 3
      },
      lozinka2: ""
    }
  },
  template: ` 

    <form class="row g-3" @submit="proveriPodatke" method='post'>
  <div class="col-12">
    <label for="ime" class="form-label">Ime</label>
    <input type="text" class="form-control" id="ime" v-model="noviKorisnik.ime" required>
  </div>
  <div class="col-12">
    <label for="prezime" class="form-label">Prezime</label>
    <input type="text" class="form-control" id="prezime" v-model="noviKorisnik.prezime" required>
  </div>
  <div class="col-12">
    <label for="korIme" class="form-label">Korisničko ime</label>
    <input type="text" class="form-control" id="korIme" v-model="noviKorisnik.korisnickoIme" required>
  </div>
  <div class="col-12">
    <label for="lozinka" class="form-label">Lozinka</label>
    <input type="password" class="form-control" id="lozinka" v-model="noviKorisnik.lozinka" required>
  </div>
  <div class="col-12">
  <label for="lozinka2" class="form-label">Ponovite lozniku</label>
  <input type="password" class="form-control" id="lozinka2" v-model="lozinka2" required>
</div>
  <div class="col-12">
    <label for="pol" class="form-label">Pol</label>
    <select id="pol" class="form-select" v-model="noviKorisnik.pol">
      <option selected>Izaberite pol</option>
      <option value=0>Ženski</option>
      <option value=1>Muški</option>
    </select>
  </div>
  <div class="col-12" style="width: 400px">
    <label for="datum" class="form-label">Datum rođenja</label>
    <vuejs-datepicker id="datum" style="padding-left:35px;" v-model="noviKorisnik.datumRodjenja"></vuejs-datepicker>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Registruj se</button>
  </div>

  
</form>
  </div>

    	`
  ,
  components:{
    vuejsDatepicker
  }
  ,
  methods: {
    proveriPodatke: function (event) {
      event.preventDefault();

      if (!this.noviKorisnik.korisnickoIme) {
        alert('Obavezno uneti korisničko ime!');
      } else if (!this.noviKorisnik.lozinka) {
        alert('Obavezno uneti lozinku!');
      } else if (!this.noviKorisnik.ime) {
        alert('Obavezno uneti ime!');
      } else if (!this.noviKorisnik.prezime) {
        alert('Obavezno uneti prezime!');
      } else if (this.noviKorisnik.lozinka.localeCompare(this.lozinka2) != 0) {
        alert('Lozinke se ne poklapaju!');
      } else{
        axios
          .post('/DostavaREST/rest/korisnici/registracija', this.noviKorisnik)
          .then(response => {
            if(response.data.length == 0){
              alert("Korisnik sa ovim korisničkim imenom već postoji!");
            }else{
              alert("Uspešna registracija!");
              this.$router.push("/prijava")
            }
          })
          .catch(err => {
            console.log(err);
          })
        return true;
      }

    }
  }
});