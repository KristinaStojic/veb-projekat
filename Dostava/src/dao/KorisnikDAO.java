package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Artikal;
import beans.ArtikalKorpa;
import beans.Dostavljac;
import beans.Komentar;
import beans.Korisnik;
import beans.Korisnik.Pol;
import beans.Korisnik.Uloga;
import beans.Porudzbina.Status;
import beans.Korpa;
import beans.Kupac;
import beans.Menadzer;
import beans.Porudzbina;
import beans.Restoran;
import beans.TipKupca;
import dto.ArtikliKorpaDTO;
import dto.KorisnikBlokiranjeDTO;
import dto.KorisnikDTO;
import dto.KorisnikIzmenaPodatakaDTO;
import dto.KorisnikPrikazDTO;
import dto.MenadzerDTO;

public class KorisnikDAO {

	private Map<String, Korisnik> korisnici;
	private List<Kupac> kupci;
	private List<Menadzer> menadzeri;
	private List<Administrator> administratori;
	private List<Dostavljac> dostavljaci;
	private String putanja;

	public KorisnikDAO(String putanjaDoFajla) {
		korisnici = new HashMap<>();
		kupci = new ArrayList<>();
		menadzeri = new ArrayList<>();
		administratori = new ArrayList<>();
		dostavljaci = new ArrayList<>();

		this.putanja = putanjaDoFajla;

		ucitajPodatke();
	}

	public void ucitajPodatke() {

		ObjectMapper mapper = new ObjectMapper();
		File file;

		try {
			// kupci
			file = new File(this.putanja + "\\kupci.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\kupci.json");
				writer.write("[]");
				writer.close();
			} else {
				List<Kupac> postojeciKupci = Arrays
						.asList(mapper.readValue(Paths.get(this.putanja + "\\kupci.json").toFile(), Kupac[].class));
				for (Kupac k : postojeciKupci) {
					// if (k.getLogickoBrisanje() == 0) {
					korisnici.put(k.getId(), k);
					// }
					kupci.add(k);
					System.out.println(k.getBlokiran() + " kupac");
				}
			}
			// dostavljaci
			file = new File(this.putanja + "\\dostavljaci.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\dostavljaci.json");
				writer.write("[]");
				writer.close();
			} else {
				List<Dostavljac> postojeciDostavljaci = Arrays.asList(
						mapper.readValue(Paths.get(this.putanja + "\\dostavljaci.json").toFile(), Dostavljac[].class));
				for (Dostavljac d : postojeciDostavljaci) {
					// if (d.getLogickoBrisanje() == 0) {
					korisnici.put(d.getId(), d);
					// }
					dostavljaci.add(d);
				}
			}
			// menadzeri
			file = new File(this.putanja + "\\menadzeri.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\menadzeri.json");
				writer.write("[]");
				writer.close();
			} else {
				List<Menadzer> postojeciMenadzeri = Arrays.asList(
						mapper.readValue(Paths.get(this.putanja + "\\menadzeri.json").toFile(), Menadzer[].class));
				for (Menadzer m : postojeciMenadzeri) {
					// if (m.getLogickoBrisanje() == 0) {
					korisnici.put(m.getId(), m);
					// }
					menadzeri.add(m);
				}
			}
			// administratori
			file = new File(this.putanja + "\\administratori.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\administratori.json");
				writer.write("[]");
				writer.close();
			} else {
				List<Administrator> postojeciAdministratori = Arrays.asList(mapper
						.readValue(Paths.get(this.putanja + "\\administratori.json").toFile(), Administrator[].class));
				for (Administrator a : postojeciAdministratori) {
					// if (a.getLogickoBrisanje() == 0) {
					korisnici.put(a.getId(), a);
					// }
					administratori.add(a);
				}
			}

		} catch (

		JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Collection<Korisnik> dobaviSve() {
		return korisnici.values();
	}

	public Korisnik dobaviPoKorisnickomImenu(String korisnickoIme) {

		for (Korisnik k : dobaviSve()) {
			if (k.getKorisnickoIme().equals(korisnickoIme)) {
				return k;
			}
		}

		return null;
	}
	
	
	public Korisnik dobaviPoID(String id) {

		for (Korisnik k : dobaviSve()) {
			if (k.getId().equals(id)) {
				return k;
			}
		}

		return null;
	}

	public Korisnik pronadjiKorisnika(String korisnickoIme, String lozinka) {

		for (Korisnik k : dobaviSve()) {
			if (k.getKorisnickoIme().equals(korisnickoIme) && k.getLozinka().equals(lozinka)
					&& k.getLogickoBrisanje() == 0 && k.getBlokiran() == 0) {
				return k;
			}
		}

		return null;
	}

	public Korisnik registrujKorisnika(KorisnikDTO korisnik) {
		if (daLiPostojiKorIme(korisnik.korisnickoIme))
			return null;

		TipKupca tipKupca = new TipKupca(TipKupca.ImeTipa.BRONZANI, 0, 0);
		Korisnik noviKorisnik = new Korisnik(UUID.randomUUID().toString().replace("-", "").substring(0, 10), 0,
				korisnik.korisnickoIme, korisnik.lozinka, korisnik.ime, korisnik.prezime, korisnik.pol,
				korisnik.datumRodjenja, korisnik.uloga, 0);
		noviKorisnik.setBlokiran(0);
		System.out.println("novi korisnika: " + noviKorisnik.getBlokiran());
		Korpa korpa = new Korpa(new ArrayList<ArtikalKorpa>(), noviKorisnik.getId(), 0.0, "");
		Kupac noviKupac = new Kupac(noviKorisnik, new ArrayList<Porudzbina>(), korpa, 0.0, tipKupca);
		noviKupac.setBlokiran(0);
		noviKupac.setDatumiOtkazivanjaPorudzbina(new ArrayList<Date>());
		korisnici.put(noviKorisnik.getId(), noviKorisnik);
		kupci.add(noviKupac);

		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\kupci.json").toFile(), kupci);
		} catch (IOException e) {
			System.out.println("Greska");
			return null;
		}

		return noviKorisnik;
	}

	public void sacuvajPodatke() {
		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\kupci.json").toFile(), kupci);
		} catch (IOException e) {
			System.out.println("Greska");
		}

		ObjectMapper maper1 = new ObjectMapper();
		try {
			maper1.writeValue(Paths.get(this.putanja + "\\administratori.json").toFile(), administratori);
		} catch (IOException e) {
			System.out.println("Greska");
		}

		ObjectMapper maper2 = new ObjectMapper();
		try {
			maper2.writeValue(Paths.get(this.putanja + "\\dostavljaci.json").toFile(), dostavljaci);
		} catch (IOException e) {
			System.out.println("Greska");
		}

		ObjectMapper maper3 = new ObjectMapper();
		try {
			maper3.writeValue(Paths.get(this.putanja + "\\menadzeri.json").toFile(), menadzeri);
		} catch (IOException e) {
			System.out.println("Greska");
		}
	}

	public void dodajKorisnika(Korisnik korisnik) {
		if (!korisnici.containsValue(korisnik)) {
			korisnici.put(korisnik.getKorisnickoIme(), korisnik);
		}
	}

	public boolean daLiPostojiKorIme(String korisnickoIme) {

		if (dobaviPoKorisnickomImenu(korisnickoIme) != null) {
			return true;
		}
		return false;
	}

	public Korisnik izmeniLicnePodatke(Korisnik prijavljeniKorisnik, KorisnikIzmenaPodatakaDTO izmenjeniKorisnik) {

		for (Korisnik k : dobaviSve()) {
			if (k.getId().equals(prijavljeniKorisnik.getId())) {
				k.setIme(izmenjeniKorisnik.ime);
				k.setPrezime(izmenjeniKorisnik.prezime);
				k.setKorisnickoIme(izmenjeniKorisnik.korisnickoIme);
				k.setLozinka(izmenjeniKorisnik.lozinka);
				k.setDatumRodjenja(izmenjeniKorisnik.datumRodjenja);
				k.setPol(izmenjeniKorisnik.pol);

				for (Kupac kupac : kupci) {
					if (kupac.getId().equals(prijavljeniKorisnik.getId())) {
						kupac.setIme(izmenjeniKorisnik.ime);
						kupac.setPrezime(izmenjeniKorisnik.prezime);
						kupac.setKorisnickoIme(izmenjeniKorisnik.korisnickoIme);
						kupac.setLozinka(izmenjeniKorisnik.lozinka);
						kupac.setDatumRodjenja(izmenjeniKorisnik.datumRodjenja);
						kupac.setPol(izmenjeniKorisnik.pol);

					}
				}

				for (Menadzer men : menadzeri) {
					if (men.getId().equals(prijavljeniKorisnik.getId())) {
						men.setIme(izmenjeniKorisnik.ime);
						men.setPrezime(izmenjeniKorisnik.prezime);
						men.setKorisnickoIme(izmenjeniKorisnik.korisnickoIme);
						men.setLozinka(izmenjeniKorisnik.lozinka);
						men.setDatumRodjenja(izmenjeniKorisnik.datumRodjenja);
						men.setPol(izmenjeniKorisnik.pol);

					}
				}

				for (Administrator admin : administratori) {
					if (admin.getId().equals(prijavljeniKorisnik.getId())) {
						admin.setIme(izmenjeniKorisnik.ime);
						admin.setPrezime(izmenjeniKorisnik.prezime);
						admin.setKorisnickoIme(izmenjeniKorisnik.korisnickoIme);
						admin.setLozinka(izmenjeniKorisnik.lozinka);
						admin.setDatumRodjenja(izmenjeniKorisnik.datumRodjenja);
						admin.setPol(izmenjeniKorisnik.pol);

					}
				}

				for (Dostavljac dost : dostavljaci) {
					if (dost.getId().equals(prijavljeniKorisnik.getId())) {
						dost.setIme(izmenjeniKorisnik.ime);
						dost.setPrezime(izmenjeniKorisnik.prezime);
						dost.setKorisnickoIme(izmenjeniKorisnik.korisnickoIme);
						dost.setLozinka(izmenjeniKorisnik.lozinka);
						dost.setDatumRodjenja(izmenjeniKorisnik.datumRodjenja);
						dost.setPol(izmenjeniKorisnik.pol);

					}
				}

				return k;
			}
		}

		return null;
	}

	public Korisnik nadjiPoId(String id) {
		return korisnici.containsKey(id) ? korisnici.get(id) : null;
	}

	public Menadzer dodajMenadzera(MenadzerDTO menadzer) {
		if (daLiPostojiKorIme(menadzer.korisnickoIme))
			return null;

		Korisnik noviKorisnik = new Korisnik(UUID.randomUUID().toString().replace("-", "").substring(0, 10), 0,
				menadzer.korisnickoIme, menadzer.lozinka, menadzer.ime, menadzer.prezime, menadzer.pol,
				menadzer.datumRodjenja, menadzer.uloga, 0);
		noviKorisnik.setBlokiran(0);
		Menadzer noviMenadzer = new Menadzer(noviKorisnik);
		noviMenadzer.setBlokiran(0);
		korisnici.put(noviKorisnik.getId(), noviKorisnik);
		menadzeri.add(noviMenadzer);

		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\menadzeri.json").toFile(), menadzeri);
		} catch (IOException e) {
			System.out.println("Greska");
			return null;
		}

		return noviMenadzer;
	}

	public Menadzer dobaviMenadzeraPoKorisnickomImenu(String korisnickoIme) {

		for (Menadzer m : menadzeri) {
			if (m.getKorisnickoIme().equals(korisnickoIme)) {
				return m;
			}
		}

		return null;
	}

	public Dostavljac dodajDostavljaca(KorisnikDTO dostavljac) {
		if (daLiPostojiKorIme(dostavljac.korisnickoIme))
			return null;
		Korisnik noviKorisnik = new Korisnik(UUID.randomUUID().toString().replace("-", "").substring(0, 10), 0,
				dostavljac.korisnickoIme, dostavljac.lozinka, dostavljac.ime, dostavljac.prezime, dostavljac.pol,
				dostavljac.datumRodjenja, dostavljac.uloga, 0);
		noviKorisnik.setBlokiran(0);
		Dostavljac noviDostavljac = new Dostavljac(noviKorisnik);
		noviDostavljac.setBlokiran(0);
		korisnici.put(noviKorisnik.getId(), noviKorisnik);
		dostavljaci.add(noviDostavljac);

		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\dostavljaci.json").toFile(), dostavljaci);
		} catch (IOException e) {
			System.out.println("Greska");
			return null;
		}

		return noviDostavljac;
	}

	public Dostavljac dobaviDostavljacaPoKorisnickomImenu(String korisnickoIme) {

		for (Dostavljac d : dostavljaci) {
			if (d.getKorisnickoIme().equals(korisnickoIme)) {
				return d;
			}
		}

		return null;
	}

	public String dodajRestoranMenadzeru(Restoran r, String idMenadzera) {

		for (Menadzer men : menadzeri) {
			if (men.getId().equals(idMenadzera)) {
				men.setRestoran(r);
				sacuvajPodatke();
				return idMenadzera;
			}
		}

		return null;
	}

	public Collection<Menadzer> dobaviNeobrisaneMenadzere() {
		List<Menadzer> menadzeriNeobrisani = new ArrayList<Menadzer>();

		for (Menadzer m : menadzeri) {
			if (m.getLogickoBrisanje() == 0) {
				menadzeriNeobrisani.add(m);
			}
		}

		return menadzeriNeobrisani;
	}

	public String nadjiPol(Pol pol) {

		if (pol.toString().equals("ZENSKI")) {
			return "Ženski";
		} else if (pol.toString().equals("MUSKI")) {
			return "Muški";
		}

		return null;
	}

	public String nadjiUlogu(Uloga uloga) {
		if (uloga.toString().equals("ADMINISTRATOR")) {
			return "Administrator";
		} else if (uloga.toString().equals("DOSTAVLJAC")) {
			return "Dostavljač";
		} else if (uloga.toString().equals("KUPAC")) {
			return "Kupac";
		} else if (uloga.toString().equals("MENADZER")) {
			return "Menadžer";
		}

		return null;
	}

	public String nadjiTipKupca(Korisnik k) {
		for (Kupac kupac : kupci) {
			if (kupac.getId().equals(k.getId())) {
				if (kupac.getTipKupca().getImeTipa().toString().equals("ZLATNI")) {
					return "Zlatni";
				} else if (kupac.getTipKupca().getImeTipa().toString().equals("SREBRNI")) {
					return "Srebrni";
				} else if (kupac.getTipKupca().getImeTipa().toString().equals("BRONZANI")) {
					return "Bronzani";
				}
			}
		}

		return null;
	}

	public TipKupca nadjiTipKupca(String idKupca) {
		for (Kupac kupac : kupci) {
			if (kupac.getId().equals(idKupca)) {
				return kupac.getTipKupca();
			}
		}

		return null;
	}

	public Double nadjiBrojBodovaKupca(Korisnik k) {
		for (Kupac kupac : kupci) {
			if (kupac.getId().equals(k.getId())) {

				return kupac.getSakupljeniBodovi();
			}
		}

		return null;
	}

	public void blokirajKorisnika(KorisnikBlokiranjeDTO kor) {
		for (Korisnik korisnik : dobaviSve()) {
			if (korisnik.getKorisnickoIme().equals(kor.getKorisnickoIme())) {
				korisnik.setBlokiran(1);

				for (Kupac kupac : kupci) {
					if (kupac.getKorisnickoIme().equals(kor.getKorisnickoIme())) {
						kupac.setBlokiran(1);
					}
				}
			}
		}
	}

	public Boolean dodarArtikal(Artikal a, String idRestorana) {
		System.out.println("pozvao sam dodavanje menadzera");
		for (Menadzer men : menadzeri) {
			Restoran r = men.getRestoran();
			if (r.getId().equals(idRestorana)) {
				List<Artikal> stari = r.getArtikliUPonudi();
				stari.add(stari.size(), a);
				r.setArtikliUPonudi(stari);
				sacuvajPodatke();
				return true;
			}

		}

		return false;

	}

	public boolean daLiSadrziArtikal(String naziv, List<Artikal> artikli) {
		
		for (Artikal artikal : artikli) {
			if(artikal.getNaziv().equals(naziv)) {
				return true;
			}
		}
		return false;
	}
	
	public Boolean izmeniArtikal(String idRestorana, String stariNaziv, Artikal a) {

		for (Menadzer men : menadzeri) {
			Restoran r = men.getRestoran();
			if (r.getId().equals(idRestorana)) {
				if (r == null || r.getLogickoBrisanje() == 1)
					return false;
				if (!stariNaziv.equals(a.getNaziv()) && proveriPostojanjeNaziva(r, a.getNaziv()))
					return false;
				for (Artikal ar : r.getArtikliUPonudi()) {
					if (ar.getNaziv().equals(stariNaziv)) {
						ar.setNaziv(a.getNaziv());
						ar.setCena(a.getCena());
						ar.setKolicina(a.getKolicina());
						ar.setOpis(a.getOpis());
						ar.setSlika(a.getSlika());
						ar.setTipArtikla(a.getTipArtikla());
					}
				}
				sacuvajPodatke();
				return true;
			}

		}

		return false;

	}

	public Boolean proveriPostojanjeNaziva(Restoran r, String naziv) {

		for (Artikal ar : r.getArtikliUPonudi()) {
			if (ar.getNaziv().equals(naziv))
				return true;
		}

		return false;
	}

	public void obrisiRestoranMenadzeru(String idRestorana) {
		for (Menadzer menadzer : menadzeri) {
			if (menadzer.getRestoran() != null) {
				if (menadzer.getRestoran().getId().equals(idRestorana)) {
					menadzer.setRestoran(null);
					// menadzer.getRestoran().setLogickoBrisanje(1);
				}
			}

		}
		sacuvajPodatke();
	}

	public void obrisiKorisnika(String idKorisnika) {
		/*if (korisnici.containsKey(idKorisnika)) {
			korisnici.remove(idKorisnika);
		}*/

		for (Menadzer men : menadzeri) {
			if (men.getId().equals(idKorisnika)) {
				men.setLogickoBrisanje(1);
			}
		}

		for (Administrator admin : administratori) {
			if (admin.getId().equals(idKorisnika)) {
				admin.setLogickoBrisanje(1);
			}
		}

		for (Kupac kupac : kupci) {
			if (kupac.getId().equals(idKorisnika)) {
				kupac.setLogickoBrisanje(1);
			}
		}

		for (Dostavljac dostavljac : dostavljaci) {
			if (dostavljac.getId().equals(idKorisnika)) {
				dostavljac.setLogickoBrisanje(1);
			}
		}

		sacuvajPodatke();
	}

	public void obrisiArtikleuMenadzeru(String nazivArtikla, String idRestorana) {
		System.out.println("Artikli u menadzeru");
		for (Menadzer menadzer : menadzeri) {
			if (menadzer.getRestoran() != null) {
				if (menadzer.getRestoran().getId().equals(idRestorana)) {
					if (menadzer.getRestoran().getArtikliUPonudi() != null) {

						for (int i = 0; i < menadzer.getRestoran().getArtikliUPonudi().size(); i++) {
							Artikal zaBrisanje = menadzer.getRestoran().getArtikliUPonudi().get(i);
							System.out.println(zaBrisanje.getNaziv());
							if (zaBrisanje.getNaziv().equals(nazivArtikla)) {
								{
									menadzer.getRestoran().obrisiArtikal(zaBrisanje);
								}
							}
						}
					}
				}
			}

		}

		sacuvajPodatke();

		for (Menadzer menadzer : menadzeri) {
			if (menadzer.getRestoran() != null) {
				if (menadzer.getRestoran().getId().equals(idRestorana)) {
					if (menadzer.getRestoran().getArtikliUPonudi() != null) {

						for (int i = 0; i < menadzer.getRestoran().getArtikliUPonudi().size(); i++) {
							Artikal zaBrisanje = menadzer.getRestoran().getArtikliUPonudi().get(i);
							if (zaBrisanje.getNaziv().equals(nazivArtikla)) {
								{
									//menadzer.getRestoran().obrisiArtikalIzListe(zaBrisanje);
								}
							}
						}

					}

				}
			}

		}
	}


	public Kupac dobaviKupca(String id) {

		for (Kupac k : kupci) {
			if (k.getId().equals(id)) {
				return k;
			}
		}

		return null;
	}

	public boolean dodajPorudzbinu(Porudzbina p) {

		for (Kupac k : kupci) {
			if (k.getId().equals(p.getKupac())) {
				k.setKorpa(new Korpa(new ArrayList<ArtikalKorpa>(), p.getKupac(), 0.0, ""));
				k.dodajPorudzbinu(p);
				Double trenutniBodovi = k.getSakupljeniBodovi();
				k.setSakupljeniBodovi(trenutniBodovi + (p.getCena() / 1000 * 133));
				k.setTipKupca(proveriTip(k.getSakupljeniBodovi()));
				sacuvajPodatke();
				return true;
			}
		}

		return false;
	}

	public TipKupca proveriTip(Double bodovi) {

		if (bodovi >= 2000 && bodovi < 4000) {
			return new TipKupca(TipKupca.ImeTipa.SREBRNI, 5, 2000);
		} else if (bodovi >= 4000) {
			return new TipKupca(TipKupca.ImeTipa.ZLATNI, 10, 4000);
		} else {
			return new TipKupca(TipKupca.ImeTipa.BRONZANI, 0, 0);
		}

	}

	public boolean azurirajKorpu(ArtikliKorpaDTO promena, String id) {

		for (Kupac k : kupci) {
			if (k.getId().equals(id)) {
				Korpa korpa = k.getKorpa();
				if(korpa.getArtikli().isEmpty()) {
					korpa.setRestoran(promena.restoran);
				}else {
					if(!korpa.getRestoran().equals(promena.restoran)) {
						korpa = new Korpa(new ArrayList<ArtikalKorpa>(),id, 0.0, promena.restoran);
					}
				}
				
				for (ArtikalKorpa ak : korpa.getArtikli()) {
					Artikal a = ak.getArtikal();
					if (a.getNaziv().equals(promena.naziv)) {

						korpa.smanjiCenu(a.getCena() * ak.getKolicina());
						if(promena.kolicinaKorpa != 0) {
						korpa.povecajCenu(promena.cena * promena.kolicinaKorpa);
						ak.setKolicina(promena.kolicinaKorpa);}else {
							korpa.ukloniArtikal(promena.naziv);
						}
						sacuvajPodatke();
						return true;
					}

				}
			}
		}

		return false;
	}

	public List<Dostavljac> dobaviSveDostavljace() {
		return dostavljaci;
	}

	public List<Menadzer> dobaviSveMenadzere() {
		return menadzeri;
	}

	public boolean promeniStatusPorudzbineKupcu(String id, String idKorisnika, Status status) {
		for (Kupac k : kupci) {
			if (k.getId().equals(idKorisnika)) {
				for (Porudzbina p : k.getSvePorudzbine()) {
					if (p.getId().equals(id)) {
						if (status == Status.OTKAZANA) {
							p.setStatus(status);
							Double trenutniBodovi = k.getSakupljeniBodovi();
							k.setSakupljeniBodovi(trenutniBodovi - (p.getCena() / 1000 * 133 * 4));
							k.setTipKupca(proveriTip(k.getSakupljeniBodovi()));
							k.getDatumiOtkazivanjaPorudzbina().add(new Date(System.currentTimeMillis()));
							sacuvajPodatke();
							return true;
						} else if (status == Status.DOSTAVLJENA) {
							p.setDostavljac("");
							p.setStatus(status);
							sacuvajPodatke();
							return true;
						} else {
							p.setStatus(status);
							sacuvajPodatke();
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	public boolean promeniStatusPorudzbineKupcuTransport(String id, String idKorisnika, String idDostavljaca) {
		for (Kupac k : kupci) {
			if (k.getId().equals(idKorisnika)) {
				for (Porudzbina p : k.getSvePorudzbine()) {
					if (p.getId().equals(id)) {
						p.setStatus(Status.TRANSPORT);
						p.setDostavljaciKojiZahtevaju(new ArrayList<String>());
						p.setDostavljac(idDostavljaca);
						sacuvajPodatke();
						return true;
					}
				}
			}
		}
		return false;
	}

	public boolean dostavljacDostavio(String id, String idDostavljaca) {

		for (Dostavljac d : dostavljaci) {
			if (d.getId().equals(idDostavljaca)) {
				d.ukloniPorudzbinu(id);
				sacuvajPodatke();
				return true;
			}
		}
		return false;
	}

	public List<KorisnikPrikazDTO> dobaviDTODostavljace(List<String> idevi) {
		List<KorisnikPrikazDTO> povratna = new ArrayList<>();

		for (String s : idevi) {
			KorisnikPrikazDTO d = dobaviDostavljacaDTO(s);
			if (d != null) {
				povratna.add(d);
			}
		}

		return povratna;
	}

	public KorisnikPrikazDTO dobaviDostavljacaDTO(String id) {

		for (Dostavljac d : dostavljaci) {
			if (d.getId().equals(id) && d.getBlokiran() == 0 && d.getLogickoBrisanje() == 0) {
				return new KorisnikPrikazDTO(d.getId(), d.getKorisnickoIme(), d.getIme() + " " + d.getPrezime());
			}
		}

		return null;
	}

	public boolean dodeliPorudzbinuDostavljacu(Porudzbina porudzbina, String idDostavljaca) {
		System.out.println(idDostavljaca + "treba da dodam dostavljacu");
		for (Dostavljac d : dostavljaci) {
			if (d.getId().equals(idDostavljaca)) {
				
				d.dodajPorudzbinu(porudzbina);
				sacuvajPodatke();
				return true;
			}
		}
		return false;
	}

	public Kupac nadjiKupca(String id) {
		for (Kupac kupac : kupci) {
			if (kupac.getId().equals(id)) {
				return kupac;
			}
		}

		return null;
	}

	public Boolean postojiKupac(List<KorisnikPrikazDTO> postojeci, String idKupca) {
		for (KorisnikPrikazDTO korisnikPrikazDTO : postojeci) {
			if (korisnikPrikazDTO.getId().equals(idKupca)) {
				return true;
			}
		}

		return false;
	}

	public List<Kupac> dobaviSveKupce() {
		return kupci;
	}

	public String restoranMenadzera(String id) {
		for (Menadzer m : menadzeri) {
			if (m.getId().equals(id)) {
				return m.getRestoran().getId();
			}
		}

		return null;
	}

	public boolean azurirajOcenuRestorana(String idRestorana, Integer ocena) {
		for (Menadzer men : menadzeri) {
			if (men.getRestoran().getId().equals(idRestorana)) {
				System.out.println("azuriram ocjenu menadzera");
				if (men.getRestoran().getOcena() == 0) {
					men.getRestoran().setOcena(men.getRestoran().getOcena() + ocena);
				} else {
					men.getRestoran().setOcena((men.getRestoran().getOcena() + ocena) / 2);
				}
				sacuvajPodatke();
				return true;
			}
		}

		return false;
	}

	public void dodajArtikalUKorpu(String id, Artikal a, Integer kolicinaKorpa) {

		for (Kupac k : kupci) {
			if (k.getId().equals(id)) {
				Korpa korpa = k.getKorpa();

				korpa.povecajCenu(a.getCena() * kolicinaKorpa);
				korpa.dodajArtikal(a, kolicinaKorpa);
				sacuvajPodatke();
			}
		}
	}

	public Integer dobaviKolicinuArtiklaIzKorpe(String idKorisnika, String idRestorana, String nazivArtikla) {

		for (Kupac k : kupci) {
			if (k.getId().equals(idKorisnika)) {
				Korpa korpa = k.getKorpa();
				if (korpa == null)
					return 0;
				for (ArtikalKorpa ak : korpa.getArtikli()) {
					if (ak.getArtikal().getNaziv().equals(nazivArtikla)) {
						return ak.getKolicina();
					}
				}
			}
		}
		return 0;
	}

	public void ukloniKorpu(String id) {
		for (Kupac k : kupci) {
			if (k.getId().equals(id)) {
				k.setKorpa(new Korpa(new ArrayList<ArtikalKorpa>(), id, 0.0, ""));
				sacuvajPodatke();
				return;
			}
		}
	}
	
	public boolean ispraviOcenuRestorana(String idRestorana,Komentar komentar, Integer brojKomentara) {
		for (Menadzer men : menadzeri) {
			if (men.getRestoran().getId().equals(idRestorana)) {
				System.out.println("azuriram ocjenu menadzera");
				if (men.getRestoran().getOcena() == 0) {
					men.getRestoran().setOcena(0.0);
					System.out.println("evo me mijenjam ocjenu nakon brisanja komentara");
				} else {
					men.getRestoran().setOcena((men.getRestoran().getOcena()*brojKomentara - komentar.getOcena()) / (brojKomentara - 1));
				}
				sacuvajPodatke();
				return true;
			}
		}

		System.out.println("nije dobra izmjena ocjene kod menadzera");
		return false;
	}

}
