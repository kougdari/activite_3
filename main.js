// URL de l'API Restcountries avec traduction en français
const url = "https://restcountries.com/v3.1/all?lang=fr";

// Sélection de l'élément où afficher les pays
const countriesContainer = document.getElementById("countries");

// Fonction pour récupérer et afficher 20 pays
async function getCountries() {
    try {
        // Récupération des données de l'API
        const response = await fetch(url);

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error("Problème lors du chargement des données");
        }

        // Conversion des données en JSON
        const data = await response.json();

        // Sélectionner seulement 20 pays
        const selectedCountries = data.slice(0, 20);

        // Affichage des pays
        displayCountries(selectedCountries);
    } catch (error) {
        // Gestion des erreurs
        countriesContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Fonction pour afficher les pays sur la page
function displayCountries(countries) {
    countries.forEach((country) => {
        // Création d'un élément div pour chaque pays
        const countryElement = document.createElement("div");
        countryElement.classList.add("country");

        // Récupération des informations du pays
        const countryName = country.translations.fra.common; // Nom en français
        const flag = country.flags.svg;
        const capital = country.capital ? country.capital[0] : "Non disponible";
        
        // Récupération de la devise en français (s'il y en a une)
        let currency = "Non disponible";
        if (country.currencies) {
            const currencyCode = Object.keys(country.currencies)[0]; // Récupère le code de la devise (ex: EUR, USD)
            currency = country.currencies[currencyCode].name; // Récupère le nom de la devise en français
        }

        // Insertion du contenu HTML
        countryElement.innerHTML = `
            <img src="${flag}" alt="Drapeau de ${countryName}">
            <h3>${countryName}</h3>
            <p><strong>Capitale :</strong> ${capital}</p>
            <p><strong>Devise :</strong> ${currency}</p>
        `;

        // Ajout à la liste des pays
        countriesContainer.appendChild(countryElement);
    });
}

// Appel de la fonction principale
getCountries();
