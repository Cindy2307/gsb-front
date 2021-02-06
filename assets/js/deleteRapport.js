const deleteRapport = () => {
    const url = `http://localhost:3000/gsb/rapport/${rapportDelete}`;
    fetch(url, {
        method: "DELETE",
    })
    .then(response => response.json())
        .then((data) => {
            document.location.reload();
            alert("Le rapport a bien été supprimé.")
    })
    .catch((error) => {
        console.log(`Voici mon erreur ${error}`);
    });
}