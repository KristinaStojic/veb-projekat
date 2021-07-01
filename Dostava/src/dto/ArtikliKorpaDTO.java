package dto;

public class ArtikliKorpaDTO {

	public String naziv;
	public String tipArtikla;
	public Double kolicina;
	public Double cena;
	public Integer kolicinaKorpa;
	public Double ukupnoCena;

	public ArtikliKorpaDTO(String naziv, String tipArtikla, Double kolicina, Double cena, Integer kolicinaKorpa,
			Double ukupnoCena) {
		super();
		this.naziv = naziv;
		this.tipArtikla = tipArtikla;
		this.kolicina = kolicina;
		this.cena = cena;
		this.kolicinaKorpa = kolicinaKorpa;
		this.ukupnoCena = ukupnoCena;
	}

}
