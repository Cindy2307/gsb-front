const rechercheRapport = document.querySelector("#rechercherRapport");
const rapportId = document.querySelector("#rapportId");

const getRapportById = () => {
    const url = `http://localhost:3000/gsb/rapport/${rapportId.value}`;
    fetch(url)
    .then(response => response.json())
        .then((data) => {
            const date = new Date(data.date);
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            rapports.insertAdjacentHTML('beforeEnd',
                `
                <ul>
                    <li>
                        <div class="card rapport${data.id}">
                            <div class="card-body">
                                <div class="infos${data.id}">
                                    <span class="id">Id:</span> ${data.id}<br>
                                    <span class="date">Date: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="bilan">Bilan:</span> ${data.bilan}<br>
                                    <span class="motif">Motif:</span> ${data.motif}
                                </div>
                                <div class="boutons">    
                                    <button class="modifier">Modifier</button>
                                    <button class="supprimer">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul
                `);
        })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

rechercheRapport.addEventListener("click", (e) => {
    e.preventDefault();
    rapports.innerHTML = "";
    getRapportById();
    rapportId.value = "";
})