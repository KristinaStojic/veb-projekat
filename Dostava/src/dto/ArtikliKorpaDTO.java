package dto;

public class ArtikliKorpaDTO {

	public String naziv;
	public String tipArtikla;
	public Double kolicina;
	public Double cena;
	public Integer kolicinaKorpa;
	public Double ukupnoCena;
	public String restoran;
	public String opis;
	public String slika;

	public ArtikliKorpaDTO() {
		super();
	}

	public ArtikliKorpaDTO(String naziv, String tipArtikla, Double kolicina, Double cena, Integer kolicinaKorpa,
			Double ukupnoCena, String restoran, String slika) {
		super();
		this.naziv = naziv;
		this.tipArtikla = tipArtikla;
		this.kolicina = kolicina;
		this.cena = cena;
		this.kolicinaKorpa = kolicinaKorpa;
		this.ukupnoCena = ukupnoCena;
		this.restoran = restoran;
		this.slika = slika;
	}

	public ArtikliKorpaDTO(Double cena, Double kolicina,Integer kolicinaKorpa, String naziv, String restoran, String tipArtikla,
			Double ukupnoCena, String slika) {
		super();
		this.naziv = naziv;
		this.tipArtikla = tipArtikla;
		this.kolicina = kolicina;
		this.cena = cena;
		this.kolicinaKorpa = kolicinaKorpa;
		this.ukupnoCena = ukupnoCena;
		this.restoran = restoran;
		this.slika = slika;
	}
}
