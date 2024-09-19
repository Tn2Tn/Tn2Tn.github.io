(function() {
  // The HTML structure remains the same
  const popupHTML = `
    <div id="mailing-list-lightbox" style="display:none;">
      <div id="mailing-list-lightbox-content" class="container">
        <button id="mailing-list-lightbox-close" class="close-btn">&times;</button>
        <div id="mailing-list-popup-container" class="left">
          <div class="left-info">
            <h1>Stay updated!</h1>
            <p>Join our mailing list to know when we release new episodes</p>
          </div>
          <form id="mailing-list-signup-form" class="form-item"  method="POST">
          <input type="hidden" name="access_key" value="63510e4d-ea93-4d51-b6a6-b73351946c98">
          <input type="hidden" name="subject" value="Please add me to mailing list">
                      <label for="mailing-list-email-input">Name</label>
            <input type="text" name="Name" placeholder="Steve" required>
                       <label for="mailing-list-email-input">Email address <span class="invalid-email">Valid email required</span> </label>
            <input type="email" name="email" id="mailing-list-email-input" placeholder="email@company.com" required>
                      <label for="mailing-list-email-input">Phone number</label>
            <input type="tel" name="phone" placeholder="+44 123456">
            <button type="submit">Subscribe to mailing list</button>
             <div id="result"></div>
          </form>
          <button id="already" style="text-align: center;text-decoration-line: underline;margin-left: auto;margin-right: auto;color:white;font-size: 12px;">Already subscribed</button>
        </div>
      </div>
    </div>
  `;

 


  // Updated CSS styles
  const styles = `
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
    :root {
      --dark-slate-grey: hsl(225, 7%, 89%);
      --charcoal-grey: hsl(204, 9%, 11%);
      --grey: hsl(231, 7%, 60%);
      --white: hsl(203, 9%, 28%);
      --tomato: hsl(4, 100%, 67%);
    }
    #mailing-list-lightbox {
      display: none;
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      font-family: "Roboto", sans-serif;
      /* Flex properties for vertical centering */
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #mailing-list-lightbox-content {
      background-color: var(--white);
      padding: 1.5rem;
      border-radius: 1.5rem;
      max-width: 450px;
      width: 90%;
      position: relative;
    }
    #mailing-list-popup-container {
      color: var(--dark-slate-grey);
      padding: 2rem 1.5rem;
    }
    .left-info h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .left-info p {
      margin-bottom: 1.5rem;
    }
    .form-item {
      display: flex;
      flex-direction: column;
    }
    .form-item label {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
    .form-item label .invalid-email {
      color: var(--tomato);
      display: none;
    }
    .form-item label .invalid-email.active {
      display: block;
    }
      
    .form-item input,
    .form-item button {
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      color: white; /* Set the text color to white */
    }
    .form-item input {
      border: 1px solid var(--grey);
    }
    .form-item input.active {
      background-color: rgba(255, 98, 87, 0.2);
      border: 1px solid var(--tomato);
    }
    .form-item button {
      cursor: pointer;
      background: var(--dark-slate-grey);
      color: var(--white);
      font-weight: 700;
      outline: none;
      border: none;
    }
    .form-item button:hover {
      background: linear-gradient(127deg, rgb(57, 224, 160) 40%, rgb(57, 163, 224) 70%);
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: transparent;
      border: none;
      color: var(--dark-slate-grey);
      font-size: 24px;
      cursor: pointer;
      width: 40px;
      height: 40px;
    }
    .close-btn:focus {
      outline: none;
    }
    @media (max-width: 768px) {
      #mailing-list-lightbox-content {
        width: 90%;
        max-height: 90%;
        overflow-y: auto;
      }
      .left-info h1 {
        font-size: 2rem;
        margin: 10px 0 15px;
      }
    }
  `;
  var today = new Date();
  // Function to create the lightbox and popup
  function createMailingListPopup() {

    // Add the HTML to the body
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Add the CSS styles
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Get the necessary elements
    const lightbox = document.getElementById('mailing-list-lightbox');
    const lightboxClose = document.getElementById('mailing-list-lightbox-close');
    const already = document.getElementById('already');
    const signupForm = document.getElementById('mailing-list-signup-form');
    const emailInput = document.getElementById('mailing-list-email-input');

    // Function to show the popup
    function showPopup() {
      lightbox.style.display = 'flex';  // Changed from 'block' to 'flex'
    }

    // Close the popup when the close button is clicked or outside the popup is clicked
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.cookie = "list=" + today.toISOString() + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
    });

    already.addEventListener('click', (event) => {
      lightbox.style.display = 'none';
      document.cookie = "list=subscribed" + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure"
    });

    window.addEventListener('click', (event) => {
      if (event.target == lightbox) {
        lightbox.style.display = 'none'; 
        document.cookie = "list=" + today.toISOString() + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
      }
    });

    // Handle form submission
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateEmail(emailInput.value)) {
        // Here, you can add code to handle the form submission, such as sending the email to a server
        console.log('Email submitted:', emailInput.value);
        lightbox.style.display = 'none';
        document.cookie = "list=subscribed" + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
      } else {
        emailInput.classList.add('active');
        emailInput.parentElement.querySelector('.invalid-email').classList.add('active');
      }
    });

    // Email validation function
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    // Remove error styling on input focus
    emailInput.addEventListener('focus', () => {
      emailInput.classList.remove('active');
      emailInput.parentElement.querySelector('.invalid-email').classList.remove('active');
    });

    // Expose the showPopup function globally
    window.showMailingListPopup = showPopup;
  }

  // Call the function to create the popup
  createMailingListPopup();



  //cookies

  var cookies = document.cookie
      .split('; ')
      .map(cookie => cookie.split('='))
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

  // Check if the cookie 'list' is already set
  if (!cookies.hasOwnProperty('list')) {
      // If the cookie is not set, set it to 'unsubscribed'
      document.cookie = "list=unsubscribed" + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
      window.showMailingListPopup();
  }

  // Function to show popup based on the 'list' cookie value
  function checkAndShowPopup() {
      // If the cookie 'list' is 'unsubscribed', show the popup
      if (cookies['list'] === 'unsubscribed') {
          window.showMailingListPopup();
      }
  }
  // Retrieve the date from the "list" cookie
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)list\s*\=\s*([^;]*).*$)|^.*$/, "$1");

// Check if the cookie value is empty (no cookie set)
if (cookieValue === "") {
  console.log("No cookie set");
} else {
  // Convert the cookie value to a Date object
  var cookieDate = new Date(cookieValue);

  // Calculate the difference in days between the cookie date and today
  var timeDiff = today.getTime() - cookieDate.getTime();
  var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Check if the cookie date is older than days
  if (daysDiff > 14) {
    // console.log("The cookie date is more than 2 weeks old.");
    document.cookie = "list=unsubscribed" + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure";
    window.showMailingListPopup();
  } else {
    // console.log("The cookie date is less than 2 weeks old.");
  }
}

  // Show the popup if the cookie value is 'unsubscribed' after page load
  window.onload = function() {
      checkAndShowPopup();
};

})();



const form = document.getElementById('mailing-list-signup-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});