package beans;

import java.io.Serializable;

public class Menadzer extends Korisnik implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2906554225925110901L;

	private Restoran restoran;

	public Menadzer() {
		super();
	}

	public Restoran getRestoran() {
		return restoran;
	}

	public void setRestoran(Restoran restoran) {
		this.restoran = restoran;
	}

}
