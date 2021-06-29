package dto;

import beans.Restoran;

public class RestoranPrikazDTO {

	public String id;
	public String naziv;
	public String tipRestorana;
	public String status;
	public String lokacija;
	public String logo;
	public String ocena;
	
	public RestoranPrikazDTO(String id, String naziv, String tipRestorana, String status, String lokacija,
			String logo, String ocena) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
		this.ocena = ocena;
	}
	
}
