package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Artikal;
import beans.Lokacija;
import beans.Restoran;
import beans.Restoran.TipRestorana;

public class RestoranDAO {

	private Map<String, Restoran> restorani; //pazi na logicki obrisane
	private String putanja;

	public RestoranDAO(String putanjaDoFajla) {
		restorani = new HashMap<>();

		this.putanja = putanjaDoFajla;
		
//		ObjectMapper maper = new ObjectMapper();
//		try {
//			maper.writeValue(Paths.get(this.putanja + "\\restorani.json").toFile(), restorani);
//			System.out.println("upisao");
//		} catch (IOException e) {
//			System.out.println("Greska");
//		}

		ucitajPodatke();
	}

	public void ucitajPodatke() {

		ObjectMapper mapper = new ObjectMapper();
		File file;

		try {
			file = new File(this.putanja + "\\restorani.json");
			if (!file.exists()) {
				file.createNewFile();
				FileWriter writer = new FileWriter(this.putanja + "\\restorani.json");
				writer.write("[]");
				writer.close();
			} else {
				TypeReference<HashMap<String, Restoran>> typeRef 
				  = new TypeReference<HashMap<String, Restoran>>() {};
				Map<String, Restoran> postojeciRestorani = 
						mapper.readValue(Paths.get(this.putanja + "\\restorani.json").toFile(), typeRef);
				for (Restoran r : postojeciRestorani.values()) {
					restorani.put(r.getId(), r);
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

	public Collection<Restoran> dobaviRestorane() {
		List<Restoran> sortirani = new ArrayList<Restoran>();
		
		for (Restoran restoran : restorani.values()) {
		
			if(restoran.getStatus()) {
				sortirani.add(restoran);
			}
		}
		
		for (Restoran restoran : restorani.values()) {
			
			if(!restoran.getStatus()) {
				sortirani.add(restoran);
			}
		}
		
		return sortirani;
	}

//
//	public Restoran update(String id, Restoran restoran) {
//		Restoran restoranToUpdate = this.findRestoran(id);
//		if (restoranToUpdate == null) {
//			return this.save(restoran);
//		}
//		restoranToUpdate.setName(restoran.getName());
//		restoranToUpdate.setPrice(restoran.getPrice());
//		return restoranToUpdate;
//	}

//	public void delete(String id) {
//		this.restorani.remove(id);
//	}

}
