package dto;

public class PorudzbinePrikazKupacaDTO {

	public String idPorudzbine;
	public Double ukupnaCena;
	
	public PorudzbinePrikazKupacaDTO(String idPorudzbine, Double ukupnaCena) {
		super();
		this.idPorudzbine = idPorudzbine;
		this.ukupnaCena = ukupnaCena;
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
	
	
}
