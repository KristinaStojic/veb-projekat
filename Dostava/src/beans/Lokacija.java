package beans;

import java.io.Serializable;

public class Lokacija implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1356929088545984017L;

	private Double geografskaDuzina;
	private Double geografskaSirina;
	private String ulica;
	private Integer broj;
	private String mesto;
	private Integer postanskiBroj;

	public Lokacija() {
		super();
	}

	public Double getGeografskaDuzina() {
		return geografskaDuzina;
	}

	public void setGeografskaDuzina(Double geografskaDuzina) {
		this.geografskaDuzina = geografskaDuzina;
	}

	public Double getGeografskaSirina() {
		return geografskaSirina;
	}

	public void setGeografskaSirina(Double geografskaSirina) {
		this.geografskaSirina = geografskaSirina;
	}

	public String getUlica() {
		return ulica;
	}

	public void setUlica(String ulica) {
		this.ulica = ulica;
	}

	public Integer getBroj() {
		return broj;
	}

	public void setBroj(Integer broj) {
		this.broj = broj;
	}

	public String getMesto() {
		return mesto;
	}

	public void setMesto(String mesto) {
		this.mesto = mesto;
	}

	public Integer getPostanskiBroj() {
		return postanskiBroj;
	}

	public void setPostanskiBroj(Integer postanskiBroj) {
		this.postanskiBroj = postanskiBroj;
	}

}
