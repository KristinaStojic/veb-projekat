package services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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
		Artikal artikal = new Artikal(a.naziv, Double.parseDouble(a.cena), a.tip, a.restoran, kolicina, a.opis,
				a.slika);

		if (!restorani.dodajArtikal(a.restoran, artikal) || !korisnici.dodarArtikal(artikal, a.restoran)) {
			return Response.status(400).build();
		}

		return Response.status(200).build();
	}

}
