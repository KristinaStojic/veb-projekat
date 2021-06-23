package beans;

import java.io.Serializable;
import java.util.Date;

public class Korisnik implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5180637883120284129L;
	
	public enum Pol {
		ZENSKI, MUSKI
	}

	public enum Uloga {
		ADMINISTRATOR, MENADZER, DOSTAVLJAC, KUPAC
	}
	
	private String korisnickoIme;
	private String lozinka;
	private String ime;
	private String prezime;
	private Pol pol;
	private Date datumRodjenja;
	private Uloga uloga;

	public Korisnik() {
		super();
	}
	

	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, Pol pol, Date datumRodjenja,
			Uloga uloga) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
	}



	public String getKorisnickoIme() {
		return korisnickoIme;
	}

	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}

	public String getLozinka() {
		return lozinka;
	}

	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Pol getPol() {
		return pol;
	}

	public void setPol(Pol pol) {
		this.pol = pol;
	}

	public Date getDatumRodjenja() {
		return datumRodjenja;
	}

	public void setDatumRodjenja(Date datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

}
