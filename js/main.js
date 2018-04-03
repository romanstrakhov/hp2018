const DESC_HIDDEN = 'hidden';

var portfolio = document.querySelector('section.gallery');

var overPortfolioDescription = portfolio.addEventListener('mouseover', function(e) {
  var parentProject = getParentElement(e.target, 'gallery_project');
  if(parentProject) {
    showDescription(parentProject);
    fxOn(getCoverElement(parentProject));
  }
});

var outPortfolioDescription = portfolio.addEventListener('mouseout', function(e) {
  var parentProject = getParentElement(e.target, 'gallery_project');
  if( parentProject && !isInnerElement(e.toElement, parentProject)) { 
    hideDescription(parentProject);
    fxOff(getCoverElement(parentProject));
  } 
});

/// FUNCTIONS

function isInnerElement(child, parent) {
  var test = child;
  var limit = 4;
  while (test && limit>0) {
    if (test==='') { return false; }
    else if (test==parent) { return true }
    test = test.parentElement;
    limit--;
  }
  return false;
}

function getParentElement(e, eclass) {
  var test  = e;
  var limit = 4;
  while (test && limit>0) {
    if (test.classList.contains(eclass)) return test;
    test = test.parentElement;
    limit--;
  }
  return undefined;
}

function showDescription(e) {
  var desc = getDescriptionElement(e);
  if (desc.classList.contains(DESC_HIDDEN)) {
    desc.classList.remove(DESC_HIDDEN);
  }
}

function hideDescription(e) {
  var desc = getDescriptionElement(e);
  if (!desc.classList.contains(DESC_HIDDEN)) {
    desc.classList.add(DESC_HIDDEN);
  }
}

function toggleDescription(e) {
  var desc = getDescriptionElement(e);
    if (!desc.classList.contains(DESC_HIDDEN)) {
      desc.classList.add(DESC_HIDDEN);
    } else {
      desc.classList.remove(DESC_HIDDEN);      
    }
}

function getDescriptionElement(e) {
  return e.querySelector('.gallery_project_description');
}

function getCoverElement(e) {
  return e.querySelector('.gallery_project_cover');
}


function fxOn(e) {
  if (!e.classList.contains('fx')) {
    e.classList.add('fx');
  }
}

function fxOff(e) {
  if (e.classList.contains('fx')) {
    e.classList.remove('fx');
  }
}


/// ---------------------------------------------------


function setInvisible(e, invisible=true) {
  var el = e.querySelector('.gallery_project_description');
  if (invisible) {
    if (!el.classList.contains('invisible')) {
      el.classList.add('invisible');
    }
  } else {
    if (el.classList.contains('invisible')) {
      el.classList.remove('invisible');
    }
  }
}
