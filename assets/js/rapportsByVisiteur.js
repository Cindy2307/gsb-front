const rechercheVisiteurRapports = document.querySelector("#rechercherVisiteurRapports");
const rapportsVisiteurId = document.querySelector("#visiteurRapports");

const getRapportByVisiteurId = () => {
    const url = `http://localhost:3000/gsb/visiteur/${rapportsVisiteurId.value}/rapport`;
    fetch(url)
    .then(response => response.json())
        .then((data) => {
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            for (let rapport of data) {
                const date = new Date(rapport.date);
                rapports.insertAdjacentHTML('beforeEnd',
                `
                <ul>
                    <li>
                        <div class="card rapports${rapport.id}">
                            <div class="card-body">
                                <div class="infos${rapport.id}">
                                    <span class="date">Date: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="bilan">Bilan:</span> ${rapport.bilan}<br>
                                    <span class="motif">Motif:</span> ${rapport.motif}
                                </div>
                                <div class="updateInputs updateInputs${rapport.id}">
                                        <label>Bilan: </label>
                                        <input type="text" class="newBilan newBilan${rapport.id}" name="newBilan" value="${rapport.bilan}">
                                        <label>Motif:</label>
                                        <textarea class="newMotif newMotif${rapport.id}" name="newMotif" rows="5">${rapport.motif}</textarea>
                                        <div class="inputRow">
                                            <button type="submit" class="updateRapport updateRapport${rapport.id}"><i class="fas fa-check-circle"></i></button>
                                            <button class="annuler annulerModif${rapport.id}"><i class="fas fa-times-circle"></i></button>
                                        </div>
                                </div>
                                <div class="boutons">    
                                    <button class="modifier modifierRapport${rapport.id}">Modifier</button>
                                    <button class="supprimer supprimerRapport${rapport.id}">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                `);
            
                if (data.indexOf(rapport) < data.length - 1) {
                    document.querySelector(`.rapports${rapport.id}`).style.marginBottom = "2%";
                }

                document.querySelector(`.updateInputs${rapport.id}`).style.display = "none";

                let modifier = document.querySelector(`.modifierRapport${rapport.id}`);
                modifier.addEventListener("click", () => {
                    document.querySelector(`.updateInputs${rapport.id}`).style.display = "block";
                });
                
                let annuler = document.querySelector(`.annulerModif${rapport.id}`);
                annuler.addEventListener("click", () => {
                    document.querySelector(`.updateInputs${rapport.id}`).style.display = "none";
                })
                
                let supprimer = document.querySelector(`.supprimerRapport${rapport.id}`);
                supprimer.addEventListener("click", () => {
                    rapportDelete = rapport.id;
                    deleteRapport();
                })

                let valider = document.querySelector(`.updateRapport${rapport.id}`);
                valider.addEventListener("click", (e) => {
                    e.preventDefault();
                    updateRapportId = rapport.id;
                    newBilan = document.querySelector(`.newBilan${rapport.id}`);
                    newMotif = document.querySelector(`.newMotif${rapport.id}`);
                    rapports.innerHTML = "";
                    updateRapport();
                })
            }
        })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

rechercheVisiteurRapports.addEventListener("click", (e) => {
    e.preventDefault();
    visiteurs.style.display = "none";
    rapports.style.display = "block";
    rapports.innerHTML = "";
    getRapportByVisiteurId();
    rapportsVisiteurId.value = "";
})