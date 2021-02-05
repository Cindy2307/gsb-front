const visiteurs = document.querySelector("#visiteurs");
const ongletVisiteur = document.querySelector("#ongletVisiteur");

const getVisiteurs = () => {
    const url = 'http://localhost:3000/gsb/visiteur';
    fetch(url)
    .then(response => response.json())
        .then((data) => {
        document.querySelector("#visiteurId").insertAdjacentHTML("beforeend",
                `
                    <option value="" class="default">-- Choisissez un visiteur --</option>
            `);
        document.querySelector("#visiteurRapports").insertAdjacentHTML("beforeend",
                `
                    <option value="" class="default">-- Choisissez un visiteur --</option>
            `);
        document.querySelector("#rapportVisiteurId").insertAdjacentHTML("beforeend",
                `
                    <option value="" class="default">-- Choisissez un visiteur --</option>
            `);
        for (const visiteur of data) {
            const date = new Date(visiteur.dateEmbauche);
            const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
            visiteurs.insertAdjacentHTML('beforeEnd',
                `<ul>
                    <li>
                        <div class="card visiteur${visiteur.id}">
                            <div class="card-body">
                                <div class="infos${visiteur.id}">
                                    <span class="id">Id:</span> ${visiteur.id}<br>
                                    <span class="nom">Nom:</span> ${visiteur.nom}<br>
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
                </ul>
                `);
            for (rapport of visiteur.rapports) {
                const dateRapport = new Date(rapport.date);
                document.querySelector(`.infos${visiteur.id}`).insertAdjacentHTML('beforeEnd',
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
            document.querySelector("#visiteurId").insertAdjacentHTML("beforeEnd",
                `
                <option value="${visiteur.id}">${visiteur.id} - ${visiteur.nom}</option>
            `);
            document.querySelector("#visiteurRapports").insertAdjacentHTML("beforeend",
                `
                <option value="${visiteur.id}">${visiteur.id} - ${visiteur.nom}</option>
            `);
            document.querySelector("#rapportVisiteurId").insertAdjacentHTML("beforeend",
                `
                <option value="${visiteur.id}">${visiteur.id} - ${visiteur.nom}</option>
            `);
            if (data.indexOf(visiteur) < data.length - 1) {
                document.querySelector(`.visiteur${visiteur.id}`).style.marginBottom = "2%";
            }
        }
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}

window.addEventListener("load", getVisiteurs);

ongletVisiteur.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#visiteurId").innerHTML = "";
    document.querySelector("#visiteurRapports").innerHTML = "";
    document.querySelector("#rapportVisiteurId").innerHTML = "";
    visiteurs.innerHTML = "";
    getVisiteurs();
    ongletRapport.classList.remove("active");
    ongletVisiteur.classList.add("active");
    ongletRapport.removeAttribute("aria-current");
    ongletVisiteur.setAttribute("aria-current", "page");
    rapports.style.display = "none";
    visiteurs.style.display = "block";
    document.querySelector("#optionsVisiteur").style.display = "block";
    document.querySelector("#optionsRapport").style.display = "none";
});

