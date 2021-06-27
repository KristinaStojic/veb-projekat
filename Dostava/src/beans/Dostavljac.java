package beans;

import java.io.Serializable;
import java.util.List;

public class Dostavljac extends Korisnik implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2069857284187355234L;

	private List<Porudzbina> porudzbineZaDostavu;

	public Dostavljac() {
		super();
	}
	
	public Dostavljac(Korisnik k) {
		super(k);
		this.porudzbineZaDostavu = null;
	}

	public List<Porudzbina> getPorudzbineZaDostavu() {
		return porudzbineZaDostavu;
	}

	public void setPorudzbineZaDostavu(List<Porudzbina> porudzbineZaDostavu) {
		this.porudzbineZaDostavu = porudzbineZaDostavu;
	}

}
