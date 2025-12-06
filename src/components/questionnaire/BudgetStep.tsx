import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";

interface BudgetStepProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const getBudgetLabel = (value: number) => {
  if (value <= 50) return "Budget-Friendly";
  if (value <= 150) return "Moderate";
  if (value <= 300) return "Comfortable";
  if (value <= 500) return "Premium";
  return "Luxury";
};

const getBudgetDescription = (value: number) => {
  if (value <= 50) return "Hostels, street food, public transport";
  if (value <= 150) return "Budget hotels, casual dining, mix of activities";
  if (value <= 300) return "Nice hotels, good restaurants, guided tours";
  if (value <= 500) return "Upscale hotels, fine dining, private experiences";
  return "5-star hotels, gourmet dining, exclusive access";
};

export const BudgetStep = ({ value, onChange }: BudgetStepProps) => {
  const budget = value[0];

  return (
    <div className="max-w-2xl">
      <div className="bg-card rounded-3xl p-8 border border-border mb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Daily budget per person</p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-primary" />
              <span className="font-display text-5xl font-bold text-foreground">{budget}</span>
              <span className="text-muted-foreground text-lg">/day</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
              {getBudgetLabel(budget)}
            </span>
          </div>
        </div>

        <Slider
          value={value}
          onValueChange={onChange}
          max={700}
          min={25}
          step={25}
          className="mb-4"
        />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$25</span>
          <span>$700+</span>
        </div>
      </div>

      <div className="bg-muted/50 rounded-2xl p-6">
        <h4 className="font-display text-lg font-semibold text-foreground mb-2">
          What this gets you
        </h4>
        <p className="text-muted-foreground">
          {getBudgetDescription(budget)}
        </p>
      </div>
    </div>
  );
};
