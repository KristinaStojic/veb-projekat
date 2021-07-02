package beans;

import java.io.Serializable;

public class TipKupca implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4671856578499819260L;

	public enum ImeTipa {
		BRONZANI, SREBRNI, ZLATNI
	}

	private ImeTipa imeTipa;
	private Integer popust;
	private Integer trazeniBodovi;

	public TipKupca() {
		super();
	}
 
	public TipKupca(ImeTipa imeTipa, Integer popust, Integer trazeniBodovi) {
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

	public Integer getPopust() {
		return popust;
	}

	public void setPopust(Integer popust) {
		this.popust = popust;
	}

	public Integer getTrazeniBodovi() {
		return trazeniBodovi;
	}

	public void setTrazeniBodovi(Integer trazeniBodovi) {
		this.trazeniBodovi = trazeniBodovi;
	}

}
