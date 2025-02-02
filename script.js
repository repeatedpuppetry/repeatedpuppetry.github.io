// create navbar
let navbar = document.getElementById("navbar");
let links = {
  "Home": "index.html",
  "About": "about.html",
  "Interests": "interests.html",
  "Links": "contact.html"
}
for (let link in links) {
  let navbaritem = document.createElement("li");
  let a = document.createElement("a");
  a.href = links[link];
  a.textContent = link;
  navbaritem.appendChild(a);
  navbar.appendChild(navbaritem);
}
