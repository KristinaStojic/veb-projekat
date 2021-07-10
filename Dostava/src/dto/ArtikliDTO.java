package dto;

import java.awt.Image;

import beans.Artikal.TipArtikla;

public class ArtikliDTO {

	public String naziv;
	public String cena;
	public String tipArtikla;
	public String restoran;
	public String kolicina; // grami ili milimetri
	public String opis;
	public String slika;
	public Integer kolicinaKorpa;
	
	
	public ArtikliDTO() {
		super();
	}

	public ArtikliDTO(String naziv, String cena, String tipArtikla, String restoran, String kolicina, String opis,
			String slika) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.tipArtikla = tipArtikla;
		this.restoran = restoran;
		this.kolicina = kolicina;
		this.opis = opis;
		this.slika = slika;
		this.kolicinaKorpa = 0;
	}

}