
import { Button } from "@/components/ui/button";
import { Play, Star, Zap, Home, TrendingUp, Bookmark, User } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Sidebar */}
      <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-800 rounded-full relative">
                <div className="absolute inset-1 border border-gray-800 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-white tracking-wider">SKEIN</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded">
                <Home size={20} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-red-500 py-2 px-3 rounded bg-red-500/10">
                <Play size={20} />
                <span>Browse</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded">
                <TrendingUp size={20} />
                <span>Trending</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded">
                <Bookmark size={20} />
                <span>Saved</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-800">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white py-2 px-3 rounded">
                <User size={20} />
                <span>My profile</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/lovable-uploads/502740be-e506-4084-a21c-60757bdf84cc.png')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center min-h-screen px-12">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              DISCOVER YOUR NEXT
              <br />
              <span className="text-yellow-500">OBSESSION</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              Years after a group of heroes defeated a horde of monsters that terrorized Millhaven, the town is thrown into chaos once again when the townsfolk return with renewed ferocity.
            </p>

            {/* Rating */}
            <div className="flex items-center mb-8">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
              <Star className="w-5 h-5 text-gray-600" />
              <span className="text-gray-400 ml-2">4/5 stars rating</span>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-12">
              <Button 
                onClick={onStart}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 text-lg rounded flex items-center space-x-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>GET STARTED</span>
              </Button>
              <Button 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 px-8 py-3 text-lg rounded bg-transparent"
              >
                TRAILER
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-8 max-w-xl">
              <div className="text-center">
                <Star className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                <h3 className="text-sm font-medium text-white mb-1">Smart Curation</h3>
                <p className="text-xs text-gray-400">AI analyzes your taste</p>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                <h3 className="text-sm font-medium text-white mb-1">Mood Matching</h3>
                <p className="text-xs text-gray-400">Find films for how you feel</p>
              </div>
              <div className="text-center">
                <Play className="w-6 h-6 text-yellow-500 mb-2 mx-auto" />
                <h3 className="text-sm font-medium text-white mb-1">Premium Quality</h3>
                <p className="text-xs text-gray-400">Curated for cinema lovers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
