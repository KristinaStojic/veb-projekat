package dao;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Artikal;
import beans.Menadzer;
import beans.Restoran;

public class RestoranDAO {

	private Map<String, Restoran> restorani; //pazi na logicki obrisane
	private String putanja;

	public RestoranDAO(String putanjaDoFajla) {
		restorani = new HashMap<>();
		this.putanja = putanjaDoFajla;
		
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
					if(r.getLogickoBrisanje() == 0) {
						restorani.put(r.getId(), r);
					}
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
	
	public Restoran dodajRestoran(Restoran noviRestoran) {
		
		restorani.put(noviRestoran.getId(), noviRestoran);

		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\restorani.json").toFile(), restorani);
		} catch (IOException e) {
			System.out.println("Greska");
		}
		
		return noviRestoran;
	}

	public Restoran dobaviRestoran(String id) {
		return restorani.containsKey(id) ? restorani.get(id) : null;
	}
	
	public Boolean dodajArtikal(String idRestorana, Artikal a) {
		
		for (Restoran r : dobaviRestorane()) {
			if(r.getId().equals(idRestorana)) {
				if(r == null || r.getLogickoBrisanje() == 1) return false;
				for(Artikal ar : r.getArtikliUPonudi()){
					if (ar.getNaziv().equals(a.getNaziv())) return false;
				}
				r.dodajArtikal(a);
				break;
			}
		}
		
		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\restorani.json").toFile(), restorani);
		} catch (IOException e) {
			System.out.println("Greska");
			return false;
		}
		return true;
	}

	public Boolean izmeniArtikal(String idRestorana, String stariNaziv,Artikal a) {
		
		for (Restoran r : dobaviRestorane()) {
			if(r.getId().equals(idRestorana)) {
				if(r == null || r.getLogickoBrisanje() == 1) return false;
				if(!stariNaziv.equals(a.getNaziv()) && proveriPostojanjeNaziva(r, a.getNaziv())) return false;
				for(Artikal ar : r.getArtikliUPonudi()){
					if (ar.getNaziv().equals(stariNaziv)) {
						ar.setNaziv(a.getNaziv());
						ar.setCena(a.getCena());
						ar.setKolicina(a.getKolicina());
						ar.setOpis(a.getOpis());
						ar.setSlika(a.getSlika());
						ar.setTipArtikla(a.getTipArtikla());
					}
				}
				break;
			}
		}
	
		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\restorani.json").toFile(), restorani);
		} catch (IOException e) {
			System.out.println("Greska");
			return false;
		}
		return true;
	}

	public Boolean proveriPostojanjeNaziva(Restoran r, String naziv) {
		
		for(Artikal ar : r.getArtikliUPonudi()){
			if (ar.getNaziv().equals(naziv)) return true;
		}
		
		return false;
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
	
	public void sacuvajPodatke() {
		ObjectMapper maper = new ObjectMapper();
		try {
			maper.writeValue(Paths.get(this.putanja + "\\restorani.json").toFile(), restorani);
		} catch (IOException e) {
			System.out.println("Greska");
		}
		
	
	}
	
	
	
	public void obrisiRestoran(String idRestorana) {
	
		 for (Restoran r : dobaviRestorane()) {
				if(r.getId().equals(idRestorana)) {
					r.setLogickoBrisanje(1);
				}
			}
		 
		 sacuvajPodatke();
		 
		 
		 if(restorani.containsKey(idRestorana)) {
				restorani.remove(idRestorana);
			}
		 
	}
	
	
	public void obrisiArtikal(String nazivArtikla, String idRestorana) {
		for (Restoran r : dobaviRestorane()) {
			if(r.getId().equals(idRestorana)) {
				for(Artikal ar : r.getArtikliUPonudi()){
					if (ar.getNaziv().equals(nazivArtikla)) {
						r.obrisiArtikal(ar);
					}
				}
				break;
			}
		}
		 sacuvajPodatke();
		
	}


}
