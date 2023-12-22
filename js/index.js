var cx = 'c000e88cdcd0346e1';
var apiKey = 'AIzaSyD7w7FxWJuDF4K9XLUGEj144YjryKyMg-I'; 
var searchType = 'SEARCH_TYPE_UNDEFINED';
var url = '';
var start = 1;
var num = 10;

function search(query, startIndex) {
  startIndex = startIndex || 1;
  url = 'https://www.googleapis.com/customsearch/v1?q=' + query + '&cx=' + cx + '&key=' + apiKey + '&searchType=' +
    searchType + '&start=' + startIndex + '&num=' + num;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      if (searchType === 'SEARCH_TYPE_UNDEFINED') {
        var results = data.items;
        var html = '';
        for (var i = 0; i < results.length; i++) {
          html += '<h3><a href="' + results[i].link + '" target="resultFrame">' + results[i].title + '</a></h3>';
          html += '<p>' + results[i].snippet + '</p>';
        }
        document.getElementById('search-results').innerHTML = html;
        document.getElementById('resultFrame').style.display = 'none'; // Hide the iframe by default

        // Add "Load more" button if there are more results
        if (data.queries.nextPage) {
          var nextIndex = startIndex + num;
          var buttonHtml = '<button id="load-more" data-start="' + nextIndex + '">Load more</button>';
          document.getElementById('search-results').insertAdjacentHTML('beforeend', buttonHtml);
          document.getElementById('load-more').addEventListener('click', function (event) {
            event.preventDefault();
            var nextStartIndex = this.getAttribute('data-start');
            search(query, nextStartIndex);
          });
        }
      } else if (searchType === 'image') {
        var items = data.items;
        var html = '';
        for (var i = 0; i < items.length; i++) {
          html += '<a href="' + items[i].link + '" target="_blank"><img src="' + items[i].image
            .thumbnailLink + '"></a>';
        }
        document.getElementById('search-results').innerHTML = html;
        document.getElementById('resultFrame').style.display = 'none'; // Hide the iframe by default

        // Add "Load more" button if there are more results
        if (data.queries.nextPage) {
          var nextIndex = startIndex + num;
          var buttonHtml = '<button id="load-more" data-start="' + nextIndex + '">Load more</button>';
          document.getElementById('search-results').insertAdjacentHTML('beforeend', buttonHtml);
          document.getElementById('load-more').addEventListener('click', function (event) {
            event.preventDefault();
            var nextStartIndex = this.getAttribute('data-start');
            search(query, nextStartIndex);
          });
        }
      }
    } else if (xhr.status === 400) {
      alert('Bad Request. Please try again later.');
    } else if (xhr.status === 429) {
      setTimeout(function () {
        search(query, startIndex);
      }, 1000); // Delay for 1 second before retrying
    } else {
      alert('Request failed. Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  var query = document.getElementById('query').value;
  search(query);
});

document.getElementById('toggle-results').addEventListener('click', function (event) {
  event.preventDefault();
  if (searchType === 'SEARCH_TYPE_UNDEFINED') {
    searchType = 'image';
    document.getElementById('toggle-results').textContent = 'All';
  } else {
    searchType = 'SEARCH_TYPE_UNDEFINED';
    document.getElementById('toggle-results').textContent = 'Images';
  }
  start = 1; // reset start to 1 for new search
  search(document.getElementById('query').value);
});

document.getElementById('search-results').addEventListener('click', function (event) {
  if (event.target.id === 'load-more') {
    event.preventDefault();
    var nextStartIndex = parseInt(event.target.getAttribute('data-start'));
    search(document.getElementById('query').value, nextStartIndex);
  } else if (event.target.tagName === 'A') {
    document.getElementById('resultFrame').style.display = 'block'; // Show the iframe when a link is clicked
  }
});



const suggests = document.querySelectorAll('.suggest');


const input = document.querySelector('#query');


suggests.forEach(function (suggest) {
	suggest.addEventListener('click', function (event) {

		event.preventDefault();


		const suggestion = this.textContent.trim();

		input.value = suggestion;
	});
});



let currentTheme = localStorage.getItem("mytheme") || "default";

setTheme("default", currentTheme);

const themeButtons = document.querySelectorAll(".theme-button");

themeButtons.forEach(button => {
	if (button.dataset.theme === currentTheme) {
		button.classList.add("active");
	}

	button.addEventListener("click", function () {
		const newTheme = this.dataset.theme;
		setTheme(currentTheme, newTheme);

		themeButtons.forEach(button => {
			button.classList.remove("active");
		});

		this.classList.add("active");
	});
});

function setTheme(oldTheme, newTheme) {
	const body = document.getElementsByTagName("body")[0];

	body.classList.remove(oldTheme);
	body.classList.add(newTheme);

	currentTheme = newTheme;


	localStorage.setItem("mytheme", newTheme);


	const logo = document.getElementById("logo");
	if (newTheme === "light") {
		logo.src = "img/logo.png";
	} else {
		logo.src = "img/logo2.png";
	}

	const logo2 = document.getElementById("logo2");
	if (newTheme === "light") {
		logo2.src = "img/white.png";
	} else {
		logo2.src = "img/logo2.png";
	}
}


function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
