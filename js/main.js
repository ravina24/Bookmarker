// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark); // submit is the event, saveBookmark is function that happens

function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById('siteName').value; // .value so html code is not logged
  var siteURL = document.getElementById('siteURL').value;

  // check validity of form
  if(!isValidForm(siteName, siteURL)) {
    //clear form
    var form = document.getElementById('myForm');
    form.reset();
    
    return false;
  }

  // create bookmark object
  var bookmark = {
    name: siteName,
    url : siteURL
  }

  // check if local storage contains previous bookmarks
  if(localStorage.getItem('bookmarks') === null) {
    // initialize array
    var bookmarks = [];
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // get array in string format and parse the JSON
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //clear form
  var form = document.getElementById('myForm');
  form.reset();

  // fetch bookmarks to show newly added bookmark
  fetchBookmarks();

  // Prevents form from submitting
  e.preventDefault(); // so result stays instead of flashing
}

// if name and url are filled in and url is valid, return true. False otherwise
function isValidForm(siteName, siteURL) {
  if(!siteName && !siteURL) {
    alert("Please fill in the form");
    return false;
  } else if(!siteName) {
      alert("Please enter a site name");
      return false;
  } else if(!siteURL) {
      alert("Please enter a site url");
      return false;
  } else if(!isURL(siteURL)) {
    alert("Please enter a valid url of the format 'https://resourcename' or 'http://resourcename'");
    return false;
  }
  return true;
}

// returns true if url is a valid url, false otherwise
function isURL(url) {
  // taken from https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  return url.match(regex);
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // find index of bookmark to remove
  for(var i = 0; i < bookmarks.length; i++) {
    var bookmarkURL = bookmarks[i].url;

    if(bookmarkURL === url) {
      bookmarks.splice(i, 1);
    }
  }
  // reset local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // reload bookmarks to display changes
  fetchBookmarks();

}

// Fetch bookmarks from localStorage
function fetchBookmarks() {

    try {
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

      // display bookmarks below form
      var bookmarksResults = document.getElementById('bookmarksResults');

      // puts given html into original element through javaScript
      bookmarksResults.innerHTML = '';

      // loop through bookmarks and display them
      for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += "<div class='list-group-item'>" +
                                        "<h3>" + name + "  " +
                                        "<a class='btn btn-secondary' target=_blank href='"+url+"'>Visit</a> " +
                                        "<a class='btn btn-danger' href='#' onclick='deleteBookmark(\""+url+"\")'>Delete</a> " +
                                        "</h3>" +
                                        "</div>";
      }
    } catch (err) {
      console.log("No bookmarks yet!");
    }
}

/* Local Storage Test (only stores strings)
  // set
  localStorage.setItem('test', 'Hello World'); // key, value
  // get
  console.log(localStorage.getItem('test')); // key
  // delete
  localStorage.removeItem('test');
*/
