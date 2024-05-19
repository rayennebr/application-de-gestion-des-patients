package com.gestionpatient.repositories;

import com.gestionpatient.entities.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation,Long> {

    Consultation getConsultationByIdRdv(Long idRdv);
}
