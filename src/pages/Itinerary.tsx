import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Download, ChevronLeft, Calendar, DollarSign, Users } from "lucide-react";
import { ItineraryMap } from "@/components/itinerary/ItineraryMap";
import { ItineraryDays } from "@/components/itinerary/ItineraryDays";
import { ChatPanel } from "@/components/itinerary/ChatPanel";
import { generateMockItinerary } from "@/lib/mockItinerary";
import type { QuestionnaireData } from "./Questionnaire";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preferences = location.state?.preferences as QuestionnaireData | undefined;
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const itinerary = generateMockItinerary(preferences);

  const handleExportPDF = () => {
    navigate("/export", { state: { itinerary, preferences } });
  };

  if (!preferences) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            No itinerary data found
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/questionnaire")}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-display text-xl font-semibold">Wanderlust</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Refine with AI</span>
            </Button>
            <Button
              onClick={handleExportPDF}
              className="flex items-center gap-2 gradient-warm text-primary-foreground"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Trip Summary */}
      <section className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 animate-fade-up">
            Your {preferences.destination} Adventure
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground animate-fade-up animation-delay-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{itinerary.days.length} days</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>${preferences.budget[0]}/day budget</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="capitalize">{preferences.companions}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="h-[400px] lg:h-full rounded-2xl overflow-hidden border border-border animate-fade-up">
              <ItineraryMap locations={itinerary.locations} />
            </div>
          </div>

          {/* Itinerary Days */}
          <div className="animate-fade-up animation-delay-100">
            <ItineraryDays days={itinerary.days} />
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        preferences={preferences}
      />
    </div>
  );
};

export default Itinerary;
