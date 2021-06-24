package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Korisnik;
import dto.KorisnikDTO;

public class KorisnikDAO {

	private Map<String, Korisnik> korisnici = new HashMap<>();
	private String putanja;


	public KorisnikDAO() {
		File folder = new File(System.getProperty("catalina.base") + File.separator + "podaci");
		if (!folder.exists()) {
			folder.mkdir();
		}
		this.putanja = System.getProperty("catalina.base") + File.separator + "podaci" + File.separator + "korisnici.json";
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

	

	private Korisnik.Pol dobaviPol(String pol) {

		if (pol.equals("ZENSKI")) {
			return Korisnik.Pol.ZENSKI;
		} else {
			return Korisnik.Pol.MUSKI;
		}
	}

	private Korisnik.Uloga dobaviUlogu(String uloga) {

		if (uloga.equals("ADMINISTRATOR")) {
			return Korisnik.Uloga.ADMINISTRATOR;
		} else if (uloga.equals("MENADZER")) {
			return Korisnik.Uloga.MENADZER;
		} else if (uloga.equals("KUPAC")) {
			return Korisnik.Uloga.KUPAC;
		} else {
			return Korisnik.Uloga.DOSTAVLJAC;
		}
	}
	
	
	public void ucitajKorisnike() {
		ObjectMapper objectMapper = new ObjectMapper();

		File file = new File(this.putanja);

		List<Korisnik> ucitaniKorisnici = new ArrayList<Korisnik>();
		try {

			ucitaniKorisnici = objectMapper.readValue(file, new TypeReference<List<Korisnik>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Korisnik k : ucitaniKorisnici) {
			korisnici.put(k.getKorisnickoIme(), k);
		}

	}

	public void upisiKorisnike() {

		List<Korisnik> sviKorisnici = new ArrayList<Korisnik>();
		for (Korisnik k : dobaviSve()) {
			sviKorisnici.add(k);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			// Write them to the file
			objectMapper.writeValue(new FileOutputStream(this.putanja), sviKorisnici);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public Korisnik dobaviPoKorisnickomImenu(String korisnickoIme) {
		if (korisnici.containsKey(korisnickoIme)) {
			return korisnici.get(korisnickoIme);
		}

		return null;
	}

	public void dodajNovogKorisnika(KorisnikDTO korisnik) {
		Korisnik noviKorisnik = new Korisnik(dobaviSve().size() + 1, 0, korisnik.korisnickoIme, korisnik.lozinka, korisnik.ime, korisnik.prezime, korisnik.pol, korisnik.datumRodjenja, korisnik.uloga);		
		//DODATI I U KUPCE
		
		dodajKorisnika(noviKorisnik);
		upisiKorisnike();
	}
	
	public void dodajKorisnika(Korisnik korisnik) {
		if (!korisnici.containsValue(korisnik)) {
			System.out.println("DODAO SAM: " + korisnik.getKorisnickoIme());
			korisnici.put(korisnik.getKorisnickoIme(), korisnik);
		}
	}
	
}
