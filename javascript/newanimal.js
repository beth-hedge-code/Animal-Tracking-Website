//***ANIMAL HOME***

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#animalCardsContainer');

  fetch('http://localhost:3000/animals')
    .then(res => res.json())
    .then(animals => {
      animals.forEach(animal => {
        const card = document.createElement("span");
        card.className = "position-relative m-3";
        card.innerHTML = `
          <div class="card" style="width: 10rem;">
            <div class="card-header bg-dark text-white text-center">${animal.name}</div>
            <img src="${animal.img}" class="card-img-center" alt="animal photo">
            <div class="card-body d-flex justify-content-center bg-warning">
              <button type="button" class="btn btn-warning">
                <a href="${animal.link}" class="text-dark text-decoration-none">
                  ${animal.name.toUpperCase()} FARM
                </a>
              </button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error('Error fetching animals:', err));
});

 //button to add a new animal
document.querySelector('#btnNewAnimal').addEventListener('click', function () {
    // 1. Create a new card element
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "10rem";
    card.innerHTML = `
   <div class="card" style="width: 18rem;">
        <div class="card-header bg-dark text-white text-center">
          <input class="form-control form-control-sm bg-transparent text-white border-0 text-center" placeholder="Name" data-field="name">
        </div>
        <img src="https://placebear.com/g/150/150" class="card-img-top" alt="animal photo" data-field="imgPreview">
        <div class="card-body bg-warning">
          <div class="mb-2"><input class="form-control form-control-sm" placeholder="Image URL (optional)" data-field="imgUrl"></div>
          <div class="mb-2"><input class="form-control form-control-sm" placeholder="Species" data-field="species"></div>
          <div class="mb-2"><input class="form-control form-control-sm" placeholder="DOB" type="date" data-field="dob"></div>
          <div class="mb-2"><input class="form-control form-control-sm" placeholder="Sex" data-field="sex"></div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary btn-sm btn-save">Save</button>
            <button class="btn btn-secondary btn-sm btn-cancel">Cancel</button>
          </div>
        </div>
      </div>

    `;

    // Append card to container
    // is this why the animal card duplicates on click?
    document.querySelector("#btnNewAnimal").appendChild(card);

    // 2. Ask backend for count of animals in DB
    fetch("/api/animals/count")
      .then(res => res.json())
      .then(data => {
        console.log("Total animals in DB:", data.count);
        alert(`There are now ${data.count} animals in the database.`);
      })
      .catch(err => console.error("Error:", err));
  });


document.querySelector('#btnFilter').addEventListener('click', function () {
  const selectedCategory = document.querySelector('#filterCategory').value;
  const container = document.querySelector('#animalCardsContainer');

  // Loop through all cards
  Array.from(container.children).forEach(card => {
    const animalName = card.dataset.name; // assuming you stored dataset.name when creating cards
    if (!selectedCategory || animalName === selectedCategory) {
      card.style.display = '';   // show
    } else {
      card.style.display = 'none'; // hide
    }
  });
});
