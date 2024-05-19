package com.gestionpatient.services.impl;

import com.gestionpatient.entities.RendezVous;
import com.gestionpatient.repositories.RendezVousRepository;
import com.gestionpatient.services.RendezVousService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RendezVousServiceImpl implements RendezVousService {


    private final RendezVousRepository rendezVousRepository;
    private final JavaMailSender  javaMailSender;

    @Override
    public List<RendezVous> getAll() {
        return rendezVousRepository.findAll();
    }

    @Override
    public RendezVous save(RendezVous entity) {
        return rendezVousRepository.save(entity);
    }

    @Override
    public List<RendezVous> delete(Long id) throws Exception {
        Optional<RendezVous> object=rendezVousRepository.findById(id);
        if(object.isPresent())
        {
            rendezVousRepository.delete(object.get());
        }
        return rendezVousRepository.findAll();
    }

    @Override
    public RendezVous update(Long id, RendezVous object) throws Exception {
        Optional<RendezVous>data=rendezVousRepository.findById(id);
        if(data.isPresent())
        {
            object.setIdRdv(data.get().getIdRdv());
            return rendezVousRepository.saveAndFlush(object);
        }
        return null;
    }

    @Override
    public Optional<RendezVous> findBydId(long id) throws Exception {
        RendezVous object=rendezVousRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("object not found"));
        return Optional.ofNullable(object);
    }

    @Override
    public List<RendezVous> findAllByIdPatient(Long id) {
        return rendezVousRepository.findAllByIdPatient(id);
    }

    @Override
    public List<RendezVous> findAllByStatusRdvAndDateRdv(LocalDate currentDate) {
        return rendezVousRepository.findAllByStatusRdvAAndDateRdv(currentDate,"ENC");
    }

    @Override
    public List<RendezVous> findAllByDateRdv(LocalDate currentDate) {
       return rendezVousRepository.findAllByStatusRdvAAndDateRdv(currentDate,"CRE");
    }

    @Override
    public List<RendezVous> findAllByDateRdvBetween(LocalDate currentDate, LocalDate nextDate) {
        return rendezVousRepository.findAllByDateRdvBetween( currentDate, nextDate);
    }

    @Override
    public List<RendezVous> findAppointmentByDateRdv(LocalDate currentDate) {
        return rendezVousRepository.findAllByDateRdv(currentDate);
    }


    @Scheduled(fixedRate = 5000)
    @PostConstruct
    public void CurrentRdv() {
        System.out.println("LocalDate.now() "+LocalDate.now());
        List<RendezVous>listRdv=rendezVousRepository.findAllByStatusRdvAAndDateRdv(LocalDate.now(),"CRE");

        if(
                !listRdv.isEmpty()
        )
        {
            /*for(RendezVous rdv:listRdv)
            {
                rdv.setStatusRdv("ENC");
                try{
                    RendezVous newRdv= update(rdv.getIdRdv(),rdv);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }*/
            listRdv.stream()
                    .forEach(rendezVous -> {
                        rendezVous.setStatusRdv("ENC");
                        try {
                            update(rendezVous.getIdRdv(),rendezVous);
                            System.out.println(rendezVous.getPatient().getEmail());
                            SimpleMailMessage message = new SimpleMailMessage();
                            message.setTo(rendezVous.getPatient().getEmail());
                            message.setSubject(rendezVous.getTypeRdv());
                            message.setText("Bonjour,Mr/mdme " + rendezVous.getPatient().getFirstname() +
                                    " comme convenu vous avez un rendez vous ajourd'hui à "+
                                    rendezVous.getHeureRdv()
                            +"\nSoyer à l'heure s'il vous plaît \n à bientôt");

                            // Envoyer le message initial
                            this.javaMailSender.send(message);

                        } catch (Exception e) {
                           e.printStackTrace();
                        }
                    });
        }

    }
}
