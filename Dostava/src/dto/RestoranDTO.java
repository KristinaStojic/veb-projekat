package dto;

import beans.Lokacija;
import beans.Restoran.TipRestorana;

public class RestoranDTO {

	public String id;
	public String naziv;
	public TipRestorana tipRestorana;
	public Lokacija lokacija;
	public String logo;
	public Double geografskaDuzina;
	public Double geografskaSirina;
	public String ulica;
	public Integer broj;
	public String mesto;
	public Integer postanskiBroj;
	public String idMenadzera;
	public Double ocena;
	public String tipRestoranaS;
	
	public RestoranDTO(String id, String naziv, String tipRestorana, String logo, Double geografskaDuzina,
			Double geografskaSirina, String ulica, Integer broj, String mesto, Integer postanskiBroj, Double ocenaS) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.tipRestoranaS = tipRestorana;
		this.logo = logo;
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.ulica = ulica;
		this.broj = broj;
		this.mesto = mesto;
		this.postanskiBroj = postanskiBroj;
		this.ocena = ocenaS;
	}

}
