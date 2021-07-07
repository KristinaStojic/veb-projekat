package dto;

public class KomentariPrikazSviDTO {
	public String id;
	public String kupac;
	public String tekst;
	public Integer ocena; // od 1 do 5
	public String odobren; //bice Odobren ili Odbijen
	public String restoran; //id restorana
	
	public KomentariPrikazSviDTO(String id, String kupac, String tekst, Integer ocena, String odobren,
			String restoran) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.tekst = tekst;
		this.ocena = ocena;
		this.odobren = odobren;
		this.restoran = restoran;
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
	public String getOdobren() {
		return odobren;
	}
	public void setOdobren(String odobren) {
		this.odobren = odobren;
	}
	public String getRestoran() {
		return restoran;
	}
	public void setRestoran(String restoran) {
		this.restoran = restoran;
	}
	
	
	
}
