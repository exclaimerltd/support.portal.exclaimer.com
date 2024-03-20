document.addEventListener('DOMContentLoaded', function () {
    const gettingStarted = 16131806820765;
    const signatureDesign = 16131785917981;
    const userManual = 16131775614493;
    const faq = 14256646698525;
    relevantIds = [gettingStarted, signatureDesign, userManual, faq];

    const categorySelector = document.getElementById('categorySelector');
    const categorySelectorMenu = document.getElementById('categorySelectorMenu');
    const promoVideoSection = document.getElementById('promoVideoSection');
    const promoVideos = document.getElementById('promoVideos');
    const userHREF = window.location.href;
    const localeAPI = '/api/v2/locales';

    // Get Locales to check which language the user is viewing the HC in.
    async function getLocale(localeURL) {
        try {
            const response = await fetch(localeURL);
            const localeData = await response.json();
            if(response.ok) {
                locales(localeData);
            } else {
                console.error('Error: Cannot get locale data');
            }
        } catch {
            console.error('Error: ', error.message);
        }
    }
    getLocale(localeAPI);

    // Get Sections based on the users LocaleAPI call.
    async function getSections(sectionURL) {
        try {
            const response = await fetch(sectionURL);
            const sectionData = await response.json();
            if(response.ok) {
                sections(sectionData);
            } else {
                console.error('Error: Cannot get locale data');
            }
        } catch {
            console.error('Error: ', error.message);
        }
    }

    // Show the data from Locale API, then create a variable to check against later.
    async function locales(localeData) {
        const locales = localeData.locales;
        for(let i = 0; i < locales.length; i++) {
            const locale = locales[i].locale;
            const localeHREF = `/hc/${locale}`;
            if(userHREF.includes(localeHREF)) {
                // Assign the locale to the sections API URL.
                const sectionsAPI = `/api/v2/help_center/${locale}/sections.json`;
                getSections(sectionsAPI);
            }
        }
    }

    // 
    async function getVideos(wistiaApi) {
        try {
            const wistiaAPIKey = "b37b20eee833f6ff6b9eab66b17bf05e6044535d7510cb4e997dd510d845f929";
            const response = await fetch(wistiaApi, { headers: { Authorization: `Bearer ${wistiaAPIKey}` } });
            const videoData = await response.json();
            if (response.ok) showVideos(videoData);
            else console.error('Error fetching API data');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function sections(sectionData) {
        const sections = sectionData.sections;
        let sectionNames = [];

        for(let j = 0; j < sections.length; j++) {
            const section = sections[j];
            const sectionId = section.id;
            const sectionName = section.name;

            // Assign section.name to the sectionNames array ready for use later.
            sectionNames.push({ id: sectionId, name: sectionName});

            // Check to see if the section name matches the list, if so add it as a seperate button. Else. Add it to the drop down.
            if(relevantIds.includes(sectionId)) {
                categorySelector.innerHTML += `<a id="${sectionId}" href="${section.html_url}" class="category-btn">${section.name}</a>`;
            } else {
                categorySelectorMenu.innerHTML += `<a id="${sectionId}" href="${section.html_url}" class="" role="menuitem">${section.name}</a>`;
            }
            // Check to see if the user is on a particular section, if show change the button state.
            if(userHREF.includes(sectionId)) {
                const categorySelectBtn = document.getElementById(`${sectionId}`);
                categorySelectBtn.classList.toggle('active');
                if(![gettingStarted, signatureDesign, userManual, faq].includes(sectionId)) {
                    moreBtn.innerHTML = section.name;
                    moreBtn.classList.toggle('active');
                }
            }
        }
        wistiaUrl(sectionNames);
    }

    async function wistiaUrl(sectionNames) {
        const projectID = "veamapxp3x";
        const promoVideos = document.querySelector('#promoVideoSection');
        let sectionMatch = false;
        let wistiaAPI = `https://api.wistia.com/v1/medias?project_id=${projectID}&tags=kbpromoted`

        for(let j = 0; j < sectionNames.length; j++) {
            // Checking to see if users HREF contains the section ID
            if(userHREF.includes(sectionNames[j].id)) {
                const sectionName = sectionNames[j].name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                // Checking to see if #promoVideos is available in the DOM. if it is, we will display the required code.
                if(promoVideos){
                    wistiaAPI += `&tags=kb${sectionName}`;
                    getVideos(wistiaAPI);
                }

                // Set sectionMatch to true, to stop the code from running, break below.
                sectionMatch = true; 
                break;
            }
        }

        // If the sectionMatch remains false, this means that the user is not on a section that matches, so we will try to display the "PromotedVideos"
        if (!sectionMatch) {
            // Checking to see if #promoVideos is available in the DOM. if it is, we will display the required code.
            if(promoVideos){
                getVideos(wistiaAPI);
            }
        }
    }

    async function showVideos(videoData) {

        if(videoData.length > 0) {
            const promoTitle = document.createElement("h2");
            promoTitle.innerHTML = "Promoted Videos";
            promoVideoSection.insertBefore(promoTitle, promoVideos);
            for (let k = 0; k < videoData.length; k++){
                video = videoData[k];
                const videosURL = `https://support.exclaimer.com/hc/en-gb/p/video-library?=${video.hashed_id}&wvideo=${video.hashed_id}`;
                promoVideos.innerHTML += `
                    <a href="${videosURL}" target="_blank" class="video-link">
                        <div class="item video-container">
                            <div class="video">
                                <img src="${video.thumbnail.url.split("?")[0]}">
                            </div>
                            <span class="play-btn"></span>
                        </div>
                    </a>
                `;
            }
            initOwlCarousel(videoData);
        } else {
            console.log('Whoops! We have no videos to display');
        }
    }

    function initOwlCarousel(videoData) {
        const numberOfVideos = Math.min(videoData.length, 3);
        const autoPlayEnabled = numberOfVideos > 3;
        $('.owl-carousel').owlCarousel({
            items: 3,
            loop: true,
            autoplay: autoPlayEnabled,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            dots: true,
            nav: true,
            center: true,
            slideBy: 3
        });
  
        document.querySelector('[aria-label="Previous"]').innerHTML = '';
        document.querySelector('[aria-label="Next"]').innerHTML = '';
    }
});
