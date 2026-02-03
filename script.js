const books = [
  {
    title: "Velvet Heirloom",
    description:
      "A meditative tale of inheritance, tracing the silk threads between memory and modern power.",
    genre: "Literary Drama",
    release: "Released 2024",
    cover: "Velvet Heirloom",
    edition: "Collector's Edition",
    author: "Isolde Laurent",
    pages: "392 pages",
    language: "English",
    binding: "Linen Hardcover",
    pdf: "sample.pdf",
  },
  {
    title: "Ink of the Sixth Hour",
    description:
      "A slow-burning mystery where desire and devotion dissolve into the tide of a coastal estate.",
    genre: "Mystery",
    release: "Released 2023",
    cover: "Sixth Hour",
    edition: "Midnight Print",
    author: "Caspian Rowe",
    pages: "348 pages",
    language: "English",
    binding: "Soft-touch Hardcover",
    pdf: "sample.pdf",
  },
  {
    title: "Garden of Quiet Gold",
    description:
      "A portrait of an olive-green sanctuary where a family confronts the weight of unspoken love.",
    genre: "Romance",
    release: "Released 2022",
    cover: "Quiet Gold",
    edition: "Heritage Edition",
    author: "Maeve Calder",
    pages: "410 pages",
    language: "English",
    binding: "Clothbound",
    pdf: "sample.pdf",
  },
  {
    title: "Blue Ledger",
    description:
      "A poetic narrative about legacy, told through letters sealed in old money blue.",
    genre: "Historical",
    release: "Released 2021",
    cover: "Blue Ledger",
    edition: "Archive Release",
    author: "Julian Ashcroft",
    pages: "276 pages",
    language: "English",
    binding: "Leather-bound",
    pdf: "sample.pdf",
  },
];

const carouselTrack = document.getElementById("carouselTrack");
const detailPanel = document.getElementById("detailPanel");
const panelCover = document.getElementById("panelCover");
const panelEdition = document.getElementById("panelEdition");
const panelTitle = document.getElementById("panelTitle");
const panelDescription = document.getElementById("panelDescription");
const panelGenre = document.getElementById("panelGenre");
const panelRelease = document.getElementById("panelRelease");
const panelAuthor = document.getElementById("panelAuthor");
const panelPages = document.getElementById("panelPages");
const panelLanguage = document.getElementById("panelLanguage");
const panelBinding = document.getElementById("panelBinding");
const openPdf = document.getElementById("openPdf");
const closePanel = document.getElementById("closePanel");
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const closeModal = document.getElementById("closeModal");
const aboutPanel = document.getElementById("aboutPanel");

let currentPdf = "";

books.forEach((book) => {
  const card = document.createElement("button");
  card.className = "book-card interactive";
  card.type = "button";

  card.innerHTML = `
    <div class="book-cover">${book.cover}</div>
    <span>${book.title}</span>
  `;

  card.addEventListener("click", () => {
    panelCover.textContent = book.cover;
    panelEdition.textContent = book.edition;
    panelTitle.textContent = book.title;
    panelDescription.textContent = book.description;
    panelGenre.textContent = book.genre;
    panelRelease.textContent = book.release;
    panelAuthor.textContent = book.author;
    panelPages.textContent = book.pages;
    panelLanguage.textContent = book.language;
    panelBinding.textContent = book.binding;
    currentPdf = book.pdf;
    detailPanel.classList.add("open");
    detailPanel.setAttribute("aria-hidden", "false");
  });

  carouselTrack.appendChild(card);
});

closePanel.addEventListener("click", () => {
  detailPanel.classList.remove("open");
  detailPanel.setAttribute("aria-hidden", "true");
});

openPdf.addEventListener("click", () => {
  if (currentPdf) {
    pdfFrame.src = currentPdf;
  }
  pdfModal.classList.add("open");
  pdfModal.setAttribute("aria-hidden", "false");
});

closeModal.addEventListener("click", () => {
  pdfModal.classList.remove("open");
  pdfModal.setAttribute("aria-hidden", "true");
  pdfFrame.src = "";
});

pdfModal.addEventListener("click", (event) => {
  if (event.target === pdfModal) {
    pdfModal.classList.remove("open");
    pdfModal.setAttribute("aria-hidden", "true");
    pdfFrame.src = "";
  }
});

let isDown = false;
let startX = 0;
let scrollLeft = 0;

carouselTrack.addEventListener("pointerdown", (event) => {
  isDown = true;
  carouselTrack.setPointerCapture(event.pointerId);
  startX = event.pageX - carouselTrack.offsetLeft;
  scrollLeft = carouselTrack.scrollLeft;
});

carouselTrack.addEventListener("pointerup", () => {
  isDown = false;
});

carouselTrack.addEventListener("pointerleave", () => {
  isDown = false;
});

carouselTrack.addEventListener("pointermove", (event) => {
  if (!isDown) return;
  event.preventDefault();
  const x = event.pageX - carouselTrack.offsetLeft;
  const walk = (x - startX) * 1.4;
  carouselTrack.scrollLeft = scrollLeft - walk;
});

const cursorRing = document.querySelector(".cursor-ring");

window.addEventListener("pointermove", (event) => {
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
});

const interactiveElements = document.querySelectorAll(".interactive");

interactiveElements.forEach((el) => {
  el.addEventListener("pointerenter", () => cursorRing.classList.add("active"));
  el.addEventListener("pointerleave", () => cursorRing.classList.remove("active"));
});

const menuLinks = document.querySelectorAll(".menu-link");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.panel;
    if (target === "about") {
      aboutPanel.classList.toggle("open");
      aboutPanel.setAttribute(
        "aria-hidden",
        aboutPanel.classList.contains("open") ? "false" : "true"
      );
    } else {
      aboutPanel.classList.remove("open");
      aboutPanel.setAttribute("aria-hidden", "true");
      document.getElementById("collection").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
