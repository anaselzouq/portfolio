/* --------------- Grab elements from DOM --------------- */

let header = document.querySelector("header");

let firstSkill = document.querySelector(".skill:first-child");
let sk_counters =  document.querySelectorAll(".counter span");
let ProgressBars = document.querySelectorAll(".skills svg circle");

let ml_section = document.querySelector('.milestones');
let ml_counters = document.querySelectorAll(".number span");

let prt_section = document.querySelector(".portfolio");
let zoom_icons = document.querySelectorAll(".zoom-icon");
let modal_overlay = document.querySelector(".modal-overlay"); 
let images = document.querySelectorAll(".images img");
let next_btn = document.querySelector(".next-btn");
let prev_btn = document.querySelector(".prev-btn");

let links = document.querySelectorAll(".nav-link");

let toggleBtn = document.querySelector(".toggle-btn");

let hamburger = document.querySelector(".hamburger");


window.addEventListener("scroll", () => {
    activeLink();
    if (!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlCounters();
})

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum)
        }, 12)
    }
}

/* --------------- Sticky Navbar --------------- */

function stickNavba() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickNavba();

window.addEventListener("scroll",stickNavba);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {origin: "top", delay: 700});

/* --------------- Skills Progress Bar Animation --------------- */

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}



let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(firstSkill)) return;

    skillsPlayed = true;

    sk_counters.forEach((counter,i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        ProgressBars[i].style.setProperty("--target",strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400)
    })

    ProgressBars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );
}

/* --------------- Services Counter Animation --------------- */

let mlPlayed = false;

function mlCounters() {
    if (!hasReached(ml_section)) return;
    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;

        setTimeout(() => {
            updateCount(ctr,target)
        },400)
    })
}

/* --------------- Portfolio Filter Animation --------------- */

let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: ".prt-card",
    },
    animation: {
        duration: 500,
    },
});

/* --------------- Modal Pop Up Animation Animation --------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) => 
    icn.addEventListener("click", () => {
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex); 
    })
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
    if (currentIndex === 0) {
        currentIndex = 5;
    }else {
        currentIndex--
    }
    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if (currentIndex === 5) {
        currentIndex = 0;
    }else {
        currentIndex++;
    }
    changeImage(currentIndex);
});

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage")
}

/* --------------- Modal Pop Up Animation Animation --------------- */

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/* --------------- Change Active Link On Scroll --------------- */

function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight
            , id: i
        };
    }).filter(sct => sct.y <= 0);
    let currSectionID = passedSections.at(-1).id;
    
    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();

/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggleBtn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark",1);
    } else {
        document.body.classList.remove("dark");
        toggleBtn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark",0)
    }
}

toggleBtn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
})

/* --------------- Open & Close Navbar Menu --------------- */

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
    
});

links.forEach(link => link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}))


/* ----------------------------------------------------------- */

let CustomBrandingbnt1 = document.querySelector(".services-grid .srv-card .one-btn");
let CustomBrandingbnt2 = document.querySelector(".services-grid .srv-card .tow-btn");
let CustomBrandingbnt3 = document.querySelector(".services-grid .srv-card .three-btn");
let CustomBrandingbnt4 = document.querySelector(".services-grid .srv-card .four-btn");
let CustomBrandingp1 = document.querySelector(".services-grid .srv-card .card-desc .text.one");
let CustomBrandingp2 = document.querySelector(".services-grid .srv-card .card-desc .tow");
let CustomBrandingp3 = document.querySelector(".services-grid .srv-card .card-desc .text.three");
let CustomBrandingp4 = document.querySelector(".services-grid .srv-card .card-desc .text.four");

CustomBrandingbnt1.onclick = function () {
    CustomBrandingp1.innerHTML = "Designing a professional logo that captures the essence of your brand. Developing a harmonious color palette that grabs attention and enhances memorability.";
    this.style.display = "none";
}

CustomBrandingbnt2.onclick = function () {
    CustomBrandingp2.innerHTML = "Building a clear and easy-to-navigate information architecture. Designing visually appealing and effective page layouts. Selecting fonts and colors that enhance readability and focus.";
    this.style.display = "none";
}

CustomBrandingbnt3.onclick = function () {
    CustomBrandingp3.innerHTML = "Ensuring your website displays perfectly on all devices and screen sizes (smartphones, tablets, desktops). Utilizing modern responsive techniques to guarantee a seamless user experience on any screen size.";
    this.style.display = "none";
}

CustomBrandingbnt4.onclick = function () {
    CustomBrandingp4.innerHTML = "Improving page load speed for a faster and smoother user experience. Reducing file sizes and optimizing code efficiency. Ensuring your website complies with the latest web standards."
    this.style.display = "none";
}

