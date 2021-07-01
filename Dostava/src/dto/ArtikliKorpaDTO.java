package dto;

public class ArtikliKorpaDTO {

	public String naziv;
	public String tipArtikla;
	public Double kolicina;
	public Double cena;
	public Integer kolicinaKorpa;
	public Double ukupnoCena;
	public String restoran;

	public ArtikliKorpaDTO() {
		super();
	}

	public ArtikliKorpaDTO(String naziv, String tipArtikla, Double kolicina, Double cena, Integer kolicinaKorpa,
			Double ukupnoCena, String restoran) {
		super();
		this.naziv = naziv;
		this.tipArtikla = tipArtikla;
		this.kolicina = kolicina;
		this.cena = cena;
		this.kolicinaKorpa = kolicinaKorpa;
		this.ukupnoCena = ukupnoCena;
		this.restoran = restoran;
	}

	public ArtikliKorpaDTO(Double cena, Double kolicina,Integer kolicinaKorpa, String naziv, String restoran, String tipArtikla,
			Double ukupnoCena) {
		super();
		this.naziv = naziv;
		this.tipArtikla = tipArtikla;
		this.kolicina = kolicina;
		this.cena = cena;
		this.kolicinaKorpa = kolicinaKorpa;
		this.ukupnoCena = ukupnoCena;
		this.restoran = restoran;
	}
}
