package com.gestionpatient.services;


import com.gestionpatient.entities.Ordonnance;
import java.util.List;

public interface OrdonnanceService {

    List<Ordonnance> getAll();

    Ordonnance save(Ordonnance entity);

    List<Ordonnance> delete(Long id) throws Exception;

    Ordonnance update(Long id, Ordonnance object) throws Exception;
}
