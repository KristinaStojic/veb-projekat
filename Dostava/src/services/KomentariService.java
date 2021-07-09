package services;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Komentar;
import beans.Kupac;
import dao.KomentarDAO;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RestoranDAO;
import dto.KomentarDTO;
import dto.KomentarPrikazDTO;
import dto.KomentariPrikazSviDTO;

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
	private KorisnikDAO dobaviKorisnikDAO() {

		KorisnikDAO korisnici = (KorisnikDAO) sc.getAttribute("korisnici");

		if (korisnici == null) {
			korisnici = new KorisnikDAO(sc.getRealPath("."));
			sc.setAttribute("korisnici", korisnici);
		}

		return korisnici;
	}
	
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
	
	
	@GET
	@Path("/nadjiKomentare/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KomentarPrikazDTO> nadjiNeobradjeneKomentare(@PathParam("id") String idMenadzera) {
		KomentarDAO komentarDAO = dobaviKomentarDAO();
		PorudzbinaDAO porudzbinaDAO = dobaviPorudzbinaDAO();
		KorisnikDAO korisnikDAO =  dobaviKorisnikDAO();
		String restoranMenadzera = korisnikDAO.restoranMenadzera(idMenadzera);
		List<KomentarPrikazDTO> komentariDTO = new ArrayList<>();
		for (Komentar komentar : komentarDAO.dobaviSve()) {
			if(!komentar.getObradjen() && komentar.getLogickoBrisanje() == 0) {
				String idRestorana = porudzbinaDAO.nadjiRestoranPorudzbine(komentar.getIdPorudzbine());
				Kupac k = korisnikDAO.nadjiKupca(komentar.getKupac());
				if(restoranMenadzera.equals(idRestorana)) {
					KomentarPrikazDTO komDTO = new KomentarPrikazDTO(komentar.getId(), k.getIme() + " " + k.getPrezime(), komentar.getTekst(), komentar.getOcena());
					komentariDTO.add(komDTO);
				}
				
			}
			
		}
		//System.out.println("ovoliko ima komentara za odobravanje: " + komentariDTO.size());
		return komentariDTO;
	}
	
	@POST
	@Path("/odobriKomentar/{id}/{idRestorana}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response odobriKomentar(@PathParam("id") String idKomentara,@PathParam("idRestorana") String idRestorana) {
		System.out.println("usao sam u odobravanje komentara: " + idKomentara);
		KomentarDAO komentari = dobaviKomentarDAO();
		RestoranDAO restoraniDAO = dobaviRestoranDAO();
		Integer ocena = komentari.nadjiOcenu(idKomentara);
		KorisnikDAO korDAO = dobaviKorisnikDAO();
		if (!komentari.odobriKomentar(idKomentara) || !restoraniDAO.azurirajOcenuRestorana(idRestorana, ocena) || !korDAO.azurirajOcenuRestorana(idRestorana, ocena)) {
			return Response.status(400).build();
		}
		return Response.status(200).build();
	}
	
	
	@POST
	@Path("/odbijKomentar/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response odbijKomentar(@PathParam("id") String idKomentara) {
		System.out.println("usao sam u odobravanje komentara: " + idKomentara);
		KomentarDAO komentari = dobaviKomentarDAO();
		if (!komentari.odbijKomentar(idKomentara)) {
			return Response.status(400).build();
		}
		return Response.status(200).build();
	}
	
	
	
	@GET
	@Path("/nadjiSveKomentare")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KomentariPrikazSviDTO> nadjiSveKomentare() {
		System.out.println("CAOOOOOOOOOOOOOOOOOOOO");
		KomentarDAO komentarDAO = dobaviKomentarDAO();
		PorudzbinaDAO porudzbinaDAO = dobaviPorudzbinaDAO();
		KorisnikDAO korisnikDAO =  dobaviKorisnikDAO();
		List<KomentariPrikazSviDTO> komentariDTO = new ArrayList<>();
		for (Komentar komentar : komentarDAO.dobaviSve()) {
			if(komentar.getObradjen() && komentar.getLogickoBrisanje() == 0) {
				String idRestorana = porudzbinaDAO.nadjiRestoranPorudzbine(komentar.getIdPorudzbine());
				Kupac k = korisnikDAO.nadjiKupca(komentar.getKupac());
				
				KomentariPrikazSviDTO komDTO = new KomentariPrikazSviDTO(komentar.getId(), k.getIme() + " " + k.getPrezime(), komentar.getTekst(), komentar.getOcena(),
						komentarDAO.Odobren(komentar.getOdobren()), idRestorana);
				komentariDTO.add(komDTO);
				System.out.println(komentarDAO.Odobren(komentar.getOdobren()));
				
			}
			
		}
		System.out.println("ovoliko ima komentara koji su obradjeni: " + komentariDTO.size());
		return komentariDTO;
	}
	
	@DELETE
	@Path("/obrisiKomentar/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response obrisiRestoran(@PathParam("id") String idKomentara) {
		System.out.println("cao ubicu se ako ne udjes ovde :D");
		KomentarDAO komDAO = dobaviKomentarDAO();
		RestoranDAO restDAO = dobaviRestoranDAO();
		KorisnikDAO korDAO = dobaviKorisnikDAO();
		PorudzbinaDAO porudzbinaDAO = dobaviPorudzbinaDAO();

		String idRestorana = porudzbinaDAO.nadjiRestoranPorudzbine(komDAO.dobaviKomentar(idKomentara).getIdPorudzbine());
		System.out.println(idRestorana);
		if(restDAO.izmeniOcenu(komDAO.dobaviKomentar(idKomentara),idRestorana) &&
				korDAO.ispraviOcenuRestorana(idRestorana, komDAO.dobaviKomentar(idKomentara), restDAO.dobaviRestoran(idRestorana).getUkupanBrojKomentara() + 1)
				&& komDAO.obrisiKomentar(idKomentara)) {
			return Response.status(200).build();
		}
		
		return Response.status(400).build();

	}
}
