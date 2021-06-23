package beans;

import java.awt.Image;
import java.io.Serializable;
import java.util.List;

enum TipRestorana {
	ITALIJANSKI, KINESKI, ROSTILJ, SRPSKI, GRCKI, VEGETARIJANSKI, BRZA_HRANA
}

public class Restoran implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7705934003444955722L;

	private String naziv;
	private TipRestorana tipRestorana;
	private List<Artikal> artikliUPonudi;
	private Boolean status;
	private Lokacija lokacija;
	private Image logo;

	public Restoran() {
		super();
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public TipRestorana getTipRestorana() {
		return tipRestorana;
	}

	public void setTipRestorana(TipRestorana tipRestorana) {
		this.tipRestorana = tipRestorana;
	}

	public List<Artikal> getArtikliUPonudi() {
		return artikliUPonudi;
	}

	public void setArtikliUPonudi(List<Artikal> artikliUPonudi) {
		this.artikliUPonudi = artikliUPonudi;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Lokacija getLokacija() {
		return lokacija;
	}

	public void setLokacija(Lokacija lokacija) {
		this.lokacija = lokacija;
	}

	public Image getLogo() {
		return logo;
	}

	public void setLogo(Image logo) {
		this.logo = logo;
	}

}
