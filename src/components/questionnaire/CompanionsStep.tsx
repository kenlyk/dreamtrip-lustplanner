import { User, Users, Heart, Baby, Dog } from "lucide-react";

interface CompanionsStepProps {
  value: string;
  onChange: (value: string) => void;
}

const companions = [
  { id: "solo", icon: User, label: "Solo", description: "Just me, myself, and I" },
  { id: "couple", icon: Heart, label: "Couple", description: "Romantic trip for two" },
  { id: "friends", icon: Users, label: "Friends", description: "Group adventure" },
  { id: "family", icon: Baby, label: "Family", description: "With kids in tow" },
  { id: "pets", icon: Dog, label: "With Pets", description: "Furry friends included" },
];

export const CompanionsStep = ({ value, onChange }: CompanionsStepProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companions.map((companion) => (
        <button
          key={companion.id}
          onClick={() => onChange(companion.id)}
          className={`group p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:shadow-soft ${
            value === companion.id
              ? "border-primary bg-primary/5 shadow-warm"
              : "border-border bg-card hover:border-primary/30"
          }`}
        >
          <div
            className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
              value === companion.id
                ? "gradient-warm"
                : "bg-muted group-hover:bg-primary/10"
            }`}
          >
            <companion.icon
              className={`w-8 h-8 transition-colors ${
                value === companion.id ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
              }`}
            />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            {companion.label}
          </h3>
          <p className="text-sm text-muted-foreground">{companion.description}</p>
        </button>
      ))}
    </div>
  );
};
