import { 
  Utensils, Camera, Music, Palette, ShoppingBag, 
  Waves, TreeDeciduous, Wine, Landmark, Dumbbell 
} from "lucide-react";

interface InterestsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const interests = [
  { id: "food", icon: Utensils, label: "Food & Cuisine" },
  { id: "photography", icon: Camera, label: "Photography" },
  { id: "nightlife", icon: Music, label: "Nightlife" },
  { id: "art", icon: Palette, label: "Art & Design" },
  { id: "shopping", icon: ShoppingBag, label: "Shopping" },
  { id: "water", icon: Waves, label: "Water Activities" },
  { id: "nature", icon: TreeDeciduous, label: "Nature & Wildlife" },
  { id: "wine", icon: Wine, label: "Wine & Spirits" },
  { id: "history", icon: Landmark, label: "History & Heritage" },
  { id: "wellness", icon: Dumbbell, label: "Wellness & Fitness" },
];

export const InterestsStep = ({ value, onChange }: InterestsStepProps) => {
  const toggleInterest = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Select all that apply — we'll tailor activities to your interests
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {interests.map((interest) => {
          const isSelected = value.includes(interest.id);
          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`group p-4 rounded-xl border-2 text-center transition-all duration-300 hover:shadow-soft ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-warm"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  isSelected
                    ? "gradient-warm"
                    : "bg-muted group-hover:bg-primary/10"
                }`}
              >
                <interest.icon
                  className={`w-6 h-6 transition-colors ${
                    isSelected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </div>
              <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                {interest.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground mt-6">
        {value.length} interest{value.length !== 1 ? "s" : ""} selected
      </p>
    </div>
  );
};
