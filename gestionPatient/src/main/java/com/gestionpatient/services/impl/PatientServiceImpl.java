package com.gestionpatient.services.impl;

import com.gestionpatient.entities.Patient;
import com.gestionpatient.repositories.PatientRepository;
import com.gestionpatient.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PatientServiceImpl implements PatientService {


    private final PatientRepository patientRepository;

    @Override
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    @Override
    public Patient save(Patient entity) {
        return patientRepository.save(entity);
    }

    @Override
    public List<Patient> delete(Long id) throws Exception {
        Optional<Patient> object=patientRepository.findById(id);
        if(object.isPresent())
        {
            patientRepository.delete(object.get());
        }
        return patientRepository.findAll();
    }

    @Override
    public Patient update(Long id, Patient object) throws Exception {
        Optional<Patient>data=patientRepository.findById(id);
        if(data.isPresent())
        {
            object.setIdPatient(data.get().getIdPatient());
            return patientRepository.saveAndFlush(object);
        }
        return null;
    }

    @Override
    public Optional<Patient> findBydId(long id) throws Exception {
        Patient object=patientRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("object not found"));
        return Optional.ofNullable(object);
    }
}
