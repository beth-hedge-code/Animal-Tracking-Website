document.addEventListener("DOMContentLoaded", () => {
    const animalID = new URLSearchParams(window.location.search).get("animalid");//Searches the url to get the animalID

    fetch(`http://localhost:8000/api/animaldes/${animalID}`)//grabs animal info based on animalid
        //error checking
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        //puts data into the html
        .then(data => {
            document.getElementById("animalname").textContent = data.animalName;
            document.getElementById("description").textContent = data.description;
            document.getElementById("species").textContent = data.animalSpecies;
            document.getElementById("breed").textContent = data.animalBreed;
            document.getElementById("dob").textContent = data.DOB;
            document.getElementById("sire").textContent = data.Sire;
            document.getElementById("dam").textContent = data.Dam;
            document.getElementById("disposition").textContent = data.disposition;
            document.getElementById("feed").textContent = data.feed;
            document.getElementById("location").textContent = data.locationName;
            document.getElementById("birthWeight").textContent = data.birthWeight;

            //creates the vetpage link attached the animalid 
            const vetLink = document.getElementById("vetPageLink");
            const userID = new URLSearchParams(window.location.search).get("userid");

            const backToAnimals = document.getElementById("backToAnimals");
            backToAnimals.href = `AnimalTable.html?userid=${userID}`;
            
            vetLink.href = `vetpage.html?animalid=${animalID}&userid=${userID}`;

        })
        .catch(err => console.error(err));
});




