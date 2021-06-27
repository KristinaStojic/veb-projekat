package dto;

public class MenadzerPrikazDTO {

	public String id;
	public String korisnickoIme;
	public String ime;
	public String prezime;
	public Boolean imaRestoran;

	public MenadzerPrikazDTO(String id, String korisnickoIme, String ime, String prezime, Boolean imaRestoran) {
		super();
		this.id = id;
		this.korisnickoIme = korisnickoIme;
		this.ime = ime;
		this.prezime = prezime;
		this.imaRestoran = imaRestoran;
	}

}
