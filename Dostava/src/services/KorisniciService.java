package services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

import beans.Artikal;
import beans.Artikal.TipArtikla;
import beans.Korisnik.Uloga;
import beans.ArtikalKorpa;
import beans.Dostavljac;
import beans.Korisnik;
import beans.Korpa;
import beans.Kupac;
import beans.Lokacija;
import beans.Menadzer;
import beans.Porudzbina;
import beans.Restoran;
import beans.TipKupca.ImeTipa;
import dao.KorisnikDAO;
import dao.PorudzbinaDAO;
import dao.RestoranDAO;
import dto.ArtikliDTO;
import dto.ArtikliKorpaDTO;
import dto.ArtikliPorudzbineDTO;
import dto.KorisnikBlokiranjeDTO;
import dto.KorisnikDTO;
import dto.KorisnikIzmenaPodatakaDTO;
import dto.KorisnikPrijavaDTO;
import dto.KorisnikPrikazDTO;
import dto.KorpaDTO;
import dto.MenadzerDTO;
import dto.MenadzerPrikazDTO;
import dto.PorudzbinePrikazDTO;
import dto.PorudzbinePrikazKupacaDTO;
import dto.RestoranMenadzerDTO;

@Path("/korisnici")
public class KorisniciService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext sc;

	private KorisnikDAO dobaviKorisnikDAO() {

		KorisnikDAO korisnici = (KorisnikDAO) sc.getAttribute("korisnici");

		if (korisnici == null) {
			korisnici = new KorisnikDAO(sc.getRealPath("."));
			sc.setAttribute("korisnici", korisnici);
		}

		return korisnici;
	}

	private RestoranDAO dobaviRestoranDAO() {

		RestoranDAO restorani = (RestoranDAO) sc.getAttribute("restorani");

		if (restorani == null) {
			restorani = new RestoranDAO(sc.getRealPath("."));
			sc.setAttribute("restorani", restorani);
		}

		return restorani;
	}

	private PorudzbinaDAO dobaviPorudzbinaDAO() {

		PorudzbinaDAO porudzbine = (PorudzbinaDAO) sc.getAttribute("porudzbine");

		if (porudzbine == null) {
			porudzbine = new PorudzbinaDAO(sc.getRealPath("."));
			sc.setAttribute("porudzbine", porudzbine);
		}

		return porudzbine;
	}

	@POST
	@Path("/registracija")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik registracija(KorisnikDTO korisnik) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Korisnik noviKorisnik = korisnici.registrujKorisnika(korisnik);
		return noviKorisnik;
	}

	@POST
	@Path("/prijava")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik prijava(KorisnikPrijavaDTO korisnik) {

		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Korisnik prijavljeniKorisnik = korisnici.pronadjiKorisnika(korisnik.korisnickoIme, korisnik.lozinka);

		if (prijavljeniKorisnik != null) {
			request.getSession().setAttribute("prijavljeniKorisnik", prijavljeniKorisnik);
			Korisnik k = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik"));
			if(k.getUloga() == Uloga.KUPAC) {
				dobaviKorisnikDAO().ukloniKorpu(k.getId());
			}
		}

		return prijavljeniKorisnik;

	}

	@POST
	@Path("/odjava")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void logout() {
		HttpSession session = request.getSession();
		if (session != null && session.getAttribute("prijavljeniKorisnik") != null) {
			Korisnik k = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik"));
			if(k.getUloga() == Uloga.KUPAC) {
				dobaviKorisnikDAO().ukloniKorpu(k.getId());
			}
			session.invalidate();
		}
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik nadjiPrijavljenogKorisnika(@PathParam("id") String id) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		// Korisnik prijavljeniKorisnik = (Korisnik)
		// request.getSession().getAttribute("prijavljeniKorisnik");

		return korisnici.nadjiPoId(id);
	}

	@GET
	@Path("/prijavljenKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	public Korisnik dobaviPrijavljenogKorisnika() {

		Korisnik prijavljen = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");

		return prijavljen;
	}

	@POST
	@Path("/izmeniLicnePodatke")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Korisnik izmeniLicnePodatke(KorisnikIzmenaPodatakaDTO izmenjeniKorisnik) {
		Korisnik prijavljeniKorisnik = (Korisnik) request.getSession().getAttribute("prijavljeniKorisnik");
		KorisnikDAO korisnici = dobaviKorisnikDAO();

		Korisnik izmenjeniKor = korisnici.izmeniLicnePodatke(prijavljeniKorisnik, izmenjeniKorisnik);
		request.getSession().setAttribute("prijavljeniKorisnik", izmenjeniKor);

		korisnici.sacuvajPodatke();
		return izmenjeniKor;
	}

	@POST
	@Path("/dodajMenadzera")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Menadzer dodajMenadzera(MenadzerDTO menadzer) {

		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Menadzer noviMenadzer = korisnici.dodajMenadzera(menadzer);

		if (menadzer.restoran != null) {
			RestoranDAO restorani = dobaviRestoranDAO();
			Restoran restoran = restorani.dobaviRestoran(menadzer.restoran);

			String m = null;
			if (restoran != null) {
				m = korisnici.dodajRestoranMenadzeru(restoran, noviMenadzer.getId());
			}

			if (m == null)
				return null;
		}

		return noviMenadzer;
	}

	@POST
	@Path("/dodajDostavljaca")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Dostavljac dodajDostavljaca(KorisnikDTO dostavljac) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();
		Dostavljac noviDostavljac = korisnici.dodajDostavljaca(dostavljac);
		return noviDostavljac;
	}

	@GET
	@Path("/menadzeri")
	@Produces(MediaType.APPLICATION_JSON)
	public List<MenadzerPrikazDTO> dobaviMenadzere() {
		KorisnikDAO dao = dobaviKorisnikDAO();
		List<MenadzerPrikazDTO> menadzeri = new ArrayList<MenadzerPrikazDTO>();

		for (Menadzer m : dao.dobaviNeobrisaneMenadzere()) {
			if (m.getRestoran() == null || m.getRestoran().getLogickoBrisanje() == 1) {
				menadzeri.add(new MenadzerPrikazDTO(m.getId(), m.getKorisnickoIme(), m.getIme(), m.getPrezime(),
						(m.getRestoran() != null)));
			}

		}
		return menadzeri;
	}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KorisnikPrikazDTO> nadjiKorisnike() {
		KorisnikDAO korisniciDAO = dobaviKorisnikDAO();

		String tipKupca = null;
		Double brojBodovaKupca = 0.0;
		List<KorisnikPrikazDTO> korisniciDTO = new ArrayList<KorisnikPrikazDTO>();

		for (Korisnik k : korisniciDAO.dobaviSve()) {
			String imePrz = k.getIme() + " " + k.getPrezime();

			KorisnikPrikazDTO korDTO = new KorisnikPrikazDTO(k.getId(), k.getKorisnickoIme(), imePrz,
					korisniciDAO.nadjiPol(k.getPol()), k.getDatumRodjenja(), korisniciDAO.nadjiUlogu(k.getUloga()),
					k.getIme(), k.getPrezime(), k.getBlokiran());

			if (k.getUloga().toString().equals("KUPAC")) {
				tipKupca = korisniciDAO.nadjiTipKupca(k);
				brojBodovaKupca = korisniciDAO.nadjiBrojBodovaKupca(k);

				korDTO.setBrojBodova(brojBodovaKupca);
				korDTO.setTipKupca(tipKupca);

			}
			/*
			 * korisniciDTO.add(new KorisnikPrikazDTO(k.getId(),k.getKorisnickoIme(),
			 * imePrz, korisniciDAO.nadjiPol(k.getPol()), k.getDatumRodjenja(),
			 * korisniciDAO.nadjiUlogu(k.getUloga()), k.getIme(), k.getPrezime()));
			 */

			korisniciDTO.add(korDTO);
		}

		return korisniciDTO;
	}

	@GET
	@Path("/restoranMenadzera/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RestoranMenadzerDTO restoranMenadzera(@PathParam("id") String id) {
		KorisnikDAO dao = dobaviKorisnikDAO();

		for (Menadzer m : dao.dobaviNeobrisaneMenadzere()) {
			if (m.getRestoran() != null && m.getRestoran().getLogickoBrisanje() != 1 && m.getId().equals(id)) {
				Restoran r = m.getRestoran();
				Lokacija l = r.getLokacija();
				List<ArtikliDTO> artikli = new ArrayList<>();
				for (Artikal a : r.getArtikliUPonudi()) {
					if (a.getLogickoBrisanje() == 0) {
						artikli.add(new ArtikliDTO(a.getNaziv(), a.getCena().toString(), a.tipString(), a.getRestoran(),
								a.getKolicina().toString(), a.getOpis(), a.getSlika()));
					}
				}
				
				for(ArtikliDTO a : artikli) {
				}
				return new RestoranMenadzerDTO(r.getId(), r.getNaziv(), r.tipString(), r.getLogo(),
						l.getGeografskaDuzina(), l.getGeografskaSirina(), l.getUlica(), l.getBroj(), l.getMesto(),
						l.getPostanskiBroj(), r.getOcena().toString(), r.getStatus(), artikli);
			}

		}
		return null;
	}

	@POST
	@Path("/blokirajKorisnika")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response blokirajKorisnika(KorisnikBlokiranjeDTO korisnik) {
		KorisnikDAO korisnici = dobaviKorisnikDAO();

		korisnici.blokirajKorisnika(korisnik);
		korisnici.sacuvajPodatke();
		return Response.status(Response.Status.ACCEPTED).entity("Uspjesno blokiran korisnik!").build();

	}

	@DELETE
	@Path("/obrisiKorisnika/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response obrisiRestoran(@PathParam("id") String idKorisnika) {

		KorisnikDAO korisnici = dobaviKorisnikDAO();
		korisnici.obrisiKorisnika(idKorisnika);

		return Response.status(200).build();
	}

	@GET
	@Path("/proveraKorpe") 
	@Produces(MediaType.APPLICATION_JSON)
	public Response proveraKorpe() {
		KorisnikDAO dao = dobaviKorisnikDAO();
		String idKupca = ((Korisnik) request.getSession().getAttribute("prijavljeniKorisnik")).getId();
		if (idKupca == null)
			return Response.status(400).build(); 
		
		if(dao.dobaviKupca(idKupca).getKorpa().getArtikli().isEmpty())
			return Response.status(400).build(); 
			
		return Response.status(200).build();
	}
	
	public TipArtikla tipArtiklaEnum(String tekst) {
		if (tekst.equals("Jelo")) {
			return TipArtikla.JELO;
		} else {
			return TipArtikla.PICE;
		}
	}

	@GET
	@Path("/nadjiKorpu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public KorpaDTO nadjiKorpu(@PathParam("id") String id) {
		KorisnikDAO dao = dobaviKorisnikDAO();
		Kupac k = dao.dobaviKupca(id);
		if (k == null)
			return null;
		Korpa korpa = k.getKorpa();
		KorpaDTO povratna = new KorpaDTO();
		povratna.artikli = new ArrayList<ArtikliKorpaDTO>();
		for (ArtikalKorpa ak : korpa.getArtikli()) {
			Artikal a = ak.getArtikal();
			povratna.artikli.add(new ArtikliKorpaDTO(a.getNaziv(), a.tipString(), a.getKolicina(), a.getCena(),
					ak.getKolicina(), ak.getKolicina() * a.getCena(), a.getRestoran(), a.getSlika()));
		}
		povratna.korisnik = id;
		povratna.tipKupca = k.getTipKupca().getImeTipa();
		povratna.restoran = korpa.getRestoran();
		if (k.getTipKupca().getImeTipa() == ImeTipa.SREBRNI) {
			povratna.cena = korpa.getCena() * 0.95;
			povratna.nedostaje = 4000 - k.getSakupljeniBodovi();
		} else if (k.getTipKupca().getImeTipa() == ImeTipa.ZLATNI) {
			povratna.cena = korpa.getCena() * 0.9;

		} else {
			povratna.cena = korpa.getCena();
			povratna.nedostaje = 2000 - k.getSakupljeniBodovi();
		}

		return povratna;

	}

	@POST
	@Path("/azurirajKorpu/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response azurirajKorpu(@PathParam("id") String id, ArtikliKorpaDTO promena) {
		KorisnikDAO dao = dobaviKorisnikDAO();
		RestoranDAO restoranDAO = dobaviRestoranDAO();
		Artikal a = restoranDAO.nadjiArtikal(promena.restoran, promena.naziv);
		if (a == null)
			return Response.status(400).build();
		
		if (!dao.azurirajKorpu(promena, id)) {
			dao.dodajArtikalUKorpu(id,a, promena.kolicinaKorpa);
		}
		return Response.status(200).build();

	}

	@GET
	@Path("/nadjiPorudzbine/{id}/{uloga}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<PorudzbinePrikazDTO> nadjiPorudzbine(@PathParam("id") String id, @PathParam("uloga") String uloga) {
		List<PorudzbinePrikazDTO> porudzbineKupca = new ArrayList<>();
		porudzbineKupca.clear();
		PorudzbinaDAO porudzbineDAO = dobaviPorudzbinaDAO();
		RestoranDAO restoranDAO = dobaviRestoranDAO();
		PorudzbinePrikazDTO porDTO = null;
		KorisnikDAO korisniciDAO = dobaviKorisnikDAO();
		for (Porudzbina porudzbina : porudzbineDAO.dobaviPorudzbine()) {
			String nazivRestorana = restoranDAO.dobaviRestoran(porudzbina.getRestoran()).getNaziv();
			String tipRestorana = restoranDAO.dobaviRestoran(porudzbina.getRestoran()).getTipRestorana().toString();
			if (uloga.equals("KUPAC")) {
				if (porudzbina.getKupac().equals(id)) {
					porDTO = new PorudzbinePrikazDTO(porudzbina.getId(), porudzbina.getKupac(), nazivRestorana,
							porudzbina.getCena(), porudzbina.getDatumVreme(), porudzbina.getStatus());
					for (Restoran restoran : restoranDAO.dobaviRestorane()) {
						if (restoran.getId().equals(porudzbina.getRestoran())) {
							porDTO.setTipRestorana(restoran.getTipRestorana().toString());
						}
					}
					List<ArtikliPorudzbineDTO> artikli = new ArrayList<>();
					for (ArtikalKorpa a : porudzbina.getPoruceniArtikli()) {
						artikli.add(new ArtikliPorudzbineDTO(a.getArtikal().getNaziv(), a.getArtikal().getCena(),
								a.getArtikal().getKolicina(), a.getArtikal().getSlika(), a.getKolicina(),
								a.getArtikal().getTipArtikla()));
					}

					porDTO.setArtikli(artikli);
					porudzbineKupca.add(porDTO);
				}
			} else if (uloga.equals("DOSTAVLJAC")) {
				if (porudzbina.getStatus().toString().equals("CEKA_DOSTAVU")) {

					porDTO = new PorudzbinePrikazDTO(porudzbina.getId(), porudzbina.getKupac(), nazivRestorana,
							porudzbina.getCena(), porudzbina.getDatumVreme(), porudzbina.getStatus());
					for (Restoran restoran : restoranDAO.dobaviRestorane()) {
						if (restoran.getId().equals(porudzbina.getRestoran())) {
							porDTO.setTipRestorana(restoran.getTipRestorana().toString());
						}
					}
					List<ArtikliPorudzbineDTO> artikli = new ArrayList<>();
					for (ArtikalKorpa a : porudzbina.getPoruceniArtikli()) {
						artikli.add(new ArtikliPorudzbineDTO(a.getArtikal().getNaziv(), a.getArtikal().getCena(),
								a.getArtikal().getKolicina(), a.getArtikal().getSlika(), a.getKolicina(),
								a.getArtikal().getTipArtikla()));
					}

					porDTO.setArtikli(artikli);
					porudzbineKupca.add(porDTO);
				}

				if (porudzbina.getDostavljac().equals(id)) {

					porDTO = new PorudzbinePrikazDTO(porudzbina.getId(), porudzbina.getKupac(), nazivRestorana,
							porudzbina.getCena(), porudzbina.getDatumVreme(), porudzbina.getStatus());

					List<ArtikliPorudzbineDTO> artikli = new ArrayList<>();
					for (ArtikalKorpa a : porudzbina.getPoruceniArtikli()) {
						artikli.add(new ArtikliPorudzbineDTO(a.getArtikal().getNaziv(), a.getArtikal().getCena(),
								a.getArtikal().getKolicina(), a.getArtikal().getSlika(), a.getKolicina(),
								a.getArtikal().getTipArtikla()));
					}

					porDTO.setTipRestorana(tipRestorana);
					porDTO.setArtikli(artikli);
					porudzbineKupca.add(porDTO);
				}
			}

			else if (uloga.equals("MENADZER")) {
				for (Menadzer menadzer : korisniciDAO.dobaviSveMenadzere()) {
					if (menadzer.getId().equals(id)) {
						if (menadzer.getRestoran() != null) {
							if (porudzbina.getRestoran().equals(menadzer.getRestoran().getId())) {
								System.out.println("restoran menadzera " + menadzer.getRestoran().getId()
										+ " restoran porudzbina " + porudzbina.getRestoran());
								porDTO = new PorudzbinePrikazDTO(porudzbina.getId(), porudzbina.getKupac(),
										nazivRestorana, porudzbina.getCena(), porudzbina.getDatumVreme(),
										porudzbina.getStatus());

								List<ArtikliPorudzbineDTO> artikli = new ArrayList<>();
								for (ArtikalKorpa a : porudzbina.getPoruceniArtikli()) {
									artikli.add(new ArtikliPorudzbineDTO(a.getArtikal().getNaziv(),
											a.getArtikal().getCena(), a.getArtikal().getKolicina(),
											a.getArtikal().getSlika(), a.getKolicina(),
											a.getArtikal().getTipArtikla()));
								}

								porDTO.setArtikli(artikli);
								porudzbineKupca.add(porDTO);
							}
						}
					}
				}
			}

		}

		return porudzbineKupca;
	}

	@GET
	@Path("/nadjiKupce/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KorisnikPrikazDTO> nadjiKupce(@PathParam("id") String idMenadzera) {

		PorudzbinaDAO porDAO = dobaviPorudzbinaDAO();
		KorisnikDAO korDAO = dobaviKorisnikDAO();
		KorisnikPrikazDTO korDTO = null;

		List<KorisnikPrikazDTO> sviKupci = new ArrayList<KorisnikPrikazDTO>();

		for (Porudzbina p : porDAO.dobaviPorudzbine()) {
			for (Menadzer m : korDAO.dobaviSveMenadzere()) {
				if (m.getId().equals(idMenadzera)) {
					if (p.getRestoran().equals(m.getRestoran().getId())) {
						if (sviKupci.size() != 0) {
							if (!korDAO.postojiKupac(sviKupci, p.getKupac())) {
								Kupac kupac = korDAO.nadjiKupca(p.getKupac());
								korDTO = new KorisnikPrikazDTO(kupac.getId(), kupac.getKorisnickoIme(),
										kupac.getIme() + kupac.getPrezime(), korDAO.nadjiPol(kupac.getPol()),
										kupac.getDatumRodjenja(), korDAO.nadjiUlogu(kupac.getUloga()), kupac.getIme(),
										kupac.getPrezime(), korDAO.nadjiTipKupca(kupac), kupac.getSakupljeniBodovi());
								List<PorudzbinePrikazKupacaDTO> porDTO = new ArrayList<PorudzbinePrikazKupacaDTO>();
								porDTO = porDAO.nadjiPorudzbineKupca(p.getKupac());
								korDTO.setPorudzbine(porDTO);
								sviKupci.add(korDTO);
							}
						} else {
							Kupac kupac = korDAO.nadjiKupca(p.getKupac());
							korDTO = new KorisnikPrikazDTO(kupac.getId(), kupac.getKorisnickoIme(),
									kupac.getIme() + kupac.getPrezime(), korDAO.nadjiPol(kupac.getPol()),
									kupac.getDatumRodjenja(), korDAO.nadjiUlogu(kupac.getUloga()), kupac.getIme(),
									kupac.getPrezime(), korDAO.nadjiTipKupca(kupac), kupac.getSakupljeniBodovi());

							List<PorudzbinePrikazKupacaDTO> porDTO = new ArrayList<PorudzbinePrikazKupacaDTO>();
							porDTO = porDAO.nadjiPorudzbineKupca(p.getKupac());
							korDTO.setPorudzbine(porDTO);
							sviKupci.add(korDTO);
						}
					}
				}
			}
		}
		return sviKupci;
	}

	@GET
	@Path("/nadjiSumnjiveKorisnike/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<KorisnikPrikazDTO> nadjiSumnjiveKorisnike() {
		KorisnikDAO korisniciDAO = dobaviKorisnikDAO();
		String tipKupca = null;
		Double brojBodovaKupca = 0.0;
		List<KorisnikPrikazDTO> korisniciDTO = new ArrayList<KorisnikPrikazDTO>();

		for (Kupac k : korisniciDAO.dobaviSveKupce()) {
			Integer brojacOtkaza = 0;
			if (k.getDatumiOtkazivanjaPorudzbina().size() > 0) {
				for (Date otkaz : k.getDatumiOtkazivanjaPorudzbina()) {
					Date pocetakMeseca = new Date(System.currentTimeMillis() - (1000 * 60 * 60 * 24));
					if (otkaz.compareTo(pocetakMeseca) > 0) {
						brojacOtkaza++;
					}
				}
			}

			if (brojacOtkaza > 5) {
				String imePrz = k.getIme() + " " + k.getPrezime();

				KorisnikPrikazDTO korDTO = new KorisnikPrikazDTO(k.getId(), k.getKorisnickoIme(), imePrz,
						korisniciDAO.nadjiPol(k.getPol()), k.getDatumRodjenja(), korisniciDAO.nadjiUlogu(k.getUloga()),
						k.getIme(), k.getPrezime(), k.getBlokiran());

				if (k.getUloga().toString().equals("KUPAC")) {
					tipKupca = korisniciDAO.nadjiTipKupca(k);
					brojBodovaKupca = korisniciDAO.nadjiBrojBodovaKupca(k);

					korDTO.setBrojBodova(brojBodovaKupca);
					korDTO.setTipKupca(tipKupca);

				}

				korisniciDTO.add(korDTO);
			}
		}

		return korisniciDTO;
	}
}
