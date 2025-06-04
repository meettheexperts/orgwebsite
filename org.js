
      if (searchInput) {
        searchInput.addEventListener("input", function () {
          // Get the search term and convert it to lowercase for case-insensitive comparison
          const searchTerm = this.value.toLowerCase();

          // Get all service cards
          const serviceCards = document.querySelectorAll(".service-card");
          const popupContainer = document.getElementById("searchPopup"); // Popup container to show suggestions

          // Clear previous suggestions in the popup
          popupContainer.innerHTML = "";

          // Create a flag to check if any matches were found
          let matchesFound = false;

          // Loop through each card and match the title
          serviceCards.forEach(function (card) {
            const cardTitle = card
              .querySelector(".card-title")
              .textContent.toLowerCase();

            if (searchTerm === "" || cardTitle.includes(searchTerm)) {
              // Show the card if it matches or if the search term is empty
              card.closest(".col-md-6").style.display = "";

              // Create a new popup item for each matching service
              if (searchTerm !== "") {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("search-suggestion");
                suggestionItem.textContent =
                  card.querySelector(".card-title").textContent;

                // Append suggestion to popup
                popupContainer.appendChild(suggestionItem);
                matchesFound = true;

                // Add click event to suggestion for filling the input and hiding the popup
                suggestionItem.addEventListener("click", function () {
                  // Fill the search input with the selected service title
                  searchInput.value = suggestionItem.textContent;

                  // Trigger the search by calling the input event handler manually
                  searchInput.dispatchEvent(new Event("input"));

                  // Hide the popup after selection
                  popupContainer.style.display = "none";
                });
              }
            } else {
              // Hide the card if it doesn't match
              card.closest(".col-md-6").style.display = "none";
            }
          });

          // If no matches and search term is not empty, hide the popup
          if (!matchesFound && searchTerm !== "") {
            popupContainer.style.display = "none";
          } else {
            popupContainer.style.display = "block"; // Show the popup with suggestions
          }
        });

        // Optional: Close the popup if clicked outside of the search input or popup
        document.addEventListener("click", function (event) {
          if (
            !searchInput.contains(event.target) &&
            !document.getElementById("searchPopup").contains(event.target)
          ) {
            document.getElementById("searchPopup").style.display = "none";
          }
        });
      }

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

      // Initialize map
      var map = L.map("map").setView([-1.2921, 36.8219], 4); // Center Africa

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Array of MTE office locations with their coordinates (lat, lon)
      var locations = [
        {
          name: "MTE Soroti Office",
          lat: 1.7128, // Soroti Latitude
          lon: 33.6111, // Soroti Longitude
          description:
            "MTE Soroti Office: The heart of MTE's operations in Eastern Uganda, providing expert services to the community.",
        },
        {
          name: "MTE Kampala Office",
          lat: 0.3136, // Kampala Latitude
          lon: 32.581, // Kampala Longitude
          description:
            "MTE Kampala Office: Our central hub located in the capital, offering a wide range of expert services to clients across Uganda.",
        },
      ];

      // Function to fetch the nearest town using Nominatim API
      async function getNearestTown(lat, lon) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.address) {
          const town =
            data.address.town || data.address.city || data.address.village;
          return { lat: lat, lon: lon, name: town || "Unknown" };
        }
        return { lat: lat, lon: lon, name: "Unknown" }; // Fallback if no town is found
      }

      // Function to calculate the distance between two lat/lon points using Leaflet's distanceTo method
      function calculateDistance(lat1, lon1, lat2, lon2) {
        var point1 = L.latLng(lat1, lon1);
        var point2 = L.latLng(lat2, lon2);
        return point1.distanceTo(point2); // Returns the distance in meters
      }

      // Sort locations based on distance from the current position
      function sortLocationsByDistance(locations) {
        let sortedLocations = [];
        let remainingLocations = [...locations];
        let currentLocation = { lat: -1.2921, lon: 36.8219 };

        while (remainingLocations.length > 0) {
          let nearestLocationIndex = 0;
          let nearestDistance = Infinity;

          for (let i = 0; i < remainingLocations.length; i++) {
            const distance = calculateDistance(
              currentLocation.lat,
              currentLocation.lon,
              remainingLocations[i].lat,
              remainingLocations[i].lon
            );
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestLocationIndex = i;
            }
          }

          sortedLocations.push(remainingLocations[nearestLocationIndex]);
          currentLocation = {
            lat: remainingLocations[nearestLocationIndex].lat,
            lon: remainingLocations[nearestLocationIndex].lon,
          };
          remainingLocations.splice(nearestLocationIndex, 1);
        }

        return sortedLocations;
      }

      // Loop through the locations, get nearest towns and add markers
      async function initializeMap() {
        const routePoints = [];
        const markers = [];

        // Sort the locations by distance from the starting point
        const sortedLocations = sortLocationsByDistance(locations);

        for (const location of sortedLocations) {
          const nearestTown = await getNearestTown(location.lat, location.lon);
          const popupContent = `<h3>${location.name}</h3><p>${location.description}</p>`;
          const marker = L.marker([location.lat, location.lon]).addTo(map);
          marker.bindPopup(popupContent); // Ensure popup binding
          markers.push(marker);
          routePoints.push(L.latLng(nearestTown.lat, nearestTown.lon)); // Use nearest town for routing
        }

        // Add routing control with sorted locations as waypoints
        var routeControl = L.Routing.control({
          waypoints: routePoints,
          routeWhileDragging: false,
          createMarker: function () {
            return null;
          }, // Disable marker popups from routing control
          showAlternatives: false, // Hide alternative routes (optional)
        }).addTo(map);

        //map.removeControl(routeControl); // Call this if the control UI itself is unnecessary

        // Fit the map view to include all the locations
        map.fitBounds(L.latLngBounds(routePoints));

        // Add a moving marker to simulate travel along the route
        addMovingMarker(routeControl);
      }

      // Function to add a moving marker along the route
      function addMovingMarker(routeControl) {
        // Event listener for when the route is found by the routing control
        routeControl.on("routesfound", function (event) {
          // Get the first route found (in case there are multiple routes)
          const route = event.routes[0];

          // Extract the coordinates (latitudes and longitudes) of the route
          const latLngs = route.coordinates;

          // Create a marker at the start of the route with a custom icon
          var movingMarker = L.marker(latLngs[0], {
            icon: L.icon({
              iconUrl: "https://i.imgur.com/IOx2MMP.png",
              iconSize: [30, 30], // Set the icon size
            }),
          }).addTo(map); // Add the marker to the map

          // Initialize the starting index for the route
          let currentIndex = 0;

          // Total distance of the route (in meters)
          const totalDistance = route.summary.totalDistance;

          // Set the total time for the animation to complete (in seconds)
          const totalTime = 10;

          // Calculate the speed of the moving marker (in meters per second)
          const speed = totalDistance / totalTime;

          // Time interval (in milliseconds) for updating the marker's position
          let timeInterval = 10;

          // Variable to keep track of the distance traveled by the marker
          let distanceTraveled = 0;

          // Capture the current time at the start of the animation
          let startTime = Date.now();

          // Function to move the marker along the route
          function moveMarker() {
            // Calculate how much time has passed since the animation started
            let elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds

            // If the total time has not passed, continue moving the marker
            if (elapsedTime < totalTime) {
              // Calculate how far the marker should have traveled based on the elapsed time
              distanceTraveled = speed * elapsedTime;

              // Iterate over the route coordinates (latLngs) to move the marker along the path
              for (let i = 1; i < latLngs.length; i++) {
                // Calculate the distance between two consecutive points (segments)
                const segmentDistance = latLngs[i - 1].distanceTo(latLngs[i]);

                // If the distance traveled is less than the segment distance, move the marker to the new point
                if (distanceTraveled < segmentDistance) {
                  movingMarker.setLatLng(latLngs[i]); // Set the marker's position
                  break; // Exit the loop after moving the marker
                }

                // If the distance traveled is more than the segment distance, reduce the remaining distance
                distanceTraveled -= segmentDistance;
              }
            } else {
              // Once the animation reaches the end of the route, reset the marker back to the start
              movingMarker.setLatLng(latLngs[0]);
              startTime = Date.now(); // Restart the animation by resetting the start time
            }
          }

          // Set an interval to move the marker at regular intervals (every 10 milliseconds)
          const moveInterval = setInterval(moveMarker, 10);
        });
      }

      // Initialize map with markers and routing
      initializeMap();

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
