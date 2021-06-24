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
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.ArtikalKorpa;
import beans.Korisnik;
import beans.Korpa;
import beans.Kupac;
import beans.Porudzbina;
import beans.TipKupca;
import dto.KorisnikDTO;

public class KorisnikDAO {

	private Map<String, Korisnik> korisnici;
	private List<Kupac> kupci;
	private String putanja;

	public KorisnikDAO(String putanjaDoFajla) {
		korisnici = new HashMap<>();
		kupci = new ArrayList<>();
		this.putanja = putanjaDoFajla;
		System.out.println(putanja);
		ucitajPodatke();
	}

	public void ucitajPodatke() {
		
		ObjectMapper mapper = new ObjectMapper();
		File file;
		
		try {
		 file = new File(this.putanja + "\\kupci.json");
         if(!file.exists()) {
             file.createNewFile();
             FileWriter writer = new FileWriter(this.putanja + "\\kupci.json");
             writer.write("[]");
             writer.close();
         } else {
             List<Kupac> postojeciKupci = Arrays.asList(mapper.readValue(Paths.get(this.putanja + "\\kupci.json").toFile(), Kupac[].class));
             for (Kupac k : postojeciKupci) {
                 if (k.getLogickoBrisanje() == 0) {
                     korisnici.put(k.getKorisnickoIme(), k);
                 }
                 kupci.add(k);
             }
         }
         
		}catch (JsonParseException e) {
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

//	public void upisiKorisnike() {
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		try {
//			// Write them to the file
//			objectMapper.writeValue(new FileOutputStream(this.putanja), korisnici);
//
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}

	public Korisnik dobaviPoKorisnickomImenu(String korisnickoIme) {
		System.out.println("dobio sam ovo korIme: " + korisnickoIme);
		
		System.out.println(korisnici);
		
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
			System.out.println("DODAO SAM: " + korisnik.getKorisnickoIme());
			korisnici.put(korisnik.getKorisnickoIme(), korisnik);
		}
	}

	public boolean daLiPostojiKorIme(String korisnickoIme) {

		if (korisnici.containsKey(korisnickoIme)) {
			System.out.println("postojii " + korisnickoIme);
			return true;
		}
		return false;
	}

}
