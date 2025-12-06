// Get userid from URL query string
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("userid"); // lowercase 'userid' from query

document.addEventListener("DOMContentLoaded", () => {
  loadAnimals(); // Load animals for this user
});

function loadAnimals(sortBy = null, sortDir = "asc") {
  const tbody = document.querySelector("#tblAnimals tbody");

  // Include userid in the fetch query
  fetch(`/api/animals?userid=${userID}`)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";

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

      data.forEach(animal => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th scope="row">${animal.animalID}</th>
          <td>${animal.animalName}</td>
          <td>
            <a href="factsheet.html?animalid=${animal.animalID}" class="btn btn-info btn-sm">Go To Facts</a>
          </td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error loading animals:", err);
      Swal.fire("Error", "Could not load animal data", "error");
    });
}

// New Animal button
document.querySelector("#btnNewAnimal").addEventListener("click", () => {
  const locationMap = {
    "Lone Oak Ranch": 1,
    "Silver Spur Animal Range": 2,
    "Golden Horseshoe Ranch": 3
  };

  Swal.fire({
    title: "Add New Animal",
    html: `
      <input id="animalName" class="swal2-input" placeholder="Name">
      <input id="animalSpecies" class="swal2-input" placeholder="Species">
      <input id="animalBreed" class="swal2-input" placeholder="Breed">
      <input id="disposition" class="swal2-input" placeholder="Disposition">
      <input id="feed" class="swal2-input" placeholder="Feed">
      <select id="locationID" class="swal2-select">
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
      const locationName = document.getElementById("locationID").value;
      return {
        animalName: document.getElementById("animalName").value.trim(),
        animalSpecies: document.getElementById("animalSpecies").value.trim(),
        animalBreed: document.getElementById("animalBreed").value.trim(),
        disposition: document.getElementById("disposition").value.trim(),
        feed: document.getElementById("feed").value.trim(),
        locationID: locationMap[locationName] || null, // Convert to numeric ID
        userID: userID
      };
    }
  }).then(result => {
    if (result.isConfirmed) {
      const data = result.value;
      if (!data.animalName || !data.locationID) {
        Swal.fire("Error", "Name and Location are required.", "error");
        return;
      }

      fetch("/api/animals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(() => {
        Swal.fire("Saved!", "New animal added.", "success");
        loadAnimals(); // reload table
      })
      .catch(err => {
        console.error("Error adding animal:", err);
        Swal.fire("Error", "Could not add animal", "error");
      });
    }
  });
});
