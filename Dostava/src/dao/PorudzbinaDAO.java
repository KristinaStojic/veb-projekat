package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Porudzbina;
import beans.Porudzbina.Status;
import beans.Restoran;
import dto.PorudzbinePrikazKupacaDTO;

public class PorudzbinaDAO {

	private Map<String, Porudzbina> porudzbine; // pazi na logicki obrisane
	private String putanja;

	public PorudzbinaDAO() {
		porudzbine = new HashMap<>();
		
		String putanjaDoFajla = System.getProperty("java.class.path");
		putanjaDoFajla = putanjaDoFajla.split("__MACOSX")[0] + "Dostava\\WebContent\\Podaci";
		this.putanja = putanjaDoFajla;

		ucitajPodatke();
	}

	public void ucitajPodatke() {

		ObjectMapper mapper = new ObjectMapper();
		File file;

		try {
			file = new File(this.putanja + "\\porudzbine.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\porudzbine.json");
				writer.write("[]");
				writer.close();
			} else {
				TypeReference<HashMap<String, Porudzbina>> typeRef = new TypeReference<HashMap<String, Porudzbina>>() {
				};
				Map<String, Porudzbina> postojece = mapper
						.readValue(Paths.get(this.putanja + "\\porudzbine.json").toFile(), typeRef);
				for (Porudzbina p : postojece.values()) {
					porudzbine.put(p.getId(), p);
				}
			}

		} catch (

		JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Collection<Porudzbina> dobaviPorudzbine() {
		return porudzbine.values();
	}

	public Porudzbina dodajPorudzbinu(Porudzbina novaPorudzbina) {
		porudzbine.put(novaPorudzbina.getId(), novaPorudzbina);
		sacuvajPodatke();
		return novaPorudzbina;
	}

	public Porudzbina dobaviPorudzbinu(String id) {
		return porudzbine.containsKey(id) ? porudzbine.get(id) : null;
	}

	public boolean sacuvajPodatke() {

		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\porudzbine.json").toFile(), porudzbine);
		} catch (IOException e) {
			System.out.println("Greska");
			return false;
		}
		return true;
	}

	public boolean promeniStatusPorudzbine(String id, Status status) {

		Porudzbina p = porudzbine.containsKey(id) ? porudzbine.get(id) : null;
		if (p == null)
			return false;

		p.setStatus(status);
		if (sacuvajPodatke())
			return true;

		return false;
	}

	public boolean promeniStatusPorudzbineTransport(String id, String idDostavljaca) {

		Porudzbina p = porudzbine.containsKey(id) ? porudzbine.get(id) : null;
		if (p == null)
			return false;

		p.setStatus(Status.TRANSPORT);
		p.setDostavljaciKojiZahtevaju(new ArrayList<String>());
		p.setDostavljac(idDostavljaca);

		if (sacuvajPodatke())
			return true;

		return false;
	}

	public Integer zahtevajPorudzbinu(String id, String idDostavljaca) {
		Porudzbina p = porudzbine.containsKey(id) ? porudzbine.get(id) : null;
		if (p == null)
			return 0;
		for (String idd : p.getDostavljaciKojiZahtevaju()) {
			if (idd.equals(idDostavljaca)) {
				return 1;
			}
		}
		p.dodajDostavljaca(idDostavljaca);
		if (sacuvajPodatke())
			return 2;

		return 0;
	}
	
	
	public List<PorudzbinePrikazKupacaDTO> nadjiPorudzbineKupca(String idKupca){
	
		List<PorudzbinePrikazKupacaDTO> porudzbineKupca = new ArrayList<PorudzbinePrikazKupacaDTO>();
		for (Porudzbina por : dobaviPorudzbine()) {
			if(por.getKupac().equals(idKupca)) {
				porudzbineKupca.add(new PorudzbinePrikazKupacaDTO(por.getId(), por.getCena(), por.getDatumVreme()));
			}
		}
		
		return porudzbineKupca;
	}
	
	public String nadjiRestoranPorudzbine(String idPorudzbine) {
		for (Porudzbina por : dobaviPorudzbine()) {
			if(por.getId().equals(idPorudzbine)) {
				return por.getRestoran();
			}
		}
		
		return null;
	}
	
public List<PorudzbinePrikazKupacaDTO> nadjiPorudzbineKupca(String idKupca, String idRestorana){
		
		List<PorudzbinePrikazKupacaDTO> porudzbineKupca = new ArrayList<PorudzbinePrikazKupacaDTO>();
		for (Porudzbina por : dobaviPorudzbine()) {
			if(por.getKupac().equals(idKupca) && por.getRestoran().equals(idRestorana)) {
				porudzbineKupca.add(new PorudzbinePrikazKupacaDTO(por.getId(), por.getCena(), por.getDatumVreme()));
			}
		}
		
		return porudzbineKupca;
	}
	

}
