// Vanilla JS debounce function, by Josh W. Comeau:
// https://www.joshwcomeau.com/snippets/javascript/debounce/
function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// Define variables for search field
let searchFormFilledClassName = "search-has-value";
let searchFormSelector = "form[role='search']";

// Clear the search input, and then return focus to it
function clearSearchInput(event) {
  event.target.closest(searchFormSelector).classList.remove(searchFormFilledClassName);
  
  let input;
  if (event.target.tagName === "INPUT") {
    input = event.target;
  } else if (event.target.tagName === "BUTTON") {
    input = event.target.previousElementSibling;
  } else {
    input = event.target.closest("button").previousElementSibling;
  }
  input.value = "";
  input.focus();
}

// Have the search input and clear button respond 
// when someone presses the escape key, per:
// https://twitter.com/adambsilver/status/1152452833234554880
function clearSearchInputOnKeypress(event) {
  const searchInputDeleteKeys = ["Delete", "Escape"];
  if (searchInputDeleteKeys.includes(event.key)) {
    clearSearchInput(event);
  }
}

// Create an HTML button that all users -- especially keyboard users -- 
// can interact with, to clear the search input.
// To learn more about this, see:
// https://adrianroselli.com/2019/07/ignore-typesearch.html#Delete 
// https://www.scottohara.me/blog/2022/02/19/custom-clear-buttons.html
function buildClearSearchButton(inputId) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("aria-controls", inputId);
  button.classList.add("clear-button");
  const buttonLabel = window.searchClearButtonLabelLocalized;
  const icon = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' focusable='false' role='img' viewBox='0 0 12 12' aria-label='${buttonLabel}'><path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M3 9l6-6m0 6L3 3'/></svg>`;
  button.innerHTML = icon;
  button.addEventListener("click", clearSearchInput);
  button.addEventListener("keyup", clearSearchInputOnKeypress);
  return button;
}

// Append the clear button to the search form
function appendClearSearchButton(input, form) {
  searchClearButton = buildClearSearchButton(input.id);
  form.append(searchClearButton);
  if (input.value.length > 0) {
    form.classList.add(searchFormFilledClassName);
  }
}

// Add a class to the search form when the input has a value;
// Remove that class from the search form when the input doesn't have a value.
// Do this on a delay, rather than on every keystroke. 
const toggleClearSearchButtonAvailability = debounce(function(event) {
  const form = event.target.closest(searchFormSelector);
  form.classList.toggle(searchFormFilledClassName, event.target.value.length > 0);
}, 200)

document.addEventListener('DOMContentLoaded', function() {
  // Key map
  var ENTER = 13;
  var ESCAPE = 27;
  var SPACE = 32;
  var UP = 38;
  var DOWN = 40;
  var TAB = 9;

  function closest (element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (Element.prototype.matches && element.matches(selector)
        || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
        || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
        return element;
      }
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }

  // Set up clear functionality for the search field
  const searchForms = [...document.querySelectorAll(searchFormSelector)];
  const searchInputs = searchForms.map(form => form.querySelector("input[type='search']"));
  searchInputs.forEach((input) => {
    appendClearSearchButton(input, input.closest(searchFormSelector));
    input.addEventListener("keyup", clearSearchInputOnKeypress);
    input.addEventListener("keyup", toggleClearSearchButtonAvailability);
  });

  // social share popups
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  // In some cases we should preserve focus after page reload
  function saveFocus() {
    var activeElementId = document.activeElement.getAttribute("id");
    sessionStorage.setItem('returnFocusTo', '#' + activeElementId);
  }
  var returnFocusTo = sessionStorage.getItem('returnFocusTo');
  if (returnFocusTo) {
    sessionStorage.removeItem('returnFocusTo');
    var returnFocusToEl = document.querySelector(returnFocusTo);
    returnFocusToEl && returnFocusToEl.focus && returnFocusToEl.focus();
  }

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var commentContainerTextarea = document.querySelector('.comment-container textarea'),
    commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });

    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  // Expand Request comment form when Add to conversation is clicked
  var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
    requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
    requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function() {
      showRequestCommentContainerTrigger.style.display = 'none';
      Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
      requestCommentSubmit.style.display = 'inline-block';

      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  // Mark as solved button
  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
    requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
    requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function() {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      // Element.closest is not supported in IE11
      closest(this, 'form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  var usesWysiwyg = requestCommentTextarea && requestCommentTextarea.dataset.helper === "wysiwyg";

  function isEmptyPlaintext(s) {
    return s.trim() === '';
  }

  function isEmptyHtml(xml) {
    var doc = new DOMParser().parseFromString(`<_>${xml}</_>`, "text/xml");
    var img = doc.querySelector("img");
    return img === null && isEmptyPlaintext(doc.children[0].textContent);
  }

  var isEmpty = usesWysiwyg ? isEmptyHtml : isEmptyPlaintext;

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function() {
      if (isEmpty(requestCommentTextarea.value)) {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  // Disable submit button if textarea is empty
  if (requestCommentTextarea && isEmpty(requestCommentTextarea.value)) {
    requestCommentSubmitButton.disabled = true;
  }

  // Submit requests filter form on status or organization change in the request list page
  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function(e) {
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    });
  });

  // Submit requests filter form on search in the request list page
  var quickSearch = document.querySelector('#quick-search');
  quickSearch && quickSearch.addEventListener('keyup', function(e) {
    if (e.keyCode === ENTER) {
      e.stopPropagation();
      saveFocus();
      closest(this, 'form').submit();
    }
  });

  function toggleNavigation(toggle, menu) {
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggle.setAttribute('aria-expanded', !isExpanded);
  }

  function closeNavigation(toggle, menu) {
    menu.setAttribute('aria-expanded', false);
    toggle.setAttribute('aria-expanded', false);
    toggle.focus();
  }

  var menuButton = document.querySelector('.header .menu-button-mobile');
  var menuList = document.querySelector('#user-nav-mobile');

  menuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this, menuList);
  });


  menuList.addEventListener('keyup', function(e) {
    if (e.keyCode === ESCAPE) {
      e.stopPropagation();
      closeNavigation(menuButton, this);
    }
  });

  // Toggles expanded aria to collapsible elements
  var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

  Array.prototype.forEach.call(collapsible, function(el) {
    var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

    el.addEventListener('click', function(e) {
      toggleNavigation(toggle, this);
    });

    el.addEventListener('keyup', function(e) {
      if (e.keyCode === ESCAPE) {
        closeNavigation(toggle, this);
      }
    });
  });

  // Submit organization form in the request page
  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  // If multibrand search has more than 5 help centers or categories collapse the list
  var multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
  Array.prototype.forEach.call(multibrandFilterLists, function(filter) {
    if (filter.children.length > 6) {
      // Display the show more button
      var trigger = filter.querySelector(".see-all-filters");
      trigger.setAttribute("aria-hidden", false);

      // Add event handler for click
      trigger.addEventListener("click", function(e) {
        e.stopPropagation();
        trigger.parentNode.removeChild(trigger);
        filter.classList.remove("multibrand-filter-list--collapsed")
      })
    }
  });

  // If there are any error notifications below an input field, focus that field
  var notificationElm = document.querySelector(".notification-error");
  if (
    notificationElm &&
    notificationElm.previousElementSibling &&
    typeof notificationElm.previousElementSibling.focus === "function"
  ) {
    notificationElm.previousElementSibling.focus();
  }

  // Dropdowns
  
  function Dropdown(toggle, menu) {
    this.toggle = toggle;
    this.menu = menu;

    this.menuPlacement = {
      top: menu.classList.contains("dropdown-menu-top"),
      end: menu.classList.contains("dropdown-menu-end")
    };

    this.toggle.addEventListener("click", this.clickHandler.bind(this));
    this.toggle.addEventListener("keydown", this.toggleKeyHandler.bind(this));
    this.menu.addEventListener("keydown", this.menuKeyHandler.bind(this));
  }

  Dropdown.prototype = {

    get isExpanded() {
      return this.menu.getAttribute("aria-expanded") === "true";
    },

    get menuItems() {
      return Array.prototype.slice.call(this.menu.querySelectorAll("[role='menuitem']"));
    },

    dismiss: function() {
      if (!this.isExpanded) return;

      this.menu.setAttribute("aria-expanded", false);
      this.menu.classList.remove("dropdown-menu-end", "dropdown-menu-top");
    },

    open: function() {
      if (this.isExpanded) return;

      this.menu.setAttribute("aria-expanded", true);
      this.handleOverflow();
    },

    handleOverflow: function() {
      var rect = this.menu.getBoundingClientRect();

      var overflow = {
        right: rect.left < 0 || rect.left + rect.width > window.innerWidth,
        bottom: rect.top < 0 || rect.top + rect.height > window.innerHeight
      };

      if (overflow.right || this.menuPlacement.end) {
        this.menu.classList.add("dropdown-menu-end");
      }

      if (overflow.bottom || this.menuPlacement.top) {
        this.menu.classList.add("dropdown-menu-top");
      }

      if (this.menu.getBoundingClientRect().top < 0) {
        this.menu.classList.remove("dropdown-menu-top")
      }
    },

    focusNextMenuItem: function(currentItem) {
      if (!this.menuItems.length) return;

      var currentIndex = this.menuItems.indexOf(currentItem);
      var nextIndex = currentIndex === this.menuItems.length - 1 || currentIndex < 0 ? 0 : currentIndex + 1;

      this.menuItems[nextIndex].focus();
    },

    focusPreviousMenuItem: function(currentItem) {
      if (!this.menuItems.length) return;

      var currentIndex = this.menuItems.indexOf(currentItem);
      var previousIndex = currentIndex <= 0 ? this.menuItems.length - 1 : currentIndex - 1;

      this.menuItems[previousIndex].focus();
    },

    clickHandler: function() {
      if (this.isExpanded) {
        this.dismiss();
      } else {
        this.open();
      }
    },

    toggleKeyHandler: function(e) {
      switch (e.keyCode) {
        case ENTER:
        case SPACE:
        case DOWN:
          e.preventDefault();
          this.open();
          this.focusNextMenuItem();
          break;
        case UP:
          e.preventDefault();
          this.open();
          this.focusPreviousMenuItem();
          break;
        case ESCAPE:
          this.dismiss();
          this.toggle.focus();
          break;
      }
    },

    menuKeyHandler: function(e) {
      var firstItem = this.menuItems[0];
      var lastItem = this.menuItems[this.menuItems.length - 1];
      var currentElement = e.target;

      switch (e.keyCode) {
        case ESCAPE:
          this.dismiss();
          this.toggle.focus();
          break;
        case DOWN:
          e.preventDefault();
          this.focusNextMenuItem(currentElement);
          break;
        case UP:
          e.preventDefault();
          this.focusPreviousMenuItem(currentElement);
          break;
        case TAB:
          if (e.shiftKey) {
            if (currentElement === firstItem) {
              this.dismiss();
            } else {
              e.preventDefault();
              this.focusPreviousMenuItem(currentElement);
            }
          } else if (currentElement === lastItem) {
            this.dismiss();
          } else {
            e.preventDefault();
            this.focusNextMenuItem(currentElement);
          }
          break;
        case ENTER:
        case SPACE:
          e.preventDefault();
          currentElement.click();
          break;
      }
    }
  }

  var dropdowns = [];
  var dropdownToggles = Array.prototype.slice.call(document.querySelectorAll(".dropdown-toggle"));

  dropdownToggles.forEach(function(toggle) {
    var menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains("dropdown-menu")) {
      dropdowns.push(new Dropdown(toggle, menu));
    }
  });

  document.addEventListener("click", function(evt) {
    dropdowns.forEach(function(dropdown) {
      if (!dropdown.toggle.contains(evt.target)) {
        dropdown.dismiss();
      }
    });
  });  


  //Video Library Script
  const projectID = "veamapxp3x" // Project ID - Change if we change projects.
  const apiURL = `https://api.wistia.com/v1/projects/${projectID}.json`; // Wistia Project URL DO NOT CHANGE
  const apiKey = "b37b20eee833f6ff6b9eab66b17bf05e6044535d7510cb4e997dd510d845f929"; // Read only - DO NOT CHANGE

  async function getApi(url) {
      const response = await fetch(url, {headers: {Authorization: `Bearer ${apiKey}`}});
      var data = await response.json();
      if (response.ok) { // Check if the response is successful
          show(data);
      } else {
          console.error('Error fetching API data');
      }
  }

  getApi(apiURL);

  function show(data) {
      let sections = Object.groupBy(data.medias, x => x.section);

      for (let section of Object.keys(sections)) {
          if (section === "Test Videos" || section === "Macro videos" || section == "undefined"){ 
              // Do nothing
          } else {
              document.querySelector('#videoFilter').innerHTML += `<button onClick="filterVideos('videos-${section.replace(/\s+/g, '-').toLowerCase()}')" class="btn-filter">${section}</button>`;
          }
      }

      for (let media of data.medias) {
          if (media.section == "Test Videos" || media.section == "Macro videos") {
              // Do Nothing as we are hiding these categories.
          } else if (media.section == "undefined"){
              // Do nothing as we will want to show the videos but it doesnt matter if they are defined or not.
          } else {
              // Set the mediaURL
              let mediaURL = `https://support.exclaimer.com/hc/en-gb/p/video-library?=${media.hashed_id}&wvideo=${media.hashed_id}`;
              
              // Create the video script.
              let mediaScript = document.createElement('script');
              mediaScript.setAttribute('src', `https://fast.wistia.com/embed/medias/${media.hashed_id}.jsonp`);

              // Get the Media's Sections and remove & replace spaces with hyphens. Then set to lowercase. This is to generate the "videos" classname.
              let mediaSections = media && media.section ? media.section.replace(/\s+/g, '-').toLowerCase() : 'default';

              // Create the Video with Title and section class name.
              document.querySelector('#videos').innerHTML += `
              <div class="video videos-${mediaSections} video-show">
                  <div class="wistia_responsive_padding" style="padding: 56.25% 0 0 0; position: relative;">
                      <div class="wistia_responsive_wrapper" style="height: 100%; left: 0; position: absolute; top: 0; width: 100%;">
                          <span class="wistia_embed wistia_async_${media.hashed_id} popover=true videoFoam=true" style="display: inline-block; height: 100%; position: relative; width: 100%;">&nbsp;</span>
                      </div>
                  </div>
                  <div class="video-meta">
                      <h4>${media.name}</h4>
                      <button name="copyURLButton" onclick="copyURL(this, '${mediaURL}')" class="btn-copy">Copy URL</button>
                  </div>
                  <div class="pin pin-promoted" aria-promoted="false">Promoted</div>
              </div>
              `;
              document.getElementById('videos').appendChild(mediaScript);
          }
      }
  }
  function checkTicketId(){
    const formHeader = document.querySelector('.formHeader');
    const formSubTitle = document.querySelector('.formSubTitle');
    const ccLabel = document.querySelector('label[for=request_collaborators_]');
    const emailLabel = document.querySelector('label[for=request_anonymous_requester_email]');
    const subject = document.querySelector('.request_subject');
    const subjectWords = document.querySelector('#request_subject');
    var subjectAfter = " - [Article Feedback]";
    const suggested = document.querySelector('.suggestion-list');
    const helpURL = document.querySelector('.request_custom_fields_9489978202909');
    const helpURLTitle = document.querySelector('label[for=request_custom_fields_9489978202909]');
    const desc = document.querySelector('label[for=request_description]');
    const subId = document.querySelector('.request_custom_fields_360014356197');
    const subIdInput = document.getElementById('request_custom_fields_360014356197');
    const feedbackRating = document.querySelector('.request_custom_fields_12666327935133');
    const featureField = document.querySelector('#request_custom_fields_4915458094877');
    const prodId = document.querySelector('.request_custom_fields_360018036431');
    const formDropDown = document.querySelector('.request_ticket_form_id');

    function formEditor(title, description, emailLabelText, feedback){
      formHeader.style.display = 'block';
      formHeader.innerHTML = title;
      formSubTitle.innerHTML = description;
      if (ccLabel !== null) {
          ccLabel.innerHTML = emailLabelText
      }
      if (emailLabel !== null) {
          emailLabel.innerHTML = emailLabelText
      }
      desc.innerHTML = feedback;
      subjectWords.value += subjectAfter;
      subject.style.display = 'none';
      suggested.style.display = 'none';
      helpURL.style.display = 'none';
      feedbackRating.style.display = 'none';
    }

    function formEditorSmall(title, description, emailLabelText, feedback){
      formHeader.style.display = 'block';
      formHeader.innerHTML = title;
      formSubTitle.innerHTML = description;
      if (ccLabel !== null) {
        ccLabel.innerHTML = emailLabelText;
      }
      if (emailLabel !== null) {
        emailLabel.innerHTML = emailLabelText;
      }
      desc.innerHTML = feedback;
      suggested.style.display = 'none';
      subject.style.display = 'none';
    }

    subId.innerHTML += '<span class="subid-subtext">To obtain your Sub ID, follow the steps  <a href="../articles/360018307337" target="_blank">here</a></span>';
  
    if(window.location.href.indexOf('4459467190557') > 0){
      subId.innerHTML += '<span class="subid-subtext">To obtain your Sub ID, follow the steps  <a href="../articles/360018307337" target="_blank">here</a></span>';
      prodId.style.display = 'none';
      featureField.onchange = function(){
        if (featureField.value == 'feature_portal___login') {
          document.getElementById('request_custom_fields_360014356197').value = "N/A";
          subId.style.display = 'none';
        } else {
          document.getElementById('request_custom_fields_360014356197').value = "";
          subId.style.display = 'block';
        }
      }
    }
    
    if(window.location.href.indexOf('9490217014813') > 0){
      if(window.location.href.indexOf('&tf_subject=') > 0){
        if(window.location.href.indexOf('/hc/bg/') > 0 ){
          //Bulgarian Language Support
          formEditor(
            'Обратна връзка за базата данни',
            'Благодарим ви, че отделихте време, за да предоставите обратна връзка относно този статия в базата данни. Вашият отзив ще бъде прегледан от нашите технически автори, за да помогне за подобряване на базата данни.',
            'Искаме да знаем кой сте. Моля, предоставете вашия имейл адрес?',
            'Обратна връзка'
          );
        } else if(window.location.href.indexOf('/hc/de/') > 0 ){
          //German Language Support
          formEditor(
            'Wissensdatenbank-Feedback',
            'Wir danken Ihnen, dass Sie sich die Zeit genommen haben, Feedback zu diesem Artikel in der Wissensdatenbank zu geben. Ihr Feedback wird von unseren technischen Autoren überprüft, um die Wissensdatenbank zu verbessern.',
            'Wir würden gerne wissen, wer Sie sind. Bitte geben Sie Ihre E-Mail-Adresse an?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/es/') > 0 ){
          //Spanish Language Support
          formEditor(
            'Comentarios sobre la Base de Conocimientos',
            'Agradecemos que se tome el tiempo para proporcionar comentarios sobre este artículo de la base de conocimientos. Sus comentarios serán revisados por nuestros Autores Técnicos para ayudar a mejorar la base de conocimientos.',
            'Nos encantaría saber quién es usted. ¿Podría proporcionar su dirección de correo electrónico?',
            'Comentarios'
         );
        } else if(window.location.href.indexOf('/hc/fr/') > 0 ){
          //French Language Support
          formEditor(
            'Feedback de la Base de Connaissances',
            'Nous vous remercions de prendre le temps de fournir des commentaires sur cet article de la base de connaissances. Vos commentaires seront examinés par nos auteurs techniques pour aider à améliorer la base de connaissances.',
            'Nous aimerions savoir qui vous êtes. Veuillez fournir votre adresse e-mail?',
            'Commentaires'
          );
        } else if(window.location.href.indexOf('/hc/it/') > 0 ){
          //Italian Language Support
          formEditor(
            'Feedback sulla Knowledge Base',
            'Apprezziamo che tu abbia dedicato del tempo per fornire feedback su questo articolo della knowledge base. Il tuo feedback sarà esaminato dai nostri autori tecnici per migliorare la knowledge base.',
            'Ci piacerebbe sapere chi sei. Per favore, fornisci il tuo indirizzo email?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/nl/') > 0 ){
          //Dutch Language Support
          formEditor(
            'Feedback Kennisbank',
            'We waarderen het dat je de tijd neemt om feedback te geven op dit artikel in de kennisbank. Jouw feedback wordt beoordeeld door onze technische auteurs om de kennisbank te verbeteren.',
            'We willen graag weten wie je bent. Geef alsjeblieft je e-mailadres op?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/pl/') > 0 ){
          //Polish Language Support 
          formEditor(
            'Opinie na temat Bazy Wiedzy',
            'Doceniamy, że poświęcasz czas, aby dostarczyć opinii na temat tego artykułu w bazie wiedzy. Twoja opinia zostanie przeanalizowana przez naszych autorów technicznych, aby pomóc w poprawie bazy wiedzy.',
            'Chcielibyśmy wiedzieć, kim jesteś. Podaj swój adres e-mail?',
            'Opinie'
          );
        } else if(window.location.href.indexOf('/hc/pt/') > 0 ){
          //Portugese Language Support
          formEditor(
            'Feedback da Base de Conhecimento',
            'Agradecemos por dedicar um tempo para fornecer feedback. Seu feedback será revisado pelos nossos autores técnicos para ajudar a melhorar a base de conhecimento.',
            'Gostaríamos de saber quem você é. Por favor, forneça seu endereço de e-mail?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/ru/') > 0 ){
          //Russian Language Support
          formEditor(
            'Обратная связь по базе знаний',
            'Мы благодарим вас за то, что уделили время, чтобы предоставить обратную связь по этой статье в базе знаний. Ваш отзыв будет рассмотрен нашими техническими авторами для улучшения базы знаний.',
            'Нам было бы интересно узнать, кто вы. Пожалуйста, предоставьте свой адрес электронной почты?',
            'Обратная связь'
          );
        } else {
          // All undefined languages
          formEditor(
            'Knowledgebase Feedback',
            'We appreciate you taking the time to provide feedback on this knowledgebase article. Your feedback will be reviewed by our Technical Authors to help improve the knowledgebase.',
            'We\'d love to know who you are. Please provide your email address?',
            'Feedback'
          );
        }
      } else {
        if(window.location.href.indexOf('/hc/bg/') > 0 ){
          //Bulgarian Language Support
          formEditorSmall(
            'Обратна връзка за базата данни',
            'Благодарим ви, че отделихте време, за да предоставите обратна връзка. Вашият отзив ще бъде прегледан от нашите технически автори, за да помогне за подобряване на базата данни.',
            'Искаме да знаем кой сте. Моля, предоставете вашия имейл адрес?',
            'Обратна връзка'
          );
        } else if(window.location.href.indexOf('/hc/de/') > 0 ){
          //German Language Support
          formEditorSmall(
            'Wissensdatenbank-Feedback',
            'Wir danken Ihnen, dass Sie sich die Zeit genommen haben, Feedback zu geben. Ihr Feedback wird von unseren technischen Autoren überprüft, um die Wissensdatenbank zu verbessern.',
            'Wir würden gerne wissen, wer Sie sind. Bitte geben Sie Ihre E-Mail-Adresse an?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/es/') > 0 ){
          //Spanish Language Support
          formEditorSmall(
            'Comentarios sobre la Base de Conocimientos',
            'Agradecemos que se tome el tiempo para proporcionar comentarios. Sus comentarios serán revisados por nuestros Autores Técnicos para ayudar a mejorar la base de conocimientos.',
            'Nos encantaría saber quién es usted. ¿Podría proporcionar su dirección de correo electrónico?',
            'Comentarios'
          );
        } else if(window.location.href.indexOf('/hc/fr/') > 0 ){
          //French Language Support
          formEditorSmall(
            'Feedback de la Base de Connaissances',
            'Nous vous remercions de prendre le temps de fournir des commentaires. Vos commentaires seront examinés par nos auteurs techniques pour aider à améliorer la base de connaissances.',
            'Nous aimerions savoir qui vous êtes. Veuillez fournir votre adresse e-mail?',
            'Commentaires'
          );
        } else if(window.location.href.indexOf('/hc/it/') > 0 ){
          //Italian Language Support
          formEditorSmall(
            'Feedback sulla Knowledge Base',
            'Apprezziamo che tu abbia dedicato del tempo per fornire feedback. Il tuo feedback sarà esaminato dai nostri autori tecnici per migliorare la knowledge base.',
            'Ci piacerebbe sapere chi sei. Per favore, fornisci il tuo indirizzo email?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/nl/') > 0 ){
          //Dutch Language Support
          formEditorSmall(
            'Feedback Kennisbank',
            'We waarderen het dat je de tijd neemt om feedback te geven. Jouw feedback wordt beoordeeld door onze technische auteurs om de kennisbank te verbeteren.',
            'We willen graag weten wie je bent. Geef alsjeblieft je e-mailadres op?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/pl/') > 0 ){
          //Polish Language Support
          formEditorSmall(
            'Opinie na temat Bazy Wiedzy',
            'Doceniamy, że poświęcasz czas, aby dostarczyć opinii. Twoja opinia zostanie przeanalizowana przez naszych autorów technicznych, aby pomóc w poprawie bazy wiedzy.',
            'Chcielibyśmy wiedzieć, kim jesteś. Podaj swój adres e-mail?',
            'Opinie'
          );
        } else if(window.location.href.indexOf('/hc/pt/') > 0 ){
          //Portugese Language Support
          formEditorSmall(
            'Feedback da Base de Conhecimento',
            'Agradecemos por dedicar um tempo para fornecer feedback. Seu feedback será revisado pelos nossos autores técnicos para ajudar a melhorar a base de conhecimento.',
            'Gostaríamos de saber quem você é. Por favor, forneça seu endereço de e-mail?',
            'Feedback'
          );
        } else if(window.location.href.indexOf('/hc/ru/') > 0 ){
          //Russian Language Support
          formEditorSmall(
            'Обратная связь по базе знаний',
            'Мы благодарим вас за то, что уделили время, чтобы предоставить обратную связь. Ваш отзыв будет рассмотрен нашими техническими авторами для улучшения базы знаний.',
            'Нам было бы интересно узнать, кто вы. Пожалуйста, предоставьте свой адрес электронной почты?',
            'Обратная связь'
          );
        } else {
          // All undefined languages
          formEditorSmall(
            'Knowledgebase Feedback',
            'We appreciate you taking the time to provide feedback. Your feedback will be reviewed by our Technical Authors to help improve the knowledgebase.',
            'We\'d love to know who you are. Please provide your email address?',
            'Feedback'
          )
        }
      }
    }
  }
  checkTicketId();
  
  function checkFAQ() {
    let faqItem = document.querySelectorAll('.section-topic-link');
    let faqTitle = document.querySelectorAll('.section-article-title');
    const faq = ' - Frequently Asked Questions';

    for(let i = 0; i < faqItem.length; i++) {
      if(faqItem[i].innerHTML.includes(faq)){
        faqItem[i].innerHTML = faqItem[i].innerHTML.replace(faq, '');
      }
    }

    for(let i = 0; i < faqTitle.length; i++) {
      if(faqTitle[i].innerHTML.includes(faq)){
        faqTitle[i].innerHTML = faqTitle[i].innerHTML.replace(faq, '');
      }
    }
  }

  checkFAQ();

  window.hcm = {};
    function hcmanager(account_key, dataset_id, domain, script_url) {
      window.hcm._accountKey = account_key;
      window.hcm._datasetId = dataset_id;
      window.hcm._domain = domain;
      var script = document.createElement("script");
      script.type = "application/javascript";
      script.src = script_url;
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    }
    hcmanager('6a32338629b822f4e60c0c5a04ecc8e1', '65004597e443f4029f0dd736', 'https://hcmanager.swifteq.com', 'https://scripts.swifteq.com/hc_events.js');
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".article-votes-controls")) {
    const voteButtons = document.querySelectorAll(".article-vote");
    const voteDownMessage = document.querySelector(".downvote-message");
    const voteUpMessage = document.querySelector(".upvote-message");

    voteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        let isDownButton = button.matches(".article-vote-down");
        let isUpButton = button.matches(".article-vote-up");
        let isPressed = button.matches(".button-primary");

        if (isDownButton && !isPressed) {
          voteDownMessage.style.display = "block";
        } else {
          voteDownMessage.style.display = "none";
        }

        if (isUpButton && !isPressed) {
          voteUpMessage.style.display = "block";
        } else {
          voteUpMessage.style.display = "none";
        }
      });
    });
  }
});

