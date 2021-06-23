package beans;

import java.io.Serializable;

public class Komentar implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 996151912797513297L;

	private Kupac kupac;
	private Restoran restoran;
	private String tekst;
	private Integer ocena;

	public Komentar() {
		super();
	}

	public Kupac getKupac() {
		return kupac;
	}

	public void setKupac(Kupac kupac) {
		this.kupac = kupac;
	}

	public Restoran getRestoran() {
		return restoran;
	}

	public void setRestoran(Restoran restoran) {
		this.restoran = restoran;
	}

	public String getTekst() {
		return tekst;
	}

	public void setTekst(String tekst) {
		this.tekst = tekst;
	}

	public Integer getOcena() {
		return ocena;
	}

	public void setOcena(Integer ocena) {
		this.ocena = ocena;
	}

}
