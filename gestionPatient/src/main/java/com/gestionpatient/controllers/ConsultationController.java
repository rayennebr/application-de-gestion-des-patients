package com.gestionpatient.controllers;


import com.gestionpatient.entities.Consultation;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

public interface ConsultationController {

    GenericSingleResponse<Consultation> save(@RequestBody Consultation object) throws Exception;

    GenericResponse<Consultation> findAll();

    GenericResponse<Consultation> delete(@PathVariable Long id);

    GenericSingleResponse<Consultation> update(@PathVariable Long id, @RequestBody Consultation object);

    GenericSingleResponse<Consultation>getConsultationByIdRdv(@PathVariable Long idRdv);

}
