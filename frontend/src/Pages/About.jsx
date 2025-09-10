import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, Target, Users, Award, ChevronRight, Microscope, Database, Cpu } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Every algorithm and prediction model is designed with patient wellbeing as the primary focus'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Healthcare data deserves the highest level of protection and confidentiality'
    },
    {
      icon: Target,
      title: 'Accuracy & Precision',
      description: 'Continuous improvement of our models to achieve the highest prediction accuracy'
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making advanced medical AI accessible to everyone, regardless of location or background'
    }
  ];

  const technologies = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Advanced neural networks and ensemble methods for pattern recognition in medical data',
      technologies: ['Logistic Regression', 'Neural Networks', 'Support Vector Machine']
    },
    {
      icon: Database,
      title: 'Data Processing',
      description: 'Sophisticated data pipelines for cleaning, preprocessing and feature engineering',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn']
    },
    {
      icon: Cpu,
      title: 'Model Optimization',
      description: 'Performance tuning and validation techniques for maximum prediction accuracy',
      technologies: ['Cross-validation', 'Hyperparameter tuning', 'Ensemble methods', 'Feature selection']
    }
  ];


  const achievements = [
    { icon: Award, metric: '92%', label: 'Average Model Accuracy' },
    { icon: Microscope, metric: '4', label: 'Disease Prediction Models' },
    { icon: Users, metric: '10k+', label: 'Users Served' },
    { icon: Database, metric: '1M+', label: 'Data Points Analyzed' }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-medical">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            About CURA
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Revolutionizing Healthcare Through
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            CURA combines cutting-edge machine learning with medical expertise to provide 
            accurate, accessible health predictions that empower early detection and prevention.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that early detection saves lives. Our mission is to democratize access to 
                advanced medical predictions through AI, helping individuals take proactive steps 
                towards better health outcomes.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                By leveraging machine learning algorithms trained on comprehensive medical datasets, 
                CURA provides instant, accurate health assessments that traditionally require 
                expensive tests and specialist consultations.
              </p>
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/prediction">
                  Experience CURA
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="pb-2">
                    <achievement.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-2xl font-bold text-primary">
                      {achievement.metric}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-medium">
                      {achievement.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-all duration-300 border-border/50">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground">
              Cutting-edge tools and methodologies powering our predictions
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 border-border/50">
                <CardHeader>
                  <tech.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tech.technologies.map((item, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join the Future of Healthcare
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Start your health journey with AI-powered predictions and personalized insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link to="/prediction">
                Try Predictions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link to="/chatbot">
                Chat with AI
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;