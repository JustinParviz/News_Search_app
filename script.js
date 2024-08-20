// NewsAPI via https://newsapi.org/

const apiKey = "3d2716374a2447d9b93598ad74f02ef3"

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchTopNews(category) {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=20&sortBy=popularity&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status !== "ok") {
            console.error(`Error fetching top news by category ${category}:`, data);
            return [];
        } 
        return data.articles;
    } catch (error) {
        console.error(`Error fetching top news by category ${category}`, error);
        return [];
    }
}

async function fetchAllTopNews() {
    const categories = ["business", "entertainment", "health", "science", "sports", "technology"];
    const allNews = {};

    for (const category of categories) {
        const articles = await fetchTopNews(category);
        console.log(articles, "***");
        const articlesWithImages = articles.filter(article => article.urlToImage !== null);
        console.log(articlesWithImages, "!!");
        allNews[category] = articlesWithImages;
    }

    return allNews;
}

// fetchAllTopNews().then(allNews => {
//     console.log("All top news by category:", allNews);
// });


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
        console.error("Error fetching news", error);
        return [];
    }
}


function displayBlogs(allNews) {
    blogContainer.innerHTML = "";

    const articlesWithImages = Object.values(allNews).flat();

    articlesWithImages.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const allNews = await fetchAllTopNews();
        console.log("All top news by category:", allNews);
        displayBlogs(allNews);
    } catch (error) {
        console.error("Error fetching all top news", error);
    }
})//();


