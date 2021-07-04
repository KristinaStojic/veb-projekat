package dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PorudzbinePrikazKupacaDTO {

	public String idPorudzbine;
	public Double ukupnaCena;
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy HH:mm:ss")
	public Date datum;
	
	public PorudzbinePrikazKupacaDTO(String idPorudzbine, Double ukupnaCena, Date datum) {
		super();
		this.idPorudzbine = idPorudzbine;
		this.ukupnaCena = ukupnaCena;
		this.datum = datum;
	}
	
	public String getIdPorudzbine() {
		return idPorudzbine;
	}
	public void setIdPorudzbine(String idPorudzbine) {
		this.idPorudzbine = idPorudzbine;
	}
	public Double getUkupnaCena() {
		return ukupnaCena;
	}
	public void setUkupnaCena(Double ukupnaCena) {
		this.ukupnaCena = ukupnaCena;
	}

	public Date getDatum() {
		return datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}
	
	
	
}
