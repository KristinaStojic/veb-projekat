package beans;

import java.awt.Image;
import java.io.Serializable;

public class Artikal implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1917732993380397288L;

	public enum TipArtikla {
		JELO, PICE
	}

	private String naziv;
	private Double cena;
	private TipArtikla tipArtikla;
	private String restoran;
	private Double kolicina; // grami ili milimetri
	private String opis;
	private String slika;

	public Artikal() {
		super();
	}

	public Artikal(String naziv, Double cena, TipArtikla tipArtikla, String restoran, Double kolicina, String opis,
			String slika) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.tipArtikla = tipArtikla;
		this.restoran = restoran;
		this.kolicina = kolicina;
		this.opis = opis;
		this.slika = slika;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Double getCena() {
		return cena;
	}

	public void setCena(Double cena) {
		this.cena = cena;
	}

	public TipArtikla getTipArtikla() {
		return tipArtikla;
	}

	public void setTipArtikla(TipArtikla tipArtikla) {
		this.tipArtikla = tipArtikla;
	}

	public String getRestoran() {
		return restoran;
	}

	public void setRestoran(String restoran) {
		this.restoran = restoran;
	}

	public Double getKolicina() {
		return kolicina;
	}

	public void setKolicina(Double kolicina) {
		this.kolicina = kolicina;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getSlika() {
		return slika;
	}

	public void setSlika(String slika) {
		this.slika = slika;
	}

	public String tipString() {
		if (this.tipArtikla == TipArtikla.JELO) {
			return "Jelo";
		} else {
			return "Piće";
		}
	}

}
