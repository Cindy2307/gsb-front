const updateRapport = () => {

    const url = `http://localhost:3000/gsb/rapport/${updateRapportId}`;
    fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bilan: newBilan.value,
            motif: newMotif.value
        })
    })
    .then(response => response.json())
        .then((data) => {
            const date = new Date(data.date);
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            rapports.insertAdjacentHTML('beforeEnd',
                `<ul>
                    <li>
                        <div class="card rapport${data.id}">
                            <div class="card-body">
                                <div class="infos${data.id}">
                                    <span class="date">Date: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="bilan">Bilan:</span> ${data.bilan}<br>
                                    <span class="motif">Motif:</span> ${data.motif}
                                </div>
                                <div class="updateInputs updateInputs${data.id}">
                                        <label>Bilan: </label>
                                        <input type="text" class="newBilan newBilan${data.id}" name="newBilan" value="${data.bilan}">
                                        <label>Motif:</label>
                                        <textarea class="newMotif newMotif${data.id}" name="newMotif" rows="5">${data.motif}</textarea>
                                        <div class="inputRow">
                                            <button type="submit" class="updateRapport updateRapport${data.id}"><i class="fas fa-check-circle"></i></button>
                                            <button class="annuler annulerModif${data.id}"><i class="fas fa-times-circle"></i></button>
                                        </div>
                                </div>
                                <div class="boutons">    
                                    <button class="modifier modifierRapport${data.id}">Modifier</button>
                                    <button class="supprimer supprimerRapport${data.id}">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            `);

            document.querySelector(`.updateInputs${data.id}`).style.display = "none";

            let modifier = document.querySelector(`.modifierRapport${data.id}`);
            modifier.addEventListener("click", () => {
                document.querySelector(`.updateInputs${data.id}`).style.display = "block";
            });
            
            let annuler = document.querySelector(`.annulerModif${data.id}`);
            annuler.addEventListener("click", () => {
                document.querySelector(`.updateInputs${data.id}`).style.display = "none";
            })
            
            let supprimer = document.querySelector(`.supprimerRapport${data.id}`);
            supprimer.addEventListener("click", () => {
                rapportDelete = data.id;
                deleteRapport();
            })

            let valider = document.querySelector(`.updateRapport${data.id}`);
            valider.addEventListener("click", (e) => {
                e.preventDefault();
                updateRapportId = data.id;
                newBilan = document.querySelector(`.newBilan${data.id}`);
                newMotif = document.querySelector(`.newMotif${data.id}`);
                rapports.innerHTML = "";
                updateRapport();
            })
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}