(This read me is a work in progress)
# Animal Tracking Website

A Node.js + Express web application for tracking animal information, veterinary visits, and animal descriptions. The application uses SQLite databases to store animals, vets, and visit data, and displays them in a responsive front-end using HTML, CSS, and Bootstrap.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Screenshots](#screenshots)

---

## Features

- View animal descriptions with species, breed, DOB, sire, dam, feed, location, and birth weight.
- View vet visit details for each animal, including visit date, vet name, weight, and vaccinations.
- Responsive layout using Bootstrap.
- Dynamic linking between fact sheets and vet pages.

---

## Technologies

- Node.js
- Express.js
- SQLite3
- HTML, CSS, Bootstrap
- JavaScript (Vanilla)

---

## Project Structure

Animal-Tracking-Website/
├── index.js # Main server file
├── package.json
├── Routes/
│ ├── login.js
│ ├── signin.js
│ └── animalfact.js # API routes for animal descriptions
│ └── vetpage.js # API routes for vet page
├── CSS/
│ ├── stylesheetindex.css
│ └── Bootstrap.css
├── javascript/
│ ├── animalfactapp.js
│ └── vetpageapp.js
├── factsheet.html # Animal fact sheet page
├── vetpage.html # Vet visit page
├── Animals.db # SQLite database for animals
├── README.md


---

## Database Schema

### `tblAnimals`
| Column | Type |
|--------|------|
| animalID | INTEGER PRIMARY KEY |
| animalName | TEXT |
| animalSpecies | TEXT |
| animalBreed | TEXT |
| disposition | TEXT |
| feed | TEXT |
| userID | INTEGER |
| locationID | INTEGER |

### `tblAnimalBirth`
| Column | Type |
|--------|------|
| animalBirthID | INTEGER PRIMARY KEY |
| animalID | INTEGER |
| DOB | TEXT |
| Sire | TEXT |
| Dam | TEXT |
| birthWeight | TEXT |

### `tblAnimalDes`
| Column | Type |
|--------|------|
| animalDesID | INTEGER PRIMARY KEY |
| animalID | INTEGER |
| description | TEXT |

### `tblVet`
| Column | Type |
|--------|------|
| VetID | INTEGER PRIMARY KEY |
| name | TEXT |
| role | TEXT |
| phone | TEXT |
| address | TEXT |
| city | TEXT |
| state | TEXT |
| zip_code | TEXT |
| license | TEXT |

### `tblVetVisit`
| Column | Type |
|--------|------|
| vetVisitID | INTEGER PRIMARY KEY |
| animalID | INTEGER |
| employeeID | INTEGER |
| vetID | INTEGER |
| locationID | INTEGER |
| visitDate | TEXT |
| weight | TEXT |

### `tblVetVisitDesc`
| Column | Type |
|--------|------|
| vetVisitDescID | INTEGER PRIMARY KEY |
| description | TEXT |

### `tblVetVaccination`
| Column | Type |
|--------|------|
| VaccinationID | INTEGER PRIMARY KEY |
| vetVisitID | INTEGER |
| name | TEXT |

---

## Setup Instructions

1. Clone the repository:

bash
git clone https://github.com/yourusername/Animal-Tracking-Website.git
cd Animal-Tracking-Website

npm install

Running the Application

Start the server:

node index.js


Server runs on port 8000. Open in your browser:

http://localhost:8000

#future screenshots coming!

Created with ❤️ by [Beth and Miguel]
