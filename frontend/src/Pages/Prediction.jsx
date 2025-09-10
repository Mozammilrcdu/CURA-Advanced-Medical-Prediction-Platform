import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Brain, Shield, Ribbon, Zap, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import PredictionForm from '@/components/PredictionForm';

const Prediction = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);

  const diseases = [
    {
      id: 'diabetes',
      name: 'Diabetes',
      description: 'Predict Type 2 diabetes risk based on health indicators',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      accuracy: '94%',
      features: ['Glucose Level', 'BMI', 'Age', 'Blood Pressure', 'Family History']
    },
    {
      id: 'heart',
      name: 'Heart Disease',
      description: 'Assess cardiovascular disease risk factors',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      accuracy: '92%',
      features: ['Cholesterol', 'Blood Pressure', 'ECG Results', 'Exercise Capacity', 'Chest Pain Type']
    },
    {
      id: 'parkinson',
      name: 'Parkinson\'s Disease',
      description: 'Early detection of Parkinson\'s symptoms',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      accuracy: '89%',
      features: ['Motor Symptoms', 'Tremor Frequency', 'Voice Analysis', 'Rigidity Assessment', 'Gait Analysis']
    },
    
    {
      id: 'breast-cancer',
      name: 'Breast Cancer',
      description: 'Early breast cancer risk assessment',
      icon: Ribbon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      accuracy: '93%',
      features: ['Mass Characteristics', 'Mammography Results', 'Age Factor', 'Family History', 'Hormone Levels']
    }
  ];

  if (selectedDisease) {
    return <PredictionForm diseaseType={selectedDisease} onBack={() => setSelectedDisease(null)} />;
  }

  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <section className="py-12 bg-gradient-medical">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            AI Medical Predictions
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Advanced Health
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Prediction Models
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Choose from our collection of AI-powered diagnostic models to get instant health insights 
            based on your medical parameters.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Clinically Validated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-warning" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Selection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Select a Prediction Model
            </h2>
            <p className="text-lg text-muted-foreground">
              Each model is trained on extensive medical datasets with high accuracy rates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diseases.map((disease) => (
              <Card 
                key={disease.id}
                className={`medical-hover shadow-card cursor-pointer transition-all duration-300 ${disease.borderColor} hover:shadow-elevated group`}
                onClick={() => setSelectedDisease(disease.id)}
              >
                <CardHeader className={`${disease.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <disease.icon className={`h-8 w-8 ${disease.color}`} />
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {disease.accuracy}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {disease.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {disease.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-3">Key Parameters:</h4>
                    <div className="space-y-2">
                      {disease.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                          {feature}
                        </div>
                      ))}
                      {disease.features.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          +{disease.features.length - 3} more parameters
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90 group-hover:scale-[1.02] transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDisease(disease.id);
                    }}
                  >
                    Start Prediction
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important Medical Disclaimer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These AI predictions are for informational purposes only and should not be considered 
                    as professional medical advice, diagnosis, or treatment. Always consult with qualified 
                    healthcare professionals for proper medical evaluation and care. The accuracy rates 
                    shown are based on training data and may vary in real-world scenarios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Prediction;