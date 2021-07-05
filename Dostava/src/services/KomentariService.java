package services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Artikal;
import beans.ArtikalKorpa;
import beans.Porudzbina;
import beans.Restoran;
import dao.KomentarDAO;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RestoranDAO;
import dto.ArtikliKorpaDTO;
import dto.KomentarDTO;
import dto.KorpaDTO;

@Path("/komentari")
public class KomentariService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext sc;

	private KomentarDAO dobaviKomentarDAO() {

		KomentarDAO komentari = (KomentarDAO) sc.getAttribute("komentari");

		if (komentari == null) {
			komentari = new KomentarDAO(sc.getRealPath("."));
			sc.setAttribute("komentari", komentari);
		}

		return komentari;
	}

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajKomentar(KomentarDTO komentar) {
		KomentarDAO komentari = dobaviKomentarDAO();

		if (komentari.dodajKomentar(komentar) == null) {
			return Response.status(400).build();
		}
		return Response.status(200).build();
	}
}
