import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useRef } from 'react';
import { ScrollRevealSection, ScrollRevealContent } from '@/components/ScrollRevealSection';

const projects = [
  {
    id: 1,
    title: "Neural Design Interface",
    description: "AI-powered design tool that generates creative layouts using machine learning algorithms and user preferences.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop",
    tags: ["AI/ML", "React", "Python", "Design"],
    featured: true
  },
  {
    id: 2, 
    title: "3D Portfolio Showcase",
    description: "Immersive WebGL-based portfolio platform showcasing student work in an interactive 3D environment.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop",
    tags: ["Three.js", "WebGL", "React", "3D"]
  },
  {
    id: 3,
    title: "Collaborative Whiteboard",
    description: "Real-time collaborative design workspace with vector tools, voice chat, and project management features.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&h=400&fit=crop",
    tags: ["Socket.io", "Canvas", "Vue.js", "WebRTC"]
  },
  {
    id: 4,
    title: "AR Campus Guide",
    description: "Augmented reality mobile app helping students navigate campus with interactive 3D markers and information.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop",
    tags: ["ARCore", "Unity", "Mobile", "C#"]
  },
  {
    id: 5,
    title: "Design System Generator",
    description: "Automated tool for generating consistent design systems with color palettes, typography, and component libraries.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
    tags: ["Node.js", "Design Tokens", "CLI", "Automation"]
  },
  {
    id: 6,
    title: "VR Learning Environment",
    description: "Virtual reality educational platform for immersive learning experiences in design and technology.",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
    tags: ["VR", "Unity", "Educational", "3D Modeling"]
  }
];

export function ProjectsSection() {
  return (
    <ScrollRevealSection 
      id="projects" 
      className="py-20 relative overflow-hidden"
      fadeDirection="up"
      threshold={0.15}
    >
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4">
        <ScrollRevealContent className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">
            Our <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of innovative projects that showcase the intersection 
            of design, technology, and creative problem-solving.
          </p>
        </ScrollRevealContent>

        {/* Featured Project */}
        <ScrollRevealContent className="mb-16" delay={0.2}>
          {projects
            .filter(project => project.featured)
            .map((project) => (
              <Card key={project.id} className="glass-card border-primary/30 overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                          <Eye className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
        </ScrollRevealContent>

        {/* Project Grid */}
        <ScrollRevealContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.15}>
          {projects
            .filter(project => !project.featured)
            .map((project, index) => (
              <Card key={project.id} className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden group h-full">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </ScrollRevealContent>

        {/* View All Projects CTA */}
        <ScrollRevealContent className="text-center mt-12" delay={0.4}>
          <Button className="bg-gradient-primary btn-glow">
            View All Projects
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </ScrollRevealContent>
      </div>
    </ScrollRevealSection>
  );
}