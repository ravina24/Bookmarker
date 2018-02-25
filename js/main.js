// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark); // submit is the event, saveBookmark is function that happens

function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById('siteName').value; // .value so html code is not logged
  var siteURL = document.getElementById('siteURL').value;

  // bookmark object that will eventually be added to array in local storage
  var bookmark = {
    name: siteName,
    url : siteURL
  }

  // check if local storage contains bookmarks
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

  // Prevents form from submitting
  e.preventDefault(); // so result stays instead of flashing
}

// Fetch bookmarks from localStorage
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);

}

/* Local Storage Test (only stores strings)
  // set
  localStorage.setItem('test', 'Hello World'); // key, value
  // get
  console.log(localStorage.getItem('test')); // key
  // delete
  localStorage.removeItem('test');
*/
