package com.gestionpatient.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ordonnance")
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "idOrdannace")
    private Long idOrdannace;

    @Column(name = "idRdv")
    private Long idRdv;

    @Column(name = "medicament")
    private String medicament;

    @Column(name = "quantité")
    private String quantité;

    @Column(name = "posologie")
    private String posologie;

    @OneToOne
    @JoinColumn(name = "idRdv" , referencedColumnName = "idRdv", insertable = false , updatable = false)
    private RendezVous rendezVous;
}
