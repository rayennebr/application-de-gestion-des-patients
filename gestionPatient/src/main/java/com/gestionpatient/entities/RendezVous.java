package com.gestionpatient.entities;



import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="RendezVous")
@EntityListeners(AuditingEntityListener.class)
public class RendezVous  {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idRdv;

    @Column(name = "codeRdv")
    private String codeRdv;

    @Column(name = "dateRdv")
    private Date dateRdv;

    @Column(name = "heureRdv")
    private String heureRdv;

    @Column(name = "idPatient")
    private Long idPatient;

    @Column(name = "statusRdv" , length = 3)
    private String statusRdv;

    @Column(name="typeRdv")
    private String typeRdv;

    @Column(name="motif")
    private String motif;

    @CreatedDate
    @Column(name = "createdAt")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "modifiedAt")
    private Date modifiedAt;

    @ManyToOne
    @JoinColumn(name="idPatient", referencedColumnName = "idPatient", nullable=false, insertable = false, updatable = false)
    private Patient patient;



}
