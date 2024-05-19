package com.gestionpatient.controllers;


import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import org.springframework.web.bind.annotation.*;
import com.gestionpatient.entities.Patient;

import java.util.Optional;

public interface PatientController{
    GenericSingleResponse<Patient> save(@RequestBody Patient object) throws Exception;

    GenericResponse<Patient> findAll();

    GenericResponse<Patient> delete(@PathVariable Long id);

    GenericSingleResponse<Patient> update(@PathVariable Long id, @RequestBody Patient object);

    GenericSingleResponse<Optional<Patient>> findById(@PathVariable Long id);
}
