
document.addEventListener('DOMContentLoaded', function() {
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

  // Redirect to new KB
  var oldkbIds = ["360004503131","360004265792","360004303391","360014021152","360028890072","360004471831","360004328412","360004419592","360004616071","360028885272","360004382171","360004356192","360004467191","360004466012","360029665592","360004512451","360013995872","360007142211","360016552032","360004514071","360004469392","360004469191","360028887472","360004472811","360004358092","360027260951","360018558612","360004564032","360034867092","360004415011","360004510971","360004413172","360027343632","360020409977","360010748232","360004464752","360004419032","360031273151","360004328732","360004416232","360012506451","360030006291","360004413792","360004516591","4404256054417","360004614411","360025262272","360004456852","360004505271","360004678992","360024742632","4403988790289","4403989000977","4403989043985","360004426651","360004265852","360027497172","4411853944721","360004414471","360004462211","360004473491","360004362192","360055860371","360004541811","360004412872","360004357312","360004467451","360004503651","360004466612","360004414171","360004473071","360055750192","360004410011","360004361212","360004473771","360004418192","360013652131","360028885452","360004464232","360004383071","360004511031","360004510811","360004411091","360004674772","360004468772","360004508731","360004382511","360030008271","360004467711","360027345612","360021106092","360004471771","360004411471","360004512591","360004513831","360007119871","360004319871","360004504511","360004467871","360004512691","360017405952","360004461652","360004266932","360004266912","360004565512","360004493292","360004466792","360029587271","360004542251","360029434371","360004411691","360004512891","360004382731","360004541291","360004469352","360004467091","360004356172","360004363632","360004417772","360004410351","360004307511","360004465972","360004469052","360004540491","360004466872","360030011591","360004513771","360004544291","360004516371","360004356952","360026121771","360004503072","360004457192","360027302571","360004358472","360004504231","360004328432","360024388151","360021115432","360021113732","360021888152","360028648572","360004265772","360004499672","360004565992","360004465372","360004265832","360004463712","360044101112","360004410491","360004489312","360004361512","360004416392","360052193431","360004463832","360004469492","360020592678","360048630971","360004419432","360018586691","360004615971","360004472271","360004465412","360019752111","360004467151","360004513111","360018306577","360004491332","360018931731","360004513871","360004419492","360004489192","360004469951","360004508271","360004415111","360004512751","360004490172","360004266892","360004565432","360004327732","360029682611","360004466531","360028197392","360027545072","360004382471","360030864671","360004288592","360004540611","360028492391","360023751552","360019250151","360004551831","360004544671","360004541431","360004327612","4403665130641","360004275152","360025766511","360004502571","360004358372","360004465792","360015554452","360004456232","360004544711","360004413971","360004502492","360004410811","360004357972","360004408592","360004503851","360030533512","360028492151","360004463932","360004455692","360004503971","360004502512","360022690171","360004473291","360004676332","360004676712","360004463872","360004468992","360004319071","360018680212","360004358352","360004619731","360004318791","360004426711","360004357572","360004322271","4434972491549","360027342812","360016551212","360004615051","360025598112","360004516291","360004412812","360029669712","360004463252","360004328392","360004470071","360004382911","360004464812","360004411511","360004383371","360004617491","360004414372","360004456172","360004357692","360004356332","360004469771","360004468732","360023359371","360004356692","360004456012","360004262672","360004419952","360004563172","360004462171","360004320351","360004462072","360004511231","360004358672","360004326872","360004361152","360004467551","360025041171","360021383332","360013774072","360004357752","360004356772","360004490792","360007141531","360030533252","360004307491","360004490312","360004491012","360004492272","360026889531","360004512631","360004551011","360004411131","360004542551","360004463371","360004411451","360004413512","360029369852","360004265412","360004361752","360024454972","360004381971","360002876012","360004265892","360004491772","360004466971","360004619631","360004461632","360004413652","360004416172","360004503951","360004382631","360004412632","360004374711","360004455472","360004493212","360004540251","360018940052","360004410671","360004318911","360004455832","360004357932","360004412732","360004469012"];
  var newkbIds = ["360004503131","360004265792","360004303391","360014021152","360028890072","360004471831","360004328412","360004419592","360004616071","360028885272","360004382171","360004356192","360004467191","360004466012","360029665592","360004512451","360013995872","360007142211","360016552032","360004514071","360004469392","360004469191","360028887472","360004472811","360004358092","360027260951","360018558612","360004564032","360034867092","360004415011","360004510971","360004413172","360027343632","360020409977","360010748232","360004464752","360004419032","360031273151","360004328732","360004416232","360012506451","360030006291","360004413792","360004516591","4404256054417","360004614411","360025262272","360004456852","360004505271","360004678992","360024742632","4403988790289","4403989000977","4403989043985","360004426651","360004265852","360027497172","4411853944721","360004414471","360004462211","360004473491","360004362192","360055860371","360004541811","360004412872","360004357312","360004467451","360004503651","360004466612","360004414171","360004473071","360055750192","360004410011","360004361212","360004473771","360004418192","360013652131","360028885452","360004464232","360004383071","360004511031","360004510811","360004411091","360004674772","360004468772","360004508731","360004382511","360030008271","360004467711","360027345612","360021106092","360004471771","360004411471","360004512591","360004513831","360007119871","360004319871","360004504511","360004467871","360004512691","360017405952","360004461652","360004266932","360004266912","360004565512","360004493292","360004466792","360029587271","360004542251","360029434371","360004411691","360004512891","360004382731","360004541291","360004469352","360004467091","360004356172","360004363632","360004417772","360004410351","360004307511","360004465972","360004469052","360004540491","360004466872","360030011591","360004513771","360004544291","360004516371","360004356952","360026121771","360004503072","360004457192","360027302571","360004358472","360004504231","360004328432","360024388151","360021115432","360021113732","360021888152","360028648572","360004265772","360004499672","360004565992","360004465372","360004265832","360004463712","360044101112","360004410491","360004489312","360004361512","360004416392","360052193431","360004463832","360004469492","360020592678","360048630971","360004419432","360018586691","360004615971","360004472271","360004465412","360019752111","360004467151","360004513111","360018306577","360004491332","360018931731","360004513871","360004419492","360004489192","360004469951","360004508271","360004415111","360004512751","360004490172","360004266892","360004565432","360004327732","360029682611","360004466531","360028197392","360027545072","360004382471","360030864671","360004288592","360004540611","360028492391","360023751552","360019250151","360004551831","360004544671","360004541431","360004327612","4403665130641","360004275152","360025766511","360004502571","360004358372","360004465792","360015554452","360004456232","360004544711","360004413971","360004502492","360004410811","360004357972","360004408592","360004503851","360030533512","360028492151","360004463932","360004455692","360004503971","360004502512","360022690171","360004473291","360004676332","360004676712","360004463872","360004468992","360004319071","360018680212","360004358352","360004619731","360004318791","360004426711","360004357572","360004322271","4434972491549","360027342812","360016551212","360004615051","360025598112","360004516291","360004412812","360029669712","360004463252","360004328392","360004470071","360004382911","360004464812","360004411511","360004383371","360004617491","360004414372","360004456172","360004357692","360004356332","360004469771","360004468732","360023359371","360004356692","360004456012","360004262672","360004419952","360004563172","360004462171","360004320351","360004462072","360004511231","360004358672","360004326872","360004361152","360004467551","360025041171","360021383332","360013774072","360004357752","360004356772","360004490792","360007141531","360030533252","360004307491","360004490312","360004491012","360004492272","360026889531","360004512631","360004551011","360004411131","360004542551","360004463371","360004411451","360004413512","360029369852","360004265412","360004361752","360024454972","360004381971","360002876012","360004265892","360004491772","360004466971","360004619631","360004461632","360004413652","360004416172","360004503951","360004382631","360004412632","360004374711","360004455472","360004493212","360004540251","360018940052","360004410671","360004318911","360004455832","360004357932","360004412732","360004469012"];

  for (var i = 0; i < oldkbIds.length; i++){
    if (window.location.href.indexOf(oldkbIds[i]) > -1) {
      window.location.href = 'https://legacy.support.exclaimer.com/hc/en-gb/articles/' + newkbIds[i]; 
    }
  } 



  // Support Ticket Form
    // Subscription ID
    $(".form-field.request_custom_fields_360014356197").append(
      '<p id="request_description_hint">To obtain your Sub ID, follow the steps <a href="https://support.exclaimer.com/hc/en-gb/articles/360018307337" target="_blank">here</a></p>'
    );

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
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      // Element.closest is not supported in IE11
      closest(this, 'form').submit();
    });
  }

  // Change Mark as solved text according to whether comment is filled
  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function() {
      if (requestCommentTextarea.value === '') {
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
  if (requestCommentTextarea && requestCommentTextarea.value === '') {
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
    if (e.keyCode === 13) { // Enter key
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

  var burgerMenu = document.querySelector('.header .menu-button');
  var userMenu = document.querySelector('#user-nav');

  burgerMenu.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNavigation(this, userMenu);
  });


  userMenu.addEventListener('keyup', function(e) {
    if (e.keyCode === 27) { // Escape key
      e.stopPropagation();
      closeNavigation(burgerMenu, this);
    }
  });

  if (userMenu.children.length === 0) {
    burgerMenu.style.display = 'none';
  }

  // Toggles expanded aria to collapsible elements
  var collapsible = document.querySelectorAll('.collapsible-nav, .collapsible-sidebar');

  Array.prototype.forEach.call(collapsible, function(el) {
    var toggle = el.querySelector('.collapsible-nav-toggle, .collapsible-sidebar-toggle');

    el.addEventListener('click', function(e) {
      toggleNavigation(toggle, this);
    });

    el.addEventListener('keyup', function(e) {
      if (e.keyCode === 27) { // Escape key
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

  // If a section has more than 6 subsections, we collapse the list, and show a trigger to display them all
  const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
  const subsectionsList = document.querySelector(".section-list");

  if (subsectionsList && subsectionsList.children.length > 6) {
    seeAllTrigger.setAttribute("aria-hidden", false);

    seeAllTrigger.addEventListener("click", function(e) {
      subsectionsList.classList.remove("section-list--collapsed");
      seeAllTrigger.parentNode.removeChild(seeAllTrigger);
    });
  }

  // If multibrand search has more than 5 help centers or categories collapse the list
  const multibrandFilterLists = document.querySelectorAll(".multibrand-filter-list");
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
  const notificationElm = document.querySelector(".notification-error");
  if (
    notificationElm &&
    notificationElm.previousElementSibling &&
    typeof notificationElm.previousElementSibling.focus === "function"
  ) {
    notificationElm.previousElementSibling.focus();
  }

  // get id and template name
var _location = window.location.href.split('/en-us/');
console.log('window.location.href: ' + window.location.href + ', _location: ');
console.log(_location);
if (_location.length > 1) {
  var _split = _location[1].split('-')[0];
  var _templatename = _split.split('/')[0];
  var _templateid = _split.split('/')[1];
}

//Catergories lists
var categoriesList = function(_categories) {
  if(typeof HelpCenter.user.locale == 'undefined') {
    HelpCenter.user.locale = window.location.pathname.replace('/', '').replace('?','/').split('/')[1];
  }

  $.ajax({
    url: '/api/v2/help_center/'+HelpCenter.user.locale+'/categories.json',
    type: 'GET',
    dataType: 'json',
    success: _categories
  });
};

var _list = '';

categoriesList(function(data){
  $(data.categories).each(function (idx, itm) {
    if (itm.name !== 'General') {
      _list = _list + '<li><a href="' + itm.html_url + '" id="' + itm.id + '">' + itm.name + '</a></li>'
    } 
  });
  $('.left-side-category-list').html(_list);
  $('.left-side-category-list a#' +_templateid).addClass('active');

  if(_templatename=='sections' || _templatename=='articles') {
    var categoryid = $('.breadcrumbs > li:nth-child(2) > a').attr('href').split('/categories/')[1].split('-')[0];
    $('.left-side-category-list a#' + categoryid).addClass('active');
  }

});

});


