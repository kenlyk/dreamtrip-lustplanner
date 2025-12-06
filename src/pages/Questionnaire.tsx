import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { TravelStyleStep } from "@/components/questionnaire/TravelStyleStep";
import { BudgetStep } from "@/components/questionnaire/BudgetStep";
import { CompanionsStep } from "@/components/questionnaire/CompanionsStep";
import { InterestsStep } from "@/components/questionnaire/InterestsStep";
import { DatesStep } from "@/components/questionnaire/DatesStep";
import { DestinationStep } from "@/components/questionnaire/DestinationStep";

export interface QuestionnaireData {
  travelStyle: string;
  budget: number[];
  companions: string;
  interests: string[];
  dateRange: { from: Date | undefined; to: Date | undefined };
  destination: string;
}

const steps = [
  { id: "style", title: "Travel Style", subtitle: "How do you like to travel?" },
  { id: "budget", title: "Budget", subtitle: "What's your daily budget?" },
  { id: "companions", title: "Companions", subtitle: "Who's joining you?" },
  { id: "interests", title: "Interests", subtitle: "What excites you?" },
  { id: "dates", title: "Dates", subtitle: "When are you traveling?" },
  { id: "destination", title: "Destination", subtitle: "Where to?" },
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({
    travelStyle: "",
    budget: [100],
    companions: "",
    interests: [],
    dateRange: { from: undefined, to: undefined },
    destination: "",
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to itinerary with data
      navigate("/itinerary", { state: { preferences: data } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "style":
        return <TravelStyleStep value={data.travelStyle} onChange={(v) => updateData({ travelStyle: v })} />;
      case "budget":
        return <BudgetStep value={data.budget} onChange={(v) => updateData({ budget: v })} />;
      case "companions":
        return <CompanionsStep value={data.companions} onChange={(v) => updateData({ companions: v })} />;
      case "interests":
        return <InterestsStep value={data.interests} onChange={(v) => updateData({ interests: v })} />;
      case "dates":
        return <DatesStep value={data.dateRange} onChange={(v) => updateData({ dateRange: v })} />;
      case "destination":
        return <DestinationStep value={data.destination} onChange={(v) => updateData({ destination: v })} />;
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (steps[currentStep].id) {
      case "style":
        return data.travelStyle !== "";
      case "budget":
        return data.budget[0] > 0;
      case "companions":
        return data.companions !== "";
      case "interests":
        return data.interests.length > 0;
      case "dates":
        return data.dateRange.from !== undefined;
      case "destination":
        return data.destination !== "";
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-display text-xl font-semibold">Wanderlust</span>
          </button>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-1" />
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12 animate-fade-up">
          <p className="text-primary font-medium mb-2">{steps[currentStep].subtitle}</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {steps[currentStep].title}
          </h1>
        </div>

        <div className="min-h-[400px] animate-fade-up animation-delay-100">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center gap-2 gradient-warm text-primary-foreground px-6 py-3 rounded-full hover:shadow-warm transition-all duration-300"
          >
            {currentStep === steps.length - 1 ? "Create Itinerary" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Questionnaire;
