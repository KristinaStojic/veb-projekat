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
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RestoranDAO;
import dto.ArtikliKorpaDTO;
import dto.KorpaDTO;

@Path("/porudzbine")
public class PorudzbineService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext sc;

	private PorudzbinaDAO dobaviPorudzbinaDAO() {

		PorudzbinaDAO porudzbine = (PorudzbinaDAO) sc.getAttribute("porudzbine");

		if (porudzbine == null) {
			porudzbine = new PorudzbinaDAO(sc.getRealPath("."));
			sc.setAttribute("porudzbine", porudzbine);
		}

		return porudzbine;
	}

	private RestoranDAO dobaviRestoranDAO() {

		RestoranDAO restorani = (RestoranDAO) sc.getAttribute("restorani");

		if (restorani == null) {
			restorani = new RestoranDAO(sc.getRealPath("."));
			sc.setAttribute("restorani", restorani);
		}

		return restorani;
	}
	
	private KorisnikDAO dobaviKorisnikDAO() {

		KorisnikDAO korisnici = (KorisnikDAO) sc.getAttribute("korisnici");

		if (korisnici == null) {
			korisnici = new KorisnikDAO(sc.getRealPath("."));
			sc.setAttribute("korisnici", korisnici);
		}

		return korisnici;
	}

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajPorudzbinu(KorpaDTO korpa) {
		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		RestoranDAO restorani = dobaviRestoranDAO();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Restoran r = restorani.dobaviRestoran(korpa.artikli.get(0).restoran);
		if (r.getLogickoBrisanje() == 1 || r == null) {
			return Response.status(400).build();
		}
		List<ArtikalKorpa> artikli = new ArrayList<>();
		for (ArtikliKorpaDTO a : korpa.artikli) {
			for (Artikal ar : r.getArtikliUPonudi()) {
				if (a.naziv.equals(ar.getNaziv())) {
					artikli.add(new ArtikalKorpa(ar, a.kolicinaKorpa));
					break;
				}
			}
		}

		Porudzbina p = new Porudzbina(UUID.randomUUID().toString().replace("-", "").substring(0, 10), artikli, r,
				new Date(System.currentTimeMillis()), korpa.cena, korpa.korisnik, Porudzbina.Status.OBRADA);
		
		if(!korisnici.dodajPorudzbinu(p)) {
			return Response.status(400).build();
		}
		porudzbine.dodajPorudzbinu(p);
		return Response.status(200).build();
	}

}
