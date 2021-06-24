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

    <table align="center">
    
 
        <div class="col-12">
        </tr>
            <td><label for="ime" class="form-label">Ime</label></td>
            <td><input type="text" class="form-control" id="ime" v-model="noviKorisnik.ime" required style="width:250px" align="center"></td>
        </tr>
        </div>
        
        <tr>
        <div class="col-12">
            <td><label for="prezime" class="form-label ">Prezime</label></td>
            <td><input type="text" class="form-control" id="prezime" v-model="noviKorisnik.prezime" required style="width:250px" text-align: center></td>
        </div>
        </tr>

        <tr>
        <div class="col-12">
            <td><label for="korIme" class="form-label ">Korisničko ime</label></td>
            <td><input type="text" class="form-control" id="korIme" v-model="noviKorisnik.korisnickoIme" required style="width:250px"></td>
        </div>
        </tr>

        <tr>
        <div class="col-12">
            <td><label for="lozinka" class="form-label ">Lozinka</label></td>
            <td><input type="password" class="form-control" id="lozinka" v-model="noviKorisnik.lozinka" required style="width:250px"></td>
        </div>
        </tr>

        <tr>
        <div class="col-12">
            <td><label for="lozinka2" class="form-label ">Ponovite lozniku</label></td>
            <td><input type="password" class="form-control" id="lozinka2" v-model="lozinka2" required style="width:250px"></td>
        </div>
        </tr>

        <tr>
        <div class="col-12">
            <td><label for="pol" class="form-label center" align="center">Pol</label></td>
            <td><select id="pol" class="form-select center" v-model="noviKorisnik.pol" style="width:250px">
            <option selected>Izaberite pol</option>
            <option value=0>Ženski</option>
            <option value=1>Muški</option>
            </select></td>
        </div>
        </tr>

        <tr>
        <div class="col-12">
            <td><label for="datum" class="form-label">Datum rođenja</label></td>
            <td><vuejs-datepicker id="datum" style="width:250px"  v-model="noviKorisnik.datumRodjenja"></vuejs-datepicker></td>
            <br/>
        </div>
        </tr>

        <tr>
        <div class="col-12">
            <br/>
            <td></td>
            <td><button type="submit" class="btn btn-primary">Registruj se</button></td>
        </div>
        </tr>
        
    </table>
  
    </form>
  

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