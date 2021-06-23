package dao;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.text.SimpleDateFormat;
import java.util.StringTokenizer;

import beans.Korisnik;

public class KorisnikDAO {

	private Map<String, Korisnik> korisnici = new HashMap<>();

	public KorisnikDAO() {

	}

	public KorisnikDAO(String contextPath) {
		ucitajKorisnike(contextPath);
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

	private void ucitajKorisnike(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/korisnici.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String korisnickoIme = st.nextToken().trim();
					String lozinka = st.nextToken().trim();
					String ime = st.nextToken().trim();
					String prezime = st.nextToken().trim();
					String pol = st.nextToken().trim();
					String datumRodjenja = st.nextToken().trim();
					String uloga = st.nextToken().trim();
					Date datum = new SimpleDateFormat("dd/MM/yyyy").parse(datumRodjenja);
					korisnici.put(korisnickoIme, new Korisnik(korisnickoIme, lozinka, ime, prezime, dobaviPol(pol),
							datum, dobaviUlogu(uloga)));
				}

			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
				}
			}
		}
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
}
