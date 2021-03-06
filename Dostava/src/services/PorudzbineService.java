package services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Artikal;
import beans.ArtikalKorpa;
import beans.Korisnik;
import beans.Porudzbina;
import beans.Restoran;
import beans.TipKupca;
import beans.TipKupca.ImeTipa;
import beans.Porudzbina.Status;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RestoranDAO;
import dto.ArtikliKorpaDTO;
import dto.KorisnikPrikazDTO;
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
			porudzbine = new PorudzbinaDAO();
			sc.setAttribute("porudzbine", porudzbine);
		}

		return porudzbine;
	}

	private RestoranDAO dobaviRestoranDAO() {

		RestoranDAO restorani = (RestoranDAO) sc.getAttribute("restorani");

		if (restorani == null) {
			restorani = new RestoranDAO();
			sc.setAttribute("restorani", restorani);
		}

		return restorani;
	}

	private KorisnikDAO dobaviKorisnikDAO() {

		KorisnikDAO korisnici = (KorisnikDAO) sc.getAttribute("korisnici");

		if (korisnici == null) {
			korisnici = new KorisnikDAO();
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
		Date prvi = new Date(System.currentTimeMillis());
		long HOUR = 3600*1000;
		Date konacni = new Date(prvi.getTime() + 2 * HOUR);
		Porudzbina p = new Porudzbina(UUID.randomUUID().toString().replace("-", "").substring(0, 10), artikli,
				r.getId(), konacni, korpa.cena, korpa.korisnik, Porudzbina.Status.OBRADA);
		String idKorisnika = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik")).getId();
		TipKupca prethodni = korisnici.nadjiTipKupca(idKorisnika);
		if (!korisnici.dodajPorudzbinu(p)) {
			return Response.status(400).build();
		}
		porudzbine.dodajPorudzbinu(p);
		TipKupca novi = korisnici.nadjiTipKupca(idKorisnika);

		if (prethodni.getImeTipa() == novi.getImeTipa()) {
			Response.status(200).entity(0).build();
		} else if (prethodni.getImeTipa() == ImeTipa.BRONZANI && novi.getImeTipa() == ImeTipa.SREBRNI) {
			return Response.status(200).entity("??estitamo! Postali ste srebrni ??lan!").build();
		} else if (prethodni.getImeTipa() == ImeTipa.SREBRNI && novi.getImeTipa() == ImeTipa.ZLATNI) {
			return Response.status(200).entity("??estitamo! Postali ste zlatni ??lan!").build();
		} else if (prethodni.getImeTipa() == ImeTipa.BRONZANI && novi.getImeTipa() == ImeTipa.ZLATNI) {
			return Response.status(200).entity("??estitamo! Postali ste zlatni ??lan!").build();
		}
		return Response.status(200).entity(0).build();
	}

	@POST
	@Path("/otkaziPorudzbinu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response otkaziPorudzbinu(@PathParam("id") String id) {
		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		String idKorisnika = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik")).getId();
		if (!porudzbine.promeniStatusPorudzbine(id, Status.OTKAZANA)
				|| !korisnici.promeniStatusPorudzbineKupcu(id, idKorisnika, Status.OTKAZANA)) {
			return Response.status(400).build();
		}

		return Response.status(200).build();
	}

	@POST
	@Path("/odobriPorudzbinu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response odobriPorudzbinu(@PathParam("id") String id) {

		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Porudzbina porudzbina = porudzbine.dobaviPorudzbinu(id);
		Status status = Status.PRIPREMA;
		if (porudzbina.getStatus() == status) {
			status = Status.CEKA_DOSTAVU;
		}
		if (!porudzbine.promeniStatusPorudzbine(id, status)
				|| !korisnici.promeniStatusPorudzbineKupcu(id, porudzbina.getKupac(), status)) {
			return Response.status(400).build();
		}

		return Response.status(200).build();
	}

	@POST
	@Path("/dostaviPorudzbinu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dostaviPorudzbinu(@PathParam("id") String id) {
		System.out.println("id porudzbine za dostavljanje: " + id);
		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		String idKupca = porudzbine.dobaviPorudzbinu(id).getKupac();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		String idDostavljaca = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik")).getId();
		if (!porudzbine.promeniStatusPorudzbine(id, Status.DOSTAVLJENA)
				|| !korisnici.dostavljacDostavio(id, idDostavljaca)) {
		}

		if (!korisnici.promeniStatusPorudzbineKupcu(id, idKupca, Status.DOSTAVLJENA)) {
			return Response.status(400).build();
		}

		return Response.status(200).build();
	}

	@POST
	@Path("/zahtevajPorudzbinu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response zahtevajPorudzbinu(@PathParam("id") String id) {
		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		String idDostavljaca = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik")).getId();
		Integer zahtev = porudzbine.zahtevajPorudzbinu(id, idDostavljaca);
		if (zahtev == 0) {
			return Response.status(400).build();
		} else if (zahtev == 1) {
			return Response.status(200).entity("Ve?? ste poslali zahtev!").build();
		}

		return Response.status(200).entity("Zahtev uspe??no poslat!").build();
	}

	@GET
	@Path("/dobaviZahteve/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KorisnikPrikazDTO> dobaviZahteve(@PathParam("id") String id) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		List<String> dostavljaci = porudzbine.dobaviPorudzbinu(id).getDostavljaciKojiZahtevaju();
		return korisnici.dobaviDTODostavljace(dostavljaci);
	}

	@POST
	@Path("/dodeliPorudzbinu/{id}/{idDostavljaca}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodeliPorudzbinu(@PathParam("id") String id, @PathParam("idDostavljaca") String idDostavljaca) {
		PorudzbinaDAO porudzbine = dobaviPorudzbinaDAO();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Porudzbina porudzbina = porudzbine.dobaviPorudzbinu(id);
		if (porudzbina == null || porudzbina.getStatus() != Status.CEKA_DOSTAVU) {
			return Response.status(400).build();
		}
		porudzbina.setDostavljac(idDostavljaca);
		if (!porudzbine.promeniStatusPorudzbineTransport(id, idDostavljaca)
				|| !korisnici.promeniStatusPorudzbineKupcuTransport(id, porudzbina.getKupac(), idDostavljaca)
				|| !korisnici.dodeliPorudzbinuDostavljacu(porudzbina, idDostavljaca)) {
			return Response.status(400).build();
		}
		return Response.status(200).entity("Porud??bina uspe??no dodeljena dostavlja??u!").build();
	}
}
