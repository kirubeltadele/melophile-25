
// Helper to load the Google Maps script
let isLoading = false;
let isLoaded = false;

// Promise that resolves when Google Maps is loaded
const loadGoogleMapsPromise = new Promise<void>((resolve, reject) => {
  // This function will be called when the script finishes loading
  window.initMap = () => {
    isLoaded = true;
    resolve();
  };
});

export const loadGoogleMapsScript = (apiKey: string) => {
  // If already loaded or loading, don't do anything
  if (isLoaded || isLoading) {
    return loadGoogleMapsPromise;
  }

  // Start loading
  isLoading = true;

  // Create script
  const script = document.createElement("script");
  script.id = "google-maps-script";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;
  
  // Error handling
  script.onerror = () => {
    console.error("Failed to load Google Maps script");
  };

  // Append to document
  document.head.appendChild(script);

  return loadGoogleMapsPromise;
};

// Need to add this to the global window object
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}
