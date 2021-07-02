let searchInput = document.getElementById("searchInput");
let selectDisplayCount = document.getElementById("selectDisplayCount");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let book = 10;

function getBookDetails(event) {
    if (event.key === "Enter") {
        let options = {
            method: "GET"
        };

        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value + "&maxResults=" + 1;

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;

                for (let booksDetails of search_results) {
                    let selectValue = searchInput.value;
                    let titleValues = booksDetails.title;

                    let result = titleValues.includes(selectValue);
                    if (result) {
                        getDropdown();
                    } else {
                        searchResults.textContent = "";
                        let containerElement = document.createElement("div");
                        containerElement.classList.add("col-12");
                        searchResults.appendChild(containerElement);

                        let innerHeadingEl = document.createElement("h1");
                        innerHeadingEl.textContent = "No results found";
                        innerHeadingEl.classList.add("text-center");
                        innerHeadingEl.classList.add("mt-3", "mb-3", "inner-heading");
                        containerElement.appendChild(innerHeadingEl);
                    }
                }
            });
    } else {
        searchResults.textContent = "";
        let containerElement = document.createElement("div");
        containerElement.classList.add("col-12");
        searchResults.appendChild(containerElement);

        let innerHeadingEl = document.createElement("h1");
        innerHeadingEl.textContent = "No results found";
        innerHeadingEl.classList.add("text-center");
        innerHeadingEl.classList.add("mt-3", "mb-3", "inner-heading");
        containerElement.appendChild(innerHeadingEl);
    }
}

function getDropdown() {
    if (searchInput.value !== "") {
        spinner.classList.toggle("d-none");
        book = parseInt(selectDisplayCount.value);
        searchResults.textContent = "";

        let containerElement = document.createElement("div");
        containerElement.classList.add("col-12");
        searchResults.appendChild(containerElement);

        let innerHeadingEl = document.createElement("h1");
        innerHeadingEl.textContent = "Popular Books";
        innerHeadingEl.classList.add("mt-3", "mb-3", "inner-heading");
        containerElement.appendChild(innerHeadingEl);

        let options = {
            method: "GET"
        };

        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value + "&maxResults=" + book;

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                let searchIp = searchInput.value;

                for (let booksDetails of search_results) {
                    getBooks(booksDetails);
                }
                spinner.classList.toggle("d-none");
            });
    } else {
        searchResults.textContent = "";
        let containerElement = document.createElement("div");
        containerElement.classList.add("col-12");
        searchResults.appendChild(containerElement);

        let innerHeadingEl = document.createElement("h1");
        innerHeadingEl.textContent = "No results found";
        innerHeadingEl.classList.add("text-center");
        innerHeadingEl.classList.add("mt-3", "mb-3", "inner-heading");
        containerElement.appendChild(innerHeadingEl);
    }
}

function getBooks(bookDetails) {
    let {
        title,
        imageLink,
        author
    } = bookDetails;
    let listContainerEl = document.createElement("div");
    listContainerEl.classList.add("col-6");
    searchResults.appendChild(listContainerEl);

    let innerContainerEl = document.createElement("div");
    innerContainerEl.classList.add("text-center");
    listContainerEl.appendChild(innerContainerEl);

    let imgEl = document.createElement("img");
    imgEl.classList.add("w-100", "img-fluid");
    imgEl.src = imageLink;
    innerContainerEl.appendChild(imgEl);

    let paraEl = document.createElement("p");
    paraEl.textContent = author;
    innerContainerEl.appendChild(paraEl);
}

selectDisplayCount.addEventListener("change", getDropdown);
searchInput.addEventListener("keydown", getBookDetails);