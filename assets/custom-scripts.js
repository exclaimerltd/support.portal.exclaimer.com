window.addEventListener('DOMContentLoaded', function () {
    const userManual = 20847594125597;
    const signatureDesign = 20847627249437;
    const solutions = 20847671135773;
    const whatsNew = 20876500035485;
    const faq = 20847774218397;

    const mainsection = [signatureDesign, userManual];
    const subsection = [solutions];

    const thisYear = new Date().getFullYear();

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
            if (response.ok) {
                if(userHREF.includes('/p/videos')) {
                    videoLibrary(videoData);
                } else {
                    showVideos(videoData); 
                }
            }
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
            } else if (userHREF.includes(`/sections/${faq}`)) {
                const moreBtn = document.getElementById('moreBtn');
                moreBtn.classList.add('active');
                moreBtn.innerHTML = 'FAQ';
            } else if (userHREF.includes(`/sections/${whatsNew}`)) {
                const moreBtn = document.getElementById('moreBtn');
                moreBtn.classList.add('active');
                moreBtn.innerHTML = "What's New";
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

    async function wistiaUrl(categoryNames) {
        const projectID = "veamapxp3x";
        let sectionMatch = false;
        let wistiaAPI;
        let promoVideos;
        
        if(userHREF.includes('/p/videos')) {
            wistiaAPI = `https://api.wistia.com/v1/projects/${projectID}`;
            getVideos(wistiaAPI);
        } else {
            promoVideos = document.querySelector('#promoVideoSection');
            wistiaAPI = `https://api.wistia.com/v1/medias?project_id=${projectID}&tags=kbpromoted`
        }

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

    // Video Library
    async function videoLibrary(videoData) {
        const videoLibrary = document.getElementById('videoLibrary');
        const videoCategories = document.getElementById('videoCategories');
        const paginationControls = document.getElementById('paginationControls');
    
        const videosPerPage = 9;
        let currentPage = 1;
        let selectedCategory = 'All';
    
        let sections = Object.groupBy(videoData.medias, x => x.section);
        let videos = videoData.medias;

        function encodeForOnclick(str) {
            return str.replace(/&/g, '&amp;');
        }
    
        // Populate video categories
        videoCategories.innerHTML = '<li title="All" class="video-categories-item"><button onclick="changeCategory(\'All\')">All Videos</button></li>';
        for (let section of Object.keys(sections)) {
            let encodedSection = encodeForOnclick(section);
            videoCategories.innerHTML += `<li title="${section}" class="video-categories-item"><button onclick="changeCategory('${encodedSection}')">${section}</button></li>`;
            console.log(section)
        }
    
        function renderVideos(videos, page) {
            videoLibrary.innerHTML = '';
            let filteredVideos = selectedCategory === 'All' ? videos : videos.filter(video => video.section === selectedCategory);
            let startIndex = (page - 1) * videosPerPage;
            let endIndex = startIndex + videosPerPage;
            let videosToDisplay = filteredVideos.slice(startIndex, endIndex);
    
            for (let video of videosToDisplay) {
                let videoURL = `https://support.exclaimer.com/hc/en-gb/p/video-library?=${video.hashed_id}&wvideo=${video.hashed_id}`;
                let videoSection = video && video.section ? video.section.replace(/\s+/g, '-').toLowerCase() : 'default';
                videoLibrary.innerHTML += `
                <div class="video videos-${videoSection} video-show">
                      <div class="wistia_responsive_padding" style="padding: 56.25% 0 0 0; position: relative;">
                          <div class="wistia_responsive_wrapper" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;">
                              <span class="wistia_embed wistia_async_${video.hashed_id} popover=true videoFoam=true" style="display: inline-block; height: 100%; position: relative; width: 100%;">&nbsp;</span>
                          </div>
                      </div>
                      <div class="video-meta">
                          <p>${video.name}</p>
                          <button name="copyURLButton" onclick="copyURL(this, '${videoURL}')" class="btn-copy">Copy URL</button>
                      </div>
                      <div class="pin pin-promoted" aria-promoted="false">Promoted</div>
                  </div>
                `;
            }
    
            // Update pagination based on filtered videos
            let totalPages = Math.ceil(filteredVideos.length / videosPerPage);
            renderPaginationControls(totalPages, currentPage);
        }
    
        function renderPaginationControls(totalPages, currentPage) {
            paginationControls.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                paginationControls.innerHTML += `<button class="pagination-button ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
        }
    
        // Define changePage in the global scope
        window.changePage = function(page) {
            currentPage = page;
            renderVideos(videos, currentPage);
        }
    
        // Define changeCategory in the global scope
        window.changeCategory = function(category) {
            selectedCategory = category;
            currentPage = 1; // Reset to the first page when category changes
            renderVideos(videos, currentPage);
        }
    
        renderVideos(videos, currentPage);
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
    
    if(userHREF.indexOf('/p/getting-started') > 0){
        const loader = document.getElementById('loader');
        document.getElementById('ston-e37mX3j3pG').onload = function() {
            loader.classList.remove('active');
        }
    }

    // FAQ Changes

    // Remove "Frequently Asked Questions" section from breadcrumb trail.
    if(breadcrumbs) {
        let crumbs = breadcrumbs.getElementsByTagName('li');
        for(let crumb of crumbs) {
            if(crumb.title === "Frequently Asked Questions") {
                crumb.style.display = 'none'
            }
            if(crumb.title === "whatsnew") {
                crumb.style.display = 'none'
            }
        }
    }

    // Remove the (FAQ) tag from all articles within a section
    if(userHREF.indexOf(`/sections/${faq}`)) {
        const articleTitle = document.querySelectorAll('.article-list-item-link');
        articleTitle.forEach(article => {
            article.textContent = article.textContent.replace(' (FAQ)', '');
            article.title = article.title.replace(' (FAQ)', '')
        })
    }

    // Remove the (FAQ) tag from all articles within an article
    if(userHREF.indexOf('/articles/') && userHREF.includes('FAQ')){
        const faqTitle = document.getElementsByTagName('h1')[0];
        faqTitle.innerHTML = faqTitle.innerHTML.replace(' (FAQ)', '')
        if(userHREF.includes(faqTitle.id)){
            const articles = document.getElementsByTagName('li');
            for(let article of articles) {
                if(article.id === faqTitle.id) {
                    article.classList.add('active');
                }
            }
        }
    }

    // Date checker for the Whats New Section.
    // if(userHREF.indexOf('20876500035485')) {
    //     let dates = document.querySelectorAll('[aria-label="Date"]');
    //     dates.forEach(date => {
    //         let anchors = date.getElementsByTagName('a');
    //         for (let anchor of anchors) {
    //             let year = parseInt(anchor.title, 10); // Convert title to a number
    //             if (year === thisYear) {
    //                 anchor.classList.add('active')
    //             }
    //         }
    //     });
    // }

    if(userHREF.includes('/requests/new')) {
        const usersAPI = '/api/v2/organizations/20830359422621/users.json?page[size]=100';
        async function fetchUsers(apiUrl) {
            const allUsers = []; // Initialize an empty array to hold all users

            try {
                let nextUrl = apiUrl;

                while (nextUrl) {
                    let response = await fetch(nextUrl);
                    let usersData = await response.json();

                    if (response.ok) {
                        // Accumulate users from the current page into allUsers
                        allUsers.push(...usersData.users);

                        // Determine the URL for the next page, if available
                        nextUrl = usersData.meta && usersData.meta.has_more
                            ? usersData.links && usersData.links.next
                            : null;
                    } else {
                        console.error('Error fetching data:', response.status, response.statusText);
                        nextUrl = null; // Stop fetching on error
                    }
                }

                // Process all accumulated users after fetching all pages
                processUsers(allUsers);

            } catch (error) {
                console.error('Error:', error.message);
            }
        }

        function processUsers(usersData) {
            let users = usersData;
            console.log(`We currently have ${users.length} users`)
            for(let user of users){
                const usersId = document.getElementById(user.id);
                if(usersId) {
                    usersId.innerHTML = "I did it!"
                }
            }
        }

        fetchUsers(usersAPI);
    }


});
