package beans;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Kupac extends Korisnik implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9112324163100963187L;

	private List<Porudzbina> svePorudzbine;
	private Korpa korpa;
	private Double sakupljeniBodovi;
	private TipKupca tipKupca;

	public Kupac() {
		super();
	}

	public Kupac(Korisnik k, List<Porudzbina> svePorudzbine, Korpa korpa, Double sakupljeniBodovi, TipKupca tipKupca) {
		super(k);
		this.svePorudzbine = svePorudzbine;
		this.korpa = korpa;
		this.sakupljeniBodovi = sakupljeniBodovi;
		this.tipKupca = tipKupca;
	}

	public List<Porudzbina> getSvePorudzbine() {
		return svePorudzbine;
	}

	public void setSvePorudzbine(List<Porudzbina> svePorudzbine) {
		this.svePorudzbine = svePorudzbine;
	}

	public Korpa getKorpa() {
		return korpa;
	}

	public void setKorpa(Korpa korpa) {
		this.korpa = korpa;
	}

	public Double getSakupljeniBodovi() {
		return sakupljeniBodovi;
	}

	public void setSakupljeniBodovi(Double sakupljeniBodovi) {
		this.sakupljeniBodovi = sakupljeniBodovi;
	}

	public TipKupca getTipKupca() {
		return tipKupca;
	}

	public void setTipKupca(TipKupca tipKupca) {
		this.tipKupca = tipKupca;
	}

}