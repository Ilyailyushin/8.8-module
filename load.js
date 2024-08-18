const startBtn = document.querySelector(".start-btn");
const wrap = document.querySelector(".wrap");

let data;

fetch("https://api.thecatapi.com/v1/images/search?limit=10")
  .then((res) => res.json())
  .then((res) => {
    data = res;
  })
  .catch((err) => console.log(err.message));

startBtn.addEventListener("click", startLoadingImages);

function startLoadingImages() {
  let i = 0;
  const chunkSize = 50;

  function insertImagesChunk() {
    let end = Math.min(i + chunkSize, data.length);
    do {
      let elem = `<img src=${data[i].url}></img>`;
      wrap.innerHTML += elem;
      i++;
    } while (i < end);

    if (i < data.length) {
      setTimeout(insertImagesChunk, 0);
    }
  }

  insertImagesChunk();
}
