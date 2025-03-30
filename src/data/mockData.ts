
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

// Add interface and mock data for reminders
export interface Reminder {
  id: string;
  medicationId: string;
  medicationName: string;
  time: string;
  startDate: string;
  frequency: string;
  active: boolean;
}

export const reminders: Reminder[] = [
  {
    id: "rem1",
    medicationId: "med1",
    medicationName: "Lisinopril",
    time: "08:00 AM",
    startDate: "2023-06-15",
    frequency: "Daily",
    active: true
  },
  {
    id: "rem2",
    medicationId: "med2",
    medicationName: "Atorvastatin",
    time: "08:00 PM",
    startDate: "2023-06-10",
    frequency: "Daily",
    active: true
  },
  {
    id: "rem3",
    medicationId: "med3",
    medicationName: "Metformin",
    time: "12:30 PM",
    startDate: "2023-06-12",
    frequency: "Twice Daily",
    active: false
  }
];

// Add interface and mock data for health tips
export interface HealthTip {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  likes?: number;
}

export const healthTips: HealthTip[] = [
  {
    id: "tip1",
    title: "The Importance of Staying Hydrated",
    content: "Drinking enough water each day is crucial for many reasons: to regulate body temperature, keep joints lubricated, prevent infections, deliver nutrients to cells, and keep organs functioning properly. Being well-hydrated also improves sleep quality, cognition, and mood.<br/><br/>Experts recommend drinking roughly 3.7 liters of fluids per day for men and 2.7 liters for women. This includes water, other beverages, and fluid from food. An easy rule to follow is to drink water when you're thirsty and drink enough so your urine is colorless or light yellow.",
    date: "2023-06-15",
    author: "Dr. Sarah Johnson",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    likes: 45
  },
  {
    id: "tip2",
    title: "Understanding Blood Pressure Readings",
    content: "Blood pressure is measured using two numbers: The first number, called systolic blood pressure, represents the pressure in your blood vessels when your heart beats. The second number, called diastolic blood pressure, represents the pressure in your blood vessels when your heart rests between beats.<br/><br/>A normal blood pressure level is less than 120/80 mmHg. If your results fall into this category, stick with heart-healthy habits like following a balanced diet and getting regular exercise. Elevated blood pressure is when readings consistently range from 120-129 systolic and less than 80 mmHg diastolic. People with elevated blood pressure are likely to develop high blood pressure unless steps are taken to control the condition.",
    date: "2023-06-10",
    author: "Dr. Michael Chen",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    likes: 32
  },
  {
    id: "tip3",
    title: "Benefits of Regular Exercise",
    content: "Regular physical activity is one of the most important things you can do for your health. Being physically active can improve your brain health, help manage weight, reduce the risk of disease, strengthen bones and muscles, and improve your ability to do everyday activities.<br/><br/>Adults should aim for at least 150 minutes a week of moderate-intensity aerobic activity or 75 minutes of vigorous aerobic activity, or a combination of both. Strength training exercises for all major muscle groups should be done at least twice a week.",
    date: "2023-06-05",
    author: "Dr. Emily Roberts",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    likes: 56
  },
  {
    id: "tip4",
    title: "Importance of Medication Adherence",
    content: "Taking your medications as prescribed is crucial for managing chronic conditions and preventing serious complications. Non-adherence can lead to disease progression, lower quality of life, and increased healthcare costs.<br/><br/>Here are some tips to help you take your medications as directed: Use pill organizers, set up reminders on your phone, link taking medication with daily routines, and keep a medication log. Always speak with your healthcare provider if you're having trouble with your medication regimen.",
    date: "2023-05-28",
    author: "Dr. James Wilson",
    category: "Medication",
    likes: 27
  },
  {
    id: "tip5",
    title: "Healthy Eating on a Budget",
    content: "Eating healthy doesn't have to be expensive. With some planning and smart shopping, you can maintain a nutritious diet while saving money.<br/><br/>Buy in bulk, choose frozen fruits and vegetables which are just as nutritious as fresh ones but last longer, plan your meals, make a shopping list and stick to it, cook at home more often, and use leftovers creatively. Remember that some of the healthiest foods, like beans, brown rice, and in-season vegetables, are also among the most affordable.",
    date: "2023-05-20",
    author: "Dr. Angela Martinez",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    likes: 39
  }
];
