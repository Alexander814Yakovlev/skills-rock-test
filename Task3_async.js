let app = document.querySelector("#app");

// Swith between users and image gallery
let usersTab = document.querySelector("#random_users");
let imageTab = document.querySelector("#image_gallery");

// Preloader
function setPreloader() {
  app.innerHTML = "";
  const loading = document.createElement("div");
  loading.className = "loader";
  app.appendChild(loading);
}

// Open tab with random users
usersTab.onclick = () => {
  app.style.display = "grid";
  setPreloader();
  setTimeout(() => {
    fetchUsers("https://randomuser.me/api/?results=10");
  }, 1000);
};

// Open tab with images
imageTab.onclick = async () => {
  imagesList = [];
  await showGallery();
};

// USERS
let users = new Array();

// IMAGES
let imagesList = new Array();

function fetchUsers(url) {
  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return { results: [] };
      }
    })
    .then((data) => showResults(data.results))
    .catch((e) => showResults([]));
}

// Show list of users on page
function showResults(data) {
  if (data.length > 0) {
    app.innerHTML = "";
    for (let user of data) {
      let card = document.createElement("div");
      card.className = "user__card";

      let img = document.createElement("img");
      let title = document.createElement("h3");
      let email = document.createElement("a");

      title.textContent = `${user.name.first} ${user.name.last}`;
      email.textContent = user.email;
      email.href = `mailto:${user.email}`;
      img.src = user.picture.large;
      card.appendChild(title);
      card.appendChild(img);
      card.appendChild(email);
      app.appendChild(card);
    }
  } else {
    let errorMsg = document.createElement("div");
    errorMsg.className = "user__error";
    errorMsg.textContent = "Не удалось загрузить пользователей";
    app.appendChild(errorMsg);
  }
}

// Image gallery
// Lorem picsum
// API endpoint https://picsum.photos/200/300

async function fetchImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.url;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

// Show carousel on page
async function showGallery(n=10) {
  // n - amount of images in carousel
  app.innerHTML = "";
  setPreloader();
  let wrapper = document.createElement("div");
  wrapper.className = "slideshow-container";

  // Get n image-urls
  for (let i = 0; i < n; i++) {
    const imageUrl = await fetchImage("https://picsum.photos/1920/1080");
    if (imageUrl) {
      imagesList.push(imageUrl);
    }
  }

  // Create gallery
  imagesList.forEach((imageUrl, index) => {
    let item = document.createElement("div");
    item.className = "mySlides fade";

    let numberText = document.createElement("div");
    numberText.className = "numbertext";
    numberText.textContent = `${index} / ${imagesList.length}`;

    let image = document.createElement("img");
    image.src = imageUrl;
    image.alt = `image#${index}`;
    image.style = "width: 100%; max-height: 70vh";

    let text = document.createElement("div");
    text.className = "text";
    text.textContent = `Изображение #${index}`;

    item.appendChild(numberText);
    item.appendChild(image);
    item.appendChild(text);
    wrapper.appendChild(item);
  });

  // Prev & next buttons
  let prev = document.createElement("a");
  prev.className = "prev";
  prev.textContent = "❮";
  prev.onclick = () => plusSlides(-1);

  wrapper.appendChild(prev);

  let next = document.createElement("a");
  next.className = "next";
  next.textContent = "❯";
  next.onclick = () => plusSlides(1);

  wrapper.appendChild(next);

  app.innerHTML = "";
  app.style.display = "block";
  app.appendChild(wrapper);

  showSlides();
}

let slideIndex = 0;
let autoPlay;

async function showSlides(n = null) {

  let slides = document.querySelectorAll(".mySlides");

  if (n !== null) {
    slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;
  }

  // Hide all slides of carousel
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  if (n === null) {
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
  }

  // Show next slide
  slides[slideIndex - 1].style.display = "block";

  // Restart timer
  clearTimeout(autoPlay);
  autoPlay = setTimeout(() => showSlides(), 3000);
}

// Prev & next buttons handler
function plusSlides(n) {
  clearTimeout(autoPlay);
  showSlides(slideIndex + n);
}
