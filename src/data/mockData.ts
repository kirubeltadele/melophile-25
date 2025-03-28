
export interface Medication {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  category: string;
  dosage: string;
  price: number;
  stockStatus: 'available' | 'low' | 'unavailable';
  image?: string;
  description: string;
  sideEffects: string[];
  contraindications: string[];
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  medications: {
    medicationId: string;
    price: number;
    inStock: boolean;
    quantity: number;
  }[];
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  date: string;
  author: string;
}

export interface Reminder {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  time: string;
  active: boolean;
  startDate: string;
  endDate?: string;
}

export const medications: Medication[] = [
  {
    id: "med-001",
    name: "Amoxicillin",
    brandName: "Amoxil",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    dosage: "500mg",
    price: 150,
    stockStatus: "available",
    image: "https://www.drugs.com/images/pills/fio/SDZ07710.JPG",
    description: "Amoxicillin is a penicillin antibiotic that fights bacteria.",
    sideEffects: ["Diarrhea", "Stomach pain", "Headache", "Rash"],
    contraindications: ["Penicillin allergy", "Liver disease", "Mononucleosis"]
  },
  {
    id: "med-002",
    name: "Paracetamol",
    brandName: "Panadol",
    genericName: "Acetaminophen",
    category: "Pain Relief",
    dosage: "500mg",
    price: 35,
    stockStatus: "available",
    image: "https://www.drugs.com/images/pills/fio/ACH03970.JPG",
    description: "Paracetamol is used to treat pain and fever.",
    sideEffects: ["Nausea", "Stomach pain", "Loss of appetite"],
    contraindications: ["Liver disease", "Alcoholism"]
  },
  {
    id: "med-003",
    name: "Metformin",
    brandName: "Glucophage",
    genericName: "Metformin Hydrochloride",
    category: "Diabetes",
    dosage: "500mg",
    price: 120,
    stockStatus: "low",
    image: "https://www.drugs.com/images/pills/fio/TEV05251.JPG",
    description: "Metformin is used to treat type 2 diabetes.",
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Stomach pain"],
    contraindications: ["Kidney disease", "Heart failure", "Liver disease"]
  },
  {
    id: "med-004",
    name: "Atorvastatin",
    brandName: "Lipitor",
    genericName: "Atorvastatin Calcium",
    category: "Cholesterol",
    dosage: "20mg",
    price: 250,
    stockStatus: "available",
    image: "https://www.drugs.com/images/pills/fio/PFE04790.JPG",
    description: "Atorvastatin is used to lower cholesterol and triglycerides.",
    sideEffects: ["Muscle pain", "Joint pain", "Diarrhea"],
    contraindications: ["Liver disease", "Pregnancy", "Breastfeeding"]
  },
  {
    id: "med-005",
    name: "Losartan",
    brandName: "Cozaar",
    genericName: "Losartan Potassium",
    category: "Blood Pressure",
    dosage: "50mg",
    price: 180,
    stockStatus: "unavailable",
    image: "https://www.drugs.com/images/pills/fio/BMY04910.JPG",
    description: "Losartan is used to treat high blood pressure and heart failure.",
    sideEffects: ["Dizziness", "Headache", "Cough", "Upper respiratory infection"],
    contraindications: ["Pregnancy", "Diabetes medication", "ACE inhibitors"]
  }
];

export const pharmacies: Pharmacy[] = [
  {
    id: "pharm-001",
    name: "Selam Pharmacy",
    address: "Bole Road, Addis Ababa",
    phone: "+251 91 234 5678",
    email: "selam@pharmacy.com",
    hours: "8:00 AM - 8:00 PM",
    location: {
      lat: 9.0222,
      lng: 38.7468
    },
    rating: 4.5,
    medications: [
      { medicationId: "med-001", price: 150, inStock: true, quantity: 50 },
      { medicationId: "med-002", price: 35, inStock: true, quantity: 200 },
      { medicationId: "med-004", price: 250, inStock: true, quantity: 30 }
    ]
  },
  {
    id: "pharm-002",
    name: "Tena Pharmacy",
    address: "Meskel Square, Addis Ababa",
    phone: "+251 91 876 5432",
    email: "tena@pharmacy.com",
    hours: "9:00 AM - 9:00 PM",
    location: {
      lat: 9.0105,
      lng: 38.7612
    },
    rating: 4.2,
    medications: [
      { medicationId: "med-002", price: 40, inStock: true, quantity: 150 },
      { medicationId: "med-003", price: 120, inStock: true, quantity: 15 },
      { medicationId: "med-005", price: 180, inStock: false, quantity: 0 }
    ]
  },
  {
    id: "pharm-003",
    name: "Kenema Pharmacy",
    address: "Churchill Avenue, Addis Ababa",
    phone: "+251 91 123 4567",
    email: "kenema@pharmacy.com",
    hours: "8:30 AM - 7:30 PM",
    location: {
      lat: 9.0284,
      lng: 38.7575
    },
    rating: 4.7,
    medications: [
      { medicationId: "med-001", price: 160, inStock: true, quantity: 30 },
      { medicationId: "med-003", price: 115, inStock: true, quantity: 25 },
      { medicationId: "med-004", price: 240, inStock: true, quantity: 40 }
    ]
  }
];

export const healthTips: HealthTip[] = [
  {
    id: "tip-001",
    title: "Managing Diabetes During Fasting",
    content: "If you have diabetes and plan to fast, consult your healthcare provider for personalized advice. Monitor your blood sugar more frequently during fasting periods, and always have fast-acting carbs on hand in case of hypoglycemia. Stay hydrated when not fasting, and consider adjusting medication timing with medical supervision.",
    category: "Diabetes",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    date: "2023-04-15",
    author: "Dr. Tigist Haile"
  },
  {
    id: "tip-002",
    title: "Staying Hydrated in Ethiopian Heat",
    content: "During hot seasons, aim to drink at least 3 liters of water daily. Look for signs of dehydration like dark urine, fatigue, and headaches. Consume water-rich foods like watermelon and cucumber. Avoid excessive caffeine and alcohol which can increase dehydration.",
    category: "General Health",
    image: "https://images.unsplash.com/photo-1559839914-17aae19cec71",
    date: "2023-05-02",
    author: "Dr. Samuel Girma"
  },
  {
    id: "tip-003",
    title: "Understanding Antibiotic Resistance",
    content: "Antibiotic resistance is a growing concern. Always complete your full course of antibiotics even if you feel better. Never use leftover antibiotics or share them with others. Only take antibiotics prescribed by a healthcare professional, not for viral infections like colds or flu.",
    category: "Medication",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de",
    date: "2023-05-20",
    author: "Dr. Rahel Tesfa"
  }
];

export const reminders: Reminder[] = [
  {
    id: "rem-001",
    medicationId: "med-001",
    medicationName: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times daily",
    time: "8:00, 14:00, 20:00",
    active: true,
    startDate: "2023-04-01",
    endDate: "2023-04-10"
  },
  {
    id: "rem-002",
    medicationId: "med-004",
    medicationName: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    time: "20:00",
    active: true,
    startDate: "2023-03-15"
  },
  {
    id: "rem-003",
    medicationId: "med-002",
    medicationName: "Paracetamol",
    dosage: "500mg",
    frequency: "As needed",
    time: "As needed",
    active: false,
    startDate: "2023-02-10",
    endDate: "2023-02-15"
  }
];
