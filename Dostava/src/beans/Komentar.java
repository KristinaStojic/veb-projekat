package beans;

import java.io.Serializable;

public class Komentar implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 996151912797513297L;

	private String id;
	private String kupac;
	private String restoran;
	private String tekst;
	private Integer ocena; // od 1 do 5
	private Boolean odobren;

	public Komentar() {
		super();
	}

	public Komentar(String id, String kupac, String restoran, String tekst, Integer ocena) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.restoran = restoran;
		this.tekst = tekst;
		this.ocena = ocena;
		this.odobren = false;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKupac() {
		return kupac;
	}

	public void setKupac(String kupac) {
		this.kupac = kupac;
	}

	public String getRestoran() {
		return restoran;
	}

	public void setRestoran(String restoran) {
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

	public Boolean getOdobren() {
		return odobren;
	}

	public void setOdobren(Boolean odobren) {
		this.odobren = odobren;
	}

}
