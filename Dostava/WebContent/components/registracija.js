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

<div class="slika-registracija" >
<div class="inner">
  <div class="image-holder">
    <div class="pica"></div>
  </div>
  <form @submit="proveriPodatke" method='post'>
    <h3>Registracija</h3>
    <div class="form-group">
      <input type="text" placeholder="Ime" class="form-control" v-model="noviKorisnik.ime">
      <input type="text" placeholder="Prezime" class="form-control" v-model="noviKorisnik.prezime">
    </div>
    <div class="form-wrapper">
      <input type="text" placeholder="Korisničko ime" class="form-control" v-model="noviKorisnik.korisnickoIme">
      <i class="zmdi zmdi-account"></i>
    </div>
    <div class="form-wrapper">
      <vuejs-datepicker style="padding-center:35px;" v-model="noviKorisnik.datumRodjenja"></vuejs-datepicker>
      <i class="zmdi zmdi-assigment"></i>
    </div>
    <div class="form-wrapper">
      <select name="" id="" class="form-control" v-model="noviKorisnik.pol">
        <option value="" disabled selected>Pol</option>
        <option value="0">Ženski</option>
        <option value="1">Muški</option>
      </select>
      <i class="zmdi zmdi-caret-down" style="font-size: 13px"></i>
    </div>
    <div class="form-wrapper">
      <input type="password" placeholder="Lozinka" class="form-control" v-model="noviKorisnik.lozinka">
      <i class="zmdi zmdi-lock"></i>
    </div>
    <div class="form-wrapper">
      <input type="password" placeholder="Potvrdite lozinku" class="form-control" v-model="lozinka2">
      <i class="zmdi zmdi-lock"></i>
    </div>
    <button>Registracija
      <i class="zmdi zmdi-arrow-right"></i>
    </button>
  </form>
</div>
</div>
`
  ,
  components: {
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
      } else {
        axios
          .post('/DostavaREST/rest/korisnici/registracija', this.noviKorisnik)
          .then(response => {
            if (response.data.length == 0) {
              alert("Korisnik sa ovim korisničkim imenom već postoji!");
            } else {
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