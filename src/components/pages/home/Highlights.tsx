import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Search, Globe, Zap } from "lucide-react";

const highlights = [
  {
    icon: <Film className="h-8 w-8 mb-2 text-primary" />,
    title: "Extensive Library",
    description:
      "Access a vast collection of movies from various genres and eras.",
    badge: "Diverse",
  },
  {
    icon: <Search className="h-8 w-8 mb-2 text-primary" />,
    title: "Easy Discovery",
    description:
      "Find your next favorite movie with our intuitive search and filter options.",
    badge: "User-Friendly",
  },
  {
    icon: <Globe className="h-8 w-8 mb-2 text-primary" />,
    title: "Global Cinema",
    description:
      "Explore a wide range of international films from around the world.",
    badge: "International",
  },
  {
    icon: <Zap className="h-8 w-8 mb-2 text-primary" />,
    title: "Convenient Streaming",
    description:
      "Stream movies easily using our integrated SmashyStream player.",
    badge: "Accessible",
  },
];

const Highlights = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Discover StreamTube
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-gray-700 overflow-hidden"
            >
              <CardHeader className="text-center relative">
                {highlight.icon}
                <CardTitle className="text-xl font-semibold dark:text-white">
                  {highlight.title}
                </CardTitle>
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {highlight.badge}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
