package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import dao.KorisnikDAO;

@Path("/prijava")
public class PrijavaService {

	@Context
	ServletContext ctx;
	
public PrijavaService() {
		
	}

@PostConstruct
public void init() {
	if (ctx.getAttribute("korisnik") == null) {
    	String contextPath = ctx.getRealPath("");
		ctx.setAttribute("korisnik", new KorisnikDAO(contextPath));
	}
}

}
