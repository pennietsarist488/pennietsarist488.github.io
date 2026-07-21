let currentTranslations = {};

async function loadLanguage(lang) {

    // Charge le fichier JSON correspondant
    const response = await fetch(`/lang/${lang}.json`);
    //const translations = await response.json();
    currentTranslations = await response.json();

    // Met à jour la langue du document
    document.documentElement.lang = lang;

    // Traduit tous les éléments
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const value = key.split(".").reduce((obj, i) => obj[i], currentTranslations);
        if (value) {
            element.textContent = value;
        }
    });

    // Traduit les attributs (ex: data-title, data-desc...)
    document.querySelectorAll("[data-i18n-attr]").forEach(element => {
        const pairs = element.dataset.i18nAttr
            .split(";")
            .filter(p => p.trim() !== ""); // 👈 ignore les entrées vides
        pairs.forEach(pair => {
            const [attr, key] = pair.split(":").map(s => s.trim());
            if (!attr || !key) return; // 👈 sécurité supplémentaire
            const value = key.split(".").reduce((obj, i) => obj?.[i], currentTranslations);
            if (value) {
            element.setAttribute(attr, value);
            }
        });
    });

    // Mémorise la langue choisie
    localStorage.setItem("language", lang);
}

// Gestion des boutons
document.querySelectorAll("[data-lang]").forEach(button => {

    button.addEventListener("click", () => {
        loadLanguage(button.dataset.lang);
    });

});

// Au chargement de la page
const browserLang = navigator.language.startsWith("fr") ? "fr" : "en";

const language =
    localStorage.getItem("language") || browserLang;

loadLanguage(language);

