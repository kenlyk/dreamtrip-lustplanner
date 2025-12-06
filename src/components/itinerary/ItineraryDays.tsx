import { useState } from "react";
import { ChevronDown, Clock, DollarSign, MapPin, Utensils, Plane, Hotel } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { ItineraryDay, ItineraryActivity } from "@/lib/mockItinerary";

interface ItineraryDaysProps {
  days: ItineraryDay[];
}

const getActivityIcon = (type: ItineraryActivity["type"]) => {
  switch (type) {
    case "meal":
      return Utensils;
    case "transport":
      return Plane;
    case "accommodation":
      return Hotel;
    default:
      return MapPin;
  }
};

export const ItineraryDays = ({ days }: ItineraryDaysProps) => {
  const [openDays, setOpenDays] = useState<number[]>([0]);

  const toggleDay = (index: number) => {
    setOpenDays((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {days.map((day, index) => (
        <Collapsible
          key={day.day}
          open={openDays.includes(index)}
          onOpenChange={() => toggleDay(index)}
        >
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-primary-foreground">
                    {day.day}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {day.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  openDays.includes(index) ? "rotate-180" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-2 ml-6 pl-6 border-l-2 border-primary/20 space-y-4 py-4">
              {day.activities.map((activity, actIndex) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div
                    key={activity.id}
                    className="relative animate-fade-up"
                    style={{ animationDelay: `${actIndex * 50}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                    
                    <div className="p-4 bg-background rounded-xl border border-border hover:shadow-soft transition-all duration-300">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                            <h4 className="font-medium text-foreground mb-1">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                        {activity.cost && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
                            <DollarSign className="w-3 h-3" />
                            <span>{activity.cost.toFixed(0)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
