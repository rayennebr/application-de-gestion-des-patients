# Application de Gestion des Patients

## Introduction

**Application de Gestion des Patients** est une solution complète pour gérer les informations des patients dans une clinique. Elle se compose de deux parties principales :

1. **MyClinic** : Une application frontend développée avec **Angular** pour l'interface utilisateur.  
2. **GestionPatient** : Une application backend développée avec **Spring Boot** pour gérer la logique métier et les données.

---

## Fonctionnalités Principales

- **Gestion des patients** : Ajouter, modifier, supprimer et consulter des informations sur les patients.  
- **Gestion des rendez-vous** : Planifier et suivre les rendez-vous.  
- **Tableau de bord** : Visualiser les statistiques clés sur la gestion des patients.  

---

## Architecture

L'application est construite selon une architecture **frontend-backend**. Les deux parties communiquent via des APIs REST exposées par l'application Spring Boot.

---

## MyClinic (Frontend)

### Technologies Utilisées

- **Angular 14+** : Framework pour construire des interfaces utilisateur modernes et dynamiques.  
- **TypeScript** : Pour le typage et la robustesse du code.

### Installation et Exécution

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/rayennebr/application-de-gestion-des-patients.git
   cd myclinic

2. **Installer les dépendances : :**
   ```bash
   npm install

3. **Lancer l'application :**
   ```bash
  ng serve

---
## GestionPatient (Backend)

### Technologies Utilisées

- **Spring Boot 3+** : Framework backend pour développer des APIs REST.  
- **Spring Data JPA** : Pour interagir avec la base de données.  
- **MySQL ou PostgreSQL** : Pour la persistance des données.  

---

### Installation et Exécution

#### 1. Cloner le projet :

```bash
git clone https://github.com/rayennebr/application-de-gestion-des-patients.git
cd gestionPatient
```

#### 2. Construire le projet :

```bash
mvn clean install
```

#### 3. Lancer l'application :

```bash
mvn spring-boot:run
```

