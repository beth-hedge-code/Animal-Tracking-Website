//***ANIMAL HOME***

 let animalNum = 5; // number of animals
    let animals = [
      { name: "Bear", img: "https://placebear.com/g/150/150" },
      { name: "Cow", img: "https://placebear.com/g/150/150", },
      { name: "Dog", img: "https://place-puppy.com/150x150" },
      { name: "Cat", img: "https://placekitten.com/150/150" },
      { name: "Horse", img: "https://placebear.com/g/150/150" }
    ];

    let card = document.getElementById("TestCard.html").innerHTML;

    let i = 0;
    while (animalNum > 0) {
      let animal = animals[i];

      // Create card element
      let card = document.createElement("span");
      card.className = "position-relative m-3"; // spacing between cards
      card.innerHTML = `
        <div class="card" style="width: 10rem;">
          <div class="card-header bg-dark text-white text-center">${animal.name}</div>
          <img src="${animal.img}" class="card-img-center" alt="animal photo">
          <div class="card-body d-flex justify-content-center bg-warning">
            <button type="button" class="btn btn-warning">
              <a href="${animal.link}" class="text-dark text-decoration-none">${animal.name.toUpperCase()} FARM</a>
            </button>
          </div>
        </div>
      `;
      // Decrease counter
      animalNum -= 1;
      i++;
    }

/* //button to add a new animal
document.querySelector('#btnNewAnimal').addEventListener('click',function(){
    //open a new card labeled "newAnimal" here?
    //count the amount of animals in the database
    
})

//buttont o filter animals by category
document.querySelector('#btnFilter').addEventListener('click',function(){
    //select from a list 
}) */