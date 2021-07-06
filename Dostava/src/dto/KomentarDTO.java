package dto;

public class KomentarDTO {

	public String id;
	public String kupac;
	public String restoran;
	public String tekst;
	public Integer ocena;
	public String idPorudzbine;

	public KomentarDTO() {
		super();
	}

	public KomentarDTO(String id, String kupac, String restoran, String tekst, Integer ocena, String idPorudzbine) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.restoran = restoran;
		this.tekst = tekst;
		this.ocena = ocena;
		this.idPorudzbine = idPorudzbine;
	}

}
