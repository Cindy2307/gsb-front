const rapports = document.querySelector("#rapports");
const ongletRapport = document.querySelector("#ongletRapport");
let rapportDelete = "";
let updateRapportId = "";
let newBilan = "";
let newMotif = "";

const getRapports = () => {
    const url = 'http://localhost:3000/gsb/rapport';

    fetch(url)
    .then(response => response.json())
        .then((data) => {
        document.querySelector("#rapportId").insertAdjacentHTML("beforeend",
                `
                    <option value="" class="default">-- Choisissez un rapport --</option>
            `);

        for (const rapport of data) {
            const date = new Date(rapport.date);
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
          
            rapports.insertAdjacentHTML('beforeEnd',
                `
                <ul>
                    <li>
                        <div class="card rapport${rapport.id}">
                            <div class="card-body">
                                <div class="infos${rapport.id}">
                                    <span class="date">Date: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="bilan">Bilan:</span> ${rapport.bilan}<br>
                                    <span class="motif">Motif:</span> ${rapport.motif}<br>
                                </div>
                                <div class="updateInputs updateInputs${rapport.id}">
                                        <label>Bilan: </label>
                                        <input type="text" class="newBilan newBilan${rapport.id}" name="newBilan" placeholder="Ex: Bilan positif">
                                        <input type="text" class="newMotif newMotif${rapport.id}" name="newMotif" placeholder="Ex: Votre motif">
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
            
            document.querySelector("#rapportId").insertAdjacentHTML("beforeend",
                `
                    <option value="${rapport.id}"> ${rapport.bilan} - ${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}</option>
            `);

            if (data.indexOf(rapport) < data.length - 1) {
                document.querySelector(`.rapport${rapport.id}`).style.marginBottom = "2%";
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

ongletRapport.addEventListener("click", (e) => {
    e.preventDefault();
    rapports.innerHTML = "";
    document.querySelector("#rapportId").innerHTML = "";
    getRapports();
    ongletVisiteur.classList.remove("active");
    ongletRapport.classList.add("active");
    ongletVisiteur.removeAttribute("aria-current");
    ongletRapport.setAttribute("aria-current", "page");
    visiteurs.style.display = "none";
    rapports.style.display = "block";
    document.querySelector("#optionsRapport").style.display = "block";
    document.querySelector("#optionsVisiteur").style.display = "none";
});
