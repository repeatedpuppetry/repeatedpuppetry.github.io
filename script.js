document.querySelector("#main").setAttribute("class", "bordered");
let currentPage = (window.location.href.replace(/.*\/(.*).html/, "$1") || "index");

async function fetchJSON(url) {
  const requestURL = url;
  const request = new Request(requestURL);

  const response = await fetch(request);
  return await response.json();
}
// create navbar
let navbar = document.getElementById("navbar");
navbar.setAttribute("class", "bordered");
let links = {
  "Home": "index.html",
  "About": "about.html",
  "Interests": "interests.html",
  "Blog": "blog.html",
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

// for blog page
if (currentPage === "blog") {
  fetchJSON("blog.json").then(entries => {
    entries = entries.reverse();
    for (let entry of entries) {
      console.log(entry);
      let entryArticle = document.createElement("article");
      entryArticle.setAttribute("class", "bordered");
      let articleTitle = document.createElement("h2");
      articleTitle.textContent = entry.title;
      let articleTime = document.createElement("time");
      articleTime.textContent = entry.time;
      let articleContent = document.createElement("p");
      articleContent.innerHTML = entry.content.length < 50 ? entry.content : entry.content.slice(0, 50) + "...";
      articleContent.style.fontStyle = entry.content.length < 50 ? "" : "italic";
      articleContent.addEventListener("click", function (e) {
        console.log("article clicked");
        if (this.innerHTML.length >= 50) {
          if (this.style.fontStyle === "italic") {
            this.innerHTML = entry.content;
            this.style.fontStyle = "";
          } else {
            this.innerHTML = entry.content.slice(0, 50) + "...";
            this.style.fontStyle = "italic";
          }
        }
      });
      for (let i = 0; i < 3; i++) {
        entryArticle.appendChild([articleTitle, articleTime, articleContent][i]);
      }
      // entryArticle.innerHTML = `<span style="text-align: left;"><b>${entry.title}</b> | <i>${entry.time}</i></span><br><br>${entry.content}`;
      document.querySelector("#main").appendChild(entryArticle);
    }
  });
}