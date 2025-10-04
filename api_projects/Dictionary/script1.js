const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");

const fetchWordDefinition = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    displayWordDefinition(data);
  } catch (error) {
    resultContainer.innerHTML = `<p class="text-danger">${error.message}</p>`;
  }
};

const displayWordDefinition = (data) => {
  const wordData = data[0];
  console.log(data);

  // ✅ Audio pronunciation
  let audioBtn = "";
  const audio = wordData.phonetics.find((p) => p.audio);
  if (audio) {
    audioBtn = `<button
        onclick="playAudio('${audio.audio}')"
        class="btn btn-outline-primary mb-2"
      >
        🎧 Play
      </button>`;
  }

  // ✅ First meaning only
  const firstMeaning = wordData.meanings[0];

  // ✅ Limit to 2–3 definitions
  const definitions = firstMeaning.definitions
    .slice(0, 3)
    .map(
      (def, i) => `
      <p><strong>Meaning ${i + 1}:</strong> ${def.definition}</p>
      <p><em>Example:</em> ${def.example || "No example available"}</p>
    `
    )
    .join("<hr>");

  // ✅ Synonyms (limit 5)
  const synonyms = firstMeaning.synonyms.length
    ? firstMeaning.synonyms
        .slice(0, 5)
        .map((s) => `<li>${s}</li>`)
        .join("")
    : "<li>Not available</li>";

  // ✅ Antonyms (limit 5)
  const antonyms = firstMeaning.antonyms.length
    ? firstMeaning.antonyms
        .slice(0, 5)
        .map((a) => `<li>${a}</li>`)
        .join("")
    : "<li>Not available</li>";

  resultContainer.innerHTML = `
    <h2 class="text-primary">Word: ${wordData.word}</h2>
    ${audioBtn}
    <h5 class="text-secondary">Part of Speech: ${firstMeaning.partOfSpeech}</h5>
    ${definitions}
    <div class="d-flex gap-5 mt-3">
      <div>
        <strong>Synonyms:</strong>
        <ul>${synonyms}</ul>
      </div>
      <div>
        <strong>Antonyms:</strong>
        <ul>${antonyms}</ul>
      </div>
    </div>
    <a href="${wordData.sourceUrls[0]}" target="_blank" class="btn btn-primary mt-3">Read More</a>
  `;
};

// ✅ Play audio
function playAudio(url) {
  new Audio(url).play();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (word) fetchWordDefinition(word);
});
