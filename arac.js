/* =========================
   SAYFA AÇILIŞ ANİMASYONU
========================= */
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});


/* =========================
   AKTİF MENÜ YÖNETİMİ
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const menuLinks = document.querySelectorAll(".links .link");
    if (!menuLinks.length) return;

    const page = location.pathname.split("/").pop();
    const hash = location.hash;

    const setActive = (match) => {
        menuLinks.forEach(link => link.classList.remove("active"));
        const target = [...menuLinks].find(link =>
            link.getAttribute("href").includes(match)
        );
        if (target) target.classList.add("active");
    };

    /* 🔹 1. DETAY SAYFALARI */
    if (page && page !== "" && page !== "index.html") {
        setActive("#arac");
        return;
    }

    /* 🔹 2. İLK YÜKLEME */
    if (hash) {
        setActive(hash);
    } else {
        setActive("#anasayfa");
    }

    /* 🔹 3. MENÜYE TIKLANINCA (index.html içi) */
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            const href = link.getAttribute("href");

            // Sadece index içi linkler
            if (href.includes("#")) {
                const hashPart = href.substring(href.indexOf("#"));
                setActive(hashPart);
            }
        });
    });

    /* 🔹 4. HASH DEĞİŞİRSE (geri/ileri, manuel URL) */
    window.addEventListener("hashchange", () => {
        if (location.hash) {
            setActive(location.hash);
        }
    });
});


/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId.startsWith("#")) {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});


/* =========================
   REZERVASYON BUTONU
========================= */
const rezervBtn = document.querySelector(".car_link");
if (rezervBtn) {
    rezervBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Rezervasyon sistemi yakında aktif olacak 🚗");
    });
}


/* =========================
   KART HOVER
========================= */
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.1)";
        card.style.transition = "0.2s";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)";
    });
});


/* =========================
   SLIDER
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    if (!sliderContainer || !prevButton || !nextButton) return;

    const getCardWidth = () => {
        const firstCard = sliderContainer.querySelector('.card');
        if (!firstCard) return 480;

        const style = window.getComputedStyle(firstCard);
        const margin =
            parseFloat(style.marginLeft) + parseFloat(style.marginRight);

        return firstCard.offsetWidth + margin;
    };

    prevButton.addEventListener('click', () => {
        sliderContainer.scrollLeft -= getCardWidth();
    });

    nextButton.addEventListener('click', () => {
        sliderContainer.scrollLeft += getCardWidth();
    });

    const updateButtons = () => {
        prevButton.style.display =
            sliderContainer.scrollLeft < 10 ? 'none' : 'block';

        const maxScroll =
            sliderContainer.scrollWidth - sliderContainer.clientWidth;

        nextButton.style.display =
            sliderContainer.scrollLeft >= maxScroll - 10 ? 'none' : 'block';
    };

    sliderContainer.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
});
