import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Activity, Brain, Apple, Dumbbell, Moon, Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, Lightbulb } from 'lucide-react';

const HelpfulAdvice = () => {
  const [selectedCategory, setSelectedCategory] = useState('prevention');

  const preventionTips = [
    {
      icon: Heart,
      title: 'Cardiovascular Health',
      tips: [
        'Exercise at least 150 minutes per week of moderate-intensity aerobic activity',
        'Maintain a diet rich in fruits, vegetables, whole grains, and lean proteins',
        'Limit sodium intake to less than 2,300mg per day',
        'Monitor blood pressure and cholesterol levels regularly',
        'Avoid smoking and limit alcohol consumption'
      ],
      color: 'text-red-600'
    },
    {
      icon: Activity,
      title: 'Diabetes Prevention',
      tips: [
        'Maintain a healthy weight (BMI between 18.5-24.9)',
        'Follow a balanced diet with controlled carbohydrate portions',
        'Stay physically active with daily movement',
        'Get regular blood sugar screenings if at risk',
        'Manage stress through relaxation techniques'
      ],
      color: 'text-blue-600'
    },
    {
    icon: Shield,
    title: 'Cancer Prevention',
    tips: [
      'Schedule regular screenings (mammogram, skin checks, colonoscopy as per age)',
      'Avoid excessive sun exposure and use sunscreen daily',
      'Do not smoke or use tobacco products',
      'Maintain a healthy diet rich in antioxidants and fiber',
      'Limit alcohol intake to moderate levels'
    ],
    color: 'text-purple-600'
  },
  {
    icon: Brain,
    title: 'Mental Health',
    tips: [
      'Practice mindfulness and meditation regularly',
      'Stay socially connected with friends and family',
      'Seek professional help if experiencing persistent anxiety or depression',
      'Ensure work-life balance and manage stress effectively',
      'Engage in hobbies and activities that bring joy'
    ],
    color: 'text-indigo-600'
  },
  {
    icon: Apple,
    title: 'Nutrition & Weight Management',
    tips: [
      'Eat balanced meals with vegetables, lean protein, and whole grains',
      'Avoid highly processed foods and added sugars',
      'Control portion sizes and avoid overeating',
      'Drink at least 8 glasses of water daily',
      'Track food intake if struggling with weight control'
    ],
    color: 'text-green-600'
  },
  {
    icon: Moon,
    title: 'Sleep Health',
    tips: [
      'Maintain a consistent sleep schedule (7–9 hours per night)',
      'Create a relaxing bedtime routine and avoid screens before bed',
      'Keep your bedroom dark, quiet, and cool',
      'Avoid caffeine and heavy meals close to bedtime',
      'Seek medical advice if experiencing sleep disorders like apnea'
    ],
    color: 'text-yellow-600'
  }
];

  const healthyHabits = [
    { habit: 'Drink water first thing in the morning', frequency: 'Daily', impact: 'High' },
    { habit: 'Take a 10-minute walk after meals', frequency: 'After each meal', impact: 'High' },
    { habit: 'Practice deep breathing for 5 minutes', frequency: 'Daily', impact: 'Medium' },
    { habit: 'Eat a serving of vegetables with lunch', frequency: 'Daily', impact: 'High' }
  ];

  return (
    <div className="min-h-screen py-12">
      <section className="py-12 bg-gradient-medical">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Health & Wellness
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Helpful Health
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Advice & Tips
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Evidence-based health recommendations to help you maintain optimal wellness 
            and prevent common health conditions
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="prevention">
                <Shield className="h-4 w-4 mr-2" />
                Prevention
              </TabsTrigger>
              <TabsTrigger value="habits">
                <Lightbulb className="h-4 w-4 mr-2" />
                Healthy Habits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prevention">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {preventionTips.map((category, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 border-border/50">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <category.icon className={`h-8 w-8 ${category.color}`} />
                        <div>
                          <CardTitle className="text-xl">{category.title}</CardTitle>
                          <CardDescription>Prevention strategies</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="habits">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthyHabits.map((habit, index) => (
                  <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <p className="font-medium text-foreground flex-1">{habit.habit}</p>
                        <Badge variant="secondary" className="ml-2">
                          {habit.impact} Impact
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{habit.frequency}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default HelpfulAdvice;