package beans;

import java.io.Serializable;
import java.util.List;

public class Korpa implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3592653701792075085L;

	private List<ArtikalKorpa> artikli;
	private String korisnik;
	private Double cena;
	private String restoran;

	public Korpa() {
		super();
	}

	public Korpa(List<ArtikalKorpa> artikli, String korisnik, Double cena, String restoran) {
		super();
		this.artikli = artikli;
		this.korisnik = korisnik;
		this.cena = cena;
	}

	public List<ArtikalKorpa> getArtikli() {
		return artikli;
	}

	public void setArtikli(List<ArtikalKorpa> artikli) {
		this.artikli = artikli;
	}

	public String getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}

	public Double getCena() {
		return cena;
	}

	public void setCena(Double cena) {
		this.cena = cena;
	}

	public void povecajCenu(Double cena) {
		this.cena += cena;
	}

	public void smanjiCenu(Double cena) {
		this.cena -= cena;
	}

	public void dodajArtikal(Artikal a, Integer kolicina) {
		this.artikli.add(new ArtikalKorpa(a, kolicina));
	}

	public String getRestoran() {
		return restoran;
	}

	public void setRestoran(String restoran) {
		this.restoran = restoran;
	}

}
