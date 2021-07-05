package dto;

import java.util.List;

import beans.Lokacija;

public class RestoranMenadzerDTO {

	public String id;
	public String naziv;
	public String tipRestorana;
	public String logo;
	public Double geografskaDuzina;
	public Double geografskaSirina;
	public String ulica;
	public String broj;
	public String mesto;
	public Integer postanskiBroj;
	public String idMenadzera;
	public String ocena;
	public Boolean status;
	public List<ArtikliDTO> artikli;
	
	public RestoranMenadzerDTO(String id, String naziv, String tipRestorana, String logo, Double geografskaDuzina,
			Double geografskaSirina, String ulica, String broj, String mesto, Integer postanskiBroj, String ocenaS,Boolean status, List<ArtikliDTO> artikli) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.logo = logo;
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.ulica = ulica;
		this.broj = broj;
		this.mesto = mesto;
		this.postanskiBroj = postanskiBroj;
		this.ocena = ocenaS;
		this.status = status;
		this.artikli = artikli;
	}

}
