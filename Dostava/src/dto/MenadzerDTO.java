package dto;

public class MenadzerDTO {

	public String id;
	public String korisnickoIme;
	public String ime;
	public String prezime;
	public Boolean imaRestoran;

	public MenadzerDTO(String id, String korisnickoIme, String ime, String prezime, Boolean imaRestoran) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.ime = ime;
		this.prezime = prezime;
		this.imaRestoran = imaRestoran;
	}

}
