package com.gestionpatient.controllers;


import com.gestionpatient.entities.RendezVous;
import com.gestionpatient.responses.GenericResponse;
import com.gestionpatient.responses.GenericSingleResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RendezVousController  {

     GenericSingleResponse<RendezVous> save(@RequestBody RendezVous object) throws Exception;

     GenericResponse<RendezVous> findAll();

     GenericResponse<RendezVous> delete(@PathVariable Long id);

     GenericSingleResponse<RendezVous> update(@PathVariable Long id, @RequestBody RendezVous object);

     GenericSingleResponse<Optional<RendezVous>> findById(@PathVariable Long id);

     GenericResponse<RendezVous> findAllByIdPatient(@PathVariable Long id);

     GenericResponse<RendezVous> findAllByStatusRdvAndDateRdv(@PathVariable LocalDate currentDate);

     GenericResponse<RendezVous> findAllByDateRdv(@PathVariable LocalDate currentDate);
     GenericResponse<RendezVous> findAllByDateRdvBetween( @RequestParam LocalDate currentDate, @RequestParam LocalDate nextDate);
     GenericResponse<RendezVous> findAppointmentByDateRdv(@PathVariable LocalDate currentDate);

}
