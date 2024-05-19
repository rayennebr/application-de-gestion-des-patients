package com.gestionpatient.services;



import com.gestionpatient.entities.Consultation;

import java.util.List;

public interface ConsultationService {

    List<Consultation> getAll();

    Consultation save(Consultation entity);

    List<Consultation> delete(Long id) throws Exception;

    Consultation update(Long id, Consultation object) throws Exception;

    Consultation getConsultationByIdRdv(Long idRdv);
}
