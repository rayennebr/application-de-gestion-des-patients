package com.gestionpatient.services;

import com.gestionpatient.entities.RendezVous;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RendezVousService  {


    List<RendezVous> getAll();

    RendezVous save(RendezVous entity);

    List<RendezVous> delete(Long id) throws Exception;

    RendezVous update(Long id, RendezVous object) throws Exception;

    Optional<RendezVous> findBydId(long id) throws Exception;

    List<RendezVous> findAllByIdPatient(Long id);

    List<RendezVous> findAllByStatusRdvAndDateRdv( LocalDate currentDate);

    List<RendezVous> findAllByDateRdv( LocalDate currentDate);
    List<RendezVous>  findAllByDateRdvBetween( LocalDate currentDate, LocalDate nextDate);

    List<RendezVous> findAppointmentByDateRdv( LocalDate currentDate);


}
