const rapports = document.querySelector("#rapports");
const ongletRapport = document.querySelector("#ongletRapport");

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
                                    <span class="id">Id:</span> ${rapport.id}<br>
                                    <span class="date">Date: </span>` + date.getDate() + ` ` + mois[date.getMonth()] + ` ` + date.getFullYear() + `<br>
                                    <span class="bilan">Bilan:</span> ${rapport.bilan}<br>
                                    <span class="motif">Motif:</span> ${rapport.motif}<br>
                                </div>
                                <div class="boutons">    
                                    <button class="modifier">Modifier</button>
                                    <button class="supprimer">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                `);
            document.querySelector("#rapportId").insertAdjacentHTML("beforeend",
                `
                    <option value="${rapport.id}">${rapport.id} - ${rapport.bilan}</option>
            `);
            if (data.indexOf(rapport) < data.length - 1) {
                document.querySelector(`.rapport${rapport.id}`).style.marginBottom = "2%";
            }
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
