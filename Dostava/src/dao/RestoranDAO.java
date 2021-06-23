package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.StringTokenizer;

import beans.Restoran;

public class RestoranDAO {

	private List<Restoran> restorani = new ArrayList<Restoran>();

	public RestoranDAO() {

	}

	
	public RestoranDAO(String contextPath) {
		ucitajRestorane(contextPath);
	}

	
	public Collection<Restoran> dobaviRestorane() {
		return restorani;
	}

	
//	public Restoran findRestoran(String id) {
//		return restorani.containsKey(id) ? restorani.get(id) : null;
//	}

	
	public Restoran sacuvaj(Restoran restoran) {
		return restoran;
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

	private void ucitajRestorane(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/restorani.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line = "", naziv = "";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					naziv = st.nextToken().trim();
				}
				restorani.add(new Restoran(naziv));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
				}
			}
		}

	}
}
