// Function on links page
async function getLinks(){try{let e=await fetch("db/links.json"),a=await e.json(),t=document.getElementById("linkContainer"),n=document.getElementById("tagList"),l={},r=a.links,s=null;function o(){r.sort((e,a)=>{let t=e.plattform.localeCompare(a.plattform);return 0!==t?t:e.username.localeCompare(a.username)}),c(r),s=null,i()}function c(e){t.innerHTML="";let a=[];e.forEach(e=>{let n=document.createElement("a");n.classList.add("linkCard"),n.href=e.url,n.target="_blank",n.innerHTML=`
    <img src="${e.icon}" alt="${e.plattform}">
    <div class="spanContainer">
        <span class="anonymous-pro-regular">${e.username}</span>
        <span class="anonymous-pro-regular">${e.plattform}</span>
        <span class="anonymous-pro-regular" data-lang="${e.thema||"Default Thema"}"></span>
    </div>
`,t.appendChild(n),a.push(n),addHoverEffectToLinkCard(n,a),requestAnimationFrame(()=>initLanguage())})}function i(){let e=n.querySelectorAll("button");e.forEach(e=>{e.innerText.toLowerCase()===s?.toLowerCase()?e.classList.add("active"):e.classList.remove("active")})}a.links.forEach(e=>{e.tags.forEach(a=>{l[a]||(l[a]=[]),l[a].push(e)})}),Object.keys(l).sort().forEach(e=>{let a=document.createElement("button");a.innerText=e.charAt(0).toUpperCase()+e.slice(1),a.classList.add("chakra-petch-light"),a.onclick=()=>(function e(a){s=a;let t=l[a].slice().sort((e,a)=>{let t=e.plattform.localeCompare(a.plattform);return 0!==t?t:e.username.localeCompare(a.username)});c(t),i()})(e),n.appendChild(a)});let p=document.getElementById("resetButton");p.addEventListener("click",()=>{s=null,o(),i()}),o()}catch(u){console.error("Fehler beim Laden der Links:",u)}}
// Function on skills page
async function getSkillsTree(){try{let response=await fetch("db/skillsTree.json"),skills=await response.json(),imgContainer=document.querySelector(".imgContainer");imgContainer.innerHTML="",skills.forEach(skill=>{let imgElement=document.createElement("img");imgElement.src=skill.src,imgElement.alt=skill.alt,imgElement.title=skill.title,imgElement.onclick=()=>eval(skill.onclick),imgElement.onmouseover=()=>addHoverEffectToImages(imgElement),imgElement.onmouseleave=()=>removeHoverEffectFromImages(imgElement),imgContainer.appendChild(imgElement)})}catch(error){console.error("Error loading skills tree:",error)}}
async function getProcess(){try{let e=await fetch("db/process.json"),t=await e.json(),a=document.getElementById("processCardContainer"),s=document.getElementById("processMenuContainer"),n={},r=t.processes,c=null;function o(){r.sort((e,t)=>parseInt(t.percentage)-parseInt(e.percentage)),l(r),c=null,i()}function l(e){a.innerHTML="";let t=[];e.forEach(e=>{let s=document.createElement("div");s.classList.add("processCard"),s.innerHTML=`
    <img src="${e.icon}" alt="${e.processName}">
    <h2 data-lang="${e.processName}" class="anonymous-pro-regular"></h2>
    <div class="mainBar">
        <div style="width: ${e.percentage}%;"></div>
    </div>
    <span class="anonymous-pro-regular">${e.percentage}%</span>
`,a.appendChild(s),t.push(s),addHoverEffectToProcessCard(s,t),requestAnimationFrame(()=>initLanguage())})}function i(){let e=s.querySelectorAll("button");e.forEach(e=>{e.dataset.lang.toLowerCase()===c?.toLowerCase()?e.classList.add("active"):e.classList.remove("active")})}t.processes.forEach(e=>{e.tags.forEach(t=>{n[t]||(n[t]=[]),n[t].push(e)})}),Object.keys(n).sort().forEach(e=>{let t=document.createElement("button");t.classList.add("chakra-petch-light"),t.dataset.lang=`${e}`,t.onclick=()=>(function e(t){c=t;let a=n[t].slice().sort((e,t)=>parseInt(t.percentage)-parseInt(e.percentage));l(a),i()})(e),s.appendChild(t)});let d=document.getElementById("resetButton");d.addEventListener("click",()=>{c=null,o(),i()}),o()}catch(p){console.error("Fehler beim Laden der Links:",p)}}
// Function on projects page
async function getProjects() {
    try {
        const response=await fetch("db/projects.json"),data=await response.json(),projectsContainer=document.getElementById("projectsContainer"),projectsFilterMenu=document.getElementById("tagList"),sortSelect=document.getElementById("sortSelect");let allProjects=data.projects,currentSort="default",currentDirection="asc",currentTag=null;const tagGroups={};data.projects.forEach(t=>{t.tags.forEach(e=>{tagGroups[e]||(tagGroups[e]=[]),tagGroups[e].push(t)})});const showAllButton=document.createElement("button");showAllButton.dataset.lang="allProjectsButton",showAllButton.classList.add("tagButton","chakra-petch-light","active"),showAllButton.textContent="Show All",showAllButton.onclick=()=>{currentTag=null,updateActiveTag(null),sortByCriteria(currentSort,currentDirection)},projectsFilterMenu.appendChild(showAllButton),Object.keys(tagGroups).sort().forEach(t=>{let e=document.createElement("button");e.classList.add("tagButton","chakra-petch-light"),e.textContent=t,e.onclick=()=>{updateActiveTag(currentTag=currentTag===t?null:t),sortByCriteria(currentSort,currentDirection)},projectsFilterMenu.appendChild(e)});
        function sortByCriteria(e,t="asc"){currentSort=e,currentDirection=t;let a=currentTag?tagGroups[currentTag]:allProjects,s=document.querySelector(`#sortSelect .dropdown-option[data-sort="${e}"]`);s&&(document.querySelectorAll("#sortSelect .dropdown-option").forEach(e=>{e.classList.remove("active","asc","desc")}),s.classList.add("active",t)),a.sort((a,s)=>{let d,r;switch(e){case"startdate":d=new Date(a.startdate),r=new Date(s.startdate);break;case"enddate":d=new Date(a.enddate||0),r=new Date(s.enddate||0);break;case"lastupdate":d=new Date(a.lastupdate),r=new Date(s.lastupdate);break;case"planneddate":d=new Date(a.planneddate||0),r=new Date(s.planneddate||0);break;case"status":d=a.status,r=s.status;break;default:d=a.title.toLowerCase(),r=s.title.toLowerCase()}return d<r?"asc"===t?-1:1:d>r?"asc"===t?1:-1:0}),renderProjects(a)}
        function renderProjects(t){projectsContainer.innerHTML="",t.forEach(t=>{let a=document.createElement("div");if(a.classList.add("projectCard"),a.innerHTML=`
            <div class="logoImage">
                <img src="${t.logo}" alt="Not found">
                <h2 class="merriweather">${t.title}</h2><br>
            </div>
            <p><strong data-lang="projectDescription"></strong></p><p data-lang="${t.description}"></p><br>
            <span><p><strong>Status:</strong></p><p data-lang="${t.status}"></p></span><br>
            <p><strong data-lang="technologies"></strong></p><p>${t.technologies.join(", ")}</p><br>
            <span><p><strong data-lang="startDate"></strong></p><p> ${new Date(t.startdate).toLocaleDateString()}</p></span>
            <span><p><strong data-lang="upDate"></strong></p><p> ${new Date(t.lastupdate).toLocaleDateString()}</p></span>
            <span><p><strong data-lang="plannedDate"></strong></p><p>${t.planneddate?new Date(t.planneddate).toLocaleDateString():"TBA"}</p></span>
            <span><p><strong data-lang="endDate"></strong></p><p>${t.enddate?new Date(t.enddate).toLocaleDateString():"TBA"}</p></span>
        `,t.link){let e=document.createElement("a");e.href=t.link,e.setAttribute("data-lang","moreInfo"),e.target="_blank",a.appendChild(e),a.appendChild(document.createElement("br")),a.appendChild(document.createElement("br"))}if(Array.isArray(t.gallery)&&t.gallery.length>0){let n=document.createElement("button");n.textContent="\uD83D\uDCF7",n.classList.add("galleryButton"),n.onclick=()=>openGallery(t.gallery),a.appendChild(n)}"projectOpen"===t.status?a.classList.add("projectOpen"):"projectWIP"===t.status?a.classList.add("projectWIP"):"projectFrozen"===t.status?a.classList.add("projectFrozen"):"projectDone"===t.status&&a.classList.add("projectDone"),projectsContainer.appendChild(a)})}
        function updateActiveTag(t){let a=projectsFilterMenu.querySelectorAll("button");a.forEach(a=>{a.textContent===t?a.classList.add("active"):null===t&&"allProjectsButton"===a.dataset.lang?a.classList.add("active"):a.classList.remove("active")})}
        function openGallery(e){if(!Array.isArray(e)||0===e.length)return;let t=document.createElement("div");t.classList.add("galleryOverlay");let l=document.createElement("div");l.classList.add("galleryContainer"),e.forEach(e=>{let t=document.createElement("img");t.src=e,l.appendChild(t)});let a=document.createElement("button");a.textContent="\xd7",a.classList.add("closeGallery"),a.onclick=e=>{e.stopPropagation(),t.remove()},t.appendChild(a),t.appendChild(l),t.onclick=e=>{e.target===t&&t.remove()},document.body.appendChild(t)}document.querySelectorAll("#sortSelect .dropdown-option").forEach(e=>{e.addEventListener("click",()=>{let t=e.dataset.sort;currentSort===t?currentDirection="asc"===currentDirection?"desc":"asc":(currentSort=t,currentDirection="asc"),sortByCriteria(currentSort,currentDirection)})}),sortByCriteria(currentSort,currentDirection);
    }catch (error){console.error('Fehler beim Laden der Projekte:', error);}
}
// Functions on profile page
async function loadCertificates(){try{let e=document.getElementById("certificatesGallery"),t=await fetch("get-certificates"),i=await t.json(),c="";i.forEach(e=>{c+=`
    <div class="cert">
        <img src="docs/certificates/${e}" alt="Zertifikat ${e}" title="${e}" class="cert-thumbnail" onclick="openModal('docs/certificates/${e}')">
    </div>
`}),e.innerHTML=c}catch(a){console.error("Fehler beim Laden der Zertifikate:",a)}}
async function getPartnerships(){try{let r=await fetch("db/partnerships.json"),a=await r.json(),n=document.getElementById("partnersContainer"),t="";a.forEach(r=>{t+=`
    <div class="partner">
        <a href="${r.url}" target="_blank">
            <img src="${r.logo}" alt="${r.name}" title="${r.name}">
        </a>
        <p class="partner-description anonymous-pro-regular" data-lang="${r.description}"></p>
    </div>
`}),n.innerHTML=t}catch(e){console.error("Error loading partnerships:",e)}}
async function loadGallery(){try{let a=document.getElementById("galleryContainer"),e=await fetch("get-images"),l=await e.json();console.log(l);let r="";l.forEach(a=>{r+=`<img src="images/gallery/${a}" alt="Gallery image ${a}" class="gallery-image" onclick="openModal('images/gallery/${a}')">`}),closeModal(),a.innerHTML=r}catch(g){console.error("Error loading images:",g)}}
function openModal(e){let t=document.getElementById("imageModal"),l=document.getElementById("modalImage");t.style.display="flex",l.src=e}function closeModal(){let e=document.getElementById("imageModal");e?e.style.display="none":console.error("Modal not found")}window.onclick=function(e){let t=document.getElementById("imageModal");e.target===t&&closeModal()},document.addEventListener("contextmenu",e=>{"IMG"===e.target.tagName&&e.preventDefault()});
// Functions on homepage
async function getNewsTicker() {
    try {
        const response=await fetch("db/newsTicker.json"),data=await response.json(),newsTicker=document.getElementById("newsTicker");newsTicker.innerHTML="";

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('newsCard');

            let mediaElement = '';

            switch (item.type) {
                case 'audio':
                    mediaElement = `<audio controls style="width: 100%;"><source src="${item.media}" type="audio/mpeg"></audio>`;
                    break;
                case 'video':
                    mediaElement = `<video controls style="width: 100%; max-height: 300px;"><source src="${item.media}" type="video/mp4"></video>`;
                    break;
                case 'image':
                    mediaElement = `<img src="${item.media}" alt="${item.title || ''}" style="width: 100%; border-radius: 8px;">`;
                    break;
                case 'document':
                    mediaElement = `<a href="${item.media}" target="_blank" class="anonymous-pro-regular" style="display:block;margin-top:10px;">📄 <span data-lang="${item.titleOne || 'document'}"></span></a>`;
                    break;
                case 'link':
                    mediaElement = `<a href="${item.media}" target="_blank" class="anonymous-pro-regular" style="display:block;margin-top:10px;"><span data-lang="${item.titleOne || 'document'}"></span></a>`;
                    break;
                case 'external':
                    mediaElement = `<iframe src="${item.media}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
                    break;
                case 'podcast':
                    mediaElement = `<iframe src="${item.media}" width="100%" height="150" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
                    break;
                default:
                    mediaElement = `<p style="color:red;">Unbekannter Medientyp: ${item.type}</p>`;
            }
            let titleElement=item.title?`<h2 class="anonymous-pro-regular" data-lang="${item.title}"></h2>`:"",descriptionElement=item.description?`<p class="anonymous-pro-regular" data-lang="${item.description}"></p>`:"",buttonElement=item.moreInfoLink?`<a href="${item.moreInfoLink}" target="_blank"><button class="moreInfoBtn anonymous-pro-regular" data-lang="moreInfo" style="margin-top:10px;"></button></a>`:"";
            card.innerHTML = `
                ${titleElement}
                ${descriptionElement}
                ${mediaElement}
                ${buttonElement}
            `;
            newsTicker.appendChild(card);
        });
        requestAnimationFrame(() => initLanguage());
    } catch (error) {
        console.error('Fehler beim Laden des NewsTickers:', error);
    }
}
let allSkills=[];async function getHomeSkills(){try{let l=await fetch("db/skillsTree.json");if(allSkills=await l.json(),0===allSkills.length)return;createInfiniteSlider()}catch(e){console.error("Error loading skills tree:",e)}}function shuffleArray(l){return l.map(l=>({value:l,sort:Math.random()})).sort((l,e)=>l.sort-e.sort).map(({value:l})=>l)}function createInfiniteSlider(){let l=document.getElementById("skillsSlider"),e=shuffleArray(allSkills);e.forEach(e=>{let t=createSkillImage(e);l.appendChild(t)}),e.forEach(e=>{let t=createSkillImage(e);l.appendChild(t)})}function createSkillImage(skill){let img=document.createElement("img");return img.src=skill.src,img.alt=skill.alt||"",img.title=skill.title||"",img.onclick=()=>eval(skill.onclick),img}
async function getHomeProjects(){try{let e=await fetch("db/projects.json"),t=await e.json();document.getElementById("projectCardContainer");let r=["projectDone","projectOpen","projectFrozen"],n=t.projects.filter(e=>!r.includes(e.status));n.sort((e,t)=>{let r=new Date(e.startdate),n=new Date(t.startdate);if(e.planneddate&&t.planneddate){let a=new Date(e.planneddate),o=new Date(t.planneddate);if(a<o)return -1;if(a>o)return 1}else{if(r<n)return -1;if(r>n)return 1}return 0}),n=n.slice(0,5),function e(t){let r=document.getElementById("projectCardContainer");r.innerHTML="",t.forEach(e=>{let t=document.createElement("div");t.classList.add("projectCard"),t.innerHTML=`
    <div class="logoImage">
        <img src="${e.logo}" alt="Not found">
        <h2 class="merriweather">${e.title}</h2><br>
    </div>
    <p><strong data-lang="projectDescription" class="anonymous-pro-regular"></strong></p><p data-lang="${e.description}" class="anonymous-pro-regular"></p><br>
    <button onclick="loadPage('projects')" data-lang="moreInfo" class="chakra-petch-light"></button>
`,r.appendChild(t)})}(n)}catch(a){console.error("Fehler beim Laden der Projekte:",a)}}
async function updateMottoMessage(){let e={de:["Solange nicht alles gut ist, liegt der Weg noch vor uns.","Jeder Tag ist eine neue Chance, etwas Gro\xdfartiges zu beginnen.","Wer aufh\xf6rt, besser zu werden, hat aufgeh\xf6rt, gut zu sein.","Visionen werden zur Realit\xe4t, wenn man den ersten Schritt wagt.","Zwischen Idee und Umsetzung liegt nur der Wille.","Dein Weg ist einzigartig – geh ihn mit \xdcberzeugung.","Gro\xdfe Dinge beginnen oft im Kleinen.","Kreativit\xe4t kennt keine Grenzen – nur Anf\xe4nge.","Komm rein und sprich dich aus, geh raus und rede nicht mehr dr\xfcber.","Gl\xfccklich ist, wer kein Gl\xfcck sucht.","Manchmal ist der Umweg der Weg.","Geduld ist nicht Schw\xe4che, sondern St\xe4rke mit Ausdauer.","Stillstand ist nur dann gef\xe4hrlich, wenn man ihn akzeptiert.","Es braucht keine Perfektion, um etwas Bedeutendes zu schaffen.","Mut beginnt dort, wo Zweifel laut werden.","Nicht jede T\xfcr f\xfchrt weiter – manche zeigen nur, wo du nicht hingeh\xf6rst.","Die besten Ideen kommen oft dann, wenn man nicht nach ihnen sucht.","Ver\xe4nderung beginnt mit einem ehrlichen Blick auf sich selbst.","Was du heute denkst, formt dein Morgen.","Tr\xe4ume gro\xdf – aber handle bodenst\xe4ndig."],en:["As long as not everything is good, the journey isn't over yet.","Every day is a new chance to start something great.","Those who stop getting better stop being good.","Visions become reality when you take the first step.","Between idea and execution lies only willpower.","Your path is unique – walk it with confidence.","Great things often start small.","Creativity knows no limits – only beginnings.","Come in and speak out, go out and stop talking about it.","Happy is he who does not seek happiness.","Sometimes the detour is the path.","Patience is not weakness, but strength with endurance.","Stagnation is only dangerous if you accept it.","You don't need perfection to create something meaningful.","Courage begins where doubt gets loud.","Not every door leads forward – some just show where you don't belong.","The best ideas often appear when you're not searching for them.","Change begins with an honest look at yourself.","What you think today shapes your tomorrow.","Dream big – but act grounded."]},n=getCookie("lang")||"en",t=e[n]||e.en,i=Math.floor(Math.random()*t.length);document.getElementById("homeMotto").innerText=t[i]}
