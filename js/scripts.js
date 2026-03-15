////////// background
// should do a 1 in 100 chance of it being something else maybe

myFunction();

function myFunction() {
    var x = document.getElementById("blackBg");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
} 

///////// menus

const menu = document.getElementById("menuClick");
const index = document.getElementById("indexClick");
const chevron = document.getElementById("indexChevron");

// Toggle menu
function ourFunction() {
  // Close index if open
  if (index) index.style.display = "none";
  if (chevron) chevron.style.rotate = "0deg";

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

// Toggle index
function indexFunction() {
  // Close menu if open
  menu.style.display = "none";

  if (!index) return;

  if (index.style.display === "none" || index.style.display === "") {
    index.style.display = "block";
    if (chevron) chevron.style.rotate = "180deg";
  } else {
    index.style.display = "none";
    if (chevron) chevron.style.rotate = "0deg";
  }
}

// Unified click listener
document.addEventListener("click", function(event) {
  const isClickInsideMenu = menu.contains(event.target);
  const isClickInsideIndex = index && index.contains(event.target);
  const isToggleButton = event.target.closest("button");

  if (!isClickInsideMenu && !isClickInsideIndex && !isToggleButton) {
    menu.style.display = "none";
    if (index) index.style.display = "none";
    if (chevron) chevron.style.rotate = "0deg";
  }
});

// Prevent clicks inside each from propagating
menu.addEventListener("click", function(event) {
  event.stopPropagation();
});

if (index) {
  index.addEventListener("click", function(event) {
    event.stopPropagation();
  });
}


//////////// misc confusing stuff idk ???? pain

const bigImage = document.getElementById('bigImage');
const caption = document.getElementById('caption');
const projectLink = document.getElementById('projectLink');
const thumbs = document.querySelectorAll('.thumbImg');
const filterButtons = document.querySelectorAll('#indexNav button');
const filterMenu = document.getElementById('indexNav'); // filter container

// -------------------- FILTER BUTTONS --------------------
filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click from closing menu

    // Close all active overlays
    document.querySelectorAll('.infoOverlay.active').forEach(o => o.classList.remove('active'));

    const selectedCategory = button.dataset.filter;

    thumbs.forEach(thumb => {
      const categories = thumb.dataset.categories?.split(' ') || [];
      const thumbParent = thumb.closest('.thumb');

      if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
        thumbParent.style.display = 'block';
      } else {
        thumbParent.style.display = 'none';
        const overlay = thumbParent.querySelector('.infoOverlay');
        overlay.classList.remove('active'); // hide overlay if filtered out
      }
    });

    showFirstVisibleImage();
  });
});

// -------------------- THUMB CLICK - BIG IMAGE / VIDEO --------------------
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => updatePreview(thumb));
});

// Show the first visible image initially
showFirstVisibleImage();

function showFirstVisibleImage() {
  const firstVisible = Array.from(thumbs).find(
    thumb => thumb.closest('.thumb').style.display !== 'none'
  );

  if (firstVisible) {
    updatePreview(firstVisible);
  } else {
    clearPreview();
  }
}

function updatePreview(thumb) {
  bigVideo.pause();
  bigVideo.currentTime = 0;
  
  const type = thumb.dataset.type || 'image';
  const fullSrc = thumb.dataset.full;
  const captionText = thumb.dataset.caption || '';

  bigImage.style.display = 'none';
  bigVideo.style.display = 'none';

  if (type === 'video') {
    bigVideo.querySelector('source').src = fullSrc;
    bigVideo.load();
    bigVideo.style.display = 'block';
  } else {
    bigImage.src = fullSrc;
    bigImage.style.display = 'block';
  }

  caption.textContent = captionText.trim();
  caption.style.display = captionText.trim() ? 'block' : 'none';

  if (thumb.dataset.link) {
    projectLink.href = thumb.dataset.link;
    projectLink.style.display = 'inline';
  } else {
    projectLink.style.display = 'none';
  }
}

function clearPreview() {
  bigImage.src = '';
  bigImage.style.display = 'none';

  bigVideo.querySelector('source').src = '';
  bigVideo.load();
  bigVideo.style.display = 'none';

  caption.textContent = '';
  caption.style.display = 'none';

  projectLink.style.display = 'none';
}

// -------------------- MOBILE OVERLAY HANDLING --------------------
document.querySelectorAll('.thumb').forEach(thumb => {
  const img = thumb.querySelector('.thumbImg');
  const overlay = thumb.querySelector('.infoOverlay');

  img.addEventListener('click', (e) => {
    if (window.innerWidth > 768) return; // Only mobile

    e.stopPropagation(); // Prevent document click from closing overlay

    // Close all other overlays
    document.querySelectorAll('.infoOverlay.active').forEach(o => {
      if (o !== overlay) o.classList.remove('active');
    });

    overlay.innerHTML = "";

    if (img.dataset.caption) {
      const captionEl = document.createElement('p');
      captionEl.textContent = img.dataset.caption;
      overlay.appendChild(captionEl);
    }

    if (img.dataset.link) {
      const linkEl = document.createElement('a');
      linkEl.href = img.dataset.link;
      linkEl.target = "_blank";
      linkEl.textContent = "View";
      overlay.appendChild(linkEl);
    }

    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.classList.remove('active');
  });
});

// -------------------- CLICK OUTSIDE HANDLER --------------------
document.addEventListener('click', (e) => {
  // Close all active overlays
  document.querySelectorAll('.infoOverlay.active').forEach(overlay => overlay.classList.remove('active'));

  // Close filter menu if clicked outside
  if (!filterMenu.contains(e.target)) {
    filterMenu.classList.remove('open');
  }
});
