const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("image-container");
const loadMoreButton = document.getElementById("load-more");
let pageNo = 1;
const searchFunction = (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query !== "") {
    pageNo = 1; // Reset to first page on new search
    getImageInformation(query, pageNo);
  } else {
    imageContainer.innerHTML =
      "<p class='text-danger display-6'>Please enter a search term.</p>";
  }
};
const getImageInformation = async (query, pageNo) => {
  try {
    if (pageNo === 1) {
      imageContainer.innerHTML = "<p class='display-3'>Loading...</p>";
      loadMoreButton.classList.add("d-none"); // Hide load more button while loading
    }
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=16&page=${pageNo}&client_id=8Pie5MD7NZQ4obsH2BuKgoyd2mDDwKqJtStKKCdPJYc`
    );
    const data = await response.json();
    displayImages(data);
  } catch (error) {
    imageContainer.innerHTML =
      "<p class='text-danger display-6'>Something went wrong.</p>";
  }
};
const displayImages = (data) => {
  if (data.results.length > 0) {
    const newImages = data.results
      .map(
        (image) => `
            <div class="col-md-3 col-sm-6 col-lg-3 mb-4">
                <div class="card">
                    <img src="${image.urls.small}" class="card-img-top" alt="${
          image.alt_description || "Image"
        }" width="100%" height="200px" />
                    <div class="card-body">
                        <p class="card-text">${
                          image.alt_description || "No description"
                        }</p>
                      <a href="${
                        image.links.html
                      }" target="_blank" class="btn btn-primary">View on Unsplash</a>
                    </div>
                </div>  
            </div>`
      )
      .join("");
    if (pageNo === 1) {
      imageContainer.innerHTML = newImages;
      loadMoreButton.classList.remove("d-none"); // Show load more button if there are results
    } else {
      imageContainer.innerHTML += newImages;
      loadMoreButton.classList.remove("d-none"); // Show load more button if there are more results
    }
  } else {
    imageContainer.innerHTML =
      "<p class='text-danger display-6'>No images found. Try a different search term.</p>";
  }
};
searchForm.addEventListener("submit", searchFunction);
loadMoreButton.addEventListener("click", () => {
  pageNo++;
  const query = searchInput.value.trim();
  getImageInformation(query, ++pageNo);
});

// let Application = "810427";
// let accessKey = "8Pie5MD7NZQ4obsH2BuKgoyd2mDDwKqJtStKKCdPJYc";
// let secretKey = "2So10tBWk3irmkCJA6fh4rzxs8F5TuNJBSf3U3qKcYc";
// const url = `https://api.unsplash.com/photos/?client_id=${accessKey}`;
