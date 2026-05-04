const themeToggle = document.querySelector(".theme-toggle");
const langToggle = document.querySelector(".lang-toggle");
const siteNav = document.querySelector(".site-nav");
const currentYear = document.querySelector("#current-year");
const metaDescription = document.querySelector("#meta-description");
const galleryModal = document.querySelector("#gallery-modal");
const galleryTitle = document.querySelector(".gallery-title");
const galleryImage = document.querySelector(".gallery-image");
const galleryCaptionText = document.querySelector(".gallery-caption-text");
const galleryCounter = document.querySelector(".gallery-counter");
const galleryThumbnails = document.querySelector(".gallery-thumbnails");
const savedTheme = window.localStorage.getItem("theme");
const savedLanguage = window.localStorage.getItem("language") || "fr";

const galleryCollections = {
  reservations: {
    title: {
      fr: "Application de gestion des réservations immobilières",
      en: "Real Estate Reservation Management Application"
    },
    slides: [
      { src: "screen/livedemoGestionResevation/page-accueil.png", alt: { fr: "Page d'accueil", en: "Home page" } },
      { src: "screen/livedemoGestionResevation/interfacedeonnexionsAdmin.png", alt: { fr: "Connexion administrateur", en: "Admin login" } },
      { src: "screen/livedemoGestionResevation/dasbordAdmin.png", alt: { fr: "Dashboard administrateur", en: "Admin dashboard" } },
      { src: "screen/livedemoGestionResevation/dasbordAdminsuit1.png", alt: { fr: "Dashboard administrateur suite 1", en: "Admin dashboard continuation 1" } },
      { src: "screen/livedemoGestionResevation/dasbordAdminsuit2.png", alt: { fr: "Dashboard administrateur suite 2", en: "Admin dashboard continuation 2" } },
      { src: "screen/livedemoGestionResevation/vudetouteslesrerservation.png", alt: { fr: "Vue de toutes les réservations", en: "All reservations view" } },
      { src: "screen/livedemoGestionResevation/creationreservtion.png", alt: { fr: "Création d'une réservation", en: "Reservation creation" } },
      { src: "screen/livedemoGestionResevation/creationProprite.png", alt: { fr: "Création d'une propriété", en: "Property creation" } },
      { src: "screen/livedemoGestionResevation/vuedetouteslesutilisateurscoteAdmin.png", alt: { fr: "Liste des utilisateurs côté admin", en: "Admin users list" } },
      { src: "screen/livedemoGestionResevation/creerutilsateurcoteAdmin.png", alt: { fr: "Création d'un utilisateur côté admin", en: "Admin user creation" } },
      { src: "screen/livedemoGestionResevation/interfaceconnexioncotclient.png", alt: { fr: "Connexion côté client", en: "Client login" } },
      { src: "screen/livedemoGestionResevation/dasbordclient.png", alt: { fr: "Dashboard client", en: "Client dashboard" } },
      { src: "screen/livedemoGestionResevation/reservationclient.png", alt: { fr: "Réservations du client", en: "Client reservations" } },
      { src: "screen/livedemoGestionResevation/reservercoteclients.png", alt: { fr: "Réservation côté client", en: "Client booking page" } },
      { src: "screen/livedemoGestionResevation/profilcoteclient.png", alt: { fr: "Profil client", en: "Client profile" } },
      { src: "screen/livedemoGestionResevation/interfaceINSCRIPTION.png", alt: { fr: "Interface d'inscription", en: "Registration page" } },
      { src: "screen/livedemoGestionResevation/ensembleProprites.png", alt: { fr: "Ensemble des propriétés", en: "Properties listing" } }
    ]
  },
  bibliotheque: {
    title: {
      fr: "Application de gestion de bibliothèque",
      en: "Library Management Application"
    },
    slides: [
      { src: "screen/livedemogestionBiliotheque/pageConnexion.png", alt: { fr: "Page de connexion", en: "Login page" } },
      { src: "screen/livedemogestionBiliotheque/intefaceAdmin.png", alt: { fr: "Interface administrateur", en: "Admin interface" } },
      { src: "screen/livedemogestionBiliotheque/listeUtilisateurs.png", alt: { fr: "Liste des utilisateurs", en: "Users list" } },
      { src: "screen/livedemogestionBiliotheque/intfacelivrre.png", alt: { fr: "Catalogue des livres", en: "Books catalog" } },
      { src: "screen/livedemogestionBiliotheque/ajoutlivre.png", alt: { fr: "Ajout d'un livre", en: "Add a book" } },
      { src: "screen/livedemogestionBiliotheque/creeremprunts .png", alt: { fr: "Création d'un emprunt", en: "Create a loan" } },
      { src: "screen/livedemogestionBiliotheque/dasbordLECTEUR.png", alt: { fr: "Dashboard lecteur", en: "Reader dashboard" } },
      { src: "screen/livedemogestionBiliotheque/listeLivrecoteLecteur.png", alt: { fr: "Liste des livres côté lecteur", en: "Reader books list" } },
      { src: "screen/livedemogestionBiliotheque/Interfacenotifaction.png", alt: { fr: "Interface de notification", en: "Notification interface" } }
    ]
  }
};

let activeGalleryKey = null;
let activeSlideIndex = 0;

const translations = {
  fr: {
    metaDescription: "Portfolio de RAKY DIA, étudiante en Licence 3 MIAGE, développeuse web et orientée data.",
    navAbout: "À propos",
    navSkills: "Compétences",
    navExperience: "Expérience",
    navProjects: "Projets",
    navContact: "Contact",
    heroLabel: "PORTFOLIO DEV & DATA",
    heroRole: "Développeuse Full Stack & Data",
    heroStack: "PHP, Laravel, Symfony, MySQL, API Platform, Livewire, Docker",
    heroProjects: "Voir mes projets",
    heroContact: "Contact",
    heroCvDev: "CV en dev",
    heroCvData: "CV en data",
    aboutLabel: "À propos",
    aboutTitle: "À propos de moi",
    aboutText: "Je suis Raky Dia, étudiante en Licence 3 MIAGE à l'Université de Rennes 1, avec un profil qui combine développement web et data. Je développe des applications web avec Laravel et Symfony, avec une attention particulière portée à la qualité du code, à l'expérience utilisateur et à la structuration des données. Je m'intéresse également à l'analyse de données et à la transformation des informations en indicateurs utiles pour aider à la prise de décision.",
    skillsLabel: "Compétences",
    skillsTitle: "Technologies et outils",
    skillsCategoryLanguages: "Langages",
    skillsCategoryWeb: "Web",
    skillsCategoryDatabase: "Base de données",
    skillsCategoryOther: "Outils et autres",
    experienceLabel: "Expérience",
    experienceTitle: "Expérience professionnelle",
    experience1Title: "Stagiaire développement web - Acan Group Sénégal",
    experience1Meta: "Mai 2024 - Août 2024 | Km1 Av. Cheikh Anta Diop 45753",
    experience1Text: "Adaptation au framework Laravel en entreprise à travers le développement d'une application de gestion de bibliothèque, en réutilisant un template existant et en implémentant la gestion des livres, des utilisateurs et des prêts.",
    projectsLabel: "Projets",
    projectsTitle: "Mes projets",
    project1Title: "Application de gestion des réservations immobilières",
    project1Text: "Développement d'une application web Laravel pour la réservation de propriétés avec interface Blade et TailwindCSS, composant de réservation dynamique en Livewire et panneau d'administration Filament.",
    project2Title: "Application de gestion de bibliothèque",
    project2Text: "Application Laravel développée dans un contexte professionnel pour gérer les livres, les utilisateurs et les prêts, avec intégration sur un template existant et architecture PHP/MySQL en MVC.",
    project3Title: "Application de gestion des tuteurs et visites",
    project3Text: "Application web développée avec Symfony 6 pour la gestion des étudiants, tuteurs et visites, avec dashboard statistique, API REST via API Platform, génération de rapports PDF et déploiement Docker.",
    liveDemo: "Démo live",
    galleryCounterLabel: "Vue",
    galleryBackToPortfolio: "Retour au portfolio",
    contactLabel: "Contact",
    contactTitle: "Travaillons ensemble",
    contactText: "Tu peux me contacter par email ou retrouver mes projets sur GitHub. Je suis ouverte aux stages, à l'alternance et aux collaborations sur des projets.",
    studentEmail: "Email étudiant",
    myGithub: "Mon GitHub",
    footerText: "Tous droits réservés."
  },
  en: {
    metaDescription: "Portfolio of RAKY DIA, MIAGE undergraduate student, web developer and data-oriented profile.",
    navAbout: "About",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    navContact: "Contact",
    heroLabel: "DEV & DATA PORTFOLIO",
    heroRole: "Full Stack Developer & Data",
    heroStack: "PHP, Laravel, Symfony, MySQL, API Platform, Livewire, Docker",
    heroProjects: "View Projects",
    heroContact: "Contact",
    heroCvDev: "Developer CV",
    heroCvData: "Data CV",
    aboutLabel: "About",
    aboutTitle: "About Me",
    aboutText: "I am Raky Dia, a third-year MIAGE student at the University of Rennes 1, with a profile combining web development and data. I build web applications with Laravel and Symfony, with a strong focus on code quality, user experience, and data structure. I am also interested in data analysis and in transforming information into useful insights to support decision-making.",
    skillsLabel: "Skills",
    skillsTitle: "Technologies and tools",
    skillsCategoryLanguages: "Languages",
    skillsCategoryWeb: "Web",
    skillsCategoryDatabase: "Database",
    skillsCategoryOther: "Tools and other",
    experienceLabel: "Experience",
    experienceTitle: "Professional Experience",
    experience1Title: "Web Development Intern - Acan Group Senegal",
    experience1Meta: "May 2024 - August 2024 | Km1 Av. Cheikh Anta Diop 45753",
    experience1Text: "Worked with Laravel in a professional environment through the development of a library management application, reusing an existing template and implementing books, users and loans management features.",
    projectsLabel: "Projects",
    projectsTitle: "My Projects",
    project1Title: "Real Estate Reservation Management Application",
    project1Text: "Built a Laravel web application for property reservations with a Blade and TailwindCSS interface, a dynamic reservation component in Livewire and an admin panel powered by Filament.",
    project2Title: "Library Management Application",
    project2Text: "Laravel application developed in a professional setting to manage books, users and loans, using an existing template and a PHP/MySQL MVC architecture.",
    project3Title: "Tutors and Visits Management Application",
    project3Text: "Web application built with Symfony 6 for managing students, tutors and visits, including a statistics dashboard, REST API with API Platform, PDF report generation and Docker deployment.",
    liveDemo: "Live Demo",
    galleryCounterLabel: "View",
    galleryBackToPortfolio: "Back to portfolio",
    contactLabel: "Contact",
    contactTitle: "Let's work together",
    contactText: "You can contact me by email or find my projects on GitHub. I am open to internships, work-study opportunities and collaborations on projects.",
    studentEmail: "Student Email",
    myGithub: "My GitHub",
    footerText: "All rights reserved."
  }
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (savedTheme === "light") {
  document.body.setAttribute("data-theme", "light");
}

const applyLanguage = (language) => {
  const dictionary = translations[language] || translations.fr;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  if (metaDescription) {
    metaDescription.setAttribute("content", dictionary.metaDescription);
  }

  if (langToggle) {
    const isEnglish = language === "en";
    langToggle.textContent = isEnglish ? "FR" : "EN";
    langToggle.setAttribute("aria-pressed", String(isEnglish));
  }

  window.localStorage.setItem("language", language);

  if (activeGalleryKey) {
    renderGallery();
  }
};

applyLanguage(savedLanguage);

if (themeToggle) {
  const syncThemeLabel = () => {
    const isLight = document.body.getAttribute("data-theme") === "light";
    themeToggle.textContent = isLight ? "Sombre" : "Clair";
    themeToggle.setAttribute("aria-pressed", String(isLight));
  };

  syncThemeLabel();

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.getAttribute("data-theme") === "light";

    if (isLight) {
      document.body.removeAttribute("data-theme");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      window.localStorage.setItem("theme", "light");
    }

    syncThemeLabel();
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const currentLanguage = document.documentElement.lang === "en" ? "en" : "fr";
    const nextLanguage = currentLanguage === "fr" ? "en" : "fr";
    applyLanguage(nextLanguage);
  });
}

const getCurrentLanguage = () => (document.documentElement.lang === "en" ? "en" : "fr");

const resolveAssetPath = (path) => {
  return new URL(encodeURI(path), window.location.href).href;
};

const renderGallery = () => {
  if (!galleryModal || !activeGalleryKey) {
    return;
  }

  const language = getCurrentLanguage();
  const collection = galleryCollections[activeGalleryKey];
  const slide = collection.slides[activeSlideIndex];

  galleryTitle.textContent = collection.title[language];
  galleryImage.src = resolveAssetPath(slide.src);
  galleryImage.alt = slide.alt[language];
  galleryCaptionText.textContent = slide.alt[language];
  galleryCounter.textContent = `${translations[language].galleryCounterLabel} ${activeSlideIndex + 1} / ${collection.slides.length}`;

  galleryThumbnails.querySelectorAll(".gallery-thumbnail").forEach((button, index) => {
    button.classList.toggle("is-active", index === activeSlideIndex);
    if (index === activeSlideIndex) {
      button.scrollIntoView({ block: "nearest", inline: "center" });
    }
  });
};

const buildGalleryThumbnails = (collection) => {
  if (!galleryThumbnails) {
    return;
  }

  galleryThumbnails.innerHTML = "";
  const language = getCurrentLanguage();

  collection.slides.forEach((slide, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-thumbnail";
    button.setAttribute("aria-label", `${slide.alt[language]} ${index + 1}`);
    button.addEventListener("click", () => {
      activeSlideIndex = index;
      renderGallery();
    });

    const image = document.createElement("img");
    image.src = resolveAssetPath(slide.src);
    image.alt = slide.alt[language];
    button.appendChild(image);
    galleryThumbnails.appendChild(button);
  });
};

const openGallery = (galleryKey) => {
  const collection = galleryCollections[galleryKey];
  if (!galleryModal || !collection) {
    return;
  }

  activeGalleryKey = galleryKey;
  activeSlideIndex = 0;
  buildGalleryThumbnails(collection);
  galleryModal.hidden = false;
  document.body.classList.add("gallery-open");
  renderGallery();
};

const closeGallery = () => {
  if (!galleryModal) {
    return;
  }

  galleryModal.hidden = true;
  document.body.classList.remove("gallery-open");
  activeGalleryKey = null;
};

const moveGallery = (direction) => {
  if (!activeGalleryKey) {
    return;
  }

  const slides = galleryCollections[activeGalleryKey].slides;
  activeSlideIndex = (activeSlideIndex + direction + slides.length) % slides.length;
  renderGallery();
};

document.querySelectorAll("[data-gallery]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openGallery(trigger.getAttribute("data-gallery"));
  });
});

document.querySelectorAll("[data-gallery-close]").forEach((trigger) => {
  trigger.addEventListener("click", closeGallery);
});

document.querySelector("[data-gallery-prev]")?.addEventListener("click", () => {
  moveGallery(-1);
});

document.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
  moveGallery(1);
});

document.addEventListener("keydown", (event) => {
  if (!activeGalleryKey) {
    return;
  }

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowLeft") {
    moveGallery(-1);
  }

  if (event.key === "ArrowRight") {
    moveGallery(1);
  }
});
