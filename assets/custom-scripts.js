document.addEventListener('DOMContentLoaded', function () {
    const userManual = 21228881584157;
    const signatureDesign = 21229235526045;
    const solutions = 21229242866333;
    const whatsNew = 21233569689629;
    const faq = 21233625812125;

    const mainsection = [signatureDesign, userManual];
    const subsection = [solutions];

    const exclaimerOrgId = 5631779863837;

    const thisYear = new Date().getFullYear();

    const sectionSelector = document.getElementById('categorySelector');
    const sectionSelectorMenu = document.getElementById('categorySelectorMenu');
    const promoVideoSection = document.getElementById('promoVideoSection');
    const promoVideos = document.getElementById('promoVideos');
    let userHREF = window.location.href;
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

            if(userHREF.includes(categoryID)){
                // Check for breadcrumbs
                if (breadcrumbs) {
                    let crumbs = breadcrumbs.querySelectorAll('li');
                    // Loop through all crumbs and apply the required styles.
                    for (let crumb of crumbs) {
                        if(crumb.title ===  categoryName) {
                            crumb.classList.add('breadcrumb-active')
                        }
                    }
                }
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
        let categoryDetails = [];
        for (let section of sectionData.sections) {
            let sectionDetail = { sectionName: section.name, sectionId: section.id };
            sectionDetails.push(sectionDetail);
        }
        return sectionDetails
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
        let promotedVideos = document.getElementById('promotedVideos');
        if (videoData.length > 0) {
            promotedVideos.style.display = 'block'
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
        }
    
        function renderVideos(videos, page) {
            videoLibrary.innerHTML = '';
            let filteredVideos = selectedCategory === 'All' ? videos : videos.filter(video => video.section === selectedCategory);
            let startIndex = (page - 1) * videosPerPage;
            let endIndex = startIndex + videosPerPage;
            let videosToDisplay = filteredVideos.slice(startIndex, endIndex);
    
            for (let video of videosToDisplay) {
                let videoURL = `https://support.exclaimer.com/hc/en-gb/p/video-library?=${video.hashed_id}&wvideo=${video.hashed_id}`;
                
                let videoScript = document.createElement('script');
                videoScript.setAttribute('src', `https://fast.wistia.com/embed/medias/${video.hashed_id}.jsonp`);

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
                document.getElementById('videos').appendChild(videoScript);
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
        });
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

    if(userHREF.includes('/p/raise-ticket') || userHREF.includes('/requests/new?ticket_form_id')) {
        // Get userButton
        let userButton = document.getElementById('userButton');
        if(userButton) {
            // Get the usersId
            let userId = userButton.getAttribute('aria-userid');
            // Assign the usersId to the api url
            const userAPI = `/api/v2/users/${userId}.json`;
            
            // Get the user
            async function getUserOrg(userAPI){
                try {
                    const response = await fetch(userAPI);
                    const userData = await response.json();
                    if (response.ok) {
                        // Assign user org id to userOrg
                        let userOrgId = userData.user.organization_id;
                        orgType(userOrgId);
                    } else {
                        console.error('Error: Cannot get locale data');
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }

            // Get the Organization Type
            async function orgType(userOrgId) {
                const orgAPI = `/api/v2/organizations/${userOrgId}.json`;
                try {
                    const response = await fetch(orgAPI);
                    const orgData = await response.json();
                    if (response.ok) {
                        // Assign the Organizaton type to orgType
                        let orgType = orgData.organization.organization_fields.type;
                        showOptions(orgType, userOrgId);
                    } else {
                        console.error('Error: Cannot get locale data');
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }

            // Display the options on the page.
            async function showOptions(orgType, userOrgId) {
                const regex = /\/hc\/[^\/]+\//;
                let userLocale = userHREF.match(regex);
                let formSelector = document.getElementById('formSelector');
                // Check to see if the Organization Type matches the requirements
                // if(orgType === 'distributor') {
                //     formSelector.innerHTML += `<a 
                //     id="distButton"
                //     href="${userLocale}requests/new?ticket_form_id=20902492837917" 
                //     class="
                //     form-selector-btn${userHREF.includes('/requests/new?ticket_form_id') ? ' form-selector-btn-smaller' : ''}
                //     ${userHREF.includes('20902492837917') ? ' active' : ''}" 
                //     aria-label="dist">Distributor</a>`
                // }
                // Check to see if the users Orgnaization ID matches that of Exclaimers.
                // if(userOrgId === exclaimerOrgId) {
                //     formSelector.innerHTML += `<a 
                //     id="templateButton"
                //     href="${userLocale}requests/new?ticket_form_id=4621666399901"
                //     class="
                //     form-selector-btn${userHREF.includes('/requests/new?ticket_form_id') ? ' form-selector-btn-smaller' : ''}
                //     ${userHREF.includes('4621666399901') ? ' active' : ''}" 
                //     aria-label="internal">Template Services</a>`;
                // }
            }
            getUserOrg(userAPI);
        }
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    checkAndSetActiveButton();
                }
            }
        });
        
        // Observe the formSelector for changes (e.g., children added)
        observer.observe(document.getElementById('formSelector'), { childList: true });
        
        function checkAndSetActiveButton() {
            if (userHREF.includes('/requests/new?ticket_form_id=')) {
                let formTitle = document.getElementById('formTitle');
                if (userHREF.includes('4459467190557')) {
                    document.getElementById('technicalButton').classList.add('active');
                    formTitle.innerHTML = 'Technical Support';
                } else if (userHREF.includes('19833428118557')) {
                    document.getElementById('accountButton').classList.add('active');
                    formTitle.innerHTML = 'Account Services';
                } else if (userHREF.includes('20902492837917')) {
                    document.getElementById('distributorButton').classList.add('active');
                    formTitle.innerHTML = 'Distributor';
                } else if (userHREF.includes('4621666399901')) {
                    document.getElementById('templateButton').classList.add('active');
                    formTitle.innerHTML = 'Template Services';
                }
            }
        }
        
        // Initially run the function in case the elements are already in the DOM
        checkAndSetActiveButton();


        // Turn off translations for these pages:
        // --- CC Label
        if(userButton) {
            let ccLabel = document.querySelector('.request_cc_emails');
            ccLabel.querySelector('.optional').innerHTML = '(optional)';
            document.querySelector('#request_collaborators_').placeholder = 'Add email addresses'
        } else {
            document.querySelector('label[for="request_anonymous_requester_email"]').innerHTML = 'Your email address';
        }
        // --- Subject Label
        document.querySelector('#request_subject_label').innerHTML = 'Subject';
        // --- Description Label
        document.querySelector('#request_description_label').innerHTML = 'Description';
        // --- Attachments Label
        document.querySelector('label[for="request-attachments"]').innerHTML = 'Attachments<span class="optional">(optional)</span>';
        // --- Drop Zone
        let dropzone = document.querySelector('#upload-dropzone');
        dropzone.querySelector('span').innerHTML = '<a>Add file</a> or drop files here';
        // --- Submit Button
        let form = document.querySelector('#new_request');
        let formFooter = form.querySelector('footer');
        formFooter.querySelector('input').value = 'Submit';
        formFooter.querySelector('input').innerHTML = 'Submit';
    
    }

    // Whats New Redirect
    if(userHREF.includes('21229720266013')){
        const regex = /\/hc\/[^\/]+\//;
        let userLocale = userHREF.match(regex);
        window.location.href = `${userLocale}sections/21233569689629`;
    }

    // FAQ Redirect
    if(userHREF.includes('21229748766621')){
        const regex = /\/hc\/[^\/]+\//;
        let userLocale = userHREF.match(regex);
        window.location.href = `${userLocale}sections/21233625812125`;
    }

    // Form redirect
    if(userHREF.includes('/requests/new') && !userHREF.includes('?ticket_form_id')){
        const regex = /\/hc\/[^\/]+\//;
        let userLocale = userHREF.match(regex);
        window.location.href = `${userLocale}p/raise-ticket`;
    }

    // Check for SUB Id then add text below to direct to specific article.
    if(window.location.href.includes('/requests/new?ticket_form_id=')) {
        function checkForSubID(){
            const formSubID = 360014356197;
            const subId = document.querySelector(`.request_custom_fields_${formSubID}`);
            subId.innerHTML += '<span class="subid-subtext">To obtain your Sub ID, follow the steps  <a href="../articles/360018307337" target="_blank">here</a></span>';
        }
        checkForSubID();
    }

    // Whats new Page
    const getDates = document.getElementById('whatsNewDates');
    if(getDates) {
        let dates = getDates.getElementsByTagName('a');
        for(let date of dates) {
            if(userHREF.includes(`-${date.title}`)) {
                date.classList.add('active');
            }
        }
    }
});
