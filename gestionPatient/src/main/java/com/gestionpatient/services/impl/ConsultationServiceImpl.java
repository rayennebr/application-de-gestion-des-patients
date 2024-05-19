package com.gestionpatient.services.impl;

import com.gestionpatient.entities.Consultation;
import com.gestionpatient.repositories.ConsultationRepository;
import com.gestionpatient.services.ConsultationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsultationServiceImpl implements ConsultationService {

    private final ConsultationRepository consultationRepository;

    @Override
    public List<Consultation> getAll() {
        return this.consultationRepository.findAll();
    }

    @Override
    public Consultation save(Consultation entity) {
        return this.consultationRepository.save(entity);
    }

    @Override
    public List<Consultation> delete(Long id) throws Exception {
        Optional<Consultation>consultation=this.consultationRepository.findById(id);
        if(consultation.isPresent())
        {
            this.consultationRepository.delete(consultation.get());
        }

        return getAll();
    }

    @Override
    public Consultation update(Long id, Consultation object) throws Exception {

        Optional<Consultation>consultation=this.consultationRepository.findById(id);
        if(consultation.isPresent())
        {
            object.setIdConsultation(consultation.get().getIdConsultation());
            return this.consultationRepository.saveAndFlush(object);
        }

        return null;
    }

    @Override
    public Consultation getConsultationByIdRdv(Long idRdv) {
        return this.consultationRepository.getConsultationByIdRdv(idRdv);
    }
}
