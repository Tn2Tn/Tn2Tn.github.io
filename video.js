const lightboxHTML = 
    `<style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            overflow: hidden; /* Prevent scrolling when lightbox is open */
        }

        .lightbox {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1000; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0, 0, 0, 0.9); /* Darker background */
            transition: opacity 0.3s ease; /* Smooth transition */
        }

        .lightbox-content {
            position: relative; /* This allows the close button to be positioned relative to this container */
            margin: auto;
            top: 50%;
            transform: translateY(-50%);
            width: fit-content; /* More responsive */
            max-width: 800px; /* Max width */
            max-height: 95vh; /* Max height set to 90% of viewport height */
            overflow-y: auto; /* Enable vertical scroll if content exceeds max-height */
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Shadow for depth */
            border-radius: 10px; /* Rounded corners */
            background-color: hsl(203.1, 9.1%, 28%); /* White background for content */
            padding: 20px; /* Padding around content */
            text-align: center; /* Center text */
        }

        .lightbox-content h1 {
            font-family: 'Roboto', sans-serif; /* Use Roboto font */
            color: hsl(225, 7.1%, 89%); /* Text color */
            margin: 0; /* Remove default margin */
            font-weight: 700; /* Bold text */
        }

        .close {
            position: absolute; /* Position it absolutely within the lightbox-content */
            top: 5px; /* Adjusted distance from the top */
            right: 20px; /* Distance from the right */
            color: white; /* Change to white */
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s; /* Smooth color transition */
        }

        .close:hover {
            color: #ff0000; /* Change color on hover */
        }

        .video-pop {
            max-height: 80vh; /* Limit video height to 80% of viewport height */
            height: auto; /* Maintain aspect ratio */
            border-radius: 5px; /* Rounded corners for video */
            margin-top: 20px; /* Space between close button and video */
            aspect-ratio: 9/16;
        }
    </style>
    <button id="openLightbox" style="display: none;">Watch Video</button>
    <div id="lightbox" class="lightbox">
        <div class="lightbox-content">
            <span class="close" id="closeLightbox">&times;</span>
            <h1>Fast Well!</h1> <!-- Added text here -->
            <video class="video-pop" src="../podcast.mp4" controls></video>
        </div>
    </div>
`;

// Append the lightbox HTML to the body
document.body.insertAdjacentHTML('beforeend', lightboxHTML);

// Function to open the lightbox
function openLightbox() {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox').style.opacity = '1'; // Ensure opacity is set
}

// Add event listeners for opening and closing the lightbox
document.getElementById('openLightbox').onclick = openLightbox;

document.getElementById('closeLightbox').onclick = function() {
    document.getElementById('lightbox').style.display = 'none';
}

// Close the lightbox if the user clicks anywhere outside of the video
window.onclick = function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
    }
}

// Show the lightbox on page load
window.onload = function() {
    openLightbox();
}
