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
	private Boolean obradjen;
	private String idPorudzbine;
	private Integer logickoBrisanje;

	public Komentar() {
		super();
	}

	public Komentar(String id, String kupac, String restoran, String tekst, Integer ocena, String idPorudzbine) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.restoran = restoran;
		this.tekst = tekst;
		this.ocena = ocena;
		this.odobren = false;
		this.obradjen = false;
		this.idPorudzbine = idPorudzbine;
		this.logickoBrisanje = 0;
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

	public Boolean getObradjen() {
		return obradjen;
	}

	public void setObradjen(Boolean obradjen) {
		this.obradjen = obradjen;
	}

	public String getIdPorudzbine() {
		return idPorudzbine;
	}

	public void setIdPorudzbine(String idPorudzbine) {
		this.idPorudzbine = idPorudzbine;
	}

	public Integer getLogickoBrisanje() {
		return logickoBrisanje;
	}

	public void setLogickoBrisanje(Integer logickoBrisanje) {
		this.logickoBrisanje = logickoBrisanje;
	}

	/*public Komentar(String id, String kupac, String restoran, String tekst, Integer ocena, Boolean odobren,
			Boolean obradjen, String idPorudzbine) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.restoran = restoran;
		this.tekst = tekst;
		this.ocena = ocena;
		this.odobren = odobren;
		this.obradjen = obradjen;
		this.idPorudzbine = idPorudzbine;
	}*/

	
}
