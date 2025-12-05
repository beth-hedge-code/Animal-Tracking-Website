document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#tblAnimals tbody");

  fetch("/api/animals")
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = "";
        //counts ever instance of "animal" in the table
      data.forEach(animal => {
        const row = document.createElement("tr");
        //innerhtml that sredirects to the animall's information page
        row.innerHTML = `
          <th scope="row">${animal.animalID}</th>
          <td>${animal.animalName}</td>
          <td>
            <a href="factsheet.html?animalid=${animal.animalID}"
               class="btn btn-info btn-sm">
               Go To Facts
            </a>
          </td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error loading animals:", err);
      Swal.fire("Error", "Could not load animal data", "error");
    });
});

// Handle "New Animal" button
  document.querySelector("#btnNewAnimal").addEventListener("click", () => {
    Swal.fire({
      title: "Add New Animal",
      input: "text",
      inputLabel: "Animal Name",
      showCancelButton: true,
      confirmButtonText: "Save"
    }).then(result => {
      if (result.isConfirmed && result.value) {
        // POST new animal to backend
        fetch("http://localhost:8000/api/animals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animalName: result.value })
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


    // Handle "Filter" button
  document.querySelector("#btnFilter").addEventListener("click", () => {
    Swal.fire({
      title: "Filter Animals",
      input: "text",
      inputLabel: "Enter name filter",
      showCancelButton: true,
      confirmButtonText: "Apply"
    }).then(result => {
      if (result.isConfirmed) {
        loadAnimals(result.value); // reload with filter
      }
    });
  });
