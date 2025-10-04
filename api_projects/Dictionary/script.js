const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");

const fetchWordDefinition = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      throw new Error("Word not found");
    } else {
      const data = await response.json();
      console.log(data);
      displayWordDefinition(data);
    }
  } catch (error) {
    resultContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
};

const displayWordDefinition = (data) => {
  const wordData = data[0];
  const meaning = wordData.meaning;
  const phonetic = wordData.phonetics;
  // Find the audio URL
  let audioBtn = "";
  const audio = phonetic.find((p) => p.audio);
  if (audio) {
    audioBtn = `<button
        onclick="playAudio('${audio.audio}')"
        class="btn btn-outline-primary mb-2"
      >
        🎧 Play
      </button>`;
  } else {
    audioBtn = `<p>No audio available</p>`;
  }
  const firstMeaning = wordData.meanings[0];
  const definitions = firstMeaning.definitions
    .slice(0, 3)
    .map(
      (def, i) => `
      <p><strong>Meaning ${i + 1}:</strong> ${def.definition}</p>
      <p><strong>Example ${i + 1}:</strong> ${
        def.example || "No example available"
      }</p>
    `
    )
    .join("<hr />");
  const synonyms =
    firstMeaning.synonyms.length > 0
      ? firstMeaning.synonyms
          .slice(0, 5)
          .map(
            (s) => `<span class="badge bg-secondary m-1 p-2 px-3">${s}</span>`
          )
          .join("")
      : "<li>Not available</li>";
  const antonyms =
    firstMeaning.antonyms.length > 0
      ? firstMeaning.antonyms
          .slice(0, 5)
          .map(
            (a) => `<span class="badge bg-secondary m-1 p-2 px-3">${a}</span>`
          )
          .join("")
      : "<li>Not available</li>";
  const sourceUrls = wordData.sourceUrls
    ? wordData.sourceUrls
        .map((url) => `<a href="${url}" target="_blank">${url}</a>`)
        .join(", ")
    : "Not available";
  resultContainer.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
    <h2 class="text-primary">Word: ${wordData.word}</h2>
    ${audioBtn}
    </div>
    <h5 class="text-secondary">Part of Speech: ${firstMeaning.partOfSpeech}</h5>
    ${definitions}
      <div>
        <strong>Synonyms:</strong>
        <ul>${synonyms}</ul>
      </div>
      <div>
        <strong>Antonyms:</strong>
        <ul>${antonyms}</ul>
    </div>
    <div class="mt-4">
    <a href="${wordData.sourceUrls[0]}" target="_blank" class="btn btn-primary">Read More</a>
    </div>
  `;
};

// Play audio for the given URL
const playAudio = (url) => {
  const audio = new Audio(url);
  audio.play();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (word !== "") {
    fetchWordDefinition(word);
  } else {
    resultContainer.innerHTML = `<p class="text-danger">Please enter a word to search.</p>`;
  }
});
