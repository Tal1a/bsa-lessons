function get_Articles(url) {
    return fetch(url)
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject(new Error(response.statusText));
            }
            return Promise.resolve(response)
        }).then(response => {
            return response.json();
        }).then(json => {
            return json.data;
        });
}

function matArticles(articles, query, tags) {
    let cnt = (article) => {
        var count = 0;
        for (let tag of tags) {
            if (article.tags.indexOf(tag) >= 0) {
                count++;
            }
        }
        return count;
    };
    let cmp = (a, b) => {
        let result = cnt(b) - cnt(a);
        if (result == 0) {
            result = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return result;
    };
    if (query.length > 0) {
        articles = articles.filter(article => article.title.includes(query) || article.description.includes(query));
    }
    return articles.sort(cmp);
}

function matchAarticlesget() {
    let query = document.getElementById("query");
    let tags = JSON.parse(localStorage.getItem("tags") || "[]");
    return matArticles(allArticles, query.value, tags);
}

function createArticleDiv(article) {
    let div = document.createElement('div');
    div.className = 'article';

    let title = document.createElement('div');
    title.className = 'title';
    title.textContent = article.title;

    let description = document.createElement('div');
    description.className = 'description';
    description.textContent = article.description;

    let date = document.createElement('div');
    date.className = 'date';
    date.textContent = new Date(article.createdAt).toLocaleString();

    let remove = document.createElement('a');
    remove.className = 'remove';
    remove.textContent = 'Delete';
    remove.onclick = () => {
        delete allArticles[allArticles.indexOf(article)];
        updateAllArticleDivs();
    };

    let tags = document.createElement('div');
    tags.className = 'tags';


    tags.textContent = article.tags.join(', ');

    let image = document.createElement('img');
    image.className = 'image';
    image.src = article.image;
    div.appendChild(image);

    let content = document.createElement('div');
    content.className = 'content';

    content.appendChild(title);
    content.appendChild(description);


    content.appendChild(date);
    content.appendChild(remove);
    content.appendChild(tags);
    div.appendChild(content);


    return div;
}

function showArticle_Div(articleDiv) {
    let articles = document.getElementById('articles');
    articles.appendChild(articleDiv);
}

function updateAllArticleDivs() {
    let articles = document.getElementById('articles');
    while (articles.firstChild) {


        articles.removeChild(articles.firstChild);
    }

    let matched = matchAarticlesget();
    let sliced = matched.slice(0, numberOfShownArticles);
    for (let article of sliced) {
        let articleDiv = createArticleDiv(article);
        showArticle_Div(articleDiv);
    }
}

var numberOfShownArticles = 0;

function showNextten(articles) {
    if (numberOfShownArticles >= articles.length) {
        return;
    }
    let sliced = articles.slice(numberOfShownArticles, numberOfShownArticles + 10);
    for (let article of sliced) {
        let articleDiv = createArticleDiv(article);
        showArticle_Div(articleDiv);
    }
    numberOfShownArticles += 10;
}

function handlescroll() {
    var sleep = false;
    window.onscroll = () => {
        if (document.body.scrollTop + window.innerHeight > document.body.clientHeight - 50) {
            if (!sleep) {
                sleep = true;
                let matched = matchAarticlesget();


                showNextten(matched);
                setTimeout(() => sleep = false, 200);
            }
        }
    }
}


function updateArtOnquery() {
    let query = document.getElementById("query");
    query.oninput = () => {
        var sleep = false;
        if (!sleep) {
            sleep = true;
            setTimeout(() => {
                updateAllArticleDivs();
                sleep = false;
            }, 200);
        }
    }
}

function appSel_fromSavedTags() {
    let tags = JSON.parse(localStorage.getItem("tags") || "[]");
    let tagElements = document.getElementById("tags");
    for (let tagElement of tagElements.childNodes) {
        if (tags.indexOf(tagElement.textContent) >= 0) {
            tagElement.className = "selected"
        }
    }
}

function updateArticlesTgChange() {
    let tagElements = document.getElementById("tags");
    for (let tagElement of tagElements.childNodes) {
        tagElement.onclick = () => {
            let tags = JSON.parse(localStorage.getItem("tags") || "[]");
            if (tagElement.className == "selected") {
                tagElement.className = "";
                delete tags[tags.indexOf(tagElement.textContent)];

            } else {
                tags.push(tagElement.textContent);


                tagElement.className = "selected"
            }
            localStorage.setItem("tags", JSON.stringify(tags));
            updateAllArticleDivs();
        }
    }
}

var allArticles = [];

function start() {
    get_Articles('https://api.myjson.com/bins/152f9j')
        .then((articles) => {
            allArticles = articles;

            let matched = matchAarticlesget();
            showNextten(matched);

            updateArtOnquery();
            handlescroll();

            appSel_fromSavedTags();
            updateArticlesTgChange();
        })
        .catch((error) => console.log('Error', error));
}



