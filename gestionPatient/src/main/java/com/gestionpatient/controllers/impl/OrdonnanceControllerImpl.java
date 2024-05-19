package com.gestionpatient.controllers.impl;

import com.gestionpatient.controllers.OrdonnanceController;
import com.gestionpatient.entities.Ordonnance;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import com.gestionpatient.services.impl.OrdonnanceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/ordonnace")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OrdonnanceControllerImpl implements OrdonnanceController {

    private final OrdonnanceServiceImpl ordonnanceService;

    @PostMapping("/")
    @Override
    public GenericSingleResponse<Ordonnance> save(Ordonnance object) throws Exception {
        try {
            return new GenericSingleResponse<>(200, "Opération enregistrée avec succès", ordonnanceService.save(object));
        } catch (DataIntegrityViolationException e) {
            return new GenericSingleResponse<>(407, "La contrainte unique a été violée.",  null);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new GenericSingleResponse<>(406, "Erreur d’enregistrement, vérifier vos données", null);

        }
    }

    @GetMapping("/")
    @Override
    public GenericResponse<Ordonnance> findAll() {
        try{
            return new GenericResponse<>(200,"données trouvées",ordonnanceService.getAll());
        }catch (Exception e)
        {
            return new GenericResponse<>(406,e.getMessage(), null);
        }
    }


    @DeleteMapping("/")
    @Override
    public GenericResponse<Ordonnance> delete(Long id) {
        try {

            List<Ordonnance> objectdeleted = ordonnanceService.delete(id);
            return new GenericResponse<>(200, "Enregistrement supprimé avec succès", objectdeleted);

        } catch (NoSuchElementException ex) {
            return new GenericResponse<>(400, "Aucune donnée trouvée", null);
        } catch (Exception e) {
            return new GenericResponse<>(406, "Violation de la contrainte d’intégrité: Impossible de supprimer", null);
        }
    }

    @PutMapping("/")
    @Override
    public GenericSingleResponse<Ordonnance> update(Long id, Ordonnance object) {
        try{
            return new GenericSingleResponse<>(200,"données mises à jour avec succèes",ordonnanceService.update(id, object));
        }catch(Exception e)
        {
            return new GenericSingleResponse<>(406,e.getMessage(),null);
        }
    }
}
