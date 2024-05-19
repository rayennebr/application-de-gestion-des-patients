package com.gestionpatient.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "consultation")
@EntityListeners(AuditingEntityListener.class)
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "idConsultation")
    private Long idConsultation;

    @Column(name = "idRdv")
    private Long idRdv;

    @Column(name = "idPatient")
    private Long idPatient;

    @Column(name = "codeConsultation")
    private String codeConsultation;

    @Column(name = "typeConsultation")
    private String typeConsultation;

    @Column(name="poidsPatient")
    private Long poidsPatient;

    @Column(name="taillePatient")
    private Long taillePatient;

    @Column(name = "motifConsultation")
    private String motifConsultation;

    @Column(name = "examenConsultation")
    private String examenConsultation;

    @Column(name = "prixConsultation")
    private Long prixConsultation;

    @CreatedDate
    @Column(name = "createdAt")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "modifiedAt")
    private Date modifiedAt;

    @ManyToOne
    @JoinColumn(name="idPatient", referencedColumnName = "idPatient", nullable=false, insertable = false, updatable = false)
    private Patient patient;

    @OneToOne
    @JoinColumn(name="idRdv", referencedColumnName = "idRdv", nullable=false, insertable = false, updatable = false)
    private RendezVous rendezVous;

}
