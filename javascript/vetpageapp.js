document.addEventListener("DOMContentLoaded", () => {
    const animalID = new URLSearchParams(window.location.search).get("animalid"); //Searches the url to get the animalID
    const userID = new URLSearchParams(window.location.search).get("userid"); // get userid from url

    // Update Back to Animal Table link based on userid
    const backLink = document.getElementById("backToAnimals");
    if (backLink) backLink.href = `AnimalTable.html?userid=${userID}`;

    
    fetch(`http://localhost:8000/api/vet/${animalID}`)//grabs vet info based on animalid
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(visits => {
            //If animal has no visits displays to users a message
            if (!visits || visits.length === 0) {
                document.getElementById("vetVisitsContainer").textContent = "No vet visits found.";
                return;
            }

            // Assuming we display the most recent visit first
            const visit = visits[0];

            // Vet info
            document.getElementById("vetName").textContent = visit.vetName;
            document.getElementById("vetRole").textContent = visit.vetRole;
            document.getElementById("vetPhone").textContent = visit.phone;
            document.getElementById("vetAddress").textContent = `${visit.address}, ${visit.city}, ${visit.state} ${visit.zip_code}`;
            document.getElementById("vetLicense").textContent = visit.license;

            // Visit info
            document.getElementById("visitDate").textContent = visit.visitDate;
            document.getElementById("weight").textContent = visit.weight;
            document.getElementById("visitDescription").textContent = visit.visitDescription || "N/A";

            // Vaccinations info
            document.getElementById("vaccinations").textContent = visit.vaccinations.join(", ") || "None";
        })
        .catch(err => console.error(err));
});