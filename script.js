const themeToggleBtn = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");

const supportsAuraCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
let auraRafId = null;

if (supportsAuraCursor) {
	document.addEventListener("pointermove", (event) => {
		if (auraRafId) {
			cancelAnimationFrame(auraRafId);
		}

		auraRafId = requestAnimationFrame(() => {
			document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
			document.documentElement.style.setProperty("--mouse-y", `${event.clientY + 60}px`);
			auraRafId = null;
		});
	});
}

const translations = {
	es: {
		"nav.home": "Inicio",
		"nav.about": "Sobre mi",
			"nav.skills": "Habilidades",
		"nav.certificates": "Certificados",
			"nav.portfolio": "Portafolio",
			"nav.gallery": "Galeria",
		"nav.contact": "Contacto",
		"home.greeting": "HOLA!",
		"home.title": "Soy <span>Michelle</span>",
		"home.roleMain": "Estudiante de Desarrollo de Software",
		"home.roleSub": "Ingeniera en Robotica Computacional",
		"home.description":
			"Me gusta que me llamen \"Michi\", y soy apasionada por la programacion, el diseño y me encanta aprender cosas nuevas. Soy una persona creativa, curiosa y siempre dispuesta a enfrentar nuevos desafios."+" Me gusta trabajar en equipo y compartir mis conocimientos con los demas. ",
		"home.cta": "Hablemos!",
		"about.title": "Sobre <span>Mi</span>",
		"about.roleMain": "Estudiante de Desarrollo de Software",
		"about.roleSub": "Ingeniera en Robotica Computacional",
		"about.description":
				"Me gusta que me llamen Michi, y soy apasionada por la programación, el diseño y el aprendizaje constante. Disfruto participar en proyectos de desarrollo de software y tecnología, trabajar en equipo, resolver desafíos y aportar ideas creativas para construir soluciones utiles.",
		"about.cta": "Contratame",
		"skills.title": "Mis <span>Habilidades</span>",
		"certificates.title": "Mis <span>Certificados</span>",
		"certificates.description": "Certificaciones destacadas alineadas a mi perfil en software, cloud, IA y bases de datos.",
		"portfolio.title": "Mi <span>Galeria</span>",
		"portfolio.description": "Proyectos en los que he participado.",
		"portfolio.item1": "IFTP2026",
		"portfolio.item2": "AI Course",
		"portfolio.item3": "Buildathon",
		"portfolio.item4": "IT Google",
		"portfolio.desc1": "Gane 3er lugar.",
		"portfolio.desc2": "Gane 2do lugar.",
		"portfolio.desc3": "Gane 2do lugar.",
		"portfolio.desc4": "Participe en el curso.",
		"portfolio.item5": "Java Projects",
		"portfolio.item6": "Structure Data Project",
		"portfolio.item7": "Evidence Portfolio",
		"portfolio.openRepo": "Abrir",
		"portfolioSection.title": "Portafolio",
		"portfolioSection.description": "Proyectos diseñados para la práctica o en la universidad..",
		"contactSection.title": "Mis <span>Contactos</span>",
		"contactSection.description": "Puedes encontrarme en estas plataformas.",
		"contactSection.linkedin": "Conecta conmigo profesionalmente",
		"contactSection.github": "Revisa mis proyectos y repositorios",
		"contactSection.gmail": "Escribeme para colaboraciones",
        "portfolio.desc1": "Gané 3er lugar. 🥉",
		"portfolio.desc2": "Gané 2do lugar. 🥈",
		"portfolio.desc3": "Gané 1er lugar. 🥇",
        "portfolio.desc4": "Participé en el curso. 🎓",
	},
	en: {
		"nav.home": "Home",
		"nav.about": "About",
			"nav.skills": "Skills",
		"nav.certificates": "Certificates",
			"nav.portfolio": "Portfolio",
			"nav.gallery": "Gallery",
		"nav.contact": "Contact",
		"home.greeting": "HI!",
		"home.title": "I'm <span>Michelle</span>",
		"home.cta": "Let's!",
		"home.roleMain": "Software Development Student",
		"home.roleSub": "Computational Robotics Engineer",
		"home.description":
			"  I like to be called “Michi,” and I am passionate about programming, design, and learning new things. I am a creative, curious person who is always ready to take on new challenges. I enjoy working in teams and sharing my knowledge with others.",
		"about.roleMain": "Software Development Student",
		"about.roleSub": "Computational Robotics Engineer",
		"about.description":
			 "I like to be called Michi, and I am passionate about programming, design, and continuous learning. I enjoy participating in software and technology projects, working in teams, solving challenges, and bringing creative ideas to build useful solutions.",
		"about.title": "About <span>Me</span>",
		"about.cta": "Hire Me",
		"skills.title": "My <span>Skills</span>",
		"certificates.title": "My <span>Certificates</span>",
		"certificates.description": "Featured certifications aligned with my software, cloud, AI, and database profile.",
		"portfolio.title": "My <span>Gallery</span>",
		"portfolio.description": "Projects I have participated in.",
		"portfolio.item1": "IFTP2026",
		"portfolio.item2": "AI Course",
		"portfolio.item3": "Buildathon",
		"portfolio.item4": "IT Google",
		"portfolio.desc1": "I won 3rd place. 🥉",
		"portfolio.desc2": "I won 2nd place. 🥈",
		"portfolio.desc3": "I won 1st place. 🥇",
		"portfolio.desc4": "I participated in the course.🎓",
		"portfolio.item5": "Java Projects",
		"portfolio.item6": "Structure Data Project",
		"portfolio.item7": "Evidence Portfolio",
		"portfolio.openRepo": "Open",
		"portfolioSection.title": "Portfolio",
		"portfolioSection.description": "Projects designed for practice or at the university.",
		"contactSection.title": "My <span>Contacts</span>",
		"contactSection.description": "You can find me on these platforms.",
		"contactSection.linkedin": "Connect with me professionally",
		"contactSection.github": "Check my projects and repositories",
		"contactSection.gmail": "Email me for collaborations"
	}
};

const uiLabels = {
	es: {
		themeToLight: "Activar modo dia",
		themeToDark: "Activar modo noche",
		langSelect: "Seleccionar idioma"
	},
	en: {
		themeToLight: "Enable light mode",
		themeToDark: "Enable dark mode",
		langSelect: "Select language"
	}
};

let currentLang = "es";

const syncAboutSpanishFromHtml = () => {
	const aboutNodes = document.querySelectorAll('[data-i18n^="about."]');
	aboutNodes.forEach((node) => {
		const key = node.getAttribute("data-i18n");
		if (!key) {
			return;
		}

		translations.es[key] = node.dataset.i18nHtml === "true" ? node.innerHTML : node.textContent.trim();
	});
};

const updateThemeToggleLabel = () => {
	if (!themeToggleBtn) {
		return;
	}

	const isLight = document.body.classList.contains("light-mode");
	const labels = uiLabels[currentLang] || uiLabels.es;
	themeToggleBtn.setAttribute("aria-label", isLight ? labels.themeToDark : labels.themeToLight);
};

const applyTheme = (mode) => {
	const isLight = mode === "light";
	document.body.classList.toggle("light-mode", isLight);

	if (themeToggleBtn) {
		themeToggleBtn.classList.toggle("is-light", isLight);
		themeToggleBtn.setAttribute("aria-checked", String(isLight));
	}

	updateThemeToggleLabel();
};

const applyLanguage = (lang) => {
	const dictionary = translations[lang] || translations.es;
	currentLang = translations[lang] ? lang : "es";
	document.documentElement.lang = currentLang;

	const translatableNodes = document.querySelectorAll("[data-i18n]");
	translatableNodes.forEach((node) => {
		const key = node.getAttribute("data-i18n");
		const value = dictionary[key];

		if (!value) {
			return;
		}

		if (node.dataset.i18nHtml === "true") {
			node.innerHTML = value;
		} else {
			node.textContent = value;
		}
	});

	if (langToggle) {
		const labels = uiLabels[currentLang] || uiLabels.es;
		langToggle.value = currentLang;
		langToggle.setAttribute("aria-label", labels.langSelect);
	}

	updateThemeToggleLabel();
	localStorage.setItem("lang", currentLang);
};

syncAboutSpanishFromHtml();

const savedLang = localStorage.getItem("lang");
applyLanguage(savedLang === "en" ? "en" : "es");

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggleBtn) {
	themeToggleBtn.addEventListener("click", () => {
		const nextMode = document.body.classList.contains("light-mode") ? "dark" : "light";
		applyTheme(nextMode);
		localStorage.setItem("theme", nextMode);
	});
}

if (langToggle) {
	langToggle.addEventListener("change", (event) => {
		applyLanguage(event.target.value);
	});
}

const startGallerySlider = (imageId, images) => {
	const imageElement = document.getElementById(imageId);
	if (!imageElement || !Array.isArray(images) || images.length < 2) {
		return;
	}

	let currentIndex = 0;

	setInterval(() => {
		currentIndex = (currentIndex + 1) % images.length;
		imageElement.style.opacity = "0.25";

		setTimeout(() => {
			imageElement.src = images[currentIndex];
			imageElement.style.opacity = "1";
		}, 180);
	}, 4000);
};

startGallerySlider("iftp-gallery-image", [
	"img/IFTP/IFTP1.jpg",
	"img/IFTP/IFTP2.jpg",
	"img/IFTP/IFTP3.jpg",
	"img/IFTP/IFTP4.jpg",
	"img/IFTP/IFTP5.jpg",
	"img/IFTP/IFTP6.jpg"
]);

startGallerySlider("ai-gallery-image", [
	"img/AI Course/AI1.jpg",
	"img/AI Course/AI2.jpg",
	"img/AI Course/AI3.jpg",
	"img/AI Course/AI4.jpg"
]);

startGallerySlider("buildathon-gallery-image", [
	"img/Buildathon/B1.jpg",
	"img/Buildathon/B2.jpg",
	"img/Buildathon/B3.jpg",
	"img/Buildathon/B4.jpg"
]);

startGallerySlider("it-google-gallery-image", [
	"img/IT Google/IT1.jpg",
	"img/IT Google/IT 2.jpg"
]);

const initCyclicCarousel = ({ trackId, prevBtnId, nextBtnId, itemSelector }) => {
	const track = document.getElementById(trackId);
	const prevBtn = document.getElementById(prevBtnId);
	const nextBtn = document.getElementById(nextBtnId);

	if (!track || !prevBtn || !nextBtn) {
		return;
	}

	let isAnimating = false;
	const transitionDurationMs = 350;
	track.style.transition = `transform ${transitionDurationMs}ms ease`;
	track.style.transform = "translateX(0)";

	const forceReflow = () => {
		void track.offsetWidth;
	};

	const waitForTrackTransition = (callback) => {
		let done = false;

		const finish = () => {
			if (done) {
				return;
			}
			done = true;
			track.removeEventListener("transitionend", onEnd);
			callback();
		};

		const onEnd = (event) => {
			if (event.target !== track) {
				return;
			}
			finish();
		};

		track.addEventListener("transitionend", onEnd);
		setTimeout(finish, transitionDurationMs + 80);
	};

	const getStep = () => {
		const firstCard = track.querySelector(itemSelector);
		if (!firstCard) {
			return 0;
		}

		const trackStyles = window.getComputedStyle(track);
		const gapPx = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
		return firstCard.getBoundingClientRect().width + gapPx;
	};

	nextBtn.addEventListener("click", () => {
		if (isAnimating) {
			return;
		}

		const step = getStep();
		if (!step) {
			return;
		}

		isAnimating = true;
		track.style.transform = `translateX(-${step}px)`;

		waitForTrackTransition(() => {
			track.style.transition = "none";
			track.appendChild(track.firstElementChild);
			track.style.transform = "translateX(0)";
			forceReflow();

			requestAnimationFrame(() => {
				track.style.transition = `transform ${transitionDurationMs}ms ease`;
				isAnimating = false;
			});
		});
	});

	prevBtn.addEventListener("click", () => {
		if (isAnimating) {
			return;
		}

		const step = getStep();
		if (!step) {
			return;
		}

		isAnimating = true;
		track.style.transition = "none";
		track.insertBefore(track.lastElementChild, track.firstElementChild);
		track.style.transform = `translateX(-${step}px)`;
		forceReflow();

		requestAnimationFrame(() => {
			track.style.transition = `transform ${transitionDurationMs}ms ease`;
			track.style.transform = "translateX(0)";
		});

		waitForTrackTransition(() => {
			isAnimating = false;
		});
	});
};

initCyclicCarousel({
	trackId: "portfolio-track",
	prevBtnId: "portfolio-prev",
	nextBtnId: "portfolio-next",
	itemSelector: ".portfolio-card"
});

initCyclicCarousel({
	trackId: "certificates-track",
	prevBtnId: "certificates-prev",
	nextBtnId: "certificates-next",
	itemSelector: ".certificate-card"
});
