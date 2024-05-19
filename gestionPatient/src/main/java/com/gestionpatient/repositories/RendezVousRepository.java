package com.gestionpatient.repositories;


import com.gestionpatient.entities.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous,Long> {


    List<RendezVous> findAllByIdPatient(Long idPatient);

    @Query(value = "SELECT RD.* FROM  rendez_vous RD WHERE DATE_FORMAT(RD.date_rdv, '%Y-%m-%d')= ?1 AND RD.status_rdv = ?2 ", nativeQuery = true)
    List<RendezVous> findAllByStatusRdvAAndDateRdv( LocalDate currentDate, String status);

    @Query(value = "SELECT RD.* FROM  rendez_vous RD WHERE DATE_FORMAT(RD.date_rdv, '%Y-%m-%d')>= ?1 AND DATE_FORMAT(RD.date_rdv, '%Y-%m-%d')<=?2 ", nativeQuery = true)
    List<RendezVous> findAllByDateRdvBetween( LocalDate currentDate, LocalDate nextDate);

    @Query(value = "SELECT RD.* FROM  rendez_vous RD WHERE DATE_FORMAT(RD.date_rdv, '%Y-%m-%d')= ?1 AND (RD.status_rdv = 'ENC' OR RD.status_rdv = 'TR' OR RD.status_rdv = 'ANL') ", nativeQuery = true)
    List<RendezVous> findAllByDateRdv( LocalDate currentDate);


}
