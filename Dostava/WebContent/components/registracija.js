Vue.component("registracija", {
  data: function () {
    return {
      noviKorisnik: {},
      greske: []
    }
  },
  template: ` 

    <div>
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
    <label for="pol" class="form-label">Pol</label>
    <select id="pol" class="form-select" v-model="noviKorisnik.pol">
      <option selected>ŽENSKI</option>
      <option>MUŠKI</option>
    </select>
  </div>
  <div class="col-12" style="width: 400px">
    <label for="datum" class="form-label">Datum rođenja</label>
    <input type="date" id="datum" class="form-control" v-model="noviKorisnik.datumRodjenja" required>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Registruj se</button>
  </div>

  
</form>
  </div>

    	`
  ,
  methods: {
    proveriPodatke: function (event) {
      event.preventDefault();
      this.greske = [];

      if (!this.noviKorisnik.korisnickoIme) {
        this.greske.push('Obavezno uneti korisničko ime!');
      }

      if (!this.noviKorisnik.lozinka) {
        this.greske.push('Obavezno uneti lozinku!');
      }

      if (!this.noviKorisnik.ime) {
        this.greske.push('Obavezno uneti ime!');
      }

      if (!this.noviKorisnik.prezime) {
        this.greske.push('Obavezno uneti prezime!');
      }

      if (!this.greske.length) {
        axios
          .post('rest/korisnici/registracija', {
            "korisnickoIme": this.noviKorisnik.korisnickoIme,
            "lozinka": this.noviKorisnik.lozinka,
            "ime": this.noviKorisnik.ime,
            "prezime": this.noviKorisnik.prezime,
            "pol" : this.noviKorisnik.pol,
            "datumRodjenja" : this.noviKorisnik.datumRodjenja,
            "uloga": "KUPAC"
          })
          .then(response => {
            this.message = response.data;
            console.log("\n\n ------- PODACI -------\n");
            console.log(response.data);
            console.log("\n\n ----------------------\n\n");
            
            location.href = response.data;
          })
          .catch(err => {
            console.log("\n\n ------- ERROR -------\n");
            console.log(err);
            console.log("\n\n ----------------------\n\n");
          })
        return true;
      }

      this.greske.forEach(element => {
        console.log(element)
        toastr["error"](element, "Fail")
      });

    }
  },
  mounted() {
    axios.get('rest/korisnici/noviKorisnik').then(response => (this.noviKorisnik = response.data));
  }
});