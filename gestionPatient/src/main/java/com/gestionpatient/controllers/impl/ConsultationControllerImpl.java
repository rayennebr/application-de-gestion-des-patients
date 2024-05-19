package com.gestionpatient.controllers.impl;

import com.gestionpatient.controllers.ConsultationController;
import com.gestionpatient.entities.Consultation;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import com.gestionpatient.services.impl.ConsultationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/consultation")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ConsultationControllerImpl implements ConsultationController {

    private final ConsultationServiceImpl consultationService;

    @PostMapping("/")
    @Override
    public GenericSingleResponse<Consultation> save(Consultation object) throws Exception {
        try {

            return new GenericSingleResponse<>(200, "Opération enregistrée avec succès", consultationService.save(object));

        } catch (DataIntegrityViolationException e) {
            return new GenericSingleResponse<>(407, "La contrainte unique a été violée.", (Consultation) null);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return new GenericSingleResponse<>(406, "Erreur d’enregistrement, vérifier vos données", (Consultation)null);

        }
    }

    @GetMapping("/")
    @Override
    public GenericResponse<Consultation> findAll() {
        try{
            return new GenericResponse<>(200,"données trouvées",consultationService.getAll());
        }catch (Exception e)
        {
            return new GenericResponse<>(406,e.getMessage(),(List<Consultation>) null);
        }
    }

    @DeleteMapping("/{id}")
    @Override
    public GenericResponse<Consultation> delete(Long id) {
        try {

            List<Consultation> objectdeleted = consultationService.delete(id);
            return new GenericResponse<>(200, "Enregistrement supprimé avec succès", objectdeleted);

        } catch (NoSuchElementException ex) {
            return new GenericResponse<>(400, "Aucune donnée trouvée", null);
        } catch (Exception e) {
            return new GenericResponse<>(406, "Violation de la contrainte d’intégrité: Impossible de supprimer", null);
        }
    }

    @PutMapping("/{id}")
    @Override
    public GenericSingleResponse<Consultation> update(Long id, Consultation object) {
        try{
            return new GenericSingleResponse<>(200,"données mises à jour avec succèes",consultationService.update(id, object));
        }catch(Exception e)
        {
            return new GenericSingleResponse<>(406,e.getMessage(),(Consultation)null);
        }
    }

    @GetMapping("/getConsultationByIdRdv/{idRdv}")
    @Override
    public GenericSingleResponse<Consultation> getConsultationByIdRdv(Long idRdv) {
        try{
            return new GenericSingleResponse<>(200,"données trouvées avec succèes",this.consultationService.getConsultationByIdRdv(idRdv));
        }catch (Exception e){
            return new GenericSingleResponse<>(406,e.getMessage(),(Consultation)null);
        }
    }


}
