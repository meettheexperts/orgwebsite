
// Get the toggle button
const toggleButton = document.getElementById("theme-toggle");

// Function to set the theme based on the value from localStorage or default to light
function applyTheme() {
    const savedTheme = localStorage.getItem("theme"); // Retrieve the saved theme from localStorage

    if (savedTheme) {
        // Apply the saved theme
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        // Set default theme to light if no theme is saved in localStorage
        document.documentElement.setAttribute("data-theme", "light");
    }
}

// Call applyTheme function when the page loads to check for any saved theme
applyTheme();

// Check if the toggle button exists before adding an event listener
if (toggleButton) {
    // Add event listener to toggle the theme
    toggleButton.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        // Toggle the theme between light and dark
        if (currentTheme === "light") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark"); // Save the dark theme to localStorage
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light"); // Save the light theme to localStorage
        }
    });
} else {
    console.warn("Theme toggle button not found in the DOM.");
}

// Show the gallery when the "View Gallery" button is clicked
function toggleGallery(button, galleryId) {
    const galleryOverlay = document.getElementById(galleryId);

    // Show the gallery overlay
    galleryOverlay.style.display = "flex"; // Use flex for centering the content
    galleryOverlay.classList.add("show"); // Optionally, use a transition for smooth appearance
}

// Close the gallery overlay when clicking outside the gallery content
function closeOverlay(event, galleryId) {
    // If the click is outside the gallery content, close it
    if (
        event.target.id === galleryId ||
        event.target.classList.contains("btn-danger")
    ) {
        document.getElementById(galleryId).style.display = "none";
        document.getElementById(galleryId).classList.remove("show");
    }
}

// Toggle the details visibility
function toggleDetails(button) {
    // Find the closest .service-card element, and then find the .card-details element within it
    const details = button
        .closest(".service-card")
        .querySelector(".card-details");

    // Toggle the visibility of the details section
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block"; // Show the details
        button.textContent = "Hide Info"; // Change button text to "Hide Info"
    } else {
        details.style.display = "none"; // Hide the details
        button.textContent = "Show Info"; // Change button text to "Show Info"
    }
}

// Close the details when the "Close" button is clicked
function closeDetails(button) {
    const details = button
        .closest(".service-card")
        .querySelector(".card-details");
    details.style.display = "none"; // Hide the details
    button
        .closest(".service-card")
        .querySelector(".btn-primary").textContent = "Show Info"; // Reset the button text to "Show Info"
}

// Toggle the sidebar for mobile view
const sidebarToggle = document.querySelector(".sidebar-toggle-btn");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("expanded");
});


// Event listener for all 'Request a Quote' buttons
document.querySelectorAll(".request-quote").forEach((button) => {
    button.addEventListener("click", function () {
        // Find the parent card of the clicked button
        const card = this.closest(".card"); // .closest finds the nearest .card ancestor

        // Get the title of the card
        const cardTitle = card.querySelector(".card-title").textContent;

        // Show the modal with the card title
        const modalTitleElement = document.querySelector("#quoteModalLabel");
        modalTitleElement.textContent = `Send Whatsapp Inquiry for: ${cardTitle}`;

        // Open the modal
        const modal = new bootstrap.Modal(
            document.getElementById("quoteModal")
        );
        modal.show();

        // Set up the event listener for the "Send Quote" button
        document
            .getElementById("sendQuote")
            .addEventListener("click", function () {
                // Get the additional details entered by the user
                const additionalInfo =
                    document.getElementById("additionalInfo").value;

                // Prepare the message with card title and additional info
                const userMessage = `Hi, I'm interested in the following: ${cardTitle}. Additional info: ${additionalInfo}.`;

                // Encode the message to be shared via WhatsApp
                const encodedMessage = encodeURIComponent(userMessage);

                // WhatsApp URL to send the message to your number
                const whatsappURL = `https://wa.me/256777233322?text=${encodedMessage}`;

                // Open WhatsApp URL in a new window/tab
                window.open(whatsappURL, "_blank");

                // Close the modal after sending the message
                modal.hide();
            });
    });
});

// When the "Send Quote" button is clicked in the modal
document
    .getElementById("sendQuote")
    .addEventListener("click", function () {
        // Get the additional information entered by the user
        const additionalInfo = document
            .getElementById("additionalInfo")
            .value.trim();

        // Define the message with the card title and additional info
        let userMessage = `Hi, I'm interested in the following: ${window.cardTitle}.`;

        if (additionalInfo) {
            userMessage += ` Additional details: ${additionalInfo}`;
        }

        // Encode the message to be shared via WhatsApp
        const encodedMessage = encodeURIComponent(userMessage);

        // WhatsApp URL to send the message to your number
        const whatsappURL = `https://wa.me/256777233322?text=${encodedMessage}`;

        // Close the modal
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("quoteModal")
        );
        modal.hide();

        // Open WhatsApp URL in a new window/tab
        window.open(whatsappURL, "_blank");
    });
/**
 * Dynamically generates and opens the share URL for the selected platform and card ID.
 * @param {string} platform - The social media platform (facebook, twitter, linkedin, whatsapp).
 * @param {string} cardId - The ID of the card to share.
 */
function shareService(platform, cardId) {
    const baseUrl = "https://meetthexperts.com";
    const cardUrl = `${baseUrl}#${cardId}`;
    let shareUrl = "";

    switch (platform) {
        case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                cardUrl
            )}`;
            break;
        case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                cardUrl
            )}&text=${encodeURIComponent("Check out this amazing service!")}`;
            break;
        case "linkedin":
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                cardUrl
            )}&title=${encodeURIComponent(
                "Amazing IT Service"
            )}&summary=${encodeURIComponent(
                "Ensure the smooth operation of your systems with our proactive IT maintenance services."
            )}&source=LinkedIn`;
            break;
        case "whatsapp":
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out this amazing service: ${cardUrl}`
            )}`;
            break;
        default:
            console.error("Unsupported platform:", platform);
            return;
    }

    // Open the share URL in a new tab
    window.open(shareUrl, "_blank");
}
