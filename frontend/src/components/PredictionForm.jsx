import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Brain, Heart, Activity, Shield, Ribbon, Loader2, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const PredictionForm = ({ diseaseType, onBack }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
const diseaseConfig = {
  'diabetes': {
    name: 'Diabetes',
    icon: Activity,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    fields: [
      { id: 'pregnancies', label: 'Pregnancies', type: 'number', placeholder: 'e.g., 2', required: true },
      { id: 'glucose', label: 'Glucose Level (mg/dL)', type: 'number', placeholder: 'e.g., 120', required: true },
      { id: 'bloodPressure', label: 'Blood Pressure (mm Hg)', type: 'number', placeholder: 'e.g., 70', required: true },
      { id: 'skinThickness', label: 'Skin Thickness (mm)', type: 'number', placeholder: 'e.g., 20', required: true },
      { id: 'insulin', label: 'Insulin Level (mu U/ml)', type: 'number', placeholder: 'e.g., 85', required: true },
      { id: 'bmi', label: 'BMI (kg/m²)', type: 'number', placeholder: 'e.g., 25.5', required: true },
      { id: 'dpf', label: 'Diabetes Pedigree Function', type: 'number', placeholder: 'e.g., 0.52', required: true },
      { id: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age', required: true }
    ]
  },

  'heart': {
    name: 'Heart Disease',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    fields: [
      { id: 'age', label: 'Age', type: 'number', placeholder: 'e.g., 45', required: true },
      { id: 'sex', label: 'Sex', type: 'select', options: ['Male', 'Female'], required: true },
      { id: 'cp', label: 'Chest Pain Type', type: 'select', options: ['Typical Angina', 'Atypical Angina', 'Non-Anginal', 'Asymptomatic'], required: true },
      { id: 'trestbps', label: 'Resting Blood Pressure (mm Hg)', type: 'number', placeholder: 'e.g., 120', required: true },
      { id: 'chol', label: 'Serum Cholesterol (mg/dL)', type: 'number', placeholder: 'e.g., 200', required: true },
      { id: 'fbs', label: 'Fasting Blood Sugar > 120 mg/dL', type: 'select', options: ['Yes', 'No'], required: true },
      { id: 'restecg', label: 'Resting ECG Results', type: 'select', options: ['Normal', 'ST-T Abnormality', 'Left Ventricular Hypertrophy'], required: true },
      { id: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', placeholder: 'e.g., 150', required: true },
      { id: 'exang', label: 'Exercise Induced Angina', type: 'select', options: ['Yes', 'No'], required: true },
      { id: 'oldpeak', label: 'ST Depression', type: 'number', placeholder: 'e.g., 2.3', required: true },
      { id: 'slope', label: 'Slope of ST Segment', type: 'select', options: ['Upsloping', 'Flat', 'Downsloping'], required: true },
      { id: 'ca', label: 'Number of Major Vessels (0–3)', type: 'number', placeholder: 'e.g., 1', required: true },
      { id: 'thal', label: 'Thalassemia', type: 'select', options: ['Normal', 'Fixed Defect', 'Reversible Defect'], required: true }
    ]
  },

  'parkinson': {
    name: "Parkinson's Disease",
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    fields: [
      { id: 'fo', label: 'MDVP:Fo (Hz)', type: 'number', placeholder: 'e.g., 120.5', required: true },
      { id: 'fhi', label: 'MDVP:Fhi (Hz)', type: 'number', placeholder: 'e.g., 150.2', required: true },
      { id: 'flo', label: 'MDVP:Flo (Hz)', type: 'number', placeholder: 'e.g., 85.6', required: true },
      { id: 'jitter', label: 'MDVP:Jitter (%)', type: 'number', placeholder: 'e.g., 0.005', required: true },
      { id: 'shimmer', label: 'MDVP:Shimmer', type: 'number', placeholder: 'e.g., 0.03', required: true },
      { id: 'nhr', label: 'Noise-to-Harmonics Ratio', type: 'number', placeholder: 'e.g., 0.02', required: true },
      { id: 'hnr', label: 'Harmonics-to-Noise Ratio', type: 'number', placeholder: 'e.g., 21.0', required: true },
      { id: 'rpde', label: 'RPDE', type: 'number', placeholder: 'e.g., 0.45', required: true },
      { id: 'dfa', label: 'DFA', type: 'number', placeholder: 'e.g., 0.72', required: true },
      { id: 'spread1', label: 'Spread1', type: 'number', placeholder: 'e.g., -6.5', required: true },
      { id: 'spread2', label: 'Spread2', type: 'number', placeholder: 'e.g., 0.3', required: true },
      { id: 'ppe', label: 'PPE', type: 'number', placeholder: 'e.g., 0.25', required: true }
    ]
  },

  'breast-cancer': {
  name: 'Breast Cancer',
  icon: Ribbon,
  color: 'text-pink-600',
  bgColor: 'bg-pink-50 dark:bg-pink-900/20',
  fields: [
    { id: 'id', label: 'ID', type: 'number', placeholder: '0', required: true, defaultValue: 0 },
    // Mean features
    { id: 'radius_mean', label: 'Radius Mean', type: 'number', placeholder: 'e.g., 14.5', required: true },
    { id: 'texture_mean', label: 'Texture Mean', type: 'number', placeholder: 'e.g., 20.3', required: true },
    { id: 'perimeter_mean', label: 'Perimeter Mean', type: 'number', placeholder: 'e.g., 85.6', required: true },
    { id: 'area_mean', label: 'Area Mean', type: 'number', placeholder: 'e.g., 560', required: true },
    { id: 'smoothness_mean', label: 'Smoothness Mean', type: 'number', placeholder: 'e.g., 0.09', required: true },
    { id: 'compactness_mean', label: 'Compactness Mean', type: 'number', placeholder: 'e.g., 0.1', required: true },
    { id: 'concavity_mean', label: 'Concavity Mean', type: 'number', placeholder: 'e.g., 0.15', required: true },
    { id: 'concave_points_mean', label: 'Concave Points Mean', type: 'number', placeholder: 'e.g., 0.07', required: true },
    { id: 'symmetry_mean', label: 'Symmetry Mean', type: 'number', placeholder: 'e.g., 0.2', required: true },
    { id: 'fractal_dimension_mean', label: 'Fractal Dimension Mean', type: 'number', placeholder: 'e.g., 0.06', required: true },

    // SE features
    { id: 'radius_se', label: 'Radius SE', type: 'number', placeholder: 'e.g., 0.5', required: true },
    { id: 'texture_se', label: 'Texture SE', type: 'number', placeholder: 'e.g., 1.0', required: true },
    { id: 'perimeter_se', label: 'Perimeter SE', type: 'number', placeholder: 'e.g., 3.0', required: true },
    { id: 'area_se', label: 'Area SE', type: 'number', placeholder: 'e.g., 40', required: true },
    { id: 'smoothness_se', label: 'Smoothness SE', type: 'number', placeholder: 'e.g., 0.005', required: true },
    { id: 'compactness_se', label: 'Compactness SE', type: 'number', placeholder: 'e.g., 0.02', required: true },
    { id: 'concavity_se', label: 'Concavity SE', type: 'number', placeholder: 'e.g., 0.03', required: true },
    { id: 'concave_points_se', label: 'Concave Points SE', type: 'number', placeholder: 'e.g., 0.01', required: true },
    { id: 'symmetry_se', label: 'Symmetry SE', type: 'number', placeholder: 'e.g., 0.02', required: true },
    { id: 'fractal_dimension_se', label: 'Fractal Dimension SE', type: 'number', placeholder: 'e.g., 0.003', required: true },

    // Worst features
    { id: 'radius_worst', label: 'Radius Worst', type: 'number', placeholder: 'e.g., 25', required: true },
    { id: 'texture_worst', label: 'Texture Worst', type: 'number', placeholder: 'e.g., 30', required: true },
    { id: 'perimeter_worst', label: 'Perimeter Worst', type: 'number', placeholder: 'e.g., 160', required: true },
    { id: 'area_worst', label: 'Area Worst', type: 'number', placeholder: 'e.g., 1800', required: true },
    { id: 'smoothness_worst', label: 'Smoothness Worst', type: 'number', placeholder: 'e.g., 0.15', required: true },
    { id: 'compactness_worst', label: 'Compactness Worst', type: 'number', placeholder: 'e.g., 0.25', required: true },
    { id: 'concavity_worst', label: 'Concavity Worst', type: 'number', placeholder: 'e.g., 0.35', required: true },
    { id: 'concave_points_worst', label: 'Concave Points Worst', type: 'number', placeholder: 'e.g., 0.15', required: true },
    { id: 'symmetry_worst', label: 'Symmetry Worst', type: 'number', placeholder: 'e.g., 0.35', required: true },
    { id: 'fractal_dimension_worst', label: 'Fractal Dimension Worst', type: 'number', placeholder: 'e.g., 0.08', required: true }
  ]
}
};

  const config = diseaseConfig[diseaseType];
  const IconComponent = config.icon;
  const encodeHeartValues = (data) => {
  return {
    ...data,
    sex: data.sex === 'Male' ? 1 : 0,
    cp: { 'Typical Angina': 0, 'Atypical Angina': 1, 'Non-Anginal': 2, 'Asymptomatic': 3 }[data.cp],
    fbs: data.fbs === 'Yes' ? 1 : 0,
    restecg: { 'Normal': 0, 'ST-T Abnormality': 1, 'Left Ventricular Hypertrophy': 2 }[data.restecg],
    exang: data.exang === 'Yes' ? 1 : 0,
    slope: { 'Upsloping': 0, 'Flat': 1, 'Downsloping': 2 }[data.slope],
    thal: { 'Normal': 1, 'Fixed Defect': 2, 'Reversible Defect': 3 }[data.thal],
  };
};


  const handleInputChange = (fieldId, eOrValue) => {
  if (typeof eOrValue === "object" && eOrValue.target) {
    // Text / number input → store value only
    let value = eOrValue.target.value;
    if (eOrValue.target.type === "number" && value !== "") {
      value = Number(value); // convert to number
    }
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  } else {
    // Select input → directly store value
    setFormData((prev) => ({ ...prev, [fieldId]: eOrValue }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/predict`;

    let payload = formData;

    if (diseaseType === "heart") {
      payload = encodeHeartValues(formData);
    }

    const response = await axios.post(`${BASE_URL}/${diseaseType}`, payload);
    setResult(response.data);
  } catch (error) {
    console.error(error);
    alert('Prediction failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  if (result) {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Predictions
          </Button>
          <div className="flex items-center space-x-3">
            <IconComponent className={`h-8 w-8 ${config.color}`} />
            <h1 className="text-3xl font-bold text-foreground">
              {config.name} Prediction Result
            </h1>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card className="shadow-elevated border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <TrendingUp className="h-6 w-6" />
                <span>Prediction</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                {result.prediction === 1 ? (
                  <p className="text-2xl font-bold text-red-600">
                    ⚠️ Disease Likely Detected
                  </p>
                ) : (
                  <p className="text-2xl font-bold text-green-600">
                    ✅ No Disease Detected
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Medical Disclaimer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This prediction is based on AI analysis and should not replace professional medical advice. 
                    Please consult with healthcare professionals for proper diagnosis and treatment. 
                    The prediction accuracy may vary and should be considered alongside other clinical factors.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setResult(null)} className="bg-gradient-primary hover:opacity-90">
              Run Another Prediction
            </Button>
            <Button variant="outline" onClick={onBack}>
              Try Different Model
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Models
          </Button>
          <div className={`${config.bgColor} rounded-lg p-6 border border-border/50`}>
            <div className="flex items-center space-x-4">
              <IconComponent className={`h-12 w-12 ${config.color}`} />
              <div>
                <h1 className="text-3xl font-bold text-foreground">{config.name} Prediction</h1>
                <p className="text-muted-foreground">Enter your health parameters for AI-powered risk assessment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Health Assessment Form</CardTitle>
            <CardDescription>
              Please provide accurate information for the most reliable prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="font-medium">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {field.type === 'select' ? (
                      <Select onValueChange={(value) => handleInputChange(field.id, value)} required={field.required}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        step={field.type === 'number' ? 'any' : undefined}
                        accept={field.accept}
                        onChange={(e) => handleInputChange(field.id, e)}
                        required={field.required}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="focus:ring-primary focus:border-primary"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Health Data...
                    </>
                  ) : (
                    'Generate Prediction'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Brain className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">How It Works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our AI model analyzes your health parameters using advanced machine learning algorithms 
                  trained on extensive medical datasets. The prediction provides a risk assessment 
                  and personalized recommendations based on evidence-based medical research.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictionForm;
