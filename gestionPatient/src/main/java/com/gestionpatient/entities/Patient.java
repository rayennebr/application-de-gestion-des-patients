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
@Table(name = "patient")
@EntityListeners(AuditingEntityListener.class)
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idPatient;

    @Column(name="codePatient")
    private String codePatient;

    @Column(name = "firstname")
    private String firstname ;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "dateNaissance")
    private Date dateNaissance;

    @Column(name="sexe",length=1)
    private char sexe;

    @Column(name="codeAssurance")
    private String codeAssurance;

    @Column(name="numTel")
    private String numTel;

    @Column(name="situation")
    private String situation;

    @Column(name="adresse")
    private String adresse;

    @Column(name="ville")
    private String ville;

    @Column(name="pays")
    private String pays;

    @Column(name="email")
    private String email;

    @Column(name="allergie")
    private String allergie;

    @Column(name="antecedantPerso")
    private String antecedantPerso;

    @Column(name="anticidentFam")
    private String anticidentFam;

    @Column(name="maladieCronique")
    private String maladieCronique;

    @CreatedDate
    @Column(name = "createdAt")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "modifiedAt")
    private Date modifiedAt;

}
