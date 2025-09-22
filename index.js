const pages = ["home", "about", "contact"];

function showPage(id) {
  for (let p of pages) {
    document.getElementById(p).style.display = (p === id ? "block" : "none");
  }
}

document.getElementById("nav-home").onclick = () => showPage("home");
document.getElementById("nav-about").onclick = () => showPage("about");
document.getElementById("nav-contact").onclick = () => showPage("contact");

showPage("home");