package dto;

public class KomentarDTO {

	public String id;
	public String kupac;
	public String restoran;
	public String tekst;
	public Integer ocena;

	public KomentarDTO() {
		super();
	}

	public KomentarDTO(String id, String kupac, String restoran, String tekst, Integer ocena) {
		super();
		this.id = id;
		this.kupac = kupac;
		this.restoran = restoran;
		this.tekst = tekst;
		this.ocena = ocena;
	}

}
