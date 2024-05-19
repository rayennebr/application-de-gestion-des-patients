package com.gestionpatient.controllers;

import com.gestionpatient.entities.Ordonnance;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface OrdonnanceController {


    GenericSingleResponse<Ordonnance> save(@RequestBody Ordonnance object) throws Exception;

    GenericResponse<Ordonnance> findAll();

    GenericResponse<Ordonnance> delete(@PathVariable Long id);

    GenericSingleResponse<Ordonnance> update(@PathVariable Long id, @RequestBody Ordonnance object);
}
