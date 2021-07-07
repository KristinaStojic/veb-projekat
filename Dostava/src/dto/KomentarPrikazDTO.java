package dto;

public class KomentarPrikazDTO {
	public String id;
	public String kupac;
	public String tekst;
	public Integer ocena; // od 1 do 5
	public boolean obradjen;
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
	public KomentarPrikazDTO(String id, String kupac, String tekst, Integer ocena) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.tekst = tekst;
		this.ocena = ocena;
		this.obradjen = false;
	}

	
}
