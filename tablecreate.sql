CREATE TABLE `tblUsers` (
  `userID` varchar(50),
  `email` varchar(150),
  `password` varchar(150),
  `employeeID` varchar(50)
);

CREATE TABLE `tblEmployee` (
  `EmployeeID` varchar(50),
  `name` varchar(100),
  `role` varchar(50),
  `phone` varchar(20),
  `address` varchar(255),
  `city` varchar(100),
  `state` varchar(50),
  `zip_code` varchar(10),
  `locationID` varchar(255)
);

CREATE TABLE `tblVet` (
  `VetID` varchar(50),
  `name` varchar(100),
  `role` varchar(50),
  `phone` varchar(20),
  `address` varchar(255),
  `city` varchar(100),
  `state` varchar(50),
  `zip_code` varchar(10),
  `license` varchar(10)
);

CREATE TABLE `tblAnimals` (
  `animalID` varchar(50),
  `animalName` varchar(50),
  `animalSpecies` varchar(50),
  `animalBreed` varchar(50),
  `disposition` varchar(50),
  `feed` varchar(50),
  `userID` varchar(50),
  `locationID` varchar(255)
);

CREATE TABLE `tblanimalLocation` (
  `locationID` varchar(50),
  `locationName` varchar(100),
  `email` varchar(100),
  `phone` varchar(20),
  `address` varchar(255),
  `city` varchar(100),
  `state` varchar(50),
  `zip_code` varchar(10)
);

CREATE TABLE `tblAnimalBirth` (
  `animalBirthID` varchar(50),
  `animalID` varchar(50),
  `DOB` date,
  `Sire` varchar(50),
  `Dam` varchar(50),
  `birthWeight` varchar(10)
);

CREATE TABLE `tblAnimalDes` (
  `animalDesID` varchar(50),
  `animalID` varchar(50),
  `description` varchar(255)
);

CREATE TABLE `tblVetVisit` (
  `vetVisitid` varchar(50),
  `animalID` varchar(50),
  `employeeID` varchar(50),
  `vetID` varchar(50),
  `locationID` varchar(50),
  `visitDate` date,
  `weight` varchar(255)
);

CREATE TABLE `tblVetVaccination` (
  `VaccinationID` varchar(255),
  `vetVisitID` varchar(255),
  `name` varchar(255)
);

CREATE TABLE `tblVetVisitdesc` (
  `vetVisitDescID` varchar(255),
  `vetVisitID` varchar(255),
  `description` varchar(255)
);

ALTER TABLE `tblUsers` ADD FOREIGN KEY (`userID`) REFERENCES `tblAnimals` (`userID`);

ALTER TABLE `tblAnimals` ADD FOREIGN KEY (`animalID`) REFERENCES `tblAnimalBirth` (`animalID`);

ALTER TABLE `tblAnimals` ADD FOREIGN KEY (`animalID`) REFERENCES `tblAnimalDes` (`animalID`);

ALTER TABLE `tblAnimals` ADD FOREIGN KEY (`animalID`) REFERENCES `tblVetVisit` (`animalID`);

ALTER TABLE `tblVetVisit` ADD FOREIGN KEY (`vetID`) REFERENCES `tblVet` (`VetID`);

ALTER TABLE `tblVetVisit` ADD FOREIGN KEY (`employeeID`) REFERENCES `tblEmployee` (`EmployeeID`);

ALTER TABLE `tblanimalLocation` ADD FOREIGN KEY (`locationID`) REFERENCES `tblAnimals` (`locationID`);

ALTER TABLE `tblanimalLocation` ADD FOREIGN KEY (`locationID`) REFERENCES `tblEmployee` (`locationID`);

ALTER TABLE `tblVetVisit` ADD FOREIGN KEY (`vetVisitid`) REFERENCES `tblVetVaccination` (`vetVisitID`);

ALTER TABLE `tblEmployee` ADD FOREIGN KEY (`EmployeeID`) REFERENCES `tblUsers` (`employeeID`);

ALTER TABLE `tblanimalLocation` ADD FOREIGN KEY (`locationID`) REFERENCES `tblVetVisit` (`locationID`);

ALTER TABLE `tblVetVisit` ADD FOREIGN KEY (`vetVisitid`) REFERENCES `tblVetVisitdesc` (`vetVisitID`)

drop table tblEmployee;

INSERT INTO tblanimalLocation 
(locationID, locationName, email, phone, address, city, state, zip_code)
VALUES
('RANCH001', 'Lone Oak Ranch', 'contact@loneoakranch.com', '555-210-3344', '1840 Prairie Creek Rd', 'Amarillo', 'TX', '79101'),
('RANCH002', 'Silver Spur Animal Range', 'info@silverspurrange.com', '555-422-8899', '752 Silver Spur Trail', 'Cheyenne', 'WY', '82001'),
('RANCH003', 'Golden Horseshoe Ranch', 'hello@goldenhorseshoe.com', '555-899-4432', '99 Horseshoe Loop', 'Billings', 'MT', '59101');
