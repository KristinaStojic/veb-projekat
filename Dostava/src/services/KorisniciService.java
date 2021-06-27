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
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Korisnik;
import beans.Restoran;
import dao.KorisnikDAO;
import dao.RestoranDAO;
import dto.KorisnikDTO;
import dto.KorisnikIzmenaPodatakaDTO;
import dto.KorisnikPrijavaDTO;
import dto.RestoranPrikazDTO;

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
	public Korisnik login(KorisnikPrijavaDTO korisnik) {

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
		if(session != null && session.getAttribute("prijavljeniKorisnik") != null) {
			session.invalidate();
		}
		
		Korisnik prijavljeniKorisnik = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");	
		System.out.println(prijavljeniKorisnik);
		
	}
	
	@GET
	@Path("/nadjiPrijavljenogKorisnika")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik nadjiPrijavljenogKorisnika() {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Korisnik prijavljeniKorisnik = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");	

		return korisnici.dobaviPoKorisnickomImenu(prijavljeniKorisnik.getKorisnickoIme());
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
	
	@GET
	@Path("/menadzeri")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KorisnikDTO> dobaviMenadzere() {
		KorisnikDAO dao = dobaviKorisnikDAO();
		List<KorisnikDTO> korisnici = new ArrayList<KorisnikDTO>();

		for (Korisnik k : dao.dobaviSve()) {
			if(k.getUloga().equals(Korisnik.Uloga.MENADZER)) {
				korisnici.add(new KorisnikDTO(k.getId(),k.getKorisnickoIme(), k.getLozinka(),k.getIme(),k.getPrezime(),k.getPol(), k.getDatumRodjenja(), k.getUloga()));
			}
			
		}
		return korisnici;
	}

}
