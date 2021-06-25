package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.ArtikalKorpa;
import beans.Dostavljac;
import beans.Korisnik;
import beans.Korpa;
import beans.Kupac;
import beans.Menadzer;
import beans.Porudzbina;
import beans.TipKupca;
import dto.KorisnikDTO;

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
					if (k.getLogickoBrisanje() == 0) {
						korisnici.put(k.getKorisnickoIme(), k);
					}
					kupci.add(k);
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
					if (d.getLogickoBrisanje() == 0) {
						korisnici.put(d.getKorisnickoIme(), d);
					}
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
					if (m.getLogickoBrisanje() == 0) {
						korisnici.put(m.getKorisnickoIme(), m);
					}
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
					if (a.getLogickoBrisanje() == 0) {
						korisnici.put(a.getKorisnickoIme(), a);
					}
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

	public Korisnik find(String korisnickoIme, String lozinka) {
		if (!korisnici.containsKey(korisnickoIme)) {
			return null;
		}
		Korisnik korisnik = korisnici.get(korisnickoIme);
		if (!korisnik.getLozinka().equals(lozinka)) {
			return null;
		}
		return korisnik;
	}

	public Collection<Korisnik> dobaviSve() {
		return korisnici.values();
	}

	public Korisnik dobaviPoKorisnickomImenu(String korisnickoIme) {

		if (korisnici.containsKey(korisnickoIme)) {
			return korisnici.get(korisnickoIme);
		}

		return null;
	}

	public Korisnik registrujKorisnika(KorisnikDTO korisnik) {
		if (daLiPostojiKorIme(korisnik.korisnickoIme))
			return null;

		TipKupca tipKupca = new TipKupca(TipKupca.ImeTipa.BRONZANI, 0.0, 500.0);
		Korisnik noviKorisnik = new Korisnik(dobaviSve().size() + 1, 0, korisnik.korisnickoIme, korisnik.lozinka,
				korisnik.ime, korisnik.prezime, korisnik.pol, korisnik.datumRodjenja, korisnik.uloga);
		Korpa korpa = new Korpa(new ArrayList<ArtikalKorpa>(), noviKorisnik, 0.0);
		Kupac noviKupac = new Kupac(noviKorisnik, new ArrayList<Porudzbina>(), korpa, 0.0, tipKupca);

		korisnici.put(korisnik.korisnickoIme, noviKorisnik);
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

	public void dodajKorisnika(Korisnik korisnik) {
		if (!korisnici.containsValue(korisnik)) {
			korisnici.put(korisnik.getKorisnickoIme(), korisnik);
		}
	}

	public boolean daLiPostojiKorIme(String korisnickoIme) {

		if (korisnici.containsKey(korisnickoIme)) {
			return true;
		}
		return false;
	}

}
