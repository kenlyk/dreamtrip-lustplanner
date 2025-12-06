import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, MapPin, Calendar, DollarSign, Plane, Clock } from "lucide-react";
import { generateMockItinerary } from "@/lib/mockItinerary";
import type { QuestionnaireData } from "./Questionnaire";

const Export = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preferences = location.state?.preferences as QuestionnaireData | undefined;
  const itinerary = preferences ? generateMockItinerary(preferences) : null;

  const handleDownloadPDF = () => {
    // In production, use jsPDF or similar
    window.print();
  };

  if (!itinerary || !preferences) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            No itinerary to export
          </h1>
          <Button onClick={() => navigate("/questionnaire")}>
            Start Planning
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hide on print */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="font-display text-xl font-semibold">Export Preview</span>
          </div>
          <Button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 gradient-warm text-primary-foreground"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* PDF Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 print:py-0 print:px-0 print:max-w-none">
        {/* Cover Page */}
        <section className="mb-16 print:mb-8 print:page-break-after-always">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="font-display text-3xl font-bold">Wanderlust</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {preferences.destination}
            </h1>
            <p className="text-xl text-muted-foreground">Your Personal Travel Guide</p>
          </div>

          {/* Trip Summary Card */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-8">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Trip Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{itinerary.days.length} days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Est. Cost</p>
                  <p className="font-semibold text-foreground">${itinerary.totalCost}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Style</p>
                  <p className="font-semibold text-foreground capitalize">{preferences.travelStyle}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Locations</p>
                  <p className="font-semibold text-foreground">{itinerary.locations.length} spots</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-muted/50 rounded-2xl p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Trip Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {itinerary.locations.map((loc) => (
                <span
                  key={loc.id}
                  className="px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground border border-border"
                >
                  {loc.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Day by Day */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
            Day-by-Day Itinerary
          </h2>

          {itinerary.days.map((day) => (
            <div key={day.day} className="mb-8 print:page-break-inside-avoid">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-primary-foreground">
                    {day.day}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {day.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
              </div>

              <div className="ml-6 pl-6 border-l-2 border-border space-y-4">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="relative">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-primary/30 border-2 border-primary" />
                    <div className="bg-card rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                        {activity.cost && (
                          <>
                            <span className="mx-2">•</span>
                            <DollarSign className="w-3 h-3" />
                            {activity.cost.toFixed(0)}
                          </>
                        )}
                      </div>
                      <h4 className="font-medium text-foreground mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center print:mt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-display text-lg font-semibold">Wanderlust</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Dream it. Plan it. Live it.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Export;
