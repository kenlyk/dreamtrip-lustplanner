import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, MapPin, TrendingUp } from "lucide-react";

interface DestinationStepProps {
  value: string;
  onChange: (value: string) => void;
}

const popularDestinations = [
  { id: "paris", name: "Paris, France", emoji: "🇫🇷" },
  { id: "tokyo", name: "Tokyo, Japan", emoji: "🇯🇵" },
  { id: "bali", name: "Bali, Indonesia", emoji: "🇮🇩" },
  { id: "barcelona", name: "Barcelona, Spain", emoji: "🇪🇸" },
  { id: "nyc", name: "New York City, USA", emoji: "🇺🇸" },
  { id: "santorini", name: "Santorini, Greece", emoji: "🇬🇷" },
  { id: "maldives", name: "Maldives", emoji: "🇲🇻" },
  { id: "iceland", name: "Iceland", emoji: "🇮🇸" },
];

export const DestinationStep = ({ value, onChange }: DestinationStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = popularDestinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search for a destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-lg rounded-xl border-2 border-border focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Popular Destinations</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredDestinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => onChange(dest.name)}
            className={`group flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-soft ${
              value === dest.name
                ? "border-primary bg-primary/5 shadow-warm"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <span className="text-2xl">{dest.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${value === dest.name ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`font-medium ${value === dest.name ? "text-primary" : "text-foreground"}`}>
                  {dest.name}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {value && !popularDestinations.find((d) => d.name === value) && (
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-sm text-primary">
            Custom destination: <strong>{value}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
