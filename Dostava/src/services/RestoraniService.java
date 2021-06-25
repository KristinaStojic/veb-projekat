package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restoran;
import dao.RestoranDAO;
import dao.RestoranDAO;

@Path("/")
public class RestoraniService {

	@Context
	ServletContext ctx;

	public RestoraniService() {
		
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("restorani") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("restorani", new RestoranDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restoran> getRestorans() {
		RestoranDAO dao = (RestoranDAO) ctx.getAttribute("restorani");
		return dao.dobaviRestorane();
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Restoran getRestorans(Restoran restorani) {
		RestoranDAO dao = (RestoranDAO) ctx.getAttribute("restorani");
		return dao.sacuvaj(restorani);
	}
}
