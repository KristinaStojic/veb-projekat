package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

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
import dto.RestoranPrikazDTO;

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
	public List<RestoranPrikazDTO> dobaviRestorane() {
		RestoranDAO dao = dobaviRestoranDAO();
		List<RestoranPrikazDTO> restoraniDTO = new ArrayList<RestoranPrikazDTO>();

		for (Restoran r : dao.dobaviRestorane()) {
			String lokacija = r.getLokacija().getUlica() + " " + r.getLokacija().getBroj().toString() + ", " + r.getLokacija().getMesto();
			restoraniDTO.add(new RestoranPrikazDTO(r.getId(), r.getNaziv(), r.tipString(), r.statusString(), lokacija, r.getLogo()));
		}
		
		return restoraniDTO;
	}

}
