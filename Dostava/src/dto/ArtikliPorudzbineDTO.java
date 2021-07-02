package dto;

public class ArtikliPorudzbineDTO {

	public String naziv;
	public Double cena;
	public Double kolicina; // grami ili milimetri
	public String slika;
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public Double getCena() {
		return cena;
	}
	public void setCena(Double cena) {
		this.cena = cena;
	}
	public Double getKolicina() {
		return kolicina;
	}
	public void setKolicina(Double kolicina) {
		this.kolicina = kolicina;
	}
	public String getSlika() {
		return slika;
	}
	public void setSlika(String slika) {
		this.slika = slika;
	}
	public ArtikliPorudzbineDTO(String naziv, Double cena, Double kolicina, String slika) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.kolicina = kolicina;
		this.slika = slika;
	}
	
	
}
