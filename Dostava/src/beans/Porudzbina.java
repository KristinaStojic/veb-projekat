package beans;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Porudzbina implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4902721773673381758L;

	public enum Status {
		OBRADA, PRIPREMA, CEKA_DOSTAVU, TRANSPORT, DOSTAVLJENA, OTKAZANA
	}

	private String id;
	private List<Artikal> poruceniArtikli;
	private Restoran restoran;
	private Date datumVreme;
	private Double cena;
	private Kupac kupac;
	private Status status;

	public Porudzbina() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		int idLimit = 10;
		this.id = id.substring(0, idLimit);
	}

	public List<Artikal> getPoruceniArtikli() {
		return poruceniArtikli;
	}

	public void setPoruceniArtikli(List<Artikal> poruceniArtikli) {
		this.poruceniArtikli = poruceniArtikli;
	}

	public Restoran getRestoran() {
		return restoran;
	}

	public void setRestoran(Restoran restoran) {
		this.restoran = restoran;
	}

	public Date getDatumVreme() {
		return datumVreme;
	}

	public void setDatumVreme(Date datumVreme) {
		this.datumVreme = datumVreme;
	}

	public Double getCena() {
		return cena;
	}

	public void setCena(Double cena) {
		this.cena = cena;
	}

	public Kupac getKupac() {
		return kupac;
	}

	public void setKupac(Kupac kupac) {
		this.kupac = kupac;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
