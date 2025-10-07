const mainContent = document.getElementById('content');
let isNavOpen=!1,isSettingsOpen=!1;function openMobilMenu(e){switch(e){case"nav":isSettingsOpen&&(document.getElementById("mobileSettings").style.right="",isSettingsOpen=!1),isNavOpen?document.querySelector("#navigation .mainMenu").style.top="":document.querySelector("#navigation .mainMenu").style.top="0",isNavOpen=!isNavOpen;break;case"contact":loadPage("contact");break;case"home":loadPage("home");break;case"projects":loadPage("projects");break;case"settings":isNavOpen&&(document.querySelector("#navigation .mainMenu").style.top="",isNavOpen=!1),isSettingsOpen?document.getElementById("mobileSettings").style.right="":document.getElementById("mobileSettings").style.right="0",isSettingsOpen=!isSettingsOpen;break;default:console.log("Unbekanntes Men\xfc")}}
let isDeskNavOpen=!1;function toggleDeskMenu(){isDeskNavOpen?(document.querySelector("#navigation .mainMenu").style.left="",document.querySelector("#navigation .navButton span:nth-child(1)").style.marginTop="",document.querySelector("#navigation .navButton span:nth-child(2)").style.opacity="",document.querySelector("#navigation .navButton span:nth-child(3)").style.marginTop="",document.querySelector("#navigation .navButton span:nth-child(1)").style.transform="",document.querySelector("#navigation .navButton span:nth-child(3)").style.transform=""):(document.querySelector("#navigation .mainMenu").style.left="0",document.querySelector("#navigation .navButton span:nth-child(1)").style.marginTop="0",document.querySelector("#navigation .navButton span:nth-child(2)").style.opacity="0",document.querySelector("#navigation .navButton span:nth-child(3)").style.marginTop="0",document.querySelector("#navigation .navButton span:nth-child(1)").style.transform="translate(-50%,-50%) rotate(-45deg)",document.querySelector("#navigation .navButton span:nth-child(3)").style.transform="translate(-50%,-50%) rotate(45deg)"),isDeskNavOpen=!isDeskNavOpen}
let currentPage = '';
function loadPage(page) {
    if (page === currentPage) {
        console.log(`Seite '${page}' ist bereits aktiv – kein erneuter Ladevorgang.`);
        return;
    }
    currentPage = page;

    document.getElementById('loadingScreen').style.display = 'flex';

    switch (page) {
        case 'home':
            loadHTML('content/home.html', mainContent, () => {
                checkMenus();
                getNewsTicker();
                getHomeSkills();
                updateMottoMessage();
                getHomeProjects();
                scrollToTop();
            });
            break;
        case 'profile':
            loadHTML('content/profile.html', mainContent, () => {
                checkMenus();
                loadCertificates();
                getPartnerships();
                loadGallery();
                scrollToTop();
            });
            break;
        case 'projects':
            loadHTML('content/projects.html', mainContent, () => {
                checkMenus();
                getProjects();
                scrollToTop();
            });
            break;
        case 'skills':
            loadHTML('content/skills.html', mainContent, () => {
                checkMenus();
                getSkillsTree();
                getProcess();
                scrollToTop();
            });
            break;
        case 'contact':
            loadHTML('content/links.html', mainContent, () => {
                checkMenus();
                getLinks();
                scrollToTop();
            });
            break;
        case 'impress':
            loadHTML('content/impress.html', mainContent, () => {
                checkMenus();
                scrollToTop();
            });
            break;
        case 'privacy':
            loadHTML('content/dataprotection.html', mainContent, () => {
                checkMenus();
                scrollToTop();
            });
            break;
        case 'cookies':
            loadHTML('content/cookies.html', mainContent, () => {
                checkMenus();
                scrollToTop();
            });
            break;
        case 'sources':
            loadHTML('content/sources.html', mainContent, () => {
                checkMenus();
                scrollToTop();
            });
            break;
        default:
            loadHTML('content/404.html', mainContent, () => {
                checkMenus();
                scrollToTop();
            });
            break;
    }
    setTimeout(()=>{initLanguage()},2500);
    const validPages = ['home', 'profile', 'projects', 'skills', 'contact', 'impress', 'privacy', 'cookies', 'sources'];
    setTemporaryCookie("page",validPages.includes(page)?page:"404"),updateURLWithCookies();
}
function loadHTML(e,n,r){fetch(e).then(e=>{if(!e.ok)throw Error("Fehler beim Laden der HTML-Datei");return e.text()}).then(e=>{n.innerHTML=e,"function"==typeof r&&r()}).catch(e=>{console.error("Fehler:",e),n.innerHTML="<p>Fehler beim Laden der Ansicht.</p>"})}
function checkMenus(){isNavOpen?openMobilMenu("nav"):isDeskNavOpen?toggleDeskMenu():isSettingsOpen&&openMobilMenu("settings")}
function toggleTheme(){let e="light"===(getCookie("theme")||"light")?"dark":"light";setTheme(e),setCookie("theme",e,365),updateURLWithCookies()}function setTheme(e){let t=document.documentElement,l=document.querySelectorAll(".modeSelect");t.classList.toggle("darkTheme","dark"===e),t.classList.toggle("lightTheme","light"===e),l.forEach(t=>t.style.marginLeft="dark"===e?"20px":"-20px")}function initTheme(){let e=getCookie("theme")||"light";"dark"!==e&&"light"!==e&&(e="dark"),setCookie("theme",e,365),updateURLWithCookies(),setTheme(e)}
let isLinkFilterOpen=!1;function toggleLinkFilterMenu(){isLinkFilterOpen?(document.querySelector(".linkFilterMenu").style.maxHeight="",document.querySelector(".linkFilterMenu .fa-arrow-down").style.rotate="",document.querySelector(".linkFilterMenu .fa-arrow-down").style.animation=""):(document.querySelector(".linkFilterMenu").style.maxHeight="1000px",document.querySelector(".linkFilterMenu .fa-arrow-down").style.rotate="180deg",document.querySelector(".linkFilterMenu .fa-arrow-down").style.animation="none"),isLinkFilterOpen=!isLinkFilterOpen}
let isProjectFilterOpen=!1;function toggleProjectFilterMenu(e){let t=document.getElementById("tagList"),r=document.getElementById("sortSelect"),o=document.querySelector("#projectsFilterMenu"),n=document.querySelector("#projectsFilterMenu .fa-arrow-down");r.contains(e.target)||t.contains(e.target)||(isProjectFilterOpen?(o.classList.remove("open"),n.style.transform="rotate(0deg)"):(o.classList.add("open"),n.style.transform="rotate(180deg)"),isProjectFilterOpen=!isProjectFilterOpen)}
function toggleFAQItem(e){e.classList.contains("expanded")?e.classList.remove("expanded"):(document.querySelectorAll(".faqItem").forEach(e=>{e.classList.remove("expanded")}),e.classList.add("expanded"))}document.querySelectorAll(".faqItem").forEach(e=>{e.classList.remove("expanded")});
function openLink(url) {
    switch (url) {
        case 'html5':
            window.open('https://html.spec.whatwg.org/multipage/', '_blank');
            break;
        case 'php':
            window.open('https://www.php.net/', '_blank');
            break;
        case 'css3':
            window.open('https://developer.mozilla.org/en-US/docs/Web/CSS', '_blank');
            break;
        case 'javascript':
            window.open('https://www.javascript.com/', '_blank');
            break;
        case 'nodejs':
            window.open('https://nodejs.org/en', '_blank');
            break;
        case 'vscode':
            window.open('https://code.visualstudio.com/', '_blank');
            break;
        case 'cmd':
            window.open('https://learn.microsoft.com/de-de/windows-server/administration/windows-commands/cmd', '_blank');
            break;
        case 'ps':
            window.open('https://learn.microsoft.com/de-de/powershell/', '_blank');
            break;
        case 'chatgpt':
            window.open('https://chatgpt.com/', '_blank');
            break;
        case 'xampp':
            window.open('https://www.apachefriends.org/de/index.html', '_blank');
            break;
        case 'apache':
            window.open('https://httpd.apache.org/', '_blank');
            break;
        case 'mysql':
            window.open('https://www.mysql.com/de/', '_blank');
            break;
        case 'davinci':
            window.open('https://www.blackmagicdesign.com/de/products/davinciresolve/', '_blank');
            break;
        case 'obsstudio':
            window.open('https://obsproject.com/de', '_blank');
            break;
        case 'flstudio':
            window.open('https://www.image-line.com/', '_blank');
            break;
        case 'voicemeeter':
            window.open('https://vb-audio.com/Voicemeeter/', '_blank');
            break;
        case 'trello':
            window.open('https://trello.com/', '_blank');
            break;
        case 'notion':
            window.open('https://www.notion.com/', '_blank');
            break;
        default:
            loadPage('404');
            break;
    }
}
function handleBodyClick(e){let t=document.getElementById("navigation"),n=document.getElementById("mobileFooter"),r=document.getElementById("mobileSettings"),a=document.querySelectorAll(".faqItem"),o=document.querySelector(".linkFilterMenu"),i=document.querySelector("#projectsFilterMenu");if(t?.contains(e.target)||n?.contains(e.target)||r?.contains(e.target)||o?.contains(e.target)||i?.contains(e.target))return;let l=!1;a.forEach(t=>{t.contains(e.target)&&(l=!0)}),l||a.forEach(e=>e.classList.remove("expanded")),isLinkFilterOpen&&toggleLinkFilterMenu(),isProjectFilterOpen&&toggleProjectFilterMenu(e),checkMenus()}
function addHoverEffectToLinkCard(e,r){e.addEventListener("mouseover",()=>{r.forEach(r=>{r!==e&&(r.style.filter="blur(5px) grayscale(1)")}),e.style.backgroundColor="rgba(255, 255, 255, 0.1)"}),e.addEventListener("mouseout",()=>{r.forEach(e=>{e.style.filter=""}),e.style.backgroundColor=""})}function addHoverEffectToProcessCard(e,r){e.addEventListener("mouseover",()=>{r.forEach(r=>{r!==e&&(r.style.filter="blur(5px) grayscale(1)")}),e.style.backgroundColor="rgba(255, 255, 255, 0.1)"}),e.addEventListener("mouseout",()=>{r.forEach(e=>{e.style.filter=""}),e.style.backgroundColor=""})}function addHoverEffectToImages(e){let r=document.querySelectorAll(".imgContainer img"),o=document.querySelectorAll(".skillsCardContainer img");r.forEach(r=>{r!==e&&(r.style.filter="blur(5px) grayscale(1)")}),o.forEach(r=>{r!==e&&(r.style.filter="blur(5px) grayscale(1)")}),e.style.backgroundColor="var(--hover-color)"}function removeHoverEffectFromImages(){let e=document.querySelectorAll(".imgContainer img"),r=document.querySelectorAll(".skillsCardContainer img");e.forEach(e=>{e.style.filter="",e.style.backgroundColor=""}),r.forEach(e=>{e.style.filter="",e.style.backgroundColor=""})}
function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}
// DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    setCookiesFromURL(),getCookie("cookieConsent")||document.getElementById("cookie-banner").classList.remove("hidden"),document.getElementById("cookie-accept").addEventListener("click",function(){setCookie("cookieConsent","true",365),document.getElementById("cookie-banner").classList.add("hidden")});
    setTimeout(()=>{initTheme()},2500),setTimeout(()=>{initLanguage()},5e3);
});