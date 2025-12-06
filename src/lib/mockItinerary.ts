import type { QuestionnaireData } from "@/pages/Questionnaire";

export interface ItineraryLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "accommodation" | "activity" | "restaurant" | "landmark";
}

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  type: "activity" | "meal" | "transport" | "accommodation";
  cost?: number;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: ItineraryActivity[];
}

export interface Itinerary {
  destination: string;
  days: ItineraryDay[];
  locations: ItineraryLocation[];
  totalCost: number;
}

const destinationData: Record<string, { lat: number; lng: number; activities: string[] }> = {
  "Paris, France": { 
    lat: 48.8566, 
    lng: 2.3522,
    activities: ["Eiffel Tower", "Louvre Museum", "Montmartre", "Seine River Cruise", "Champs-Élysées"]
  },
  "Tokyo, Japan": { 
    lat: 35.6762, 
    lng: 139.6503,
    activities: ["Shibuya Crossing", "Senso-ji Temple", "Meiji Shrine", "Tsukiji Market", "Tokyo Skytree"]
  },
  "Bali, Indonesia": { 
    lat: -8.4095, 
    lng: 115.1889,
    activities: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach", "Mount Batur", "Uluwatu Temple"]
  },
  default: {
    lat: 40.7128,
    lng: -74.0060,
    activities: ["City Walking Tour", "Local Museum", "Famous Landmark", "Traditional Restaurant", "Night Market"]
  }
};

export const generateMockItinerary = (preferences?: QuestionnaireData): Itinerary => {
  const destination = preferences?.destination || "Paris, France";
  const destData = destinationData[destination] || destinationData.default;
  const numDays = preferences?.dateRange?.from && preferences?.dateRange?.to
    ? Math.ceil((preferences.dateRange.to.getTime() - preferences.dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 5;

  const days: ItineraryDay[] = Array.from({ length: Math.min(numDays, 7) }, (_, i) => ({
    day: i + 1,
    date: preferences?.dateRange?.from 
      ? new Date(preferences.dateRange.from.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
      : `Day ${i + 1}`,
    title: i === 0 ? "Arrival & Exploration" : i === numDays - 1 ? "Final Day & Departure" : `Discover ${destData.activities[i % destData.activities.length]}`,
    activities: [
      {
        id: `${i}-1`,
        time: "09:00",
        title: i === 0 ? "Check into accommodation" : "Morning activity",
        description: i === 0 ? "Get settled in your hotel and freshen up" : `Explore ${destData.activities[i % destData.activities.length]}`,
        type: i === 0 ? "accommodation" : "activity",
        cost: preferences?.budget[0] ? preferences.budget[0] * 0.3 : 50,
      },
      {
        id: `${i}-2`,
        time: "12:30",
        title: "Lunch",
        description: "Local cuisine at a recommended restaurant",
        type: "meal",
        cost: preferences?.budget[0] ? preferences.budget[0] * 0.15 : 25,
      },
      {
        id: `${i}-3`,
        time: "14:00",
        title: "Afternoon exploration",
        description: `Visit ${destData.activities[(i + 1) % destData.activities.length]} and surrounding areas`,
        type: "activity",
        cost: preferences?.budget[0] ? preferences.budget[0] * 0.2 : 35,
      },
      {
        id: `${i}-4`,
        time: "19:00",
        title: "Dinner",
        description: preferences?.travelStyle === "luxury" ? "Fine dining experience" : "Authentic local restaurant",
        type: "meal",
        cost: preferences?.budget[0] ? preferences.budget[0] * 0.25 : 45,
      },
    ],
  }));

  const locations: ItineraryLocation[] = destData.activities.slice(0, 5).map((name, i) => ({
    id: `loc-${i}`,
    name,
    lat: destData.lat + (Math.random() - 0.5) * 0.05,
    lng: destData.lng + (Math.random() - 0.5) * 0.05,
    type: i === 0 ? "accommodation" : i % 3 === 0 ? "restaurant" : "activity",
  }));

  return {
    destination,
    days,
    locations,
    totalCost: (preferences?.budget[0] || 150) * numDays,
  };
};
