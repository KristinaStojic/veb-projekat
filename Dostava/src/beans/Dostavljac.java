package beans;

import java.io.Serializable;
import java.util.List;

import beans.Porudzbina.Status;

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

	public boolean ukloniPorudzbinu(String id) {
	
		for (int i = 0; i < porudzbineZaDostavu.size() ; i++) {
			if(porudzbineZaDostavu.get(i).getId().equals(id) && porudzbineZaDostavu.get(i).getStatus() == Status.TRANSPORT) {
				return porudzbineZaDostavu.remove(i) != null;
			}
		}
		return false;
	}

}
