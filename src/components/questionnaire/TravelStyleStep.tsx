import { Compass, Sparkles, Palmtree, Mountain, Building2, Heart } from "lucide-react";

interface TravelStyleStepProps {
  value: string;
  onChange: (value: string) => void;
}

const styles = [
  { id: "adventure", icon: Mountain, label: "Adventure Seeker", description: "Hiking, extreme sports, off-the-beaten-path" },
  { id: "relaxation", icon: Palmtree, label: "Relaxation", description: "Beaches, spas, peaceful retreats" },
  { id: "cultural", icon: Building2, label: "Cultural Explorer", description: "Museums, history, local traditions" },
  { id: "luxury", icon: Sparkles, label: "Luxury Traveler", description: "Fine dining, 5-star stays, exclusive experiences" },
  { id: "budget", icon: Compass, label: "Budget Explorer", description: "Backpacking, hostels, street food" },
  { id: "romantic", icon: Heart, label: "Romantic Getaway", description: "Couples retreats, scenic views, intimate dining" },
];

export const TravelStyleStep = ({ value, onChange }: TravelStyleStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onChange(style.id)}
          className={`group p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-soft ${
            value === style.id
              ? "border-primary bg-primary/5 shadow-warm"
              : "border-border bg-card hover:border-primary/30"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                value === style.id
                  ? "gradient-warm"
                  : "bg-muted group-hover:bg-primary/10"
              }`}
            >
              <style.icon
                className={`w-6 h-6 transition-colors ${
                  value === style.id ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                }`}
              />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {style.label}
              </h3>
              <p className="text-sm text-muted-foreground">{style.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
