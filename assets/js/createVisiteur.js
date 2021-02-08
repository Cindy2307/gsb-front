const creerVisiteur = document.querySelector("#creerVisiteur");
const nomVisiteur = document.querySelector("#nomVisiteur");

const createVisiteur = () => {
    const url = 'http://localhost:3000/gsb/visiteur';
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom: nomVisiteur.value
        })
    })
    .then(response => response.json())
        .then((data) => {
            const date = new Date(data.dateEmbauche);
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            visiteurs.insertAdjacentHTML('beforeEnd',
                `<ul>
                    <li>
                        <div class="card visiteur${data.id}">
                            <div class="card-body">
                                <div class="infos${data.id}">
                                    <span class="nom">Nom:</span> ${data.nom}<br>
                                    <span class="date">Date d'embauche: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="rapports">Rapports:</span><br>
                                </div>
                                <div class="updateInputs updateInputs${data.id}">
                                        <label>Nom: </label>
                                        <input type="text" class="newNom newNom${data.id}" name="newNom" value="${data.nom}">
                                        <div class="inputRow">
                                            <button type="submit" class="updateNom updateNom${data.id}"><i class="fas fa-check-circle"></i></button>
                                            <button class="annuler annuler${data.id}"><i class="fas fa-times-circle"></i></button>
                                        </div>
                                </div>
                                <div class="boutons">    
                                    <button class="modifier modifierVisiteur${data.id}">Modifier</button>
                                    <button class="supprimer supprimerVisiteur${data.id}">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                `);
            
            document.querySelector(`.updateInputs${data.id}`).style.display = "none";

            let modifier = document.querySelector(`.modifierVisiteur${data.id}`);
            modifier.addEventListener("click", () => {
                document.querySelector(`.updateInputs${data.id}`).style.display = "block";
            });
            
            let annuler = document.querySelector(`.annuler${data.id}`);
            annuler.addEventListener("click", () => {
                document.querySelector(`.updateInputs${data.id}`).style.display = "none";
            })
            
            let supprimer = document.querySelector(`.supprimerVisiteur${data.id}`);
            supprimer.addEventListener("click", () => {
                visiteurDelete = data.id;
                deleteVisiteur();
            })

            let valider = document.querySelector(`.updateNom${data.id}`);
            valider.addEventListener("click", (e) => {
                e.preventDefault();
                updateId = data.id;
                newNom = document.querySelector(`.newNom${data.id}`);
                visiteurs.innerHTML = "";
                updateVisiteur();
            })
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

creerVisiteur.addEventListener("click", (e) => {
    e.preventDefault();
    visiteurs.innerHTML = "";
    createVisiteur();
})