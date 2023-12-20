var siteNameInput = document.getElementById('site-name')
var siteUrlInput = document.getElementById('site-url')
var boxInfo = document.getElementById('boxInfo');

var siteList = [];

if(localStorage.getItem('bookmarks') !== null) {

    siteList = JSON.parse( localStorage.getItem('bookmarks') );
    displayBookMark();

}

function addBookMark() {
    
   if(validateSiteName() === true && validateUrl() === true) {
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    };

    siteList.push(site);

    clearInputs();

    localStorage.setItem('bookmarks', JSON.stringify(siteList));

    displayBookMark();
   } else {
    boxInfo.classList.replace('d-none', 'd-block');
   }

}

function displayBookMark() {
    var siteBox = "";

    for(var i = 0; i < siteList.length; i++) {
        siteBox += `<tr>
        <td>${i+1}</td>
        <td>${siteList[i].name}</td>
        <td><button class="btn-visit btn text-white" onclick=" visitWebsite(${i})"><i class="fa-regular fa-eye"></i> Visit</button></td>
        <td><button class="btn-delete btn text-white bg-danger" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }

    document.getElementById('tableBody').innerHTML = siteBox;
}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function deleteBookMark(index) {
    siteList.splice(index, 1);

    localStorage.setItem('bookmarks', JSON.stringify(siteList));
    displayBookMark();
}

function validateSiteName() {
    var siteNameRegex = /^\w{3,}(\s+\w+)*$/;

    if (siteNameRegex.test(siteNameInput.value) === true) {
        return true;
    } else {
        return false;
    }
}

function validateUrl() {
    var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

    if (urlRegex.test(siteUrlInput.value) === true) {
        return true;
    } else {
        return false;
    }
}

function closeBoxInfo() {
    boxInfo.classList.replace('d-block', 'd-none');
}

function visitWebsite(index) {
    var httpsRegex = /^https?:\/\//;

    if (httpsRegex.test(siteList[index].url) === true) {
        open(siteList[index].url);
    } else {
        open(`https://${siteList[index].url}`);
    }
}