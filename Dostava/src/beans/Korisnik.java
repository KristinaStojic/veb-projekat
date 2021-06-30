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
		ADMINISTRATOR, MENADZER, DOSTAVLJAC, KUPAC, GOST
	}

	private String id;
	private Integer logickoBrisanje; // 1 - obrisan, 0 - nije obrisan
	private String korisnickoIme;
	private String lozinka;
	private String ime;
	private String prezime;
	private Pol pol;
	private Date datumRodjenja;
	private Uloga uloga;
	private Integer blokiran;

	public Korisnik() {
		super();
	}
	
	public Korisnik(Korisnik k) {
		super();
		this.id = k.id;
		this.logickoBrisanje = k.logickoBrisanje;
		this.korisnickoIme = k.korisnickoIme;
		this.lozinka = k.lozinka;
		this.ime = k.ime;
		this.prezime = k.prezime;
		this.pol = k.pol;
		this.datumRodjenja = k.datumRodjenja;
		this.uloga = k.uloga;
	}

	public Korisnik(String id, Integer logickoBrisanje, String korisnickoIme, String lozinka, String ime,
			String prezime, Pol pol, Date datumRodjenja, Uloga uloga) {
		super();
		this.id = id;
		this.logickoBrisanje = logickoBrisanje;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getLogickoBrisanje() {
		return logickoBrisanje;
	}

	public void setLogickoBrisanje(Integer logickoBrisanje) {
		this.logickoBrisanje = logickoBrisanje;
	}

	public Integer getBlokiran() {
		return blokiran;
	}

	public void setBlokiran(Integer blokiran) {
		this.blokiran = blokiran;
	}

	public Korisnik(String id, Integer logickoBrisanje, String korisnickoIme, String lozinka, String ime,
			String prezime, Pol pol, Date datumRodjenja, Uloga uloga, Integer blokiran) {
		super();
		this.id = id;
		this.logickoBrisanje = logickoBrisanje;
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
		this.blokiran = blokiran;
	}
	
	

}
