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

import beans.Dostavljac;
import beans.Korisnik;
import beans.Menadzer;
import beans.Restoran;
import dao.KorisnikDAO;
import dao.RestoranDAO;
import dto.KorisnikDTO;
import dto.KorisnikIzmenaPodatakaDTO;
import dto.KorisnikPrijavaDTO;
import dto.MenadzerDTO;
import dto.MenadzerPrikazDTO;

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
		System.out.println("uslo");
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("prijavljeniKorisnik") != null) {
			session.invalidate();
		}

		Korisnik prijavljeniKorisnik = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");
		System.out.println(prijavljeniKorisnik);

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

			String m =null;
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

			menadzeri.add(new MenadzerPrikazDTO(m.getId(), m.getKorisnickoIme(), m.getIme(), m.getPrezime(),
					(m.getRestoran() != null)));

		}
		return menadzeri;
	}

}
