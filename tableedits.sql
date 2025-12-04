DROP TABLE IF EXISTS tblVetVaccination;
DROP TABLE IF EXISTS tblVetVisitDesc;
DROP TABLE IF EXISTS tblVetVisit;
DROP TABLE IF EXISTS tblAnimalDes;
DROP TABLE IF EXISTS tblAnimalBirth;
DROP TABLE IF EXISTS tblAnimals;
DROP TABLE IF EXISTS tblAnimalLocation;
DROP TABLE IF EXISTS tblVet;

-- =====================
-- REBUILD (SQLite Correct Syntax)
-- =====================

CREATE TABLE tblVet (
  VetID INTEGER PRIMARY KEY,
  name TEXT,
  role TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  license TEXT
);

CREATE TABLE tblLocation (
  locationID INTEGER PRIMARY KEY,
  locationName TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT
);

CREATE TABLE tblAnimals (
  animalID INTEGER PRIMARY KEY,
  animalName TEXT,
  animalSpecies TEXT,
  animalBreed TEXT,
  disposition TEXT,
  feed TEXT,
  userID INTEGER,
  locationID INTEGER,
  FOREIGN KEY (locationID) REFERENCES tblAnimalLocation(locationID)
);

CREATE TABLE tblAnimalBirth (
  animalBirthID INTEGER PRIMARY KEY,
  animalID INTEGER,
  DOB DATE,
  Sire TEXT,
  Dam TEXT,
  birthWeight TEXT,
  FOREIGN KEY (animalID) REFERENCES tblAnimals(animalID)
);

CREATE TABLE tblAnimalDes (
  animalDesID INTEGER PRIMARY KEY,
  animalID INTEGER,
  description TEXT,
  FOREIGN KEY (animalID) REFERENCES tblAnimals(animalID)
);

CREATE TABLE tblVetVisit (
  vetVisitID INTEGER PRIMARY KEY,
  animalID INTEGER,
  employeeID INTEGER,
  vetID INTEGER,
  locationID INTEGER,
  visitDate DATE,
  weight TEXT,
  FOREIGN KEY (animalID) REFERENCES tblAnimals(animalID),
  FOREIGN KEY (vetID) REFERENCES tblVet(VetID),
  FOREIGN KEY (locationID) REFERENCES tblAnimalLocation(locationID)
);

CREATE TABLE tblVetVaccination (
  VaccinationID INTEGER PRIMARY KEY,
  vetVisitID INTEGER,
  name TEXT,
  FOREIGN KEY (vetVisitID) REFERENCES tblVetVisit(vetVisitID)
);

CREATE TABLE tblVetVisitDesc (
  vetVisitDescID INTEGER PRIMARY KEY,
  vetVisitID INTEGER,
  description TEXT,
  FOREIGN KEY (vetVisitID) REFERENCES tblVetVisit(vetVisitID)
);

drop table animals;

-- =============================
-- RANCH LOCATIONS (YOUR 3 VALUES)
-- =============================
INSERT INTO tblLocation (locationName, email, phone, address, city, state, zip_code)
VALUES
('Lone Oak Ranch', 'contact@loneoakranch.com', '555-210-3344', '1840 Prairie Creek Rd', 'Amarillo', 'TX', '79101'),
('Silver Spur Animal Range', 'info@silverspurrange.com', '555-422-8899', '752 Silver Spur Trail', 'Cheyenne', 'WY', '82001'),
('Golden Horseshoe Ranch', 'hello@goldenhorseshoe.com', '555-899-4432', '99 Horseshoe Loop', 'Billings', 'MT', '59101');

-- =============================
-- 10 ANIMALS
-- =============================
INSERT INTO tblAnimals (animalName, animalSpecies, animalBreed, disposition, feed, userID, locationID)
VALUES
('Bella', 'Cow', 'Angus', 'Calm', 'Grass', 1, 1),
('Max', 'Horse', 'Quarter Horse', 'Friendly', 'Hay', 1, 1),
('Daisy', 'Goat', 'Boer', 'Energetic', 'Grain', 1, 2),
('Rocky', 'Bull', 'Hereford', 'Aggressive', 'Grass', 1, 3),
('Luna', 'Sheep', 'Suffolk', 'Calm', 'Pellets', 1, 2),
('Thor', 'Pig', 'Yorkshire', 'Lazy', 'Corn', 1, 1),
('Molly', 'Donkey', 'Standard', 'Gentle', 'Hay', 1, 3),
('Hunter', 'Dog', 'Australian Shepherd', 'Alert', 'Kibble', 1, 2),
('Willow', 'Horse', 'Mustang', 'Independent', 'Hay', 1, 3),
('Coco', 'Cow', 'Holstein', 'Calm', 'Grass', 1, 1);

-- =============================
-- ANIMAL BIRTH DATA
-- =============================
INSERT INTO tblAnimalBirth (animalID, DOB, Sire, Dam, birthWeight)
VALUES
(1, '2020-04-15', 'BullX1', 'CowA1', '82'),
(2, '2018-06-10', 'StallionB3', 'MareC2', '95'),
(3, '2021-03-22', 'GoatS1', 'GoatD1', '8'),
(4, '2019-11-30', 'BullH2', 'CowH2', '90'),
(5, '2020-09-18', 'RamC1', 'EweC4', '10'),
(6, '2022-01-05', 'BoarQ1', 'SowQ2', '3'),
(7, '2017-12-14', 'DonkeyS3', 'DonkeyF4', '40'),
(8, '2021-07-09', 'DogS1', 'DogD2', '6'),
(9, '2019-04-01', 'MustangS5', 'MustangM3', '88'),
(10, '2020-08-27', 'BullZ8', 'CowZ9', '78');

-- =============================
-- ANIMAL DESCRIPTIONS
-- =============================
INSERT INTO tblAnimalDes (animalID, description)
VALUES
(1, 'Healthy Angus cow with calm temperament.'),
(2, 'Riding horse, very friendly.'),
(3, 'Energetic goat, used for breeding.'),
(4, 'Strong Hereford bull, aggressive disposition.'),
(5, 'Calm Suffolk sheep, good wool quality.'),
(6, 'Large Yorkshire pig, slow but healthy.'),
(7, 'Gentle working donkey.'),
(8, 'Herding dog, highly alert.'),
(9, 'Independent mustang mare, good stamina.'),
(10, 'Holstein dairy cow, high milk production.');

-- =============================
-- SAMPLE VETS
-- =============================
INSERT INTO tblVet (name, role, phone, address, city, state, zip_code, license)
VALUES
('Dr. Sarah Mitchell', 'Field Veterinarian', '555-770-1234', '101 Ranch Rd', 'Amarillo', 'TX', '79101', 'TX1045'),
('Dr. Luke Hammond', 'Large Animal Specialist', '555-441-8890', '22 Western Ave', 'Cheyenne', 'WY', '82001', 'WY8893'),
('Dr. Emily Carter', 'Equine Veterinarian', '555-982-2231', '19 Meadow Dr', 'Billings', 'MT', '59101', 'MT5567');

-- =============================
-- SAMPLE VET VISITS (10 VISITS)
-- vetID = 1, 2, or 3
-- locationID = 1,2,3 matching the ranches
-- =============================
INSERT INTO tblVetVisit (animalID, employeeID, vetID, locationID, visitDate, weight)
VALUES
(1, 101, 1, 1, '2024-01-12', '1200'),
(2, 102, 3, 1, '2024-02-03', '980'),
(3, 101, 2, 2, '2024-03-15', '55'),
(4, 103, 1, 3, '2024-04-22', '1900'),
(5, 104, 2, 2, '2024-05-10', '130'),
(6, 101, 1, 1, '2024-06-01', '350'),
(7, 103, 3, 3, '2024-07-19', '450'),
(8, 102, 2, 2, '2024-08-11', '65'),
(9, 104, 3, 3, '2024-09-05', '1100'),
(10, 101, 1, 1, '2024-10-21', '1400');

-- =============================
-- SAMPLE VACCINATIONS
-- match vetVisitID values 1–10
-- =============================
INSERT INTO tblVetVaccination (vetVisitID, name)
VALUES
(1, 'Blackleg Vaccine'),
(2, 'Tetanus'),
(3, 'CD&T'),
(4, 'Bovine Viral Diarrhea'),
(5, 'Rabies'),
(6, 'Swine Erysipelas'),
(7, 'West Nile Virus'),
(8, 'Bordatella'),
(9, 'Equine Influenza'),
(10, 'Brucellosis');

-- =============================
-- SAMPLE VET VISIT DESCRIPTIONS
-- =============================
INSERT INTO tblVetVisitdesc (vetVisitID, description)
VALUES
(1, 'Routine wellness check, no issues.'),
(2, 'Hoof trim and dental exam completed.'),
(3, 'Minor parasite treatment administered.'),
(4, 'Bull was aggressive but handled successfully.'),
(5, 'Sheep examined for wool mites, none found.'),
(6, 'Pig evaluated for weight gain—normal.'),
(7, 'Donkey showed signs of mild dehydration.'),
(8, 'Dog received annual check-up.'),
(9, 'Horse vaccinated; strong vitals.'),
(10, 'Cow treated for minor mastitis symptoms.');
