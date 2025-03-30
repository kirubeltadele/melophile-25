// Mock data for medications
export interface Medication {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  category: string;
  dosage: string;
  description: string;
  price: number;
  stockStatus: 'available' | 'low' | 'unavailable';
  usageInstructions?: string;
  sideEffects?: string;
  typicalCourse?: string;
}

export const medications: Medication[] = [
  {
    id: "med1",
    name: "Lisinopril",
    brandName: "Prinivil",
    genericName: "Lisinopril",
    category: "Blood Pressure",
    dosage: "10mg",
    description: "Used to treat high blood pressure and heart failure.",
    price: 12.99,
    stockStatus: "available",
    usageInstructions: "Take once daily with or without food. Take at the same time each day.",
    sideEffects: "Dizziness, headache, cough, high potassium levels.",
    typicalCourse: "Ongoing"
  },
  {
    id: "med2",
    name: "Atorvastatin",
    brandName: "Lipitor",
    genericName: "Atorvastatin Calcium",
    category: "Cholesterol",
    dosage: "20mg",
    description: "Used to lower blood cholesterol and reduce risk of heart attack and stroke.",
    price: 15.50,
    stockStatus: "available",
    usageInstructions: "Take once daily at any time of day, with or without food.",
    sideEffects: "Muscle pain, diarrhea, upset stomach, memory problems.",
    typicalCourse: "Ongoing"
  },
  {
    id: "med3",
    name: "Metformin",
    brandName: "Glucophage",
    genericName: "Metformin HCl",
    category: "Diabetes",
    dosage: "500mg",
    description: "Used to control blood sugar levels in people with type 2 diabetes.",
    price: 8.75,
    stockStatus: "low",
    usageInstructions: "Take with meals to minimize stomach upset.",
    sideEffects: "Nausea, vomiting, stomach upset, diarrhea, weakness.",
    typicalCourse: "Ongoing"
  },
  {
    id: "med4",
    name: "Amoxicillin",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    dosage: "250mg",
    description: "Used to treat a wide variety of bacterial infections.",
    price: 9.99,
    stockStatus: "available",
    usageInstructions: "Take every 8-12 hours with or without food. Complete entire course as prescribed.",
    sideEffects: "Diarrhea, rash, nausea, vomiting.",
    typicalCourse: "7-10 days"
  },
  {
    id: "med5",
    name: "Albuterol",
    brandName: "Ventolin",
    genericName: "Albuterol Sulfate",
    category: "Respiratory",
    dosage: "90mcg",
    description: "Used for relief of bronchospasm in asthma and COPD.",
    price: 25.00,
    stockStatus: "unavailable",
    usageInstructions: "Inhale as needed for shortness of breath, wheezing, or before exercise.",
    sideEffects: "Nervousness, shakiness, headache, throat irritation.",
    typicalCourse: "As needed"
  },
  {
    id: "med6",
    name: "Sertraline",
    brandName: "Zoloft",
    genericName: "Sertraline HCl",
    category: "Mental Health",
    dosage: "50mg",
    description: "Used to treat depression, anxiety, and other mood disorders.",
    price: 14.25,
    stockStatus: "available",
    usageInstructions: "Take once daily, morning or evening, with or without food.",
    sideEffects: "Nausea, dizziness, drowsiness, insomnia, dry mouth.",
    typicalCourse: "Ongoing (minimum 6 months)"
  }
];
