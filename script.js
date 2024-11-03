function populatewebsite() {
    var searchParams = new URLSearchParams(window.location.search);
    var lang;
    var cat;

    if(searchParams.has("lang") == true) {
        lang = searchParams.get("lang");
    } else {
        lang = "en";
    }

    if(searchParams.has("categories") == true) {
        cat = searchParams.get("categories");
    } else {
        cat = "all";
    }

    getwebsitelistdata(lang, cat);
}

async function gettextfilecontents(filepath) {
    const textURL = filepath;

    const textRequest = new Request(textURL);

    const response = await fetch(textRequest);
    const responsetext = await response.text();

    printfilecontents(responsetext);
}

function printfilecontents(text) {
    alert(text);
}

async function getwebsitelistdata(lang, category) {
    const listURL = `/websitelist-${lang}.json`

    const listRequest = new Request(listURL);

    const response = await fetch(listRequest);
    const responsejson = await response.json();

    fillwebsitelist(responsejson, category);
    createtitlebar(responsejson);
    createbottombar(responsejson);
    createdropdown(responsejson, category);
}

function fillwebsitelist(list, category) {
    const section = document.querySelector("list");
    if(section != null) {
        var ino = 0;
        var websitelist = list.websites;

        websitelist = websitelist.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
        });

        for(const website of websitelist) {
            for(const lcategory of website.categories) {
                if(lcategory === category) {
                    ino++;

                    const siteHead = document.createElement("h2");
                    const siteDesc = document.createElement("p");
                    const siteLink = document.createElement("a");
                    const siteDiv = document.createElement("div");
                
                    siteDiv.classList.add("websitelisting");
                    siteDiv.classList.add(`listing-i${ino}`);

                    siteLink.href = `${website.url}`;
                    //siteLink.title = "The Neocities website"; // hover text

                    siteHead.textContent = `${website.name}`;
                    siteDesc.textContent = `${website.description}`;

                    siteLink.appendChild(siteHead);
                    siteDiv.appendChild(siteLink);
                    siteDiv.appendChild(siteDesc);
                    section.appendChild(siteDiv);
                }
            }
        }
    }
}

function createtitlebar(data) {
    const titlebar = document.querySelector("titlebar");
    if(titlebar != null) {
        titlebar.innerHTML = `
        <div id="titlebar">
        <header>
            <h1>${data.site_name}</h1>
            <p><b>${data.site_tagline}</b></p>
        </header>
        </div>

        <div id="navbar">
            <a href="/index.html">${data.site_page_list}</a>
            <a href="/about.html">${data.site_page_about}</a>
            <a href="/community.html">${data.site_page_community}</a>
        </div>
        `
    }
}

function createbottombar(data) {
    var availtags = ["More spaces for more creatures.", "Hope.", "the front fell off", "do not spell icup", "andtrolis", "whatismarxism"];
    const bottombar = document.querySelector("bottombar");
    if(bottombar != null) {
        bottombar.innerHTML = `
        <div id="bottombar-div">
            <hr>
            <p>${data.site_copyright}</p>
            <p>${data.site_gpl}</p>
            <p>${availtags[Math.floor(Math.random() * availtags.length)]}</p>
        </div>
        `
    }
}

function createdropdown(data, category) {
    const dropdown = document.querySelector("dropdown");
    if(dropdown != null) {
        dropdown.innerHTML = `
        <div id="upselectthing">
            <form action="/index.html">
                <label for="langselect">Select translation:</label>
                <select name="lang" id="langselect">
                    <option value="${data.site_lang}"> - </option>
                    <option value="en">English</option>
                    <option value="pt">Português do Brasil</option>
                </select>
                <br>
                <label for="catselect">Select category:</label>
                <select name="categories" id="catselect">
                    <option value="${category}"> - </option>
                    <option value="all">${data.site_catname_all}</option>
                    <option value="leftcom">${data.site_catname_leftcom}</option>
                    <option value="archive">${data.site_catname_archive}</option>
                    <option value="itleft">${data.site_catname_itleft}</option>
                    <option value="coleft">${data.site_catname_coleft}</option>
                    <option value="esleft">${data.site_catname_esleft}</option>
                    <option value="scileft">${data.site_catname_scileft}</option>
                    <option value="communization">${data.site_catname_communization}</option>
                    <option value="autonomiarel">${data.site_catname_autonomiarel}</option>
                    <option value="situationist">${data.site_catname_situationist}</option>
                    <option value="icp">${data.site_catname_icp}</option>
                </select>
                <input type="submit" value="Submit">
            </form>
            <hr>
        </div>
        `
    }
}

populatewebsite();