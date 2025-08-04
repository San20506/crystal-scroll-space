import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Users, Rocket, Code } from 'lucide-react';
import { useRef } from 'react';
import { ScrollRevealSection, ScrollRevealContent } from '@/components/ScrollRevealSection';

const features = [
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Fostering breakthrough ideas and cutting-edge solutions that push the boundaries of technology and design."
  },
  {
    icon: Users,
    title: "Collaborative Community", 
    description: "A vibrant network of creators, designers, and developers working together to build amazing projects."
  },
  {
    icon: Rocket,
    title: "Project Excellence",
    description: "From concept to completion, we deliver high-quality projects that make a real impact in the digital world."
  },
  {
    icon: Code,
    title: "Technical Mastery",
    description: "Combining deep technical expertise with creative vision to create exceptional user experiences."
  }
];

export function AboutSection() {
  return (
    <ScrollRevealSection 
      id="about" 
      className="py-20 relative overflow-hidden"
      fadeDirection="up"
      threshold={0.2}
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        className="absolute top-1/4 -right-20"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 -left-20"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="w-60 h-60 bg-secondary/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4">
        <ScrollRevealContent className="text-center mb-16">
          <motion.div
            whileInView={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-transparent">
              About <span className="text-gradient">FDCI Club</span>
            </h2>
          </motion.div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are the Department of ADS (Applied Design & Systems) creative collective, 
            dedicated to bridging the gap between innovative design and cutting-edge technology. 
            Our mission is to empower the next generation of digital creators.
          </p>
        </ScrollRevealContent>

        {/* Enhanced Feature Grid */}
        <ScrollRevealContent className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" stagger={0.2}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ 
                y: -8,
                rotateY: 5,
                scale: 1.02
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 h-full group overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <div className="flex items-start space-x-4 relative z-10">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ScrollRevealContent>

        {/* Enhanced Stats Section */}
        <ScrollRevealContent delay={0.4}>
          <motion.div
            className="glass-card p-8 rounded-2xl relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
              animate={{
                background: [
                  "linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1), hsl(var(--accent) / 0.1))",
                  "linear-gradient(90deg, hsl(var(--secondary) / 0.1), hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.1))",
                  "linear-gradient(90deg, hsl(var(--accent) / 0.1), hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))",
                  "linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1), hsl(var(--accent) / 0.1))"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <ScrollRevealContent className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10" stagger={0.15}>
              {[
                { number: "100+", label: "Active Members" },
                { number: "50+", label: "Projects Completed" },
                { number: "5+", label: "Years of Innovation" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="space-y-2"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold text-gradient"
                    whileInView={{ 
                      scale: [0.8, 1.1, 1],
                      rotateY: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </ScrollRevealContent>
          </motion.div>
        </ScrollRevealContent>
      </div>
    </ScrollRevealSection>
  );
}