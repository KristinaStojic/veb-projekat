package dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import beans.Korisnik.Pol;
import beans.Korisnik.Uloga;

public class KorisnikPrikazDTO {

	public String id;
	public String korisnickoIme;
	public String imePrezime;
	public String pol;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	public Date datumRodjenja;
	public String uloga;
	public String ime;
	public String prezime;
	
	String tipKupca;
	Double brojBodova;

	public KorisnikPrikazDTO() {
		super();
	}
	
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getKorisnickoIme() {
		return korisnickoIme;
	}


	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}


	public String getImePrezime() {
		return imePrezime;
	}


	public void setImePrezime(String imePrezime) {
		this.imePrezime = imePrezime;
	}


	public String getPol() {
		return pol;
	}


	public void setPol(String pol) {
		this.pol = pol;
	}


	public Date getDatumRodjenja() {
		return datumRodjenja;
	}


	public void setDatumRodjenja(Date datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}


	public String getUloga() {
		return uloga;
	}


	public void setUloga(String uloga) {
		this.uloga = uloga;
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

	public KorisnikPrikazDTO(String id, String korisnickoIme, String imePrezime, String pol, Date datumRodjenja,
			String uloga, String ime, String prezime) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.imePrezime = imePrezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
		this.ime = ime;
		this.prezime = prezime;
	}


	public String getTipKupca() {
		return tipKupca;
	}


	public void setTipKupca(String tipKupca) {
		this.tipKupca = tipKupca;
	}


	public Double getBrojBodova() {
		return brojBodova;
	}


	public void setBrojBodova(Double brojBodova) {
		this.brojBodova = brojBodova;
	}


	public KorisnikPrikazDTO(String id, String korisnickoIme, String imePrezime, String pol, Date datumRodjenja,
			String uloga, String ime, String prezime, String tipKupca, Double brojBodova) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.imePrezime = imePrezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
		this.ime = ime;
		this.prezime = prezime;
		this.tipKupca = tipKupca;
		this.brojBodova = brojBodova;
	}


	
	
	
	
	
	
}
