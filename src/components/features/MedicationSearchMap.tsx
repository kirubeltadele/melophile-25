
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, X } from "lucide-react";
import { medications } from "@/data/mockData";

// Add Google Maps type definitions
declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapMarker {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  pharmacy: string;
  price: string;
  distance: string;
  stockStatus: "available" | "low" | "unavailable";
}

interface MedicationSearchMapProps {
  medicationId?: string;
  onClose: () => void;
}

const MedicationSearchMap: React.FC<MedicationSearchMapProps> = ({ medicationId, onClose }) => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  
  // Generate random nearby pharmacies with the selected medication
  useEffect(() => {
    const generateRandomMarkers = () => {
      // Base location (approximately center of the map)
      const baseLat = 37.7749;
      const baseLng = -122.4194;
      
      // Get the medication name if medicationId is provided
      const medicationName = medicationId 
        ? medications.find(med => med.id === medicationId)?.name || "Generic Medication" 
        : "Various Medications";
      
      // Generate random pharmacy locations
      const pharmacyNames = [
        "Healthy Pharmacy", "MediCare Plus", "Quick Relief Drugs", 
        "Wellness Pharma", "Community Meds", "LifeCare Pharmacy",
        "Green Cross", "Family Pharmacy", "Central Drugstore"
      ];
      
      const newMarkers: MapMarker[] = [];
      
      for (let i = 0; i < 8; i++) {
        // Random offset from base location (within ~5km)
        const latOffset = (Math.random() - 0.5) * 0.05;
        const lngOffset = (Math.random() - 0.5) * 0.05;
        
        const stockOptions: ("available" | "low" | "unavailable")[] = ["available", "available", "available", "low", "low", "unavailable"];
        const stockStatus = stockOptions[Math.floor(Math.random() * stockOptions.length)];
        
        newMarkers.push({
          id: `marker-${i}`,
          name: medicationName,
          position: {
            lat: baseLat + latOffset,
            lng: baseLng + lngOffset
          },
          pharmacy: pharmacyNames[i % pharmacyNames.length],
          price: `$${(Math.random() * 50 + 10).toFixed(2)}`,
          distance: `${(Math.random() * 5).toFixed(1)} km`,
          stockStatus
        });
      }
      
      setMarkers(newMarkers);
    };

    generateRandomMarkers();
  }, [medicationId]);
  
  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || typeof window.google === 'undefined' || !window.google.maps) {
      return;
    }
    
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default location if geolocation is denied
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      // Fallback if geolocation is not supported
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
    }
    
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 37.7749, lng: -122.4194 },  // San Francisco as default
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    };
    
    mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
    
    return () => {
      // Clean up markers on unmount
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);
  
  // Update markers when the map and marker data are available
  useEffect(() => {
    if (!mapInstanceRef.current || markers.length === 0 || typeof window.google === 'undefined' || !window.google.maps) {
      return;
    }
    
    // Clear previous markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Add new markers
    const bounds = new google.maps.LatLngBounds();
    
    markers.forEach((markerData) => {
      const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: markerData.stockStatus === 'available' ? '#10b981' : 
                  markerData.stockStatus === 'low' ? '#f59e0b' : '#ef4444',
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#ffffff',
        scale: 10
      };
      
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: mapInstanceRef.current,
        title: markerData.pharmacy,
        icon: markerIcon
      });
      
      marker.addListener('click', () => {
        setSelectedMarker(markerData);
      });
      
      markersRef.current.push(marker);
      bounds.extend(markerData.position);
    });
    
    // Add user location if available
    if (userLocation) {
      const userMarker = new google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        title: "Your Location",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
          scale: 8
        },
        zIndex: 1000
      });
      
      markersRef.current.push(userMarker);
      bounds.extend(userLocation);
    }
    
    // Fit map to show all markers
    mapInstanceRef.current.fitBounds(bounds);
    
    // Add a slight zoom out for better visibility
    const currentZoom = mapInstanceRef.current.getZoom();
    if (currentZoom) mapInstanceRef.current.setZoom(currentZoom - 0.5);
    
  }, [markers, userLocation]);
  
  // Helper function to get marker color based on stock status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'low':
        return 'bg-amber-500';
      case 'unavailable':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <Card className="w-full h-[600px] shadow-lg">
      <CardContent className="p-0 relative h-full">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button 
            size="icon" 
            variant="secondary" 
            className="bg-white shadow-md"
            onClick={() => {
              if (userLocation && mapInstanceRef.current) {
                mapInstanceRef.current.panTo(userLocation);
                mapInstanceRef.current.setZoom(14);
              }
            }}
          >
            <Navigation className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="bg-white shadow-md"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {selectedMarker && (
          <div className="absolute bottom-4 left-2 right-2 z-10">
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{selectedMarker.pharmacy}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{selectedMarker.distance} away</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 p-0"
                    onClick={() => setSelectedMarker(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-3 border-t pt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{selectedMarker.name}</p>
                      <p className="text-sm">{selectedMarker.price}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-block h-3 w-3 rounded-full ${getStatusColor(selectedMarker.stockStatus)} mr-2`}></span>
                      <span className="text-sm capitalize">{selectedMarker.stockStatus}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between">
                  <Button size="sm" variant="outline" className="w-[48%]">
                    Call Pharmacy
                  </Button>
                  <Button size="sm" className="w-[48%] bg-melophile-600 hover:bg-melophile-700">
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div ref={mapRef} className="w-full h-full"></div>
        
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <div className="bg-white p-2 rounded shadow-md text-xs flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
            <span>In Stock</span>
            
            <span className="inline-block h-3 w-3 rounded-full bg-amber-500 ml-2"></span>
            <span>Low Stock</span>
            
            <span className="inline-block h-3 w-3 rounded-full bg-red-500 ml-2"></span>
            <span>Unavailable</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationSearchMap;
