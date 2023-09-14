let savedItems = [];

// Function to save an item reference to local storage
function saveItem(itemId, content) {
    let savedItemsInLocalStorage = JSON.parse(localStorage.getItem('savedItems')) || [];

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("savedItems", JSON.stringify(savedItems));
        sessionStorage.setItem("hasCodeRunBefore", true);
    }

    // Check if the item is already in localStorage
    if (savedItemsInLocalStorage.includes(itemId)) {
        alert("This item is already saved.");
        return;
    }
    
    // If the item is not in localStorage, proceed with saving it
    savedItemsInLocalStorage.push(itemId);
    localStorage.setItem('savedItems', JSON.stringify(savedItemsInLocalStorage));
    localStorage.setItem(itemId, content);
    displaySavedItemCount();
}


// Function to display saved items on the "save-for-later.html" page
function displaySavedItems() {
    const savedItemsList = document.getElementById('savedItemsList');
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    // Clear the list before re-rendering
    savedItemsList.innerHTML = '';

    // Render saved items based on references
    savedItems.forEach(itemId => {
        const content = localStorage.getItem(itemId);
        if (content) {
            const li = document.createElement('li');
            // Use innerHTML to render HTML content correctly
            li.innerHTML = content;
            savedItemsList.appendChild(li);
        }
    });
}

// Function to count and display the number of saved items
function displaySavedItemCount() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const itemCount = savedItems.length;

    // Log savedItems to the console for debugging
    console.log(savedItems);

    alert(`You have ${itemCount} items saved for later.`);
}

// Event listener for the "Save for Later" buttons
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button[data-item-id]");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const itemId = button.getAttribute("data-item-id");
            const saveForLaterSection = button.closest(".save-for-later-section");

            // Check if saveForLaterSection is valid
            if (saveForLaterSection) {
                let savedButton = saveForLaterSection.querySelector(`button[data-item-id="${itemId}"]`)
                saveForLaterSection.removeChild(savedButton);
                const content = saveForLaterSection.innerHTML;
                saveForLaterSection.appendChild(savedButton);

                // Save the item reference
                saveItem(itemId, content);
            } else {
                // Handle the case where saveForLaterSection is null or undefined
                console.error("saveForLaterSection is null or undefined");
            }
        });
    });
});


// Display saved items when the "save-for-later.html" page loads
if (window.location.pathname.includes('save-for-later.html')) {
    displaySavedItems();
}

// Accept comments and display them on the save-for-later page
function getComment(event) {
    // Prevent the form from submitting the traditional way to avoid a page reload
    event.preventDefault();

    let userName = document.getElementById("name").value;
    let userEmail = document.getElementById("email").value;
    let userComment = document.getElementById("comment").value;

    let li = document.createElement("li");
    li.innerText = `Name: ${userName} \nEmail: ${userEmail} \nComment: ${userComment}`;
    li.id = "comment";

    document.getElementById("comments-list").appendChild(li);
    
    // Clear the form fields after submitting a comment
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("comment").value = '';
}

// Sliding animation
$(document).ready(function(){
    $(window).scroll(function() {
      $('.animation-element').each(function(){
        checkSlide($(this));
      });
    });
  });
  
  function checkSlide(elem) {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();
  
    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();
  
    if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
      $(elem).animate({
        opacity: 1,
        left: "0px",
      }, 500, function(){
      });
    }
  }  
 
let likeCounts = {};  

// Like Button Functionality
$(document).ready(function() {
    let likeCounts = {};

    $('.like-btn').each(function(index) {
        let likeBtn = $(this);
        likeBtn.attr('data-like-id', index);
        likeCounts[index] = 0;
    });

    $('.like-btn').on('click', function() {
        let likeId = $(this).attr('data-like-id');
        likeCounts[likeId] += 1;
        $(this).text('Like (' + likeCounts[likeId] + ')');
    });
});

$('.like-btn').on('click', function() {
    let likeId = $(this).attr('data-like-id');
    likeCounts[likeId] += 1;
    $(this).text('Like (' + likeCounts[likeId] + ')').toggleClass('liked');
});

// Hiding/Showing Function
$(document).ready(function() {
    $('.toggle-button').on('click', function() {
      $('.content-to-toggle').toggle();
    });
  });

// Dropdown Menu 
$(document).ready(function() {
    $('nav ul li').hover(
      function() {
        $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
      },
      function() {
        $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
      }
    );
  });

// Chained Effects
$(document).ready(function() {
    $('#effect-button').click(function() {
      $('#affected-content')
        .slideUp(1000)
        .slideDown(1000)
        .hide(1000)
        .show(1000);
    });
  });