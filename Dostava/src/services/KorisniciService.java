package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Korisnik;
import dao.KorisnikDAO;
import dto.KorisnikDTO;
import dto.KorisnikPrijavaDTO;

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
			System.out.println(sc.getRealPath("."));
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
		System.out.println(korisnik.korisnickoIme);
		Korisnik prijavljeniKorisnik = korisnici.dobaviPoKorisnickomImenu(korisnik.korisnickoIme);
		request.getSession().setAttribute("prijavljeniKorisnik", prijavljeniKorisnik); 
		
		return prijavljeniKorisnik;
		

	}


}
