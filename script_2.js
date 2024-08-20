// Real-Time News Data API via https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-news-data

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '9e09cb3e92msh7c5f921f5308e17p13ff60jsn6d2ec39a8da0',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
    }
};


const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function fetchWorldNews() {
    const apiUrl = 'https://real-time-news-data.p.rapidapi.com/topic-headlines?topic=WORLD&limit=20&country=US&lang=en';

    try {
        const response = await fetch(apiUrl, options);
        const results = await response.json();
        console.log(results);
        const articles = results.data;
        console.log(articles, "*");
        const articlesWithImages = results.data.filter(data => data.photo_url !== null);
        console.log(articlesWithImages, "$");
        return articlesWithImages;
    } catch (error) {
        console.error("Error fetching World News:", error);
        return [];
    }
}


function displayBlogs(articlesWithImages) {
    blogContainer.innerHTML = "";
    articlesWithImages.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");
        img.src = article.photo_url;
        img.alt = article.title;
        
        const title = document.createElement("h2");
        title.textContent = article.title;
        
        const description = document.createElement("p");
        description.textContent = article.snippet;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        
        blogCard.addEventListener("click", () => {
            window.open(article.link, "_blank");
        });
   
        blogContainer.appendChild(blogCard);
    });
}


(async () => {
    try {
        const articlesWithImages = await fetchWorldNews();
        displayBlogs(articlesWithImages);
    } catch (error) {
        console.error("Error fetching World News", error);
    }
})//();



