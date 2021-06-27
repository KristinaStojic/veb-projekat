package dto;


public class RestoranPrikazDTO {

	public String id;
	public String naziv;
	public String tipRestorana;
	public String status;
	public String lokacija;
	public String logo;
	
	public RestoranPrikazDTO(String id, String naziv, String tipRestorana, String status, String lokacija,
			String logo) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.tipRestorana = tipRestorana;
		this.status = status;
		this.lokacija = lokacija;
		this.logo = logo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getTipRestorana() {
		return tipRestorana;
	}

	public void setTipRestorana(String tipRestorana) {
		this.tipRestorana = tipRestorana;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLokacija() {
		return lokacija;
	}

	public void setLokacija(String lokacija) {
		this.lokacija = lokacija;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}
	
	
}
