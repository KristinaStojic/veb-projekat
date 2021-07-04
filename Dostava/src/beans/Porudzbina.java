package beans;

import java.io.Serializable;
import java.util.ArrayList;
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
	private List<ArtikalKorpa> poruceniArtikli;
	private String restoran;
	private Date datumVreme;
	private Double cena;
	private String kupac;
	private Status status;
	private String dostavljac;
	private List<String> dostavljaciKojiZahtevaju;

	public Porudzbina() {
		super();
	}

	public Porudzbina(String id, List<ArtikalKorpa> poruceniArtikli, String restoran, Date datumVreme, Double cena,
			String kupac, Status status) {
		super();
		this.id = id;
		this.poruceniArtikli = poruceniArtikli;
		this.restoran = restoran;
		this.datumVreme = datumVreme;
		this.cena = cena;
		this.kupac = kupac;
		this.status = status;
		this.dostavljaciKojiZahtevaju = new ArrayList<String>();
		this.dostavljac = "";
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		int idLimit = 10;
		this.id = id.substring(0, idLimit);
	}

	public List<ArtikalKorpa> getPoruceniArtikli() {
		return poruceniArtikli;
	}

	public void setPoruceniArtikli(List<ArtikalKorpa> poruceniArtikli) {
		this.poruceniArtikli = poruceniArtikli;
	}

	public String getRestoran() {
		return restoran;
	}

	public void setRestoran(String restoran) {
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

	public String getKupac() {
		return kupac;
	}

	public void setKupac(String kupac) {
		this.kupac = kupac;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public List<String> getDostavljaciKojiZahtevaju() {
		return dostavljaciKojiZahtevaju;
	}

	public void setDostavljaciKojiZahtevaju(List<String> dostavljaciKojiZahtevaju) {
		this.dostavljaciKojiZahtevaju = dostavljaciKojiZahtevaju;
	}
	
	public void dodajDostavljaca(String idDostavljaca) {
		dostavljaciKojiZahtevaju.add(idDostavljaca);
	}

	public String getDostavljac() {
		return dostavljac;
	}

	public void setDostavljac(String dostavljac) {
		this.dostavljac = dostavljac;
	}
	
	
}
