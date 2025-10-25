import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-indian-nutrition.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.85)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Your Favorite Diet Planner
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-95">
          AI-powered Indian meal plans tailored for you. Get personalized nutrition, traditional recipes, and fitness guidance.
        </p>
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 transition-all hover:scale-105 shadow-elevated"
        >
          Start Your Journey
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
