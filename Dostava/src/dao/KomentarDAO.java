package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Komentar;
import dto.KomentarDTO;

public class KomentarDAO {

	private Map<String, Komentar> komentari;
	private String putanja;

	public KomentarDAO(String putanjaDoFajla) {
		komentari = new HashMap<>();
		this.putanja = putanjaDoFajla;

		ucitajPodatke();
	}

	public void ucitajPodatke() {

		ObjectMapper mapper = new ObjectMapper();
		File file;

		try {
			file = new File(this.putanja + "\\komentari.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\komentari.json");
				writer.write("[]");
				writer.close();
			} else {
				TypeReference<HashMap<String, Komentar>> typeRef = new TypeReference<HashMap<String, Komentar>>() {
				};
				Map<String, Komentar> postojece = mapper
						.readValue(Paths.get(this.putanja + "\\komentari.json").toFile(), typeRef);
				for (Komentar k : postojece.values()) {
					komentari.put(k.getId(), k);
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

	public Collection<Komentar> dobaviSve() {
		return komentari.values();
	}

	public Komentar dodajKomentar(KomentarDTO noviDTO) {
		Komentar novi = new Komentar(UUID.randomUUID().toString().replace("-", "").substring(0, 10), noviDTO.kupac,
				noviDTO.restoran, noviDTO.tekst, noviDTO.ocena);
		komentari.put(novi.getId(), novi);
		if (!sacuvajPodatke())
			return null;

		return novi;
	}

	public Komentar dobaviKomentar(String id) {
		return komentari.containsKey(id) ? komentari.get(id) : null;
	}

	public boolean sacuvajPodatke() {

		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\komentari.json").toFile(), komentari);
		} catch (IOException e) {
			System.out.println("Greska");
			return false;
		}
		return true;
	}

}
