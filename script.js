const apiKey = "3d2716374a2447d9b93598ad74f02ef3"

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const articlesWithImages = data.articles.filter(article => article.urlToImage !== null); 
        return articlesWithImages;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articlesWithImages = await fetchNewsQuery(query);
            displayBlogs(articlesWithImages);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query, pageSize = 20) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status === "ok") {
            const articlesWithImages = data.articles.filter(article => article.urlToImage !== null);
            return articlesWithImages;
        } else {
            throw new Error(`NewsAPI error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articlesWithImages) {
    blogContainer.innerHTML = "";
    articlesWithImages.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        // const truncatedTitle =
        //     article.title.length > 30
        //         ? article.title.slice(0, 30) + "...."
        //         : article.title;
        title.textContent = article.title;
        const description = document.createElement("p");
        // const truncatedDes =
        //     article.description.length > 120
        //         ? article.description.slice(0, 120) + "...."
        //         : article.description;
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        // console.log(img.src, "*")   //** Added this **
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articlesWithImages = await fetchRandomNews();
        displayBlogs(articlesWithImages);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();


