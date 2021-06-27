package dto;

public class LokacijaDTO {

	public Double geografskaDuzina;
	public Double geografskaSirina;
	public String ulica;
	public Integer broj;
	public String mesto;
	public Integer postanskiBroj;

	public LokacijaDTO(Double geografskaDuzina, Double geografskaSirina, String ulica, Integer broj, String mesto,
			Integer postanskiBroj) {
		super();
		this.geografskaDuzina = geografskaDuzina;
		this.geografskaSirina = geografskaSirina;
		this.ulica = ulica;
		this.broj = broj;
		this.mesto = mesto;
		this.postanskiBroj = postanskiBroj;
	}

}
