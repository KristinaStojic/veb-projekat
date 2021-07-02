package beans;

import java.io.Serializable;

public class ArtikalKorpa implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 456659189850449350L;
	private Artikal artikal;
	private Integer kolicina;

	public ArtikalKorpa() {
		super();
	}
	
	public ArtikalKorpa(Artikal artikal, Integer kolicina) {
		super();
		this.artikal = artikal;
		this.kolicina = kolicina;
	}



	public Artikal getArtikal() {
		return artikal;
	}

	public void setArtikal(Artikal artikal) {
		this.artikal = artikal;
	}

	public Integer getKolicina() {
		return kolicina;
	}

	public void setKolicina(Integer kolicina) {
		this.kolicina = kolicina;
	}

}
