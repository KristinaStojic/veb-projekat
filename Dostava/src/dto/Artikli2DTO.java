package dto;

import java.awt.Image;

import beans.Artikal.TipArtikla;

public class Artikli2DTO {

	public String naziv;
	public String cena;
	public TipArtikla tip;
	public String restoran;
	public String kolicina; // grami ili milimetri
	public String opis;
	public String slika;
	
	
	public Artikli2DTO() {
		super();
	}


	public Artikli2DTO(String naziv, String cena, TipArtikla tip, String restoran, String kolicina, String opis,
			String slika) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.tip = tip;
		this.restoran = restoran;
		this.kolicina = kolicina;
		this.opis = opis;
		this.slika = slika;
	}

	
	
}