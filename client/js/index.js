import { Grid } from "./grid.js";

const createSection = document.querySelector(".custom-grid-section");
const createBtn = document.querySelector(".right");
createBtn.addEventListener("click", function () {
  if (createSection.style.display === "none") {
    createSection.style.display = "flex";
  } else {
    createSection.style.display = "none";
  }
});

const submitWords = document.querySelector(".submit-words");

submitWords.addEventListener("click", async function () {
  const grid = new Grid();
  const commaSeperatedWords = document.querySelector("#add-words").value;
  const gridSize = document.querySelector("#grid-size").value;
  let data = await fetchGridInfo(gridSize, commaSeperatedWords);
  grid.words = commaSeperatedWords.split(",");
  grid.renderGrid(gridSize, data);

  const wordListNode = document.createTextNode(grid.words.join("  "));
  const wordListSection = document.querySelector(".word-list");
  wordListSection.replaceChildren();
  wordListSection.appendChild(wordListNode);
});

async function fetchGridInfo(gridSize, commaSeperatedWords) {
  // const commaSeperatedWords = wordList.join(",");
  try {
    let response = await fetch(
      // `http://localhost:8080/wordgrid?gridSize=${gridSize}&wordList=${commaSeperatedWords}`
      `https://wordsearch-springboot.onrender.com/wordgrid?gridSize=${gridSize}&wordList=${commaSeperatedWords}`
    );
    response = await response.text();
    return response.split(" ");
  } catch (error) {
    console.error("Error in fetching grid", error);
  }
}
