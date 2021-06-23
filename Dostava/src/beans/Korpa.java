package beans;

import java.io.Serializable;
import java.util.List;

public class Korpa implements Serializable {

	/**
	 * 
	 */

	private List<ArtikalKorpa> artikli;
	private Korisnik korisnik;
	private Double cena;

	public Korpa() {
		super();
	}

	public List<ArtikalKorpa> getArtikli() {
		return artikli;
	}

	public void setArtikli(List<ArtikalKorpa> artikli) {
		this.artikli = artikli;
	}

	public Korisnik getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(Korisnik korisnik) {
		this.korisnik = korisnik;
	}

	public Double getCena() {
		return cena;
	}

	public void setCena(Double cena) {
		this.cena = cena;
	}

}
