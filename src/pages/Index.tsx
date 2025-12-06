import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, Calendar, Plane, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Planning",
      description: "Tell us your style, we craft your perfect trip",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Optimized day-by-day itineraries",
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Visualize every stop on your journey",
    },
    {
      icon: Plane,
      title: "Export & Go",
      description: "Download your plan as a beautiful PDF",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Travel Planning</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
            Dream it.
            <br />
            <span className="text-gradient">Plan it.</span>
            <br />
            Live it.
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up animation-delay-200">
            Stop spending hours planning your perfect trip. Tell us what you love, 
            and let our AI create a personalized itinerary in minutes.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up animation-delay-300">
            <Button
              size="lg"
              className="group relative px-8 py-6 text-lg font-semibold rounded-full gradient-warm shadow-warm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/questionnaire")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="flex items-center gap-2">
                Start Your Adventure
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </span>
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-muted-foreground animate-fade-up animation-delay-400">
            Join 10,000+ travelers who plan smarter, not harder
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Travel planning, reimagined
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From inspiration to itinerary in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              How Wanderlust works
            </h2>
          </div>

          <div className="space-y-12">
            {[
              { step: "01", title: "Tell us about yourself", description: "Quick questionnaire about your travel style, budget, and preferences" },
              { step: "02", title: "Choose your dates & season", description: "Pick when you want to travel and we'll suggest the best destinations" },
              { step: "03", title: "Refine with AI", description: "Chat with our AI to perfect every detail of your itinerary" },
              { step: "04", title: "Export & explore", description: "Download your personalized PDF guide and start your adventure" },
            ].map((item, index) => (
              <div
                key={item.step}
                className="flex items-start gap-6 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to plan your dream trip?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            It only takes 5 minutes to create your personalized itinerary
          </p>
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold rounded-full gradient-warm shadow-warm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/questionnaire")}
          >
            Get Started — It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-display text-xl font-semibold">Wanderlust</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Wanderlust. Dream it. Plan it. Live it.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
