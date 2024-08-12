window.addEventListener('DOMContentLoaded', function () {
    const userManual = 19833048021661;
    const gettingStarted = 19833038595229;
    const signatureDesign = 19833370899485;
    const faq = 19833343268637;
    const whatsNew = 19833372166941;
    const solutions = 19833368940189;

    const mainsection = [signatureDesign, userManual];
    const subsection = [whatsNew, solutions];

    const sectionSelector = document.getElementById('categorySelector');
    const sectionSelectorMenu = document.getElementById('categorySelectorMenu');
    const promoVideoSection = document.getElementById('promoVideoSection');
    const promoVideos = document.getElementById('promoVideos');
    const userHREF = window.location.href;
    const localeAPI = '/api/v2/locales';
    let breadcrumbs = document.querySelector('.breadcrumbs');

    // Get videos
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

    // Get Locales to check which language the user is viewing the HC in.
    async function getLocale(localeURL) {
        try {
            const response = await fetch(localeURL);
            const localeData = await response.json();
            if (response.ok) {
                processLocales(localeData);
            } else {
                console.error('Error: Cannot get locale data');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    getLocale(localeAPI);

    // Fetch categories based on the user's locale.
    async function fetchCategories(categoryURL) {
        try {
            const response = await fetch(categoryURL);
            const categoryData = await response.json();

            if (response.ok) {
                categories(categoryData);
            } else {
                console.error('Error: Cannot get locale data');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    // Fetch sections based on the user's locale.
    async function fetchSections(sectionURL) {
        try {
            const response = await fetch(sectionURL);
            const sectionData = await response.json();

            if (response.ok) {
                const sectionDetails = await sections(sectionData);
                const articleAPI = `/api/v2/help_center/${getLocaleFromURL()}/articles.json`;
                fetchArticles(articleAPI, sectionDetails);
            } else {
                console.error('Error: Cannot get section data');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    // Fetch articles based on the user's locale.
    async function fetchArticles(articleURL, sectionDetails) {
        try {
            const response = await fetch(articleURL);
            const articleData = await response.json();

            if (response.ok) {
                articles(articleData, sectionDetails);
            } else {
                console.error('Error: Cannot get article data');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    async function processLocales(localeData) {
        const { locales } = localeData;
    
        locales.forEach(({ locale }) => {
            const localeHREF = `/hc/${locale}`;
    
            if (userHREF.includes(localeHREF)) {
                // Construct the categories API URL for the locale. And then fetch them
                const categoryAPI = `/api/v2/help_center/${locale}/categories.json`;
                fetchCategories(categoryAPI);

                // Construct the sections API URL for the locale. And then fetch them
                const sectionAPI = `/api/v2/help_center/${locale}/sections.json`;
                fetchSections(sectionAPI);
            }
        });
    }

    // Categories Work
    async function categories(categoryData) {
        const categories = categoryData.categories;
        let categoryNames = [];
        for (let c = 0; c < categories.length; c++) {
            const category = categories[c];
            const categoryID = category.id;
            const categoryName = category.name;
            const sectionURL = category.html_url;

            categoryNames.push({ id: categoryID, name: categoryName });

            if (mainsection.includes(categoryID)) {
                sectionSelector.innerHTML += `<a id="${categoryID}" href="${sectionURL}" class="category-btn">${categoryName}</a>`;
            } else if (subsection.includes(categoryID)) {
                sectionSelectorMenu.innerHTML += `<a id="${categoryID}" href="${sectionURL}" class="" role="menuitem">${categoryName}</a>`;
            }

            // Check to see if the user is on a particular section, if so change the button state.
            if (userHREF.includes(categoryID) && mainsection.includes(categoryID)) {
                const sectionSelectBtn = document.getElementById(`${categoryID}`);
                sectionSelectBtn.classList.toggle('active');
            } else if (userHREF.includes('/p/videos')) {
                const videoSelectBtn = document.getElementById('videoSection');
                videoSelectBtn.classList.add('active');
            } else if (userHREF.includes('/p/getting-started')) {
                const gettingStartedBtn = document.getElementById('gettingStarted');
                gettingStartedBtn.classList.add('active');
            } else if (userHREF.includes(categoryID) && subsection.includes(categoryID)) {
                const moreBtn = document.getElementById('moreBtn');
                moreBtn.classList.toggle('active');
                moreBtn.innerHTML = categoryName;
            }
        }
        wistiaUrl(categoryNames);
    }
    
    async function sections(sectionData) {
        let sectionDetails = [];
        for (let section of sectionData.sections) {
            let detail = { sectionName: section.name, sectionId: section.id };
            sectionDetails.push(detail);
        }
        return sectionDetails;
    }

    async function articles(articleData, sectionDetails) {
        // Loop through all details within sectionDetails
        for(let details of sectionDetails){
            // Loop through all articles in articleData
            for(let article of articleData.articles){
                // Checking to see if the userHREF matches the sectionId
                if(userHREF.includes(details.sectionId) || article.section_id === details.sectionId){
                    // Check for breadcrumbs
                    if (breadcrumbs) {
                        let crumbs = breadcrumbs.querySelectorAll('li');
                        let sectionName = details.sectionName;
                        // Loop through all crumbs and apply the required styles.
                        for (let crumb of crumbs) {
                            if(crumb.title === sectionName) {
                                crumb.classList.add('breadcrumb-active')
                            }
                        }
                    }
                }
            }
        }
    }

    if(breadcrumbs) {
        let crumbs = breadcrumbs.getElementsByTagName('li');
        for(let crumb of crumbs) {
            if(crumb.title === "Frequently Asked Questions") {
                crumb.style.display = 'none'
            }
        }
    }

    async function wistiaUrl(categoryNames) {
        const projectID = "veamapxp3x";
        const promoVideos = document.querySelector('#promoVideoSection');
        let sectionMatch = false;
        let wistiaAPI = `https://api.wistia.com/v1/medias?project_id=${projectID}&tags=kbpromoted`
        for (let j = 0; j < categoryNames.length; j++) {
            // Checking to see if users HREF contains the section ID
            if (userHREF.includes(categoryNames[j].id.toString())) {
                const categoryName = categoryNames[j].name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                // Checking to see if #promoVideos is available in the DOM. if it is, we will display the required code.
                if (promoVideos) {
                    wistiaAPI += `&tags=kb${categoryName}`;
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
            if (promoVideos) {
                getVideos(wistiaAPI);
            }
        }
    }

    async function showVideos(videoData) {
        if (videoData.length > 0) {
            const promoTitle = document.createElement("h2");
            promoTitle.innerHTML = "Promoted Videos";
            promoVideoSection.insertBefore(promoTitle, promoVideos);
            for (let k = 0; k < videoData.length; k++) {
                const video = videoData[k];
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
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            dots: false,
            nav: true,
            center: true,
            slideBy: 3,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    center: true,
                    dots: true
                },
                600: {
                    items: 3
                }
            }
        });
        document.querySelector('[aria-label="Next"]').innerHTML = '';
        document.querySelector('[aria-label="Previous"]').innerHTML = '';
    }

    function getLocaleFromURL() {
        const urlSegments = userHREF.split('/');
        return urlSegments[urlSegments.indexOf('hc') + 1];
    }


    // Accordians
    var accordions = document.querySelectorAll(".article-accordion");

    accordions.forEach(function(accordion) {
        accordion.addEventListener("click", function() {
            // Toggle active class for styling
            this.classList.toggle("active");``

            // Toggle the display property of the panel with transition
            var panel = this.nextElementSibling;
            var panelPadding = 18;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.paddingTop = "0";
                panel.style.paddingBottom = "0";
            } else {
                panel.style.maxHeight = panel.scrollHeight + 18 + "px";
                panel.style.paddingTop = panelPadding + "px";
                panel.style.paddingBottom = panelPadding + "px";
            }
        });
    });

    var faqAccordions = document.querySelectorAll(".section-question-title");

    faqAccordions.forEach(function(faqAccordion) {
        faqAccordion.addEventListener("click", function() {
            // Toggle active class for styling
            this.classList.toggle("active");``

            // Toggle the display property of the panel with transition
            var panel = this.nextElementSibling;
            var panelPadding = 18;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.paddingTop = "0";
                panel.style.paddingBottom = "0";
            } else {
                panel.style.maxHeight = panel.scrollHeight + panelPadding + panelPadding + "px";
                panel.style.paddingTop = panelPadding + "px";
                panel.style.paddingBottom = panelPadding + "px";
            }
        });
    });
    
    if(window.location.href.indexOf('/p/getting-started') > 0){
        const loader = document.getElementById('loader');
        document.getElementById('ston-e37mX3j3pG').onload = function() {
            loader.classList.remove('active');
        }
    }

    if(window.location.href.indexOf('/sections/20747472485789')) {
        const articleTitle = document.querySelectorAll('.article-list-item-link');
        articleTitle.forEach(article => {
            article.textContent = article.textContent.replace(' (FAQ)', '');
            article.title = article.title.replace(' (FAQ)', '')
        })
    }

});
