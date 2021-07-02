package services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Artikal;
import beans.Lokacija;
import beans.Restoran;
import dao.KorisnikDAO;
import dao.RestoranDAO;
import dto.Artikli2DTO;
import dto.ArtikliDTO;
import dto.RestoranDodavanjeDTO;
import dto.RestoranMenadzerDTO;
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
	
	

	private KorisnikDAO dobaviKorisnikDAO() {

		KorisnikDAO korisnici = (KorisnikDAO) sc.getAttribute("korisnici");

		if (korisnici == null) {
			korisnici = new KorisnikDAO(sc.getRealPath("."));
			sc.setAttribute("korisnici", korisnici);
		}

		return korisnici;
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<RestoranPrikazDTO> dobaviRestorane() {
		RestoranDAO dao = dobaviRestoranDAO();
		List<RestoranPrikazDTO> restoraniDTO = new ArrayList<RestoranPrikazDTO>();

		for (Restoran r : dao.dobaviRestorane()) {
			String lokacija = r.getLokacija().getUlica() + " " + r.getLokacija().getBroj().toString() + ", "
					+ r.getLokacija().getMesto();
			restoraniDTO.add(new RestoranPrikazDTO(r.getId(), r.getNaziv(), r.tipString(), r.statusString(), lokacija,
					r.getLogo(), r.getOcena().toString()));
		}

		return restoraniDTO;
	}

	@POST
	@Path("/dodajSliku")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void dodajSliku() {
		System.out.println("slika upisana");
	}

	@POST
	@Path("/dodajRestoran")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RestoranDodavanjeDTO dodajRestoran(RestoranDodavanjeDTO r) {
		Lokacija lokacija = new Lokacija(r.geografskaDuzina, r.geografskaSirina, r.ulica, r.broj, r.mesto,
				r.postanskiBroj);
		Restoran noviRestoran = new Restoran(UUID.randomUUID().toString(), 0, r.naziv, r.tipRestorana,
				new ArrayList<Artikal>(), true, lokacija, r.logo, 0.0);

		RestoranDAO restorani = dobaviRestoranDAO();
		Restoran dodat = restorani.dodajRestoran(noviRestoran);
		KorisnikDAO korisnici = dobaviKorisnikDAO();

		if (!r.idMenadzera.equals("")) {
			String menadzer = korisnici.dodajRestoranMenadzeru(noviRestoran, r.idMenadzera);
			if (menadzer == null)
				return null;
		}
		if (dodat == null) {
			return null;
		}
		r.id = dodat.getId();
		return r;
	}

	@POST
	@Path("/dodajArtikal")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajArtikal(Artikli2DTO a) {

		RestoranDAO restorani = dobaviRestoranDAO();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Double kolicina = 0.0;
		if (!a.kolicina.equals(""))
			kolicina = Double.parseDouble(a.kolicina);
		Artikal artikal = new Artikal(0,a.naziv, Double.parseDouble(a.cena), a.tip, a.restoran, kolicina, a.opis,
				a.slika);

		if (!restorani.dodajArtikal(a.restoran, artikal) || !korisnici.dodarArtikal(artikal, a.restoran)) {
			return Response.status(400).build();
		}

		return Response.status(200).build();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RestoranMenadzerDTO nadjiRestoran(@PathParam("id") String id) {
		RestoranDAO dao = dobaviRestoranDAO();
		Restoran r = dao.dobaviRestoran(id);

		if (r == null || r.getLogickoBrisanje() == 1) {
			return null;
		}

		Lokacija l = r.getLokacija();
		List<ArtikliDTO> artikli = new ArrayList<>();
		for (Artikal a : r.getArtikliUPonudi()) {
			System.out.println(a.getLogickoBrisanje());
			if(a.getLogickoBrisanje() == 0) {
			artikli.add(new ArtikliDTO(a.getNaziv(), a.getCena().toString(), a.tipString(), a.getRestoran(),
					a.getKolicina().toString(), a.getOpis(), a.getSlika()));
			}
		}
		return new RestoranMenadzerDTO(r.getId(), r.getNaziv(), r.tipString(), r.getLogo(), l.getGeografskaDuzina(),
				l.getGeografskaSirina(), l.getUlica(), l.getBroj(), l.getMesto(), l.getPostanskiBroj(),
				r.getOcena().toString(), r.getStatus(), artikli);
	}

	@GET
	@Path("/arikli/{id}/{naziv}")
	@Produces(MediaType.APPLICATION_JSON)
	public Artikli2DTO nadjiArtikal(@PathParam("id") String id, @PathParam("naziv") String naziv) {

		RestoranDAO dao = dobaviRestoranDAO();
		Restoran r = dao.dobaviRestoran(id);

		if (r == null || r.getLogickoBrisanje() == 1) {
			return null;
		}

		for (Artikal a : r.getArtikliUPonudi()) {
			if (a.getNaziv().equals(naziv)) {
				return new Artikli2DTO(a.getNaziv(), a.getCena().toString(), a.getTipArtikla(), a.getRestoran(),
						a.getKolicina().toString(), a.getOpis(), a.getSlika());
			}

		}
		return null;
	}

	@PUT
	@Path("/izmeniArtikal/{id}/{naziv}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izmeniArtikal(@PathParam("id") String id, @PathParam("naziv") String stariNaziv, Artikli2DTO a) {

		RestoranDAO restorani = dobaviRestoranDAO();
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Double kolicina = 0.0;
		if (!a.kolicina.equals(""))
			kolicina = Double.parseDouble(a.kolicina);

		Artikal artikal = new Artikal(a.naziv, Double.parseDouble(a.cena), a.tip, a.restoran, kolicina, a.opis,
				a.slika);

		if (!restorani.izmeniArtikal(id, stariNaziv, artikal) || !korisnici.izmeniArtikal(id, stariNaziv, artikal)) {

			return Response.status(400).build();
		}

		return Response.status(200).build();
	}
	
	
	@DELETE
	@Path("/obrisiRestoran/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response obrisiRestoran(@PathParam("id") String idRestorana) {
		RestoranDAO restorani = dobaviRestoranDAO();
		restorani.obrisiRestoran(idRestorana);
		
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		korisnici.obrisiRestoranMenadzeru(idRestorana);
		
		return Response.status(200).build();
	}
	
	
	@DELETE
	@Path("/obrisiArtikal/{id}/{restoran}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response obrisiArtikal(@PathParam("id") String nazivArtikla,@PathParam("restoran") String idRestorana) {
		RestoranDAO restorani = dobaviRestoranDAO();
		restorani.obrisiArtikal(nazivArtikla, idRestorana);
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		korisnici.obrisiArtikleuMenadzeru(nazivArtikla,idRestorana);
		return Response.status(200).build();
	}
}
