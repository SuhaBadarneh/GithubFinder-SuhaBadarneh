/* WinnerLoser functionality*/

const winnerLoserSearchFormLeft = document.querySelector(
  "#winnerLoser-search-form-left"
);
const winnerLoserSearchFormRight = document.querySelector(
  "#winnerLoser-search-form-right"
);
const winnerLoserSearchLeft = document.querySelector(
  "#winnerLoser-search-left"
);
const winnerLoserSearchRight = document.querySelector(
  "#winnerLoser-search-right"
);
const winnerLoserAvatarLeft = document.querySelector(
  "#winnerLoser-avatar-left"
);
const winnerLoserAvatarRight = document.querySelector(
  "#winnerLoser-avatar-right"
);
const resultWinnerLoserAvatarLeft = document.querySelector(
  "#result-winnerLoser-avatar-left"
);
const resultWinnerLoserAvatarRight = document.querySelector(
  "#result-winnerLoser-avatar-right"
);
const resultWinnerLoserLeft = document.querySelector(
  ".result-winner-loser-left"
);
const resultWinnerLoserRight = document.querySelector(
  ".result-winner-loser-right"
);
const resultProfileNameLeft = document.querySelector(
  ".result-profile-name-left"
);

const resultProfileNameRight = document.querySelector(
  ".result-profile-name-right"
);
const profileNameLeft = document.querySelector(".profile-name-left");
const profileNameRight = document.querySelector(".profile-name-right");
const followersLeft = document.querySelector(".followers-left");
const followingLeft = document.querySelector(".following-left");
const resultFollowersLeft = document.querySelector(".result-followers-left");
const resultFollowingLeft = document.querySelector(".result-following-left");
const followersRight = document.querySelector(".followers-right");
const followingRight = document.querySelector(".following-right");
const resultFollowersRight = document.querySelector(".result-followers-right");
const resultFollowingRight = document.querySelector(".result-following-right");
const winnerLoserReposNumLeft = document.querySelector(
  ".winnerLoser-repos-num-left"
);
const winnerLoserReposNumRight = document.querySelector(
  ".winnerLoser-repos-num-right"
);
const compareButton = document.querySelector(".compare-button");

let reposOne,
  reposTwo,
  searchLeft,
  originalNameLeft,
  searchRight,
  originalNameRight;

winnerLoserSearchFormLeft.addEventListener("submit", (e) => {
  e.preventDefault();
  searchLeft = document.getElementById("winnerLoser-search-left").value;

  originalNameLeft = searchLeft.split(" ").join("");

  /* Fetch Username's of Competitor One*/
  fetch("https://api.github.com/users/" + originalNameLeft)
    .then((result) => result.json())
    .then((data) => {
      winnerLoserAvatarLeft.innerHTML = ` <img
      style="width: 260px; height: 260px"
      src="${data.avatar_url}"
      alt="..."
      id="avatar"
      class="img-fluid"
    />`;
      profileNameLeft.textContent = `${originalNameLeft}`;
      followersLeft.textContent = `${data.followers}`;
      followingLeft.textContent = `${data.following}`;
      reposOne = `${data.public_repos}`;
      winnerLoserReposNumLeft.textContent = `${reposOne} Repositories`;
      resultWinnerLoserAvatarLeft.innerHTML = winnerLoserAvatarLeft.innerHTML;
      resultFollowersLeft.textContent = followersLeft.textContent;
      resultFollowingLeft.textContent = followingLeft.textContent;
      resultProfileNameLeft.textContent = profileNameLeft.textContent;
    });
});

/* Fetch Username's of Competitor Two*/

winnerLoserSearchFormRight.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchRight = document.getElementById("winnerLoser-search-right").value;

  let originalNameRight = searchRight.split(" ").join("");

  /* Fetch Username's of Competitor One*/
  fetch("https://api.github.com/users/" + originalNameRight)
    .then((result) => result.json())
    .then((data) => {
      winnerLoserAvatarRight.innerHTML = ` <img
        style="width: 260px; height: 260px"
        src="${data.avatar_url}"
        alt="..."
        id="avatar"
        class="img-fluid"
      />`;
      profileNameRight.textContent = `${originalNameRight}`;
      followersRight.textContent = `${data.followers}`;
      followingRight.textContent = `${data.following}`;
      reposTwo = `${data.public_repos}`;
      winnerLoserReposNumRight.textContent = `${reposTwo} Repositories`;
      resultWinnerLoserAvatarRight.innerHTML = winnerLoserAvatarRight.innerHTML;
      resultFollowersRight.textContent = followersRight.textContent;
      resultFollowingRight.textContent = followingRight.textContent;
      resultProfileNameRight.textContent = profileNameRight.textContent;
    });
});

compareButton.addEventListener("click", (e) => {
  if (reposOne > reposTwo) {
    let parOne = document.createElement("p");
    parOne.style.fontSize = "larger";
    parOne.textContent = "Winner";
    parOne.style.color = "white";
    parOne.style.backgroundColor = "green";
    parOne.style.padding = "1rem";
    resultWinnerLoserLeft.appendChild(parOne);
    let parTwo = document.createElement("p");
    parTwo.style.fontSize = "larger";
    parTwo.textContent = "Loser";
    parTwo.style.color = "red";

    parTwo.style.border = "1px solid red";
    parTwo.style.padding = "1rem";

    resultWinnerLoserRight.appendChild(parTwo);
  } else if (reposOne < reposTwo) {
    let parOne = document.createElement("p");
    parOne.textContent = "Loser";
    parOne.style.fontSize = "larger";
    parOne.style.color = "red";
    parOne.style.border = "1px solid red";
    parOne.style.padding = "1rem";

    resultWinnerLoserLeft.appendChild(parOne);
    let parTwo = document.createElement("p");
    parTwo.textContent = "Winner";
    parTwo.style.fontSize = "larger";
    parTwo.style.color = "white";
    parTwo.style.backgroundColor = "green";
    parTwo.style.border = "1px solid green";
    parTwo.style.padding = "1rem";

    resultWinnerLoserRight.appendChild(parTwo);
  }
});
