package com.gestionpatient.services;

import com.gestionpatient.entities.Patient;

import java.util.List;
import java.util.Optional;


public interface PatientService {

    List<Patient> getAll();

    Patient save(Patient entity);

    List<Patient> delete(Long id) throws Exception;

    Patient update(Long id, Patient object) throws Exception;

    Optional<Patient> findBydId(long id) throws Exception;
}
