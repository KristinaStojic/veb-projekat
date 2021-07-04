package dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import beans.Porudzbina.Status;
import beans.Restoran;

public class PorudzbinePrikazDTO {

	public String id;
	public List<ArtikliPorudzbineDTO> artikli;
	public String kupac;
	public String restoran;
	public Double cena;
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss")
	public Date datumVreme;
	public Status status;
	public String tipRestorana;
	
	public PorudzbinePrikazDTO(String id, String kupac, String restoran, Double cena,
			Date datumVreme, Status status) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.restoran = restoran;
		this.cena = cena;
		this.datumVreme = datumVreme;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<ArtikliPorudzbineDTO> getArtikli() {
		return artikli;
	}

	public void setArtikli(List<ArtikliPorudzbineDTO> artikli) {
		this.artikli = artikli;
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

	public Double getCena() {
		return cena;
	}

	public void setCena(Double cena) {
		this.cena = cena;
	}

	public Date getDatumVreme() {
		return datumVreme;
	}

	public void setDatumVreme(Date datumVreme) {
		this.datumVreme = datumVreme;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getTipRestorana() {
		return tipRestorana;
	}

	public void setTipRestorana(String tipRestorana) {
		this.tipRestorana = tipRestorana;
	}

	public PorudzbinePrikazDTO(String id, List<ArtikliPorudzbineDTO> artikli, String kupac, String restoran,
			Double cena, Date datumVreme, Status status, String tipRestorana) {
		super();
		this.id = id;
		this.artikli = artikli;
		this.kupac = kupac;
		this.restoran = restoran;
		this.cena = cena;
		this.datumVreme = datumVreme;
		this.status = status;
		this.tipRestorana = tipRestorana;
	}
	
	
	
}
