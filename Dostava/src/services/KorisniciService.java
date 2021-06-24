package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Korisnik;
import dao.KorisnikDAO;
import dto.KorisnikPrijavaDTO;

@Path("/korisnici")
public class KorisniciService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	
	@POST
	@Path("/prijava")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response prijava(KorisnikPrijavaDTO korisnik) {
		KorisnikDAO sviKorisnici = nadjiSveKorisnike();

		Korisnik noviKorisnik = sviKorisnici.dobaviPoKorisnickomImenu(korisnik.korisnickoIme);

		if (noviKorisnik == null) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Ne postoji korisnik sa unesenim korisničkim imenom.")
					.build();
		}	
		
		
		
		if (!noviKorisnik.getLozinka().equals(korisnik.lozinka)) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Pogrešna lozinka.")
					.build();
		}
		
		

		request.getSession().setAttribute("prijavljenKorisnik", noviKorisnik); 

		// We know this, because in users we have 3 types of instances[Administrator,
		// Guest, Host]
		/*if (noviKorisnik.getRole().equals("ADMINISTRATOR")) {
			return Response.status(Response.Status.ACCEPTED).entity("/Apartments/administratorDashboard.html").build();

		} else if (userForLogin.getRole().equals("GUEST")) {
			return Response.status(Response.Status.ACCEPTED).entity("/Apartments/guestDashboard.html").build();

		} else if (userForLogin.getRole().equals("HOST")) {
			return Response.status(Response.Status.ACCEPTED).entity("/Apartments/hostDashboard.html").build();

		}
*/
		//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/#/loginaaa").build(); // redirect to login
																									// when is login
																									// accepted
		// return Response.ok().build();
		return null;
	}
	
	
	private KorisnikDAO nadjiSveKorisnike() {
		
		KorisnikDAO korisnici = (KorisnikDAO) ctx.getAttribute("korisnici");
		
		if (korisnici == null) {
			korisnici = new KorisnikDAO();
			korisnici.ucitajKorisnike();
			ctx.setAttribute("korisnici", korisnici);

		}

		return korisnici;
	}
}


