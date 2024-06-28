export class Grid {
  constructor() {
    this.wordSelectedMode = false;
    this.selectedItems = [];
    this.firstSelectedItem;
    this.gridArea = null;
    this.words = [];
    this.foundWords = [];
  }

  getCellsInRange(firstLetter, currentLetter) {
    let cellsInRange = [];

    if (firstLetter.x > currentLetter.x || firstLetter.y > currentLetter.y) {
      [currentLetter, firstLetter] = [firstLetter, currentLetter];
    }

    if (firstLetter.y === currentLetter.y) {
      for (let i = firstLetter.x; i <= currentLetter.x; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[data-x="${i}"][data-y="${currentLetter.y}"]`
          )
        );
      }
    } else if (firstLetter.x === currentLetter.x) {
      for (let i = firstLetter.y; i <= currentLetter.y; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[data-x="${currentLetter.x}"][data-y="${i}"]`
          )
        );
      }
    } else if (
      currentLetter.y - firstLetter.y ===
      currentLetter.x - firstLetter.x
    ) {
      let delta = currentLetter.y - firstLetter.y;
      for (let i = 0; i <= delta; i++) {
        cellsInRange.push(
          this.gridArea.querySelector(
            `td[data-x="${firstLetter.x + i}"][data-y="${firstLetter.y + i}"]`
          )
        );
      }
    }
    return cellsInRange;
  }

  renderGrid(gridSize, wordGrid) {
    const tableSection = document.querySelector(".grid-area");

    // clear previous rendered table
    tableSection.replaceChildren();

    this.gridArea = tableSection;

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    let index = 0;
    for (let i = 0; i < gridSize; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement("td");
        const letter = wordGrid[index++];
        const cellText = document.createTextNode(letter);
        cell.appendChild(cellText);
        cell.setAttribute("data-x", i);
        cell.setAttribute("data-y", j);
        cell.setAttribute("data-letter", letter);

        if ((j + i) % 2 === 0) cell.classList.add("cell-dark");
        else cell.classList.add("cell-light");

        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    tableSection.appendChild(tbl);

    // click handler
    tbl.addEventListener("mousedown", (event) => {
      this.wordSelectedMode = true;

      const cell = event.target;

      let x = +cell.getAttribute("data-x");
      let y = +cell.getAttribute("data-y");
      let letter = cell.getAttribute("data-letter");

      this.firstSelectedItem = {
        x,
        y,
      };
    });

    tbl.addEventListener("mousemove", (event) => {
      if (this.wordSelectedMode && event.target.tagName === "TD") {
        const cell = event.target;
        //cell.classList.add("selected");
        let x = +cell.getAttribute("data-x");
        let y = +cell.getAttribute("data-y");
        let letter = cell.getAttribute("data-letter");

        // if (this.selectedItems.length) {
        //   const lastSelectedItem =
        //     this.selectedItems[this.selectedItems.length - 1];
        //   if (lastSelectedItem.x === x && lastSelectedItem.y === y) return;
        // }
        // this.selectedItems.push({
        //   x,
        //   y,
        //   letter,
        //   cell,
        // });

        this.selectedItems.forEach((cell) => cell.classList.remove("selected"));
        this.selectedItems = this.getCellsInRange(this.firstSelectedItem, {
          x,
          y,
        });
        this.selectedItems.forEach((cell) => cell.classList.add("selected"));
      }
    });

    tbl.addEventListener("mouseup", (event) => {
      this.wordSelectedMode = false;
      const selectedWords = this.selectedItems.reduce((word, cell) => {
        return (word += cell.getAttribute("data-letter"));
      }, "");

      const reversedSelectedWord = selectedWords.split("").reverse().join("");
      if (this.words.indexOf(selectedWords) !== -1) {
        this.foundWords.push(selectedWords);

        this.selectedItems.forEach((item) => {
          item.classList.remove("cell-light");
          item.classList.remove("cell-dark");
          item.classList.remove("selected");
          item.classList.add("correct-selection");
        });
      } else if (this.words.indexOf(reversedSelectedWord) !== -1) {
        this.foundWords.push(reversedSelectedWord);

        this.selectedItems.forEach((item) => {
          item.classList.remove("cell-light");
          item.classList.remove("cell-dark");
          item.classList.remove("selected");
          item.classList.add("correct-selection");
        });
      } else {
        this.selectedItems.forEach((item) => {
          item.classList.remove("selected");
        });
      }
      this.selectedItems = [];
    });
  }
}
