const rechercheVisiteur = document.querySelector("#rechercherVisiteur");
const visiteurId = document.querySelector("#visiteurId");

const getVisiteurById = () => {
    const url = `http://localhost:3000/gsb/visiteur/${visiteurId.value}`;
    fetch(url)
    .then(response => response.json())
        .then((data) => {
            const date = new Date(data.dateEmbauche);
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            visiteurs.insertAdjacentHTML('beforeEnd',
                `
                <ul>
                    <li>
                        <div class="card visiteur${data.id}">
                            <div class="card-body">
                                <div class="infos${data.id}">
                                    <span class="id">Id:</span> ${data.id}<br>
                                    <span class="nom">Nom:</span> ${data.nom}<br>
                                    <span class="date">Date d'embauche: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="rapports">Rapports:</span><br>
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
            for (rapport of data.rapports) {
                const dateRapport = new Date(rapport.date);
                document.querySelector(`.infos${data.id}`).insertAdjacentHTML('beforeEnd',
                    `
                    <div class="infosRapport">
                        <ul>
                            <li>
                                <span class="id">Id:</span> ${rapport.id}<br>
                                <span class="dateRapport">Date: </span>` + dateRapport.getDate() + ` ` + mois[dateRapport.getMonth()] + ` ` + dateRapport.getFullYear() + `<br>
                                <span class="bilan">Bilan:</span> ${rapport.bilan}<br>
                                <span class="motif">Motif:</span> ${rapport.motif}<br>
                            </li>
                        </ul>
                    </div>
                `);
            }
        })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

rechercheVisiteur.addEventListener("click", (e) => {
    e.preventDefault();
    visiteurs.innerHTML = "";
    getVisiteurById();
    visiteurId.value = "";
})