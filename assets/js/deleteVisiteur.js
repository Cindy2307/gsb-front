const deleteVisiteur = () => {
    const url = `http://localhost:3000/gsb/visiteur/${visiteurDelete}`;
    fetch(url, {
        method: "DELETE",
    })
    .then(response => response.json())
        .then((data) => {
            document.location.reload();
            alert("Le visiteur a bien été supprimé.")
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}