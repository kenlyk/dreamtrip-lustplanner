import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

interface DatesStepProps {
  value: { from: Date | undefined; to: Date | undefined };
  onChange: (value: { from: Date | undefined; to: Date | undefined }) => void;
}

export const DatesStep = ({ value, onChange }: DatesStepProps) => {
  const days = value.from && value.to 
    ? Math.ceil((value.to.getTime() - value.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  return (
    <div className="max-w-2xl">
      <div className="bg-card rounded-3xl p-6 border border-border mb-6">
        <Calendar
          mode="range"
          selected={{ from: value.from, to: value.to }}
          onSelect={(range) => onChange({ from: range?.from, to: range?.to })}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
          className="rounded-xl"
        />
      </div>

      {value.from && (
        <div className="bg-muted/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            <h4 className="font-display text-lg font-semibold text-foreground">
              Your Trip
            </h4>
          </div>
          <p className="text-muted-foreground">
            {format(value.from, "MMMM d, yyyy")}
            {value.to && ` — ${format(value.to, "MMMM d, yyyy")}`}
            {days > 0 && (
              <span className="ml-2 text-primary font-medium">
                ({days} day{days !== 1 ? "s" : ""})
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
