myFunction();

function myFunction() {
    var x = document.getElementById("blackBg");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
} 


const menu = document.getElementById("menuClick");

  function ourFunction() {
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }

  // Hide menu when clicking outside of it
  document.addEventListener("click", function(event) {
    const isClickInside = menu.contains(event.target);
    const isToggleButton = event.target.closest("button");

    if (!isClickInside && !isToggleButton) {
      menu.style.display = "none";
    }
  });

  // Prevent clicks inside the menu from triggering document click
  menu.addEventListener("click", function(event) {
    event.stopPropagation();
  });