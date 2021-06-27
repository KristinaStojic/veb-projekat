package dto;

import java.util.Date;

import beans.Korisnik.Pol;
import beans.Korisnik.Uloga;

public class KorisnikDTO {

	public String id;
	public String korisnickoIme;
	public String lozinka;
	public String ime;
	public String prezime;
	public Pol pol;
	public Date datumRodjenja;
	public Uloga uloga;

	public KorisnikDTO(String id,String korisnickoIme, String lozinka, String ime, String prezime, Pol pol, Date datumRodjenja,
			Uloga uloga) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
	}

}
