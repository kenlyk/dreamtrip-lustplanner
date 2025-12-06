import { MapPin, Hotel, Utensils, Camera } from "lucide-react";
import type { ItineraryLocation } from "@/lib/mockItinerary";

interface ItineraryMapProps {
  locations: ItineraryLocation[];
}

const getIcon = (type: ItineraryLocation["type"]) => {
  switch (type) {
    case "accommodation":
      return Hotel;
    case "restaurant":
      return Utensils;
    case "activity":
      return Camera;
    default:
      return MapPin;
  }
};

export const ItineraryMap = ({ locations }: ItineraryMapProps) => {
  return (
    <div className="relative w-full h-full bg-muted/30 flex flex-col">
      {/* Map Placeholder */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Location pins */}
          {locations.map((loc, index) => {
            const Icon = getIcon(loc.type);
            const x = 20 + ((index * 17) % 60);
            const y = 20 + ((index * 23) % 60);
            
            return (
              <div
                key={loc.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer animate-fade-up"
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center shadow-warm group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                      {loc.name}
                    </div>
                    <div className="w-2 h-2 bg-foreground transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Hotel className="w-3 h-3 text-primary" />
            </div>
            <span className="text-muted-foreground">Stay</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Camera className="w-3 h-3 text-primary" />
            </div>
            <span className="text-muted-foreground">Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Utensils className="w-3 h-3 text-primary" />
            </div>
            <span className="text-muted-foreground">Food</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Connect Mapbox for interactive maps
        </p>
      </div>
    </div>
  );
};
