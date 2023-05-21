const form = document.getElementById("search-form");
const editButton = document.querySelector(".edit-button");
const avatar = document.getElementById("avatar-image");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const reposNum = document.querySelector(".repos-number");
const profileName = document.querySelector(".profile-name");
const reposGroupOne = document.querySelector(".list-group-1");
const reposGroupTwo = document.querySelector(".list-group-2");
const reopoLanguageColor = document.querySelector(".repo-language-color");
let burgerMenu = document.querySelector(".burger-menu");
const bio = document.querySelector(".bio");

let colorLang = "red";
function changeLanguageColor(lang) {
  if (lang == "HTML") {
    colorLang = "red";
  } else if (lang == "CSS") {
    colorLang = "#563d7c";
  } else if (lang == "JavaScript") {
    colorLang = "yellow";
  } else if (lang == "PHP") {
    colorLang = "#4F5D95";
  }
  return colorLang;
}
fetch("https://api.github.com/users/suhabadarneh")
  .then((result) => result.json())
  .then((data) => {
    avatar.innerHTML = `<img
        style="width: 260px; height: 260px"
        src="${data.avatar_url}"
        alt="..."
        id="avatar"
        class="img-fluid"
      />`;
    bio.textContent = `${data.bio}`;
    followers.textContent = `${data.followers}`;
    following.textContent = `${data.following}`;
  });

/* Fetch Suha's Repos*/
fetch(`https://api.github.com/users/suhabadarneh/repos`)
  .then((response) => response.json())
  .then((data) => {
    let newRepo = document.createElement("li");
    reposGroupOne.innerHTML = "";
    reposGroupTwo.innerHTML = "";
    for (let i = 0; i <= 5; i++) {
      let newRepo = document.createElement("li");
      let lang = data[i].language;
      if (lang != null) {
        newRepo.innerHTML = `  <div class="repo-details d-flex justify-content-between">
          <a href="" class="repo-name">${data[i].name}</a>
          <p>Public</p>
        </div>
        <div class="d-flex gap-1 align-items-center text-start" style="font-size:smaller">
          <p class="repo-language-color" style="background-color:${changeLanguageColor(
            data[i].language
          )}"></p>
          ${data[i].language}
        </div>`;
      } else {
        newRepo.innerHTML = `  <div class="repo-details d-flex justify-content-between">
            <a href="" class="repo-name">${data[i].name}</a>
            <p>Public</p>
          </div>`;
      }
      if (i % 2 == 0) {
        reposGroupOne.appendChild(newRepo);
      } else {
        reposGroupTwo.appendChild(newRepo);
      }
    }
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // burgerMenu.setAttribute("data-view-component", "false");
  let search = document.getElementById("search").value;

  editButton.textContent = "Follow";
  editButton.style.display = "block";
  let originalName = search.split(" ").join("");

  /* Fetch Username*/
  fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
      avatar.innerHTML = `<img
            style="width: 260px; height: 260px"
            src="${data.avatar_url}"
            alt="..."
            id="avatar"
            class="img-fluid"
          />`;
      profileName.textContent = `${originalName}`;
      if (data.bio == null) {
        bio.style.display = "none";
      } else {
        bio.textContent = `${data.bio}`;
      }
      followers.textContent = `${data.followers}`;
      following.textContent = `${data.following}`;
      reposNum.textContent = `${data.public_repos}`;
    });

  /* Fetch Username's Repos*/
  fetch(`https://api.github.com/users/${originalName}/repos`)
    .then((response) => response.json())
    .then((data) => {
      let newRepo = document.createElement("li");
      reposGroupOne.innerHTML = "";
      reposGroupTwo.innerHTML = "";
      for (let i = 0; i <= 5; i++) {
        let newRepo = document.createElement("li");
        let lang = data[i].language;
        if (lang != null) {
          newRepo.innerHTML = `  <div class="repo-details d-flex justify-content-between">
          <a href="" class="repo-name">${data[i].name}</a>
          <p>Public</p>
        </div>
        <div class="d-flex gap-1 align-items-center text-start" style="font-size:smaller">
          <p class="repo-language-color" style="background-color:${changeLanguageColor(
            data[i].language
          )}"></p>
          ${data[i].language}
        </div>`;
        } else {
          newRepo.innerHTML = `  <div class="repo-details d-flex justify-content-between">
            <a href="" class="repo-name">${data[i].name}</a>
            <p>Public</p>
          </div>`;
        }
        if (i % 2 == 0) {
          reposGroupOne.appendChild(newRepo);
        } else {
          reposGroupTwo.appendChild(newRepo);
        }
      }
    });
});
