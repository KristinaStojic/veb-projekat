package services;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Artikal;
import beans.Dostavljac;
import beans.Korisnik;
import beans.Lokacija;
import beans.Menadzer;
import beans.Restoran;
import dao.KorisnikDAO;
import dao.RestoranDAO;
import dto.ArtikliDTO;
import dto.KorisnikDTO;
import dto.KorisnikIzmenaPodatakaDTO;
import dto.KorisnikPrijavaDTO;
import dto.KorisnikPrikazDTO;
import dto.MenadzerDTO;
import dto.MenadzerPrikazDTO;
import dto.RestoranMenadzerDTO;

@Path("/korisnici")
public class KorisniciService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext sc;

	private KorisnikDAO dobaviKorisnikDAO() {

		KorisnikDAO korisnici = (KorisnikDAO) sc.getAttribute("korisnici");

		if (korisnici == null) {
			korisnici = new KorisnikDAO(sc.getRealPath("."));
			sc.setAttribute("korisnici", korisnici);
		}

		return korisnici;
	}

	private RestoranDAO dobaviRestoranDAO() {

		RestoranDAO restorani = (RestoranDAO) sc.getAttribute("restorani");

		if (restorani == null) {
			restorani = new RestoranDAO(sc.getRealPath("."));
			sc.setAttribute("restorani", restorani);
		}

		return restorani;
	}

	@POST
	@Path("/registracija")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik registracija(KorisnikDTO korisnik) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Korisnik noviKorisnik = korisnici.registrujKorisnika(korisnik);
		return noviKorisnik;
	}

	@POST
	@Path("/prijava")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik prijava(KorisnikPrijavaDTO korisnik) {

		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Korisnik prijavljeniKorisnik = korisnici.pronadjiKorisnika(korisnik.korisnickoIme, korisnik.lozinka);

		if (prijavljeniKorisnik != null) {
			request.getSession().setAttribute("prijavljeniKorisnik", prijavljeniKorisnik);
		}

		return prijavljeniKorisnik;

	}

	@POST
	@Path("/odjava")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout() {

		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("prijavljeniKorisnik") != null) {
			session.invalidate();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik nadjiPrijavljenogKorisnika(@PathParam("id") String id) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		// Korisnik prijavljeniKorisnik = (Korisnik)
		// request.getSession().getAttribute("prijavljeniKorisnik");

		return korisnici.nadjiPoId(id);
	}

	@GET
	@Path("/prijavljenKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik dobaviPrijavljenogKorisnika() {

		Korisnik prijavljen = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");

		return prijavljen;
	}

	@POST
	@Path("/izmeniLicnePodatke")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik izmeniLicnePodatke(KorisnikIzmenaPodatakaDTO izmenjeniKorisnik) {
		Korisnik prijavljeniKorisnik = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");
		KorisnikDAO korisnici = dobaviKorisnikDAO();

		Korisnik izmenjeniKor = korisnici.izmeniLicnePodatke(prijavljeniKorisnik, izmenjeniKorisnik);
		request.getSession().setAttribute("prijavljeniKorisnik", izmenjeniKor);

		korisnici.sacuvajPodatke();
		return izmenjeniKor;
	}

	@POST
	@Path("/dodajMenadzera")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Menadzer dodajMenadzera(MenadzerDTO menadzer) {

		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Menadzer noviMenadzer = korisnici.dodajMenadzera(menadzer);

		if (menadzer.restoran != null) {
			RestoranDAO restorani = dobaviRestoranDAO();
			Restoran restoran = restorani.dobaviRestoran(menadzer.restoran);

			String m = null;
			if (restoran != null) {
				m = korisnici.dodajRestoranMenadzeru(restoran, noviMenadzer.getId());
			}

			if (m == null)
				return null;
		}

		return noviMenadzer;
	}

	@POST
	@Path("/dodajDostavljaca")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Dostavljac dodajDostavljaca(KorisnikDTO dostavljac) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Dostavljac noviDostavljac = korisnici.dodajDostavljaca(dostavljac);
		return noviDostavljac;
	}

	@GET
	@Path("/menadzeri")
	@Produces(MediaType.APPLICATION_JSON)
	public List<MenadzerPrikazDTO> dobaviMenadzere() {
		KorisnikDAO dao = dobaviKorisnikDAO();
		List<MenadzerPrikazDTO> menadzeri = new ArrayList<MenadzerPrikazDTO>();

		for (Menadzer m : dao.dobaviNeobrisaneMenadzere()) {
			if (m.getRestoran() == null || m.getRestoran().getLogickoBrisanje() == 1) {
				menadzeri.add(new MenadzerPrikazDTO(m.getId(), m.getKorisnickoIme(), m.getIme(), m.getPrezime(),
						(m.getRestoran() != null)));
			}

		}
		return menadzeri;
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KorisnikPrikazDTO> nadjiKorisnike() {
		KorisnikDAO korisniciDAO = dobaviKorisnikDAO();

		String tipKupca = null;
		Double brojBodovaKupca = 0.0;
		List<KorisnikPrikazDTO> korisniciDTO = new ArrayList<KorisnikPrikazDTO>();

		for (Korisnik k : korisniciDAO.dobaviSve()) {
			String imePrz = k.getIme() + " " + k.getPrezime();

			KorisnikPrikazDTO korDTO = new KorisnikPrikazDTO(k.getId(), k.getKorisnickoIme(), imePrz,
					korisniciDAO.nadjiPol(k.getPol()), k.getDatumRodjenja(), korisniciDAO.nadjiUlogu(k.getUloga()),
					k.getIme(), k.getPrezime());

			if (k.getUloga().toString().equals("KUPAC")) {
				tipKupca = korisniciDAO.nadjiTipKupca(k);
				brojBodovaKupca = korisniciDAO.nadjiBrojBodovaKupca(k);

				korDTO.setBrojBodova(brojBodovaKupca);
				korDTO.setTipKupca(tipKupca);

			}

			/*
			 * korisniciDTO.add(new KorisnikPrikazDTO(k.getId(),k.getKorisnickoIme(),
			 * imePrz, korisniciDAO.nadjiPol(k.getPol()), k.getDatumRodjenja(),
			 * korisniciDAO.nadjiUlogu(k.getUloga()), k.getIme(), k.getPrezime()));
			 */

			korisniciDTO.add(korDTO);
		}

		return korisniciDTO;
	}

	@GET
	@Path("/restoranMenadzera/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RestoranMenadzerDTO restoranMenadzera(@PathParam("id") String id) {
		KorisnikDAO dao = dobaviKorisnikDAO();

		for (Menadzer m : dao.dobaviNeobrisaneMenadzere()) {
			if (m.getRestoran() != null && m.getRestoran().getLogickoBrisanje() != 1 && m.getId().equals(id)) {
				Restoran r = m.getRestoran();
				Lokacija l = r.getLokacija();
				List<ArtikliDTO> artikli = new ArrayList<>();
				for (Artikal a : r.getArtikliUPonudi()) {
					artikli.add(new ArtikliDTO(a.getNaziv(), a.getCena().toString(), a.tipString(), a.getRestoran(),
							a.getKolicina().toString(), a.getOpis(), a.getSlika()));
				}
				return new RestoranMenadzerDTO(r.getId(), r.getNaziv(), r.tipString(), r.getLogo(),
						l.getGeografskaDuzina(), l.getGeografskaSirina(), l.getUlica(), l.getBroj(), l.getMesto(),
						l.getPostanskiBroj(), r.getOcena().toString(), r.getStatus(), artikli);
			}

		}
		return null;
	}
}
