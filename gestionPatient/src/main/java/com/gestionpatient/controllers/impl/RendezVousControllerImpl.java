package com.gestionpatient.controllers.impl;

import com.gestionpatient.controllers.RendezVousController;
import com.gestionpatient.entities.RendezVous;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import com.gestionpatient.services.impl.RendezVousServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rdv")
@CrossOrigin("*")
@RequiredArgsConstructor
public class RendezVousControllerImpl implements RendezVousController {


    private final RendezVousServiceImpl rendezVousService;

    @PostMapping("/")
    @Override
    public GenericSingleResponse<RendezVous> save(RendezVous object) throws Exception {
        try {

            return new GenericSingleResponse<>(200, "Opération enregistrée avec succès", rendezVousService.save(object));

        } catch (DataIntegrityViolationException e) {
            return new GenericSingleResponse<>(407, "La contrainte unique a été violée.",  null);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new GenericSingleResponse<>(406, "Erreur d’enregistrement, vérifier vos données", null);

        }

    }

    @GetMapping("/")
    @Override
    public GenericResponse<RendezVous> findAll() {
        try{
            return new GenericResponse<>(200,"données trouvées",rendezVousService.getAll());
        }catch (Exception e)
        {
            return new GenericResponse<>(406,e.getMessage(), null);
        }

    }

    @DeleteMapping("/{id}")
    @Override
    public GenericResponse<RendezVous> delete(Long id) {
        try {

            List<RendezVous> objectdeleted = rendezVousService.delete(id);
            return new GenericResponse<>(200, "Enregistrement supprimé avec succès", objectdeleted);

        } catch (NoSuchElementException ex) {
            return new GenericResponse<>(400, "Aucune donnée trouvée", null);
        } catch (Exception e) {
            return new GenericResponse<>(406, "Violation de la contrainte d’intégrité Impossible de supprimer", null);
        }
    }

    @PutMapping("/{id}")
    @Override
    public GenericSingleResponse<RendezVous> update(Long id, RendezVous object) {
        try{
            return new GenericSingleResponse<>(200,"données mises à jour avec succèes",rendezVousService.update(id, object));
        }catch(Exception e)
        {
            return new GenericSingleResponse<>(406,e.getMessage(),null);
        }
    }

    @GetMapping("/{id}")
    @Override
    public GenericSingleResponse<Optional<RendezVous>> findById(Long id) {
        try{
            return new GenericSingleResponse<>(200,"données trouvées avec succèes",rendezVousService.findBydId(id));
        }catch (Exception e)
        {
            return new GenericSingleResponse<>(406,e.getMessage(),null);
        }
    }

    @GetMapping("/findAllByIdPatient/{id}")
    @Override
    public GenericResponse<RendezVous> findAllByIdPatient(Long id) {
       try{
           return new GenericResponse<>(200, "données trouvées avec succèes", rendezVousService.findAllByIdPatient(id));
       }catch (Exception e)
       {
           return new GenericResponse<>(400, e.getMessage(),  null);
       }
    }

    @GetMapping("/findAllByStatusRdvAndDateRdv/{currentDate}")
    @Override
    public GenericResponse<RendezVous> findAllByStatusRdvAndDateRdv(LocalDate currentDate) {
        try{
            return new GenericResponse<>(200, "données trouvées avec succèes", rendezVousService.findAllByStatusRdvAndDateRdv(currentDate));
        }catch (Exception e)
        {
            return new GenericResponse<>(400, e.getMessage(),  null);
        }
    }

    @Override
    @GetMapping("/findAllByDateRdv/{currentDate}")
    public GenericResponse<RendezVous> findAllByDateRdv(LocalDate currentDate) {
        try{
            return new GenericResponse<>(200, "données trouvées avec succèes", rendezVousService.findAllByDateRdv(currentDate));
        }catch (Exception e)
        {
            return new GenericResponse<>(400, e.getMessage(),  null);
        }
    }

    @GetMapping("/findAllByDateRdvBetween")
    @Override
    public GenericResponse<RendezVous> findAllByDateRdvBetween(LocalDate currentDate, LocalDate nextDate) {
        try{
            return new GenericResponse<>(200, "données trouvées avec succèes", rendezVousService.findAllByDateRdvBetween(currentDate,nextDate));
        }catch (Exception e)
        {
            return new GenericResponse<>(400, e.getMessage(),  null);
        }
    }

    @GetMapping("/findAppointmentByDateRdv/{currentDate}")
    @Override
    public GenericResponse<RendezVous> findAppointmentByDateRdv(LocalDate currentDate) {
        try{
            return new GenericResponse<>(200, "données trouvées avec succèes", rendezVousService.findAppointmentByDateRdv(currentDate));
        }catch (Exception e)
        {
            return new GenericResponse<>(400, e.getMessage(),  null);
        }
    }
}
