package com.gestionpatient.services.impl;

import com.gestionpatient.entities.Ordonnance;
import com.gestionpatient.repositories.OrdonnanceRepository;
import com.gestionpatient.services.OrdonnanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrdonnanceServiceImpl implements OrdonnanceService {

    private final OrdonnanceRepository ordonnanceRepository;

    @Override
    public List<Ordonnance> getAll() {
        return ordonnanceRepository.findAll();
    }

    @Override
    public Ordonnance save(Ordonnance entity) {
        return ordonnanceRepository.save(entity);
    }

    @Override
    public List<Ordonnance> delete(Long id) throws Exception {
        Optional<Ordonnance>ordonnance=ordonnanceRepository.findById(id);
        if(ordonnance.isPresent())
        {
            ordonnanceRepository.delete(ordonnance.get());
        }
        return ordonnanceRepository.findAll();
    }

    @Override
    public Ordonnance update(Long id, Ordonnance object) throws Exception {
        Optional<Ordonnance>ordonnance=ordonnanceRepository.findById(id);
        if(ordonnance.isPresent())
        {
            object.setIdOrdannace(ordonnance.get().getIdOrdannace());
            return ordonnanceRepository.saveAndFlush(object);
        }
        return null;
    }
}
