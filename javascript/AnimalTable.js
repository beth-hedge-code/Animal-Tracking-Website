// Get userid from URL query string
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("userid"); // lowercase 'userid' from query

document.addEventListener("DOMContentLoaded", () => {
  // Load the animal table on page load
  loadAnimals();

  // Map location names to IDs
  const locationMap = {
    "Lone Oak Ranch": 1,
    "Silver Spur Animal Range": 2,
    "Golden Horseshoe Ranch": 3
  };

  // -----------------------------
  // New Animal button
  // -----------------------------
  const btnNew = document.querySelector("#btnNewAnimal");
  btnNew.setAttribute("aria-label", "Add a new animal");
  btnNew.addEventListener("click", () => {
    Swal.fire({
      //sweet alert that shows the information needed to add a new animal
      title: "Add New Animal",
      html: `
        <input id="animalName" class="swal2-input" placeholder="Name" aria-label="Animal Name">
        <input id="animalSpecies" class="swal2-input" placeholder="Species" aria-label="Animal Species">
        <input id="animalBreed" class="swal2-input" placeholder="Breed" aria-label="Animal Breed">
        <input id="disposition" class="swal2-input" placeholder="Disposition" aria-label="Animal Disposition">
        <input id="feed" class="swal2-input" placeholder="Feed" aria-label="Animal Feed">
        <select id="locationID" class="swal2-select" aria-label="Animal Location">
          <option value="">Select Location</option>
          <option value="Lone Oak Ranch">Lone Oak Ranch</option>
          <option value="Silver Spur Animal Range">Silver Spur Animal Range</option>
          <option value="Golden Horseshoe Ranch">Golden Horseshoe Ranch</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        //obtains the data filled in the input elements above
        const locationName = document.getElementById("locationID").value;
        return {
          animalName: document.getElementById("animalName").value.trim(),
          animalSpecies: document.getElementById("animalSpecies").value.trim(),
          animalBreed: document.getElementById("animalBreed").value.trim(),
          disposition: document.getElementById("disposition").value.trim(),
          feed: document.getElementById("feed").value.trim(),
          locationID: locationMap[locationName] || null,
          userID: userID
        };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const data = result.value;
        //error to reqire data in name and location
        if (!data.animalName || !data.locationID) {
          Swal.fire("Error", "Name and Location are required.", "error");
          return;
        }
        //calls for POST in animaltableroute.js
        fetch("/api/animals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        //success
        .then(() => {
          Swal.fire("Saved!", "New animal added.", "success");
          loadAnimals();
        })
        //console and sweet alert error if unable to add the animal
        .catch(err => {
          console.error("Error adding animal:", err);
          Swal.fire("Error", "Could not add animal", "error");
        });
      }
    });
  });

  // -----------------------------
  // Delete Animal button
  // -----------------------------
  const btnDelete = document.querySelector("#btnDeleteAnimal");
  btnDelete.setAttribute("aria-label", "Delete an existing animal");
  btnDelete.addEventListener("click", () => {
    Swal.fire({
      //sweet alert that shows the information needed to delete an animal
      title: "Delete Animal",
      html: `<input id="animalID" class="swal2-input" placeholder="Enter Animal ID" aria-label="Animal ID">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      preConfirm: () => {
        //obtains the data filled in the input element above
        const id = parseInt(document.getElementById("animalID").value.trim(), 10);
        if (!id) Swal.showValidationMessage("Animal ID is required");
        return { animalID: id };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const { animalID } = result.value;
        //calls for DELETE in animaltableroute.js
        fetch(`/api/animals/${animalID}`, { method: "DELETE" })
        //error
          .then(res => {
            if (!res.ok) throw new Error("Failed to delete animal");
            return res.json();
          })
        //success
          .then(() => {
            Swal.fire("Deleted!", `Animal with ID ${animalID} has been deleted.`, "success");
            loadAnimals();
          })
        //console and sweet alerterror if unable to delete the animal
          .catch(err => {
            console.error("Error deleting animal:", err);
            Swal.fire("Error", "Could not delete animal", "error");
          });
      }
    });
  });

  // -----------------------------
  // Update Animal button
  // -----------------------------
  const btnUpdate = document.querySelector("#btnUpdateAnimal");
  btnUpdate.setAttribute("aria-label", "Update an existing animal");
  btnUpdate.addEventListener("click", () => {
    Swal.fire({
      //sweet alert that shows the information needed to update a animal
      title: "Update Animal",
      html: `
        <input id="animalID" class="swal2-input" placeholder="Enter Animal ID" aria-label="Animal ID">
        <input id="animalName" class="swal2-input" placeholder="Name" aria-label="Animal Name">
        <input id="animalSpecies" class="swal2-input" placeholder="Species" aria-label="Animal Species">
        <input id="animalBreed" class="swal2-input" placeholder="Breed" aria-label="Animal Breed">
        <input id="disposition" class="swal2-input" placeholder="Disposition" aria-label="Animal Disposition">
        <input id="feed" class="swal2-input" placeholder="Feed" aria-label="Animal Feed">
        <select id="locationID" class="swal2-select" aria-label="Animal Location">
          <option value="">Select Location</option>
          <option value="Lone Oak Ranch">Lone Oak Ranch</option>
          <option value="Silver Spur Animal Range">Silver Spur Animal Range</option>
          <option value="Golden Horseshoe Ranch">Golden Horseshoe Ranch</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        //obtains the data filled in the input elements above
        const id = parseInt(document.getElementById("animalID").value.trim(), 10);
        const locationName = document.getElementById("locationID").value;
        if (!id) Swal.showValidationMessage("Animal ID is required");
        return {
          animalID: id,
          animalName: document.getElementById("animalName").value.trim(),
          animalSpecies: document.getElementById("animalSpecies").value.trim(),
          animalBreed: document.getElementById("animalBreed").value.trim(),
          disposition: document.getElementById("disposition").value.trim(),
          feed: document.getElementById("feed").value.trim(),
          locationID: locationMap[locationName] || null,
          userID: userID
        };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const data = result.value;
        //calls for PUT in animaltableroute.js
        fetch(`/api/animals/${data.animalID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        //error
        .then(res => {
          if (!res.ok) throw new Error("Failed to update animal");
          return res.json();
        })
        //success
        .then(() => {
          Swal.fire("Updated!", `Animal with ID ${data.animalID} has been updated.`, "success");
          loadAnimals();
        })
        //console and sweet alerterror if unable to update the animal
        .catch(err => {
          console.error("Error updating animal:", err);
          Swal.fire("Error", "Could not update animal", "error");
        });
      }
    });
  });
});

// -----------------------------
// Function to load animals into table
// -----------------------------
function loadAnimals(sortBy = null, sortDir = "asc") {
  const tbody = document.querySelector("#tblAnimals tbody");

  fetch(`/api/animals?userid=${userID}`)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
      //sorts animals by name in ascending order
      if (sortBy) {
        data.sort((a, b) => {
          let valA = a[sortBy];
          let valB = b[sortBy];
          if (typeof valA === "string") valA = valA.toLowerCase();
          if (typeof valB === "string") valB = valB.toLowerCase();
          if (valA < valB) return sortDir === "asc" ? -1 : 1;
          if (valA > valB) return sortDir === "asc" ? 1 : -1;
          return 0;
        });
      }
      //create html elements that fill in table data for animals
      data.forEach(animal => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th scope="row">${animal.animalID}</th>
          <td>${animal.animalName}</td>
          <td>
            <a href="factsheet.html?animalid=${animal.animalID}&userid=${userID}" class="btn btn-info btn-sm" aria-label="Go to factsheet for ${animal.animalName}">Go To Facts</a>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    //error if animals cannot be loaded
    .catch(err => {
      console.error("Error loading animals:", err);
      Swal.fire("Error", "Could not load animal data", "error");
    });
}
