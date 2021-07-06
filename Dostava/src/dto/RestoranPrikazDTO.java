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
	public Double geografskaDuzina;
	public Double geografskaSirina;
	public String ulica;
	public String broj;
	public String mesto;
	public Integer postanskiBroj;
	
	public RestoranPrikazDTO(String id, String naziv, String tipRestorana, String status, String lokacija, String logo,
			String ocena, Double geografskaDuzina, Double geografskaSirina, String ulica, String broj, String mesto,
			Integer postanskiBroj) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
		this.ocena = ocena;
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.ulica = ulica;
		this.broj = broj;
		this.mesto = mesto;
		this.postanskiBroj = postanskiBroj;
	}
	
	
}
