const rechercheVisiteurRapports = document.querySelector("#rechercherVisiteurRapports");
const rapportsVisiteurId = document.querySelector("#visiteurRapports");

const getRapportByVisiteurId = () => {
    const url = `http://localhost:3000/gsb/visiteur/${rapportsVisiteurId.value}/rapport`;
    fetch(url)
    .then(response => response.json())
        .then((data) => {
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            for (rapport of data) {
                const date = new Date(rapport.date);
                visiteurs.insertAdjacentHTML('beforeEnd',
                `
                <ul>
                    <li>
                        <div class="card rapports${rapport.id}">
                            <div class="card-body">
                                <div class="infos${rapport.id}">
                                    <span class="id">Id:</span> ${rapport.id}<br>
                                    <span class="date">Date: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="bilan">Bilan:</span> ${rapport.bilan}<br>
                                    <span class="motif">Motif:</span> ${rapport.motif}
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
                if (data.indexOf(rapport) < data.length - 1) {
                    document.querySelector(`.rapports${rapport.id}`).style.marginBottom = "2%";
                }
            }
        })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

rechercheVisiteurRapports.addEventListener("click", (e) => {
    e.preventDefault();
    visiteurs.innerHTML = "";
    getRapportByVisiteurId();
    rapportsVisiteurId.value = "";
})