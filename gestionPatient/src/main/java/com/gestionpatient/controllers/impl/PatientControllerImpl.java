package com.gestionpatient.controllers.impl;

import com.gestionpatient.controllers.PatientController;
import com.gestionpatient.entities.Patient;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import com.gestionpatient.services.impl.PatientServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/patient")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PatientControllerImpl  implements PatientController {


    private final PatientServiceImpl patientService;

    @PostMapping("/")
    public GenericSingleResponse<Patient> save(Patient object) throws Exception {
        try {

            return new GenericSingleResponse<>(200, "Opération enregistrée avec succès", patientService.save(object));

        } catch (DataIntegrityViolationException e) {
            return new GenericSingleResponse<>(407, "La contrainte unique a été violée.",  null);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new GenericSingleResponse<>(406, "Erreur d’enregistrement, vérifier vos données", null);

        }

    }

    @GetMapping("/")
    @Override
    public GenericResponse<Patient> findAll() {
       try{
           return new GenericResponse<>(200,"données trouvées",patientService.getAll());
       }catch (Exception e)
       {
           return new GenericResponse<>(406,e.getMessage(), null);
       }

    }

    @DeleteMapping("/{id}")
    @Override
    public GenericResponse<Patient> delete(Long id) {
        try {

            List<Patient> objectdeleted = patientService.delete(id);
            return new GenericResponse<>(200, "Enregistrement supprimé avec succès", objectdeleted);

        } catch (NoSuchElementException ex) {
            return new GenericResponse<>(400, "Aucune donnée trouvée", null);
        } catch (Exception e) {
            return new GenericResponse<>(406, "Violation de la contrainte d’intégrité Impossible de supprimer", null);
        }
    }

    @PutMapping("/{id}")
    @Override
    public GenericSingleResponse<Patient> update(Long id, Patient object) {
        try{
            return new GenericSingleResponse<>(200,"données mises à jour avec succèes",patientService.update(id, object));
        }catch(Exception e)
        {
            return new GenericSingleResponse<>(406,e.getMessage(),null);
        }
    }

    @GetMapping("/{id}")
    @Override
    public GenericSingleResponse<Optional<Patient>> findById(Long id) {
       try{
           return new GenericSingleResponse<>(200,"données trouvées avec succèes",patientService.findBydId(id));
       }catch (Exception e)
       {
           return new GenericSingleResponse<>(406,e.getMessage(),(Optional<Patient>)null);
       }
    }
}
