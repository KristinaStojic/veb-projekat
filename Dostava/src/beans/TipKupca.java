package beans;

import java.io.Serializable;

public class TipKupca implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4671856578499819260L;

	public enum ImeTipa {
		ZLATNI, SREBRNI, BRONZANI
	}

	private ImeTipa imeTipa;
	private Double popust;
	private Double trazeniBodovi;

	public TipKupca() {
		super();
	}

	
	
	public TipKupca(ImeTipa imeTipa, Double popust, Double trazeniBodovi) {
		super();
		this.imeTipa = imeTipa;
		this.popust = popust;
		this.trazeniBodovi = trazeniBodovi;
	}



	public ImeTipa getImeTipa() {
		return imeTipa;
	}

	public void setImeTipa(ImeTipa imeTipa) {
		this.imeTipa = imeTipa;
	}

	public Double getPopust() {
		return popust;
	}

	public void setPopust(Double popust) {
		this.popust = popust;
	}

	public Double getTrazeniBodovi() {
		return trazeniBodovi;
	}

	public void setTrazeniBodovi(Double trazeniBodovi) {
		this.trazeniBodovi = trazeniBodovi;
	}

}
