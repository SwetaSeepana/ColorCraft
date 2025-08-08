'use strict';


// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}


//Map 
 const locationToggle = document.getElementById("locationToggle");
  const locationInputBox = document.getElementById("locationInputBox");

  locationToggle.addEventListener("click", () => {
    locationInputBox.style.display =
      locationInputBox.style.display === "none" ? "block" : "none";
  });

  // Save pincode button logic (dummy for now)
  function savePincode() {
    const pincode = document.getElementById("pincodeInput").value;
    const userPincode = document.getElementById("userPincode");
    if (pincode.trim() !== "") {
      userPincode.innerText = "📍 Delivering to: " + pincode;
    } else {
      userPincode.innerText = "Please enter a valid pincode!";
    }
  }

 // Show user's current location on map and fetch pincode
function useMyLocation() {
  const mapContainer = document.getElementById("mapContainer");
  const userPincode = document.getElementById("userPincode");

  // Show map container
  mapContainer.style.display = "block";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Display lat/lng temporarily
        userPincode.innerText = `📍 Getting your location...`;

        // Initialize Leaflet map
        const map = L.map("map").setView([lat, lng], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup("You are here").openPopup();

        // Reverse geocoding using OpenStreetMap Nominatim API
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            {
              headers: {
                "User-Agent": "ColorCraftApp/1.0"
              }
            }
          );

          const data = await response.json();
          const pincode = data.address.postcode || "Unavailable";

          // Update UI with pincode
          userPincode.innerText = `📍 Pincode: ${pincode}`;

          // Optionally auto-fill the input box too
          document.getElementById("pincodeInput").value = pincode;

        } catch (error) {
          console.error("Error fetching pincode:", error);
          userPincode.innerText = `📍 Location: ${lat.toFixed(3)}, ${lng.toFixed(3)} (Pincode not found)`;
        }
      },
      (error) => {
        alert("Unable to get your location. Please allow permission.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

  // Close map box
  const closeMapBtn = document.getElementById("closeMapBtn");
  closeMapBtn.addEventListener("click", () => {
    const mapContainer = document.getElementById("mapContainer");
    mapContainer.style.display = "none";
    document.getElementById("map").innerHTML = ""; // clear map content
  });


//person
const toggleBtn = document.getElementById('user-toggle');
  const menu = document.getElementById('user-menu');

  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  });

  document.addEventListener('click', function () {
    menu.style.display = 'none';
  });
// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}