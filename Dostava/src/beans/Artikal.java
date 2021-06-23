package beans;

import java.awt.Image;
import java.io.Serializable;

enum TipArtikla {
	JELO, PICE
}

public class Artikal implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1917732993380397288L;

	private String naziv;
	private Double cena;
	private TipArtikla tipArtikla;
	private Restoran restoran;
	private Double kolicina; // da li ovako? posto je u gramima ili mililitrima
	private String opis;
	private Image slika;

	public Artikal() {
		super();
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

	public Restoran getRestoran() {
		return restoran;
	}

	public void setRestoran(Restoran restoran) {
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

	public Image getSlika() {
		return slika;
	}

	public void setSlika(Image slika) {
		this.slika = slika;
	}

}
