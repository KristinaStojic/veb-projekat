package beans;

import java.io.Serializable;
import java.util.List;

public class Restoran implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7705934003444955722L;

	public enum TipRestorana {
		ITALIJANSKI, KINESKI, ROSTILJ, SRPSKI, GRCKI, VEGETARIJANSKI, BRZA_HRANA, RAZNO // ako dodajes, dodaj dole u metodu
	} // i na frontu kod dodavanja

	private String id;
	private Integer logickoBrisanje;
	private String naziv;
	private TipRestorana tipRestorana;
	private List<Artikal> artikliUPonudi;
	private Boolean status;
	private Lokacija lokacija;
	private String logo;

	public Restoran() {
		super();
	}

	public Restoran(String id, Integer logickoBrisanje, String naziv, TipRestorana tipRestorana,
			List<Artikal> artikliUPonudi, Boolean status, Lokacija lokacija, String slika) {
		super();
		this.id = id;
		this.logickoBrisanje = logickoBrisanje;
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.artikliUPonudi = artikliUPonudi;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = slika;
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

	public String getLogo() {
		return logo;
	}

	public void setLogo(String putanja) {
		this.logo = putanja;
	}

	public String statusString() {
		if (status) {
			return "Otvoreno";
		}

		return "Zatvoreno";
	}

	public String tipString() {
		// ITALIJANSKI, KINESKI, ROSTILJ, SRPSKI, GRCKI, VEGETARIJANSKI, BRZA_HRANA, RAZNO
		switch (tipRestorana) {
		case ITALIJANSKI:
			return "Italijanska hrana";
		case KINESKI:
			return "Kineska hrana";
		case ROSTILJ:
			return "Jela sa roštilja";
		case SRPSKI:
			return "Srpska hrana";
		case GRCKI:
			return "Grčka hrana";
		case VEGETARIJANSKI:
			return "Vegetarijanska hrana";
		case BRZA_HRANA:
			return "Brza hrana";
		default:
			return "Raznolika kuhinja";
		}
	}
}
