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