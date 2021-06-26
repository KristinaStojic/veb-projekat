package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restoran;
import dao.RestoranDAO;

@Path("/restorani")
public class RestoraniService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext sc;

	public RestoraniService() {
		
	}
	
	private RestoranDAO dobaviRestoranDAO() {

		RestoranDAO restorani = (RestoranDAO) sc.getAttribute("restorani");

		if (restorani == null) {
			restorani = new RestoranDAO(sc.getRealPath("."));
			sc.setAttribute("restorani", restorani);
		}

		return restorani;
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restoran> dobaviRestorane() {
		RestoranDAO dao = dobaviRestoranDAO();
		return dao.dobaviRestorane();
	}
	
}
