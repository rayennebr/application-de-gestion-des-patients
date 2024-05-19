package com.gestionpatient.repositories;

import com.gestionpatient.entities.Ordonnance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdonnanceRepository extends JpaRepository<Ordonnance,Long> {
}
