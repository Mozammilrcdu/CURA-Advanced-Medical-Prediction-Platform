import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Heart, Activity, Shield,Ribbon, Zap, Users, ChevronRight, Star } from 'lucide-react';
import heroImage from '@/assets/hero-medical.png';

const Home = () => {
  const diseases = [
    { name: 'Diabetes', icon: Activity, accuracy: '94%', color: 'text-blue-600' },
    { name: 'Heart Disease', icon: Heart, accuracy: '92%', color: 'text-red-600' },
    { name: 'Parkinson\'s', icon: Brain, accuracy: '89%', color: 'text-purple-600' },
    { name: 'Breast Cancer', icon: Ribbon, accuracy: '93%', color: 'text-pink-600' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Instant Predictions',
      description: 'Get immediate health insights powered by advanced machine learning algorithms'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security and privacy measures'
    },
    {
      icon: Users,
      title: 'Expert Backed',
      description: 'Models developed and validated by medical professionals and data scientists'
    }
  ];

  const stats = [
    { number: '4', label: 'Disease Models' },
    { number: '92%', label: 'Average Accuracy' },
    { number: '10k+', label: 'Predictions Made' },
    { number: '24/7', label: 'Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-medical py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                AI-Powered Medical Predictions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Advanced Health
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Prediction and Detection Platform
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                CURA leverages cutting-edge machine learning to provide instant, accurate predictions and detections
                for multiple health conditions. Early detection saves lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medical">
                  <Link to="/prediction">
                    Start Health Check
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage}
                  alt="CURA Medical AI Platform Interface"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disease Models Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Supported Medical Predictions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI models are trained on extensive medical datasets to provide accurate predictions and detections
              across multiple health conditions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease, index) => (
              <Card key={index} className="medical-hover shadow-card border-border/50">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <disease.icon className={`h-8 w-8 ${disease.color} mr-3`} />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{disease.name}</CardTitle>
                    <CardDescription>Prediction Model</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {disease.accuracy} Accuracy
                    </Badge>
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/prediction">
                Try Predictions Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-medical">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose CURA?
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced technology meets medical expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-all duration-300 border-border/50">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
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
            Ready to Check Your Health?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Get instant AI-powered health predictions and take control of your wellness journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link to="/prediction">
                Start Free Health Check
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link to="/chatbot">
                Chat with AI Assistant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;