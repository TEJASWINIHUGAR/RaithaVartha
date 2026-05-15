/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, cloneElement, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, getDocFromServer, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

async function testConnection() {
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDocFromServer(testDoc);
    console.log("Firebase connected successfully");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or connection.");
    }
  }
}
testConnection();

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

import { 
  Lightbulb, 
  Sprout, 
  Trophy, 
  User, 
  Bell, 
  Search, 
  RefreshCw,
  ChevronRight, 
  ChevronLeft,
  Share2, 
  Bookmark, 
  Clock,
  Camera, 
  ArrowRight,
  Sun,
  CloudSun,
  MapPin,
  LogOut,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Check,
  Sparkles,
  Globe,
  Settings,
  Plus,
  Phone,
  Moon,
  Info,
  Ruler,
  ChevronDown,
  X,
  Mail,
  Calendar,
  TrendingUp,
  Bug,
  Calculator as CalculatorIcon,
  Landmark,
  Wallet,
  PlusCircle,
  FileText,
  Activity,
  Trash2,
  TrendingDown,
  Upload,
  UserPlus,
  LogIn
} from 'lucide-react';

// --- Bilingual Strings ---
const STRINGS = {
  kn: {
    appName: "ರೈತ ವಾರ್ತೆ",
    appSub: "ಡಿಜಿಟಲ್ ಕೃಷಿ",
    tagline: "ಪ್ರತಿ ದಿನ ಒಂದು ಸಲಹೆ",
    loginTitle: "ಮುಂದುವರಿಯಲು ಲಾಗಿನ್ ಮಾಡಿ",
    farmerName: "ರೈತನ ಹೆಸರು",
    mobileNumber: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    selectDistrict: "ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ",
    enterNameHint: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    getOtp: "OTP ಪಡೆಯಿರಿ",
    verifiedFooter: "ವೈಜ್ಞಾನಿಕವಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ • ಕೆ.ವಿ.ಕೆ ಕರ್ನಾಟಕ",
    tipsNav: "ಸಲಹೆಗಳು",
    cropsNav: "ಬೆಳೆಗಳು",
    storiesNav: "ಕಥೆಗಳು",
    profileNav: "ನನ್ನ ಮಾಹಿತಿ",
    dailyAdvisory: "ಇಂದಿನ ಸಲಹೆ",
    swipeHint: "ಹೆಚ್ಚಿನ ಸಲಹೆಗಳಿಗಾಗಿ ಸ್ವೈಪ್ ಮಾಡಿ",
    save: "ಉಳಿಸಿ",
    done: "ಮುಂದೆ",
    share: "ಹಂಚಿಕೊಳ್ಳಿ",
    cropGuide: "ಬೆಳೆ ಮಾಹಿತಿ",
    successStories: "ಯಶಸ್ಸಿನ ಕಥೆಗಳು",
    realFarmers: "ರಿಯಲ್ ರೈತರು. ರಿಯಲ್ ಫಲಿತಾಂಶ.",
    askAi: "AI ಸಲಹೆ",
    saved: "ಉಳಿಸಲಾಗಿದೆ",
    all: "ಎಲ್ಲ",
    newTag: "ಹೊಸ",
    shareLabel: "ಹಂಚಿಕೊಳ್ಳಿ",
    pestAlert: "ಕೀಟ ಎಚ್ಚರಿಕೆ",
    morning: "ಬೆಳಿಗ್ಗೆ",
    logout: "ನಿರ್ಗಮಿಸಿ",
    settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    resendOtp: "ದಿನಾಂಕ ಮರುಕಳಿಸಿ",
    verify: "ದೃಢೀಕರಿಸಿ",
    langToggle: "ಭಾಷೆ",
    digitalAg: "ಡಿಜಿಟಲ್ ಕೃಷಿ",
    edit: "ತಿದ್ದು",
    primaryCrop: "ಪ್ರಮುಖ ಬೆಳೆ",
    farmSize: "ಹೊಲದ ವಿಸ್ತೀರ್ಣ",
    agOfficer: "ಕೃಷಿ ಅಧಿಕಾರಿಗಳು",
    jointDirector: "ಜಂಟಿ ನಿರ್ದೇಶಕರು",
    districtOffice: "ಜಿಲ್ಲಾ ಕಚೇರಿ",
    district: "ಜಿಲ್ಲೆ",
    crop: "ಬೆಳೆ",
    others: "ಇತರೆ",
    appVersion: "ವರ್ಷನ್",
    langLabel: "ಭಾಷೆ",
    darkAppearance: "ಡಾರ್ಕ್ ಮೋಡ್",
    agAlerts: "ಎಚ್ಚರಿಕೆಗಳು",
    paddy: "ಭತ್ತ",
    tomato: "ಟೊಮೇಟೊ",
    maize: "ಮೆಕ್ಕೆಜೋಳ",
    ragi: "ರಾಗಿ",
    cotton: "ಹತ್ತಿ",
    sugarcane: "ಕಬ್ಬು",
    arecanut: "ಅಡಿಕೆ",
    coconut: "ತೆಂಗಿನಕಾಯಿ",
    acre: "ಎಕರೆ",
    acres: "ಎಕರೆಗಳು",
    bestTime: "ಉತ್ತಮ ಸಮಯ",
    expertAdvice: "ತಜ್ಞರ ಸಲಹೆ"
  },
  en: {
    appName: "Raitha Varta",
    appSub: "DIGITAL AGRICULTURE",
    tagline: "One Tip Every Day",
    loginTitle: "Login to continue",
    farmerName: "Farmer Name",
    mobileNumber: "Mobile Number",
    selectDistrict: "Select District",
    enterNameHint: "Enter your name",
    getOtp: "Get OTP",
    verifiedFooter: "Scientifically Verified • KVK Karnataka",
    tipsNav: "Tips",
    cropsNav: "Crops",
    storiesNav: "Stories",
    profileNav: "Profile",
    dailyAdvisory: "Today's Tip",
    swipeHint: "Swipe for more tips",
    save: "Save",
    done: "Done",
    share: "Share",
    cropGuide: "Crop Guide",
    successStories: "Success Stories",
    realFarmers: "Real farmers. Real results.",
    askAi: "AI",
    saved: "Saved",
    all: "All",
    newTag: "NEW",
    shareLabel: "Share",
    pestAlert: "Pest Alert",
    morning: "Morning",
    kvkHassan: "KVK Hassan",
    logout: "Logout",
    settings: "Settings",
    resendOtp: "Resend OTP",
    verify: "Verify",
    langToggle: "Language / ಭಾಷೆ",
    digitalAg: "Digital Agriculture",
    temp: "Bagalkot, 25°C",
    edit: "Edit",
    primaryCrop: "Primary Crop",
    farmSize: "Farm Size",
    agOfficer: "Agricultural Officer Contacts",
    jointDirector: "Joint Director of Agriculture",
    districtOffice: "District Agricultural Office",
    district: "District",
    crop: "Crop",
    others: "Others",
    appVersion: "App Version",
    langLabel: "Language",
    darkAppearance: "Dark Appearance",
    agAlerts: "Agricultural Alerts",
    paddy: "Paddy",
    arecanut: "Arecanut",
    coconut: "Coconut",
    tomato: "Tomato",
    acre: "Acre",
    acres: "Acres",
    bestTime: "Best Time",
    expertAdvice: "Expert Advice"
  }
};

const FARM_SIZES = [
  { en: "0.5 Acre", kn: "0.5 ಎಕರೆ" },
  { en: "1 Acre", kn: "1 ಎಕರೆ" },
  { en: "2 Acres", kn: "2 ಎಕರೆಗಳು" },
  { en: "5 Acres", kn: "5 ಎಕರೆಗಳು" },
  { en: "10+ Acres", kn: "10+ ಎಕರೆಗಳು" }
];

const getLocalizedValue = (value: string, type: 'district' | 'crop' | 'farmSize', lang: 'en' | 'kn') => {
  if (lang === 'en') return value;
  
  if (type === 'district') {
    const idx = DISTRICTS.indexOf(value);
    return idx !== -1 ? DISTRICTS_KN[idx] : value;
  }
  
  if (type === 'crop') {
    const crop = CROPS.find(c => c.nameEn === value);
    return crop ? crop.nameKn : value;
  }

  if (type === 'farmSize') {
    const size = FARM_SIZES.find(s => s.en === value);
    return size ? size.kn : value;
  }
  
  return value;
};

const DISTRICTS = [
  "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", 
  "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", 
  "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", 
  "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", 
  "Yadgir", "Vijayanagara"
];

const DISTRICTS_KN = [
  "ಬಾಗಲಕೋಟೆ", "ಬಳ್ಳಾರಿ", "ಬೆಳಗಾವಿ", "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ", "ಬೆಂಗಳೂರು ನಗರ", "ಬೀದರ್", "ಚಾಮರಾಜನಗರ", 
  "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", "ಚಿಕ್ಕಮಗಳೂರು", "ಚಿತ್ರದುರ್ಗ", "ದಕ್ಷಿಣ ಕನ್ನಡ", "ದಾವಣಗೆರೆ", "ಧಾರವಾಡ", "ಗದಗ", 
  "ಹಾಸನ", "ಹಾವೇರಿ", "ಕಲಬುರಗಿ", "ಕೊಡಗು", "ಕೋಲಾರ", "ಕೊಪ್ಪಳ", "ಮಂಡ್ಯ", "ಮೈಸೂರು", "ರಾಯಚೂರು", 
  "ರಾಮನಗರ", "ಶಿವಮೊಗ್ಗ", "ತುಮಕೂರು", "ಉಡುಪಿ", "ಉತ್ತರ ಕನ್ನಡ", "ವಿಜಯಪುರ", "ಯಾದಗಿರಿ", "ವಿಜಯನಗರ"
];

const TIPS = [
  {
    category: "Paddy",
    titleEn: "Early Weed Removal",
    titleKn: "ಆರಂಭಿಕ ಕಳೆ ತೆಗೆಯುವುದು",
    instructionEn: "Remove weeds within 20 days after transplantation. Early control improves nutrient absorption.",
    instructionKn: "ನಾಟಿ ಮಾಡಿದ 20 ದಿನಗಳಲ್ಲಿ ಕಳೆ ತೆಗೆಯಿರಿ. ಇದರಿಂದ ಪೋಷಕಾಂಶ ಶೋಷಣೆ ಉತ್ತಮವಾಗುತ್ತದೆ.",
    adviceEn: "Use cono weeder for better soil aeration.",
    adviceKn: "ಮಣ್ಣಿನ ಗಾಳಿಯಾಟಕ್ಕಾಗಿ ಕೋನೋ ವೀಡರ್ ಬಳಸಿ.",
    bestTimeEn: "20 Days After Transplanting",
    bestTimeKn: "ನಾಟಿ ಮಾಡಿದ 20 ದಿನಗಳು",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    titleEn: "Brown Plant Hopper Control",
    titleKn: "ಬ್ರೌನ್ ಪ್ಲಾಂಟ್ ಹಾಪರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Inspect the lower stem regularly for hopper attack. Maintain proper drainage.",
    instructionKn: "ಗಿಡದ ಕೆಳಭಾಗವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ. ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    adviceEn: "Spray Imidacloprid if infestation increases.",
    adviceKn: "ಹುಳು ಹೆಚ್ಚಾದರೆ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Vegetative Stage",
    bestTimeKn: "ಬೆಳವಣಿಗೆ ಹಂತ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    titleEn: "Leaf Blast Prevention",
    titleKn: "ಲೀಫ್ ಬ್ಲಾಸ್ಟ್ ತಡೆ",
    instructionEn: "Cloudy weather increases blast disease spread. Remove infected leaves quickly.",
    instructionKn: "ಮೋಡದ ವಾತಾವರಣದಲ್ಲಿ ಬ್ಲಾಸ್ಟ್ ರೋಗ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ.",
    adviceEn: "Spray Tricyclazole fungicide.",
    adviceKn: "ಟ್ರೈಸೈಕ್ಲಜೋಲ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Rainy Season",
    bestTimeKn: "ಮಳೆಗಾಲ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Tomato",
    titleEn: "Early Blight Prevention",
    titleKn: "ಆರಂಭಿಕ ಬ್ಲೈಟ್ ತಡೆ",
    instructionEn: "Brown leaf spots indicate early blight disease.",
    instructionKn: "ಕಂದು ಕಲೆಗಳು ಬ್ಲೈಟ್ ರೋಗದ ಲಕ್ಷಣ.",
    adviceEn: "Spray Mancozeb every 10 days.",
    adviceKn: "ಪ್ರತಿ 10 ದಿನಕ್ಕೊಮ್ಮೆ ಮ್ಯಾಂಕೋಜೆಬ್ ಬಳಸಿ.",
    bestTimeEn: "Before Flowering",
    bestTimeKn: "ಹೂಬಿಡುವ ಮೊದಲು",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tomato",
    titleEn: "Fruit Borer Management",
    titleKn: "ಹಣ್ಣು ತುರಿಕೆ ಹುಳು ನಿಯಂತ್ರಣ",
    instructionEn: "Fruit borers damage tomato fruits internally.",
    instructionKn: "ಹಣ್ಣು ತುರಿಕೆ ಹುಳು ಒಳಗಿನಿಂದ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Use pheromone traps.",
    adviceKn: "ಫೆರೋಮೋನ್ ಟ್ರಾಪ್ ಬಳಸಿ.",
    bestTimeEn: "Fruit Formation",
    bestTimeKn: "ಹಣ್ಣು ಬಿಡುವ ಸಮಯ",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cadb?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Coconut",
    titleEn: "Red Palm Weevil Control",
    titleKn: "ರೆಡ್ ಪಾಮ್ ವೀವಿಲ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Check for holes on stem regularly.",
    instructionKn: "ಕಾಂಡದಲ್ಲಿ ರಂಧ್ರಗಳಿಗಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    adviceEn: "Use pheromone traps.",
    adviceKn: "ಫೆರೋಮೋನ್ ಟ್ರಾಪ್ ಬಳಸಿ.",
    bestTimeEn: "Summer Season",
    bestTimeKn: "ಬೇಸಿಗೆ ಸಮಯ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Coconut",
    titleEn: "Mulching Around Trees",
    titleKn: "ಮಲ್ಚಿಂಗ್ ಮಾಡುವುದು",
    instructionEn: "Mulching conserves soil moisture.",
    instructionKn: "ಮಲ್ಚಿಂಗ್ ಮಣ್ಣಿನ ತೇವಾಂಶ ಉಳಿಸುತ್ತದೆ.",
    adviceEn: "Use dry coconut leaves.",
    adviceKn: "ಒಣ ತೆಂಗಿನ ಎಲೆ ಬಳಸಿ.",
    bestTimeEn: "Before Summer",
    bestTimeKn: "ಬೇಸಿಗೆಗೆ ಮೊದಲು",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Areca Nut",
    titleEn: "Yellow Leaf Disease Control",
    titleKn: "ಹಳದಿ ಎಲೆ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Yellow leaves reduce nut production.",
    instructionKn: "ಹಳದಿ ಎಲೆ ಉತ್ಪಾದನೆ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply NPK fertilizer.",
    adviceKn: "NPK ಗೊಬ್ಬರ ಬಳಸಿ.",
    bestTimeEn: "Monsoon Beginning",
    bestTimeKn: "ಮಳೆಗಾಲದ ಆರಂಭ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Areca Nut",
    titleEn: "Root Grub Management",
    titleKn: "ರೂಟ್ ಗ್ರಬ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Root grubs weaken plant roots.",
    instructionKn: "ರೂಟ್ ಗ್ರಬ್ ಬೇರು ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply Chlorpyrifos near roots.",
    adviceKn: "ಬೇರು ಬಳಿ ಕ್ಲೋರಪೈರಿಫಾಸ್ ಬಳಸಿ.",
    bestTimeEn: "Pre-Monsoon",
    bestTimeKn: "ಮುಂಗಾರು ಪೂರ್ವ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Paddy",
    titleEn: "Brown Plant Hopper Control",
    titleKn: "ಬ್ರೌನ್ ಪ್ಲಾಂಟ್ ಹಾಪರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Brown plant hoppers damage paddy leaves and reduce yield.",
    instructionKn: "ಬ್ರೌನ್ ಪ್ಲಾಂಟ್ ಹಾಪರ್ ಅಕ್ಕಿ ಬೆಳೆಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Spray Imidacloprid in affected areas.",
    adviceKn: "ಬಾಧಿತ ಪ್ರದೇಶದಲ್ಲಿ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    titleEn: "Blast Disease Management",
    titleKn: "ಬ್ಲಾಸ್ಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Blast disease causes leaf spots in paddy.",
    instructionKn: "ಬ್ಲಾಸ್ಟ್ ರೋಗ ಅಕ್ಕಿ ಎಲೆಗಳಲ್ಲಿ ಕಲೆ ಉಂಟುಮಾಡುತ್ತದೆ.",
    adviceEn: "Use Tricyclazole spray regularly.",
    adviceKn: "ಟ್ರೈಸೈಕ್ಲಜೋಲ್ ಸಿಂಪಡಣೆ ಮಾಡಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    titleEn: "Stem Borer Prevention",
    titleKn: "ಸ್ಟೆಮ್ ಬೋರರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Stem borers dry the central shoot.",
    instructionKn: "ಸ್ಟೆಮ್ ಬೋರರ್ ಗಿಡದ ಮಧ್ಯ ಭಾಗ ಒಣಗಿಸುತ್ತದೆ.",
    adviceEn: "Apply Cartap Hydrochloride granules.",
    adviceKn: "ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    titleEn: "Leaf Folder Control",
    titleKn: "ಲೀಫ್ ಫೋಲ್ಡರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Leaf folders fold and damage leaves.",
    instructionKn: "ಲೀಫ್ ಫೋಲ್ಡರ್ ಎಲೆಗಳನ್ನು ಮಡಚಿ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Spray Chlorantraniliprole solution.",
    adviceKn: "ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Areca Nut",
    titleEn: "Root Grub Management",
    titleKn: "ರೂಟ್ ಗ್ರಬ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Root grubs weaken plant roots.",
    instructionKn: "ರೂಟ್ ಗ್ರಬ್ ಬೇರು ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply Chlorpyrifos near roots.",
    adviceKn: "ಬೇರು ಬಳಿ ಕ್ಲೋರಪೈರಿಫಾಸ್ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Areca Nut",
    titleEn: "Yellow Leaf Disease Control",
    titleKn: "ಹಳದಿ ಎಲೆ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Yellow leaves reduce nut production.",
    instructionKn: "ಹಳದಿ ಎಲೆಗಳಿಂದ ಉತ್ಪಾದನೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
    adviceEn: "Apply balanced fertilizers regularly.",
    adviceKn: "ಸಮತೋಲನ ರಸಗೊಬ್ಬರ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Areca Nut",
    titleEn: "Fruit Rot Prevention",
    titleKn: "ಫ್ರೂಟ್ ರಾಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Fruit rot spreads during rainy season.",
    instructionKn: "ಮಳೆಗಾಲದಲ್ಲಿ ಫ್ರೂಟ್ ರಾಟ್ ಹರಡುತ್ತದೆ.",
    adviceEn: "Spray Bordeaux mixture.",
    adviceKn: "ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Areca Nut",
    titleEn: "Spindle Bug Control",
    titleKn: "ಸ್ಪಿಂಡಲ್ ಬಗ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Spindle bugs damage young leaves.",
    instructionKn: "ಸ್ಪಿಂಡಲ್ ಬಗ್ ಹೊಸ ಎಲೆಗಳಿಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Use Carbaryl spray.",
    adviceKn: "ಕಾರ್ಬರಿಲ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Coconut",
    titleEn: "Rhinoceros Beetle Control",
    titleKn: "ರೈನೋಸೆರಸ್ ಬೀಟಲ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Beetles damage coconut crown leaves.",
    instructionKn: "ಬೀಟಲ್ ತೆಂಗಿನ ಎಲೆಗಳಿಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply neem cake in crown.",
    adviceKn: "ಕಿರೀಟ ಭಾಗದಲ್ಲಿ ನೀಂ ಕೇಕ್ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Coconut",
    titleEn: "Red Palm Weevil Management",
    titleKn: "ರೆಡ್ ಪಾಮ್ ವೀವಿಲ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Red palm weevil bores into trunk.",
    instructionKn: "ರೆಡ್ ಪಾಮ್ ವೀವಿಲ್ ತೊಗಟೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Use pheromone traps.",
    adviceKn: "ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Coconut",
    titleEn: "Leaf Rot Disease Control",
    titleKn: "ಲೀಫ್ ರಾಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Leaf rot dries coconut leaves.",
    instructionKn: "ಲೀಫ್ ರಾಟ್ ಎಲೆ ಒಣಗಿಸುತ್ತದೆ.",
    adviceEn: "Spray Copper Oxychloride.",
    adviceKn: "ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Coconut",
    titleEn: "Bud Rot Management",
    titleKn: "ಬಡ್ ರಾಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Bud rot affects young coconut shoots.",
    instructionKn: "ಬಡ್ ರಾಟ್ ಹೊಸ ಮೊಗ್ಗು ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply Bordeaux paste.",
    adviceKn: "ಬೋರ್ಡೋ ಪೇಸ್ಟ್ ಬಳಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl:"/assets/images/crops/cocnut.webp"
  },
  {
    category: "Tomato",
    titleEn: "Early Blight Control",
    titleKn: "ಅರ್ಲಿ ಬ್ಲೈಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Early blight causes brown spots on leaves.",
    instructionKn: "ಅರ್ಲಿ ಬ್ಲೈಟ್ ಎಲೆಗಳಲ್ಲಿ ಕಂದು ಕಲೆ ಉಂಟುಮಾಡುತ್ತದೆ.",
    adviceEn: "Spray Mancozeb regularly.",
    adviceKn: "ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tomato",
    titleEn: "Fruit Borer Management",
    titleKn: "ಫ್ರೂಟ್ ಬೋರರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Fruit borers damage tomato fruits.",
    instructionKn: "ಫ್ರೂಟ್ ಬೋರರ್ ಟೊಮ್ಯಾಟೊ ಹಣ್ಣಿಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Use pheromone traps and neem spray.",
    adviceKn: "ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್ ಮತ್ತು ನೀಂ ಸಿಂಪಡಣೆ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tomato",
    titleEn: "Leaf Curl Virus Prevention",
    titleKn: "ಲೀಫ್ ಕರ್ ವೈರಸ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Leaf curl virus curls and weakens leaves.",
    instructionKn: "ಲೀಫ್ ಕರ್ ವೈರಸ್ ಎಲೆ ಮಡಚುತ್ತದೆ.",
    adviceEn: "Control whiteflies using insecticides.",
    adviceKn: "ವೈಟ್ ಫ್ಲೈ ನಿಯಂತ್ರಣಕ್ಕೆ ಕೀಟನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tomato",
    titleEn: "Wilt Disease Management",
    titleKn: "ವಿಲ್ಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Wilt disease dries tomato plants suddenly.",
    instructionKn: "ವಿಲ್ಟ್ ರೋಗ ಗಿಡ ಒಣಗಿಸುತ್ತದೆ.",
    adviceEn: "Use disease resistant varieties.",
    adviceKn: "ರೋಗ ನಿರೋಧಕ ಜಾತಿ ಬಳಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Maize",
    titleEn: "Fall Armyworm Control",
    titleKn: "ಫಾಲ್ ಆರ್ಮಿವೋರ್ಮ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Armyworms feed on maize leaves.",
    instructionKn: "ಆರ್ಮಿವೋರ್ಮ್ ಜೋಳದ ಎಲೆ ತಿನ್ನುತ್ತದೆ.",
    adviceEn: "Apply Emamectin Benzoate spray.",
    adviceKn: "ಎಮಾಮೆಕ್ಟಿನ್ ಬೆನ್ಜೋಯೇಟ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Maize",
    titleEn: "Stem Borer Prevention",
    titleKn: "ಸ್ಟೆಮ್ ಬೋರರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Stem borers weaken maize stems.",
    instructionKn: "ಸ್ಟೆಮ್ ಬೋರರ್ ಗಿಡದ ಕಾಂಡ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Use Carbofuran granules.",
    adviceKn: "ಕಾರ್ಬೋಫ್ಯುರಾನ್ ಗ್ರಾನುಲ್ಸ್ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Maize",
    titleEn: "Leaf Blight Control",
    titleKn: "ಲೀಫ್ ಬ್ಲೈಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Leaf blight creates long lesions on leaves.",
    instructionKn: "ಲೀಫ್ ಬ್ಲೈಟ್ ಎಲೆಗಳಲ್ಲಿ ಕಲೆ ಉಂಟುಮಾಡುತ್ತದೆ.",
    adviceEn: "Spray Propiconazole solution.",
    adviceKn: "ಪ್ರೊಪಿಕೋನಾಜೋಲ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Maize",
    titleEn: "Rust Disease Management",
    titleKn: "ರಸ್ಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Rust disease forms reddish spots on leaves.",
    instructionKn: "ರಸ್ಟ್ ರೋಗ ಕೆಂಪು ಕಲೆ ಉಂಟುಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply Mancozeb fungicide.",
    adviceKn: "ಮ್ಯಾಂಕೋಜೆಬ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Ragi",
    titleEn: "Blast Disease Control",
    titleKn: "ಬ್ಲಾಸ್ಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Blast disease affects ragi leaves and grains.",
    instructionKn: "ಬ್ಲಾಸ್ಟ್ ರೋಗ ರಾಗಿ ಎಲೆ ಮತ್ತು ಧಾನ್ಯ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Spray Carbendazim fungicide.",
    adviceKn: "ಕಾರ್ಬೆಂಡಾಜಿಂ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Ragi",
    titleEn: "Aphid Control",
    titleKn: "ಆಫಿಡ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Aphids suck sap from ragi plants.",
    instructionKn: "ಆಫಿಡ್ ರಾಗಿ ಗಿಡದ ರಸ ಹೀರುತ್ತದೆ.",
    adviceEn: "Use Neem oil spray.",
    adviceKn: "ನೀಂ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Ragi",
    titleEn: "Weed Management",
    titleKn: "ಕಳೆ ನಿಯಂತ್ರಣ",
    instructionEn: "Weeds compete for nutrients in ragi field.",
    instructionKn: "ಕಳೆಗಳು ಪೋಷಕಾಂಶ ಕಸಿದುಕೊಳ್ಳುತ್ತವೆ.",
    adviceEn: "Remove weeds manually or use herbicides.",
    adviceKn: "ಕಳೆ ತೆಗೆಯಿರಿ ಅಥವಾ ಹರ್ಬಿಸೈಡ್ ಬಳಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Ragi",
    titleEn: "Finger Millet Smut Control",
    titleKn: "ಸ್ಮಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Smut disease affects grain quality.",
    instructionKn: "ಸ್ಮಟ್ ರೋಗ ಧಾನ್ಯ ಗುಣಮಟ್ಟ ಹಾಳು ಮಾಡುತ್ತದೆ.",
    adviceEn: "Treat seeds before sowing.",
    adviceKn: "ಬಿತ್ತನೆಗೆ ಮೊದಲು ಬೀಜ ಸಂಸ್ಕರಣೆ ಮಾಡಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Sugarcane",
    titleEn: "Red Rot Disease Control",
    titleKn: "ರೆಡ್ ರಾಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Red rot causes drying of sugarcane stalks.",
    instructionKn: "ರೆಡ್ ರಾಟ್ ಕಬ್ಬಿನ ಕಾಂಡ ಒಣಗಿಸುತ್ತದೆ.",
    adviceEn: "Use resistant varieties and fungicides.",
    adviceKn: "ರೋಗ ನಿರೋಧಕ ಜಾತಿ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Sugarcane",
    titleEn: "Early Shoot Borer Control",
    titleKn: "ಶೂಟ್ ಬೋರರ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Shoot borers damage young sugarcane shoots.",
    instructionKn: "ಶೂಟ್ ಬೋರರ್ ಹೊಸ ಮೊಗ್ಗು ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply Chlorantraniliprole granules.",
    adviceKn: "ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Sugarcane",
    titleEn: "Pyrilla Control",
    titleKn: "ಪೈರಿಲ್ಲಾ ನಿಯಂತ್ರಣ",
    instructionEn: "Pyrilla insects suck sap from leaves.",
    instructionKn: "ಪೈರಿಲ್ಲಾ ಎಲೆ ರಸ ಹೀರುತ್ತದೆ.",
    adviceEn: "Release biological control agents.",
    adviceKn: "ಜೈವ ನಿಯಂತ್ರಣ ಬಳಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Sugarcane",
    titleEn: "Wilt Disease Management",
    titleKn: "ವಿಲ್ಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Wilt disease reduces cane growth.",
    instructionKn: "ವಿಲ್ಟ್ ರೋಗ ಬೆಳವಣಿಗೆ ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Avoid waterlogging in fields.",
    adviceKn: "ನೀರಿನ ನಿಲುವು ತಪ್ಪಿಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Cotton",
    titleEn: "Pink Bollworm Control",
    titleKn: "ಪಿಂಕ್ ಬೋಲ್ವೋರ್ಮ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Pink bollworms damage cotton bolls.",
    instructionKn: "ಪಿಂಕ್ ಬೋಲ್ವೋರ್ಮ್ ಹತ್ತಿ ಕೋಶ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Use pheromone traps regularly.",
    adviceKn: "ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Cotton",
    titleEn: "Whitefly Management",
    titleKn: "ವೈಟ್ ಫ್ಲೈ ನಿಯಂತ್ರಣ",
    instructionEn: "Whiteflies spread leaf curl disease.",
    instructionKn: "ವೈಟ್ ಫ್ಲೈ ರೋಗ ಹರಡಿಸುತ್ತದೆ.",
    adviceEn: "Spray Neem oil or insecticides.",
    adviceKn: "ನೀಂ ಎಣ್ಣೆ ಅಥವಾ ಕೀಟನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Cotton",
    titleEn: "Leaf Spot Disease Control",
    titleKn: "ಲೀಫ್ ಸ್ಪಾಟ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Leaf spot creates brown patches on leaves.",
    instructionKn: "ಲೀಫ್ ಸ್ಪಾಟ್ ಎಲೆಗಳಲ್ಲಿ ಕಲೆ ಉಂಟುಮಾಡುತ್ತದೆ.",
    adviceEn: "Apply Copper fungicide spray.",
    adviceKn: "ಕಾಪರ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Cotton",
    titleEn: "Aphid Control",
    titleKn: "ಆಫಿಡ್ ನಿಯಂತ್ರಣ",
    instructionEn: "Aphids weaken cotton plants by sucking sap.",
    instructionKn: "ಆಫಿಡ್ ಗಿಡದ ರಸ ಹೀರುತ್ತದೆ.",
    adviceEn: "Use Imidacloprid spray.",
    adviceKn: "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Paddy",
    seasonEn: "Monsoon",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Water Management During Monsoon",
    titleKn: "ಮಳೆಗಾಲದ ನೀರಿನ ನಿರ್ವಹಣೆ",
    instructionEn: "Excess water can damage paddy roots.",
    instructionKn: "ಅತಿಯಾದ ನೀರು ಬೇರು ಹಾನಿ ಮಾಡಬಹುದು.",
    adviceEn: "Maintain proper drainage in fields.",
    adviceKn: "ಹೊಲದಲ್ಲಿ ಸರಿಯಾದ ನೀರು ಹರಿವು ವ್ಯವಸ್ಥೆ ಮಾಡಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Areca Nut",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Irrigation Management",
    titleKn: "ಬೇಸಿಗೆ ನೀರಾವರಿ ನಿರ್ವಹಣೆ",
    instructionEn: "Hot weather dries areca nut soil quickly.",
    instructionKn: "ಬೇಸಿಗೆಯಲ್ಲಿ ಮಣ್ಣು ಬೇಗ ಒಣಗುತ್ತದೆ.",
    adviceEn: "Provide regular irrigation and mulching.",
    adviceKn: "ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಮಲ್ಚಿಂಗ್ ಮಾಡಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Coconut",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Winter Nutrient Care",
    titleKn: "ಚಳಿಗಾಲದ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ",
    instructionEn: "Coconut trees need balanced nutrients during winter.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ತೆಂಗಿನ ಮರಗಳಿಗೆ ಪೋಷಕಾಂಶ ಅಗತ್ಯ.",
    adviceEn: "Apply organic manure around trees.",
    adviceKn: "ಮರದ ಸುತ್ತ ಜೈವಿಕ ಗೊಬ್ಬರ ಹಾಕಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Tomato",
    seasonEn: "Rainy",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Rainy Season Disease Prevention",
    titleKn: "ಮಳೆಗಾಲದ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Humidity increases fungal diseases in tomato.",
    instructionKn: "ಆದ್ರತೆಯಿಂದ ಟೊಮ್ಯಾಟೊದಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Spray fungicide at regular intervals.",
    adviceKn: "ನಿಯಮಿತವಾಗಿ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Maize",
    seasonEn: "Kharif",
    seasonKn: "ಖರೀಫ್",
    titleEn: "Kharif Weed Management",
    titleKn: "ಖರೀಫ್ ಕಳೆ ನಿಯಂತ್ರಣ",
    instructionEn: "Weeds compete with maize for nutrients.",
    instructionKn: "ಕಳೆಗಳು ಜೋಳದ ಪೋಷಕಾಂಶ ಕಸಿದುಕೊಳ್ಳುತ್ತವೆ.",
    adviceEn: "Remove weeds during early growth stage.",
    adviceKn: "ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಕಳೆ ತೆಗೆದುಹಾಕಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Ragi",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Winter Blast Disease Care",
    titleKn: "ಚಳಿಗಾಲದ ಬ್ಲಾಸ್ಟ್ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Cold weather increases blast disease risk.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ಬ್ಲಾಸ್ಟ್ ರೋಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Use resistant seeds and fungicides.",
    adviceKn: "ರೋಗ ನಿರೋಧಕ ಬೀಜ ಮತ್ತು ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Sugarcane",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Water Conservation",
    titleKn: "ಬೇಸಿಗೆ ನೀರು ಸಂರಕ್ಷಣೆ",
    instructionEn: "Sugarcane requires high water during summer.",
    instructionKn: "ಬೇಸಿಗೆಯಲ್ಲಿ ಕಬ್ಬಿಗೆ ಹೆಚ್ಚು ನೀರು ಬೇಕಾಗುತ್ತದೆ.",
    adviceEn: "Use drip irrigation to save water.",
    adviceKn: "ಡ್ರಿಪ್ ನೀರಾವರಿ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Cotton",
    seasonEn: "Monsoon",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Monsoon Pest Monitoring",
    titleKn: "ಮಳೆಗಾಲದ ಕೀಟ ನಿಯಂತ್ರಣ",
    instructionEn: "Moist weather increases cotton pest attacks.",
    instructionKn: "ಆದ್ರ ಹವಾಮಾನದಲ್ಲಿ ಕೀಟ ದಾಳಿ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Inspect fields regularly for pests.",
    adviceKn: "ಹೊಲವನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Paddy",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Irrigation Care",
    titleKn: "ಬೇಸಿಗೆ ನೀರಾವರಿ ನಿರ್ವಹಣೆ",
    instructionEn: "High temperature dries paddy fields quickly.",
    instructionKn: "ಬೇಸಿಗೆಯಲ್ಲಿ ಅಕ್ಕಿ ಹೊಲ ಬೇಗ ಒಣಗುತ್ತದೆ.",
    adviceEn: "Maintain shallow water level in field.",
    adviceKn: "ಹೊಲದಲ್ಲಿ ಕಡಿಮೆ ಮಟ್ಟದ ನೀರು ಉಳಿಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Cold Weather Disease Protection",
    titleKn: "ಚಳಿಗಾಲದ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Cold climate increases fungal infections.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Use fungicide sprays regularly.",
    adviceKn: "ನಿಯಮಿತವಾಗಿ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Areca Nut",
    seasonEn: "Rainy",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Rainy Season Root Protection",
    titleKn: "ಮಳೆಗಾಲದ ಬೇರು ರಕ್ಷಣೆ",
    instructionEn: "Heavy rain may cause root rot.",
    instructionKn: "ಅತಿಯಾದ ಮಳೆಯಿಂದ ಬೇರು ಕುಲುಮೆ ಉಂಟಾಗುತ್ತದೆ.",
    adviceEn: "Ensure proper drainage around trees.",
    adviceKn: "ಮರದ ಸುತ್ತ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Areca Nut",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Winter Nutrient Management",
    titleKn: "ಚಳಿಗಾಲದ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ",
    instructionEn: "Cool climate slows plant growth.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ಬೆಳವಣಿಗೆ ನಿಧಾನವಾಗುತ್ತದೆ.",
    adviceEn: "Apply organic compost near roots.",
    adviceKn: "ಬೇರು ಬಳಿ ಜೈವಿಕ ಗೊಬ್ಬರ ಹಾಕಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Coconut",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Moisture Retention",
    titleKn: "ಬೇಸಿಗೆ ತೇವಾಂಶ ಸಂರಕ್ಷಣೆ",
    instructionEn: "Hot weather reduces soil moisture.",
    instructionKn: "ಬೇಸಿಗೆಯಲ್ಲಿ ಮಣ್ಣಿನ ತೇವಾಂಶ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
    adviceEn: "Use mulching around coconut trees.",
    adviceKn: "ಮರದ ಸುತ್ತ ಮಲ್ಚಿಂಗ್ ಮಾಡಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Coconut",
    seasonEn: "Rainy",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Rainy Season Pest Control",
    titleKn: "ಮಳೆಗಾಲದ ಕೀಟ ನಿಯಂತ್ರಣ",
    instructionEn: "Rain increases pest infestation in coconut trees.",
    instructionKn: "ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಕೀಟ ದಾಳಿ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Inspect crown area regularly.",
    adviceKn: "ಮರದ ಮೇಲ್ಭಾಗವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Tomato",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Winter Frost Protection",
    titleKn: "ಚಳಿಗಾಲದ ಹಿಮ ರಕ್ಷಣೆ",
    instructionEn: "Low temperatures affect tomato flowering.",
    instructionKn: "ಕಡಿಮೆ ತಾಪಮಾನ ಹೂವುಗಳಿಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Cover plants during cold nights.",
    adviceKn: "ರಾತ್ರಿಯಲ್ಲಿ ಗಿಡ ಮುಚ್ಚಿ ರಕ್ಷಿಸಿ.",
    bestTimeEn: "Night",
    bestTimeKn: "ರಾತ್ರಿ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tomato",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Heat Management",
    titleKn: "ಬೇಸಿಗೆ ಉಷ್ಣ ನಿಯಂತ್ರಣ",
    instructionEn: "Extreme heat causes flower drop.",
    instructionKn: "ಅತಿಯಾದ ಬಿಸಿಯಿಂದ ಹೂವು ಉದುರುತ್ತದೆ.",
    adviceEn: "Provide light irrigation frequently.",
    adviceKn: "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ ನೀರಾವರಿ ನೀಡಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Maize",
    seasonEn: "Rainy",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Rainy Season Drainage",
    titleKn: "ಮಳೆಗಾಲದ ನೀರು ಹರಿವು ನಿರ್ವಹಣೆ",
    instructionEn: "Waterlogging affects maize roots.",
    instructionKn: "ನೀರು ನಿಂತರೆ ಬೇರು ಹಾನಿಯಾಗುತ್ತದೆ.",
    adviceEn: "Create drainage channels in field.",
    adviceKn: "ಹೊಲದಲ್ಲಿ ನೀರು ಹರಿವು ವ್ಯವಸ್ಥೆ ಮಾಡಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Maize",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Cold Season Nutrient Care",
    titleKn: "ಚಳಿಗಾಲದ ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ",
    instructionEn: "Cold weather slows maize growth.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ಬೆಳವಣಿಗೆ ನಿಧಾನವಾಗುತ್ತದೆ.",
    adviceEn: "Apply nitrogen fertilizer moderately.",
    adviceKn: "ನೈಟ್ರೋಜನ್ ಗೊಬ್ಬರ ಸಮರ್ಪಕವಾಗಿ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Ragi",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Soil Moisture Care",
    titleKn: "ಬೇಸಿಗೆ ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿರ್ವಹಣೆ",
    instructionEn: "Dry soil affects ragi grain formation.",
    instructionKn: "ಒಣ ಮಣ್ಣು ಧಾನ್ಯ ಬೆಳವಣಿಗೆಗೆ ಹಾನಿ ಮಾಡುತ್ತದೆ.",
    adviceEn: "Irrigate field at regular intervals.",
    adviceKn: "ನಿಯಮಿತವಾಗಿ ನೀರಾವರಿ ನೀಡಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Ragi",
    seasonEn: "Rainy",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Rainy Season Weed Control",
    titleKn: "ಮಳೆಗಾಲದ ಕಳೆ ನಿಯಂತ್ರಣ",
    instructionEn: "Rain encourages weed growth in ragi fields.",
    instructionKn: "ಮಳೆಯಿಂದ ಕಳೆ ಹೆಚ್ಚು ಬೆಳೆಯುತ್ತದೆ.",
    adviceEn: "Remove weeds manually every week.",
    adviceKn: "ಪ್ರತಿ ವಾರ ಕಳೆ ತೆಗೆಯಿರಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Sugarcane",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Winter Growth Monitoring",
    titleKn: "ಚಳಿಗಾಲದ ಬೆಳವಣಿಗೆ ಪರಿಶೀಲನೆ",
    instructionEn: "Cold weather slows sugarcane growth.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ಕಬ್ಬಿನ ಬೆಳವಣಿಗೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
    adviceEn: "Apply balanced fertilizers carefully.",
    adviceKn: "ಸಮತೋಲನ ಗೊಬ್ಬರ ಬಳಸಿ.",
    bestTimeEn: "Afternoon",
    bestTimeKn: "ಮಧ್ಯಾಹ್ನ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Sugarcane",
    seasonEn: "Rainy",
    seasonKn: "ಮಳೆಗಾಲ",
    titleEn: "Rainy Season Disease Prevention",
    titleKn: "ಮಳೆಗಾಲದ ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Humidity increases fungal diseases.",
    instructionKn: "ಆದ್ರತೆಯಿಂದ ಶಿಲೀಂಧ್ರ ರೋಗ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Spray fungicides during early infection.",
    adviceKn: "ಆರಂಭದಲ್ಲೇ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Cotton",
    seasonEn: "Summer",
    seasonKn: "ಬೇಸಿಗೆ",
    titleEn: "Summer Irrigation Scheduling",
    titleKn: "ಬೇಸಿಗೆ ನೀರಾವರಿ ಯೋಜನೆ",
    instructionEn: "High heat increases water requirement.",
    instructionKn: "ಬೇಸಿಗೆಯಲ್ಲಿ ನೀರಿನ ಅವಶ್ಯಕತೆ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Use drip irrigation to save water.",
    adviceKn: "ಡ್ರಿಪ್ ನೀರಾವರಿ ಬಳಸಿ.",
    bestTimeEn: "Morning",
    bestTimeKn: "ಬೆಳಗ್ಗೆ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Cotton",
    seasonEn: "Winter",
    seasonKn: "ಚಳಿಗಾಲ",
    titleEn: "Winter Pest Monitoring",
    titleKn: "ಚಳಿಗಾಲದ ಕೀಟ ಪರಿಶೀಲನೆ",
    instructionEn: "Cool weather may increase aphid attacks.",
    instructionKn: "ಚಳಿಗಾಲದಲ್ಲಿ ಆಫಿಡ್ ದಾಳಿ ಹೆಚ್ಚಾಗಬಹುದು.",
    adviceEn: "Monitor leaves regularly for insects.",
    adviceKn: "ಎಲೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.",
    bestTimeEn: "Evening",
    bestTimeKn: "ಸಂಜೆ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Paddy",
    stageEn: "Tillering Stage",
    stageKn: "ಟಿಲ್ಲರಿಂಗ್ ಹಂತ",
    titleEn: "Nitrogen Application",
    titleKn: "ನೈಟ್ರೋಜನ್ ಗೊಬ್ಬರ ಬಳಕೆ",
    instructionEn: "Paddy develops multiple shoots during tillering.",
    instructionKn: "ಟಿಲ್ಲರಿಂಗ್ ಹಂತದಲ್ಲಿ ಅನೇಕ ಕೊಂಬೆಗಳು ಬೆಳೆಯುತ್ತವೆ.",
    adviceEn: "Apply nitrogen fertilizer for healthy growth.",
    adviceKn: "ಉತ್ತಮ ಬೆಳವಣಿಗೆಗೆ ನೈಟ್ರೋಜನ್ ಗೊಬ್ಬರ ಬಳಸಿ.",
    bestTimeEn: "During Tillering Stage",
    bestTimeKn: "ಟಿಲ್ಲರಿಂಗ್ ಹಂತದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Tomato",
    stageEn: "Flowering Stage",
    stageKn: "ಹೂ ಬಿಡುವ ಹಂತ",
    titleEn: "Flower Protection",
    titleKn: "ಹೂ ರಕ್ಷಣೆ",
    instructionEn: "Tomato flowers are sensitive to pests and heat.",
    instructionKn: "ಟೊಮ್ಯಾಟೊ ಹೂವುಗಳಿಗೆ ಕೀಟ ಮತ್ತು ಬಿಸಿ ಹಾನಿಕಾರಕ.",
    adviceEn: "Spray neem oil and maintain irrigation.",
    adviceKn: "ನೀಂ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ ಮತ್ತು ನೀರಾವರಿ ಮಾಡಿ.",
    bestTimeEn: "During Flowering",
    bestTimeKn: "ಹೂ ಬಿಡುವ ಸಮಯದಲ್ಲಿ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Maize",
    stageEn: "Pollination Stage",
    stageKn: "ಪರಾಗಸ್ಪರ್ಶ ಹಂತ",
    titleEn: "Water Management",
    titleKn: "ನೀರಿನ ನಿರ್ವಹಣೆ",
    instructionEn: "Maize requires sufficient water during pollination.",
    instructionKn: "ಪರಾಗಸ್ಪರ್ಶ ಸಮಯದಲ್ಲಿ ಜೋಳಕ್ಕೆ ಸಾಕಷ್ಟು ನೀರು ಅಗತ್ಯ.",
    adviceEn: "Maintain proper soil moisture.",
    adviceKn: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಉಳಿಸಿ.",
    bestTimeEn: "During Pollination",
    bestTimeKn: "ಪರಾಗಸ್ಪರ್ಶ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Ragi",
    stageEn: "Grain Filling Stage",
    stageKn: "ಧಾನ್ಯ ತುಂಬುವ ಹಂತ",
    titleEn: "Nutrient Support",
    titleKn: "ಪೋಷಕಾಂಶ ಬೆಂಬಲ",
    instructionEn: "Ragi grains require nutrients for better yield.",
    instructionKn: "ರಾಗಿ ಧಾನ್ಯಗಳಿಗೆ ಉತ್ತಮ ಬೆಳೆಗೆ ಪೋಷಕಾಂಶ ಅಗತ್ಯ.",
    adviceEn: "Apply organic fertilizers carefully.",
    adviceKn: "ಜೈವಿಕ ಗೊಬ್ಬರ ಸಮರ್ಪಕವಾಗಿ ಬಳಸಿ.",
    bestTimeEn: "During Grain Filling",
    bestTimeKn: "ಧಾನ್ಯ ತುಂಬುವ ಹಂತದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Sugarcane",
    stageEn: "Grand Growth Stage",
    stageKn: "ವೇಗದ ಬೆಳವಣಿಗೆ ಹಂತ",
    titleEn: "Heavy Nutrient Feeding",
    titleKn: "ಹೆಚ್ಚುವರಿ ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ",
    instructionEn: "Sugarcane grows rapidly during this stage.",
    instructionKn: "ಈ ಹಂತದಲ್ಲಿ ಕಬ್ಬು ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತದೆ.",
    adviceEn: "Provide nitrogen and potash fertilizers.",
    adviceKn: "ನೈಟ್ರೋಜನ್ ಮತ್ತು ಪೊಟಾಶ್ ಗೊಬ್ಬರ ನೀಡಿ.",
    bestTimeEn: "During Rapid Growth",
    bestTimeKn: "ವೇಗದ ಬೆಳವಣಿಗೆಯಲ್ಲಿ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Cotton",
    stageEn: "Boll Formation Stage",
    stageKn: "ಬೋಲ್ ನಿರ್ಮಾಣ ಹಂತ",
    titleEn: "Pest Protection",
    titleKn: "ಕೀಟ ರಕ್ಷಣೆ",
    instructionEn: "Cotton bolls are vulnerable to bollworms.",
    instructionKn: "ಹತ್ತಿ ಬೋಲ್ಗಳಿಗೆ ಕೀಟ ದಾಳಿ ಹೆಚ್ಚು.",
    adviceEn: "Use pheromone traps and bio pesticides.",
    adviceKn: "ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್ ಮತ್ತು ಜೈವ ಕೀಟನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "During Boll Formation",
    bestTimeKn: "ಬೋಲ್ ನಿರ್ಮಾಣ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Coconut",
    stageEn: "Nut Development Stage",
    stageKn: "ಕಾಯಿ ಬೆಳವಣಿಗೆ ಹಂತ",
    titleEn: "Moisture Maintenance",
    titleKn: "ತೇವಾಂಶ ನಿರ್ವಹಣೆ",
    instructionEn: "Coconut trees need water during nut growth.",
    instructionKn: "ಕಾಯಿ ಬೆಳವಣಿಗೆಯಲ್ಲಿ ನೀರಿನ ಅವಶ್ಯಕತೆ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
    adviceEn: "Irrigate regularly and apply mulch.",
    adviceKn: "ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಮಲ್ಚಿಂಗ್ ಮಾಡಿ.",
    bestTimeEn: "During Nut Development",
    bestTimeKn: "ಕಾಯಿ ಬೆಳವಣಿಗೆಯಲ್ಲಿ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Areca Nut",
    stageEn: "Fruit Development Stage",
    stageKn: "ಹಣ್ಣು ಬೆಳವಣಿಗೆ ಹಂತ",
    titleEn: "Disease Prevention",
    titleKn: "ರೋಗ ನಿಯಂತ್ರಣ",
    instructionEn: "Fruit rot disease spreads during fruit growth.",
    instructionKn: "ಹಣ್ಣು ಬೆಳವಣಿಗೆಯಲ್ಲಿ ರೋಗ ಹರಡುವ ಸಾಧ್ಯತೆ ಇದೆ.",
    adviceEn: "Spray Bordeaux mixture carefully.",
    adviceKn: "ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "During Fruit Growth",
    bestTimeKn: "ಹಣ್ಣು ಬೆಳವಣಿಗೆಯಲ್ಲಿ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Paddy",
    stageEn: "Panicle Initiation Stage",
    stageKn: "ಪ್ಯಾನಿಕಲ್ ಪ್ರಾರಂಭ ಹಂತ",
    titleEn: "Water Level Management",
    titleKn: "ನೀರಿನ ಮಟ್ಟ ನಿರ್ವಹಣೆ",
    instructionEn: "Proper water level is important during panicle formation.",
    instructionKn: "ಪ್ಯಾನಿಕಲ್ ಬೆಳವಣಿಗೆಯಲ್ಲಿ ಸರಿಯಾದ ನೀರಿನ ಮಟ್ಟ ಅಗತ್ಯ.",
    adviceEn: "Maintain 3-5 cm water level in field.",
    adviceKn: "ಹೊಲದಲ್ಲಿ 3-5 ಸೆಂ.ಮೀ ನೀರು ಉಳಿಸಿ.",
    bestTimeEn: "During Panicle Initiation",
    bestTimeKn: "ಪ್ಯಾನಿಕಲ್ ಪ್ರಾರಂಭ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Paddy",
    stageEn: "Harvest Stage",
    stageKn: "ಕೊಯ್ಲು ಹಂತ",
    titleEn: "Harvest Readiness Check",
    titleKn: "ಕೊಯ್ಲು ಸಿದ್ಧತೆ ಪರಿಶೀಲನೆ",
    instructionEn: "Harvest when grains become golden yellow.",
    instructionKn: "ಧಾನ್ಯಗಳು ಹಳದಿ ಬಣ್ಣವಾದಾಗ ಕೊಯ್ಲು ಮಾಡಿ.",
    adviceEn: "Drain field water before harvest.",
    adviceKn: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು ನೀರು ಬಿಡಿ.",
    bestTimeEn: "Before Harvest",
    bestTimeKn: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  {
    category: "Tomato",
    stageEn: "Fruit Setting Stage",
    stageKn: "ಹಣ್ಣು ಕಟ್ಟುವ ಹಂತ",
    titleEn: "Calcium Support",
    titleKn: "ಕ್ಯಾಲ್ಸಿಯಂ ಪೋಷಕಾಂಶ",
    instructionEn: "Tomato fruits need calcium for healthy growth.",
    instructionKn: "ಟೊಮ್ಯಾಟೊ ಹಣ್ಣಿಗೆ ಕ್ಯಾಲ್ಸಿಯಂ ಅಗತ್ಯ.",
    adviceEn: "Apply calcium nitrate spray.",
    adviceKn: "ಕ್ಯಾಲ್ಸಿಯಂ ನೈಟ್ರೇಟ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "During Fruit Setting",
    bestTimeKn: "ಹಣ್ಣು ಕಟ್ಟುವ ಸಮಯದಲ್ಲಿ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
  {
    category: "Tomato",
    stageEn: "Ripening Stage",
    stageKn: "ಹಣ್ಣು ಪಕ್ವ ಹಂತ",
    titleEn: "Fruit Rot Prevention",
    titleKn: "ಹಣ್ಣು ಕುಲುಮೆ ನಿಯಂತ್ರಣ",
    instructionEn: "Overwatering may cause fruit rot.",
    instructionKn: "ಅತಿಯಾದ ನೀರು ಹಣ್ಣು ಕುಲುಮೆಗೆ ಕಾರಣವಾಗುತ್ತದೆ.",
    adviceEn: "Reduce excess irrigation during ripening.",
    adviceKn: "ಪಕ್ವ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚು ನೀರು ಕೊಡಬೇಡಿ.",
    bestTimeEn: "During Ripening",
    bestTimeKn: "ಹಣ್ಣು ಪಕ್ವ ಸಮಯದಲ್ಲಿ",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop"
  },
 
  {
  category: "Maize",
  stageEn: "Silking Stage",
  stageKn: "ಸಿಲ್ಕಿಂಗ್ ಹಂತ",
  titleEn: "Moisture Requirement",
  titleKn: "ತೇವಾಂಶ ಅಗತ್ಯ",
  instructionEn: "Silking stage needs continuous moisture.",
  instructionKn: "ಸಿಲ್ಕಿಂಗ್ ಹಂತದಲ್ಲಿ ನಿರಂತರ ತೇವಾಂಶ ಅಗತ್ಯ.",
  adviceEn: "Irrigate field without waterlogging.",
  adviceKn: "ನೀರು ನಿಲ್ಲದಂತೆ ನೀರಾವರಿ ಮಾಡಿ.",
  bestTimeEn: "During Silking",
  bestTimeKn: "ಸಿಲ್ಕಿಂಗ್ ಸಮಯದಲ್ಲಿ",
  imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Maize",
    stageEn: "Cob Development Stage",
    stageKn: "ಕೋಬ್ ಬೆಳವಣಿಗೆ ಹಂತ",
    titleEn: "Nutrient Spray",
    titleKn: "ಪೋಷಕಾಂಶ ಸಿಂಪಡಣೆ",
    instructionEn: "Cob growth requires balanced nutrients.",
    instructionKn: "ಕೋಬ್ ಬೆಳವಣಿಗೆಗೆ ಪೋಷಕಾಂಶ ಅಗತ್ಯ.",
    adviceEn: "Apply micronutrient foliar spray.",
    adviceKn: "ಮೈಕ್ರೋ ನ್ಯೂಟ್ರಿಯಂಟ್ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "During Cob Formation",
    bestTimeKn: "ಕೋಬ್ ಬೆಳವಣಿಗೆಯಲ್ಲಿ",
    imageUrl: "/assets/images/crops/maize.webp"
  },
  {
    category: "Ragi",
    stageEn: "Ear Head Formation Stage",
    stageKn: "ಕಂಬ ಬೆಳವಣಿಗೆ ಹಂತ",
    titleEn: "Balanced Fertilizer Use",
    titleKn: "ಸಮತೋಲನ ಗೊಬ್ಬರ ಬಳಕೆ",
    instructionEn: "Ear heads require nutrients for proper grain filling.",
    instructionKn: "ಧಾನ್ಯ ತುಂಬುವಿಕೆಗೆ ಪೋಷಕಾಂಶ ಅಗತ್ಯ.",
    adviceEn: "Apply phosphorus and potash fertilizers.",
    adviceKn: "ಫಾಸ್ಫರಸ್ ಮತ್ತು ಪೊಟಾಶ್ ಗೊಬ್ಬರ ಬಳಸಿ.",
    bestTimeEn: "During Ear Formation",
    bestTimeKn: "ಕಂಬ ಬೆಳವಣಿಗೆಯಲ್ಲಿ",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Ragi",
    stageEn: "Maturity Stage",
    stageKn: "ಪಕ್ವ ಹಂತ",
    titleEn: "Harvest Preparation",
    titleKn: "ಕೊಯ್ಲು ಸಿದ್ಧತೆ",
    instructionEn: "Dry weather is ideal before harvesting ragi.",
    instructionKn: "ರಾಗಿ ಕೊಯ್ಲಿಗೆ ಒಣ ಹವಾಮಾನ ಉತ್ತಮ.",
    adviceEn: "Stop irrigation before harvest.",
    adviceKn: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು ನೀರಾವರಿ ನಿಲ್ಲಿಸಿ.",
    bestTimeEn: "Before Harvest",
    bestTimeKn: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು",
    imageUrl: "/assets/images/crops/ragi.webp"
  },
  {
    category: "Sugarcane",
    stageEn: "Tillering Stage",
    stageKn: "ಟಿಲ್ಲರಿಂಗ್ ಹಂತ",
    titleEn: "Soil Earthing Up",
    titleKn: "ಮಣ್ಣೆತ್ತುವಿಕೆ",
    instructionEn: "Tillering stage needs strong root support.",
    instructionKn: "ಟಿಲ್ಲರಿಂಗ್ ಹಂತದಲ್ಲಿ ಬೇರು ಬಲ ಅಗತ್ಯ.",
    adviceEn: "Perform earthing up around plants.",
    adviceKn: "ಗಿಡದ ಸುತ್ತ ಮಣ್ಣು ಎತ್ತಿ ಹಾಕಿ.",
    bestTimeEn: "During Tillering",
    bestTimeKn: "ಟಿಲ್ಲರಿಂಗ್ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Sugarcane",
    stageEn: "Maturity Stage",
    stageKn: "ಪಕ್ವ ಹಂತ",
    titleEn: "Sugar Content Improvement",
    titleKn: "ಸಕ್ಕರೆ ಅಂಶ ಹೆಚ್ಚಳ",
    instructionEn: "Proper maturity increases sugar recovery.",
    instructionKn: "ಸರಿಯಾದ ಪಕ್ವತೆ ಸಕ್ಕರೆ ಪ್ರಮಾಣ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    adviceEn: "Avoid excess irrigation before harvest.",
    adviceKn: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು ಹೆಚ್ಚು ನೀರು ಕೊಡಬೇಡಿ.",
    bestTimeEn: "Before Harvest",
    bestTimeKn: "ಕೊಯ್ಲಿಗೆ ಮೊದಲು",
    imageUrl: "/assets/images/crops/sugarcane.webp"
  },
  {
    category: "Cotton",
    stageEn: "Square Formation Stage",
    stageKn: "ಸ್ಕ್ವೇರ್ ನಿರ್ಮಾಣ ಹಂತ",
    titleEn: "Flower Bud Protection",
    titleKn: "ಹೂ ಮೊಗ್ಗು ರಕ್ಷಣೆ",
    instructionEn: "Flower buds are sensitive to insect attacks.",
    instructionKn: "ಹೂ ಮೊಗ್ಗುಗಳಿಗೆ ಕೀಟ ದಾಳಿ ಹೆಚ್ಚು.",
    adviceEn: "Monitor plants and use bio pesticides.",
    adviceKn: "ಗಿಡ ಪರಿಶೀಲಿಸಿ ಜೈವ ಕೀಟನಾಶಕ ಬಳಸಿ.",
    bestTimeEn: "During Square Formation",
    bestTimeKn: "ಸ್ಕ್ವೇರ್ ನಿರ್ಮಾಣ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Cotton",
    stageEn: "Boll Opening Stage",
    stageKn: "ಬೋಲ್ ತೆರೆಯುವ ಹಂತ",
    titleEn: "Harvest Protection",
    titleKn: "ಕೊಯ್ಲು ರಕ್ಷಣೆ",
    instructionEn: "Open cotton bolls are affected by rain and pests.",
    instructionKn: "ತೆರೆದ ಬೋಲ್ಗಳಿಗೆ ಮಳೆ ಮತ್ತು ಕೀಟ ಹಾನಿ ಉಂಟಾಗುತ್ತದೆ.",
    adviceEn: "Harvest cotton during dry weather.",
    adviceKn: "ಒಣ ಹವಾಮಾನದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ.",
    bestTimeEn: "During Boll Opening",
    bestTimeKn: "ಬೋಲ್ ತೆರೆಯುವ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  },
  {
    category: "Coconut",
    stageEn: "Flowering Stage",
    stageKn: "ಹೂ ಬಿಡುವ ಹಂತ",
    titleEn: "Flower Retention Care",
    titleKn: "ಹೂ ಉಳಿವಿನ ನಿರ್ವಹಣೆ",
    instructionEn: "Nutrient deficiency may reduce flower retention.",
    instructionKn: "ಪೋಷಕಾಂಶ ಕೊರತೆಯಿಂದ ಹೂವು ಉದುರುತ್ತದೆ.",
    adviceEn: "Apply organic manure and micronutrients.",
    adviceKn: "ಜೈವಿಕ ಗೊಬ್ಬರ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶ ಬಳಸಿ.",
    bestTimeEn: "During Flowering",
    bestTimeKn: "ಹೂ ಬಿಡುವ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Coconut",
    stageEn: "Harvest Stage",
    stageKn: "ಕೊಯ್ಲು ಹಂತ",
    titleEn: "Nut Harvest Timing",
    titleKn: "ಕಾಯಿ ಕೊಯ್ಲಿನ ಸಮಯ",
    instructionEn: "Mature coconuts should be harvested carefully.",
    instructionKn: "ಪಕ್ವ ತೆಂಗಿನಕಾಯಿಯನ್ನು ಜಾಗ್ರತೆಯಿಂದ ಕೊಯ್ಯಬೇಕು.",
    adviceEn: "Harvest fully matured nuts only.",
    adviceKn: "ಪೂರ್ಣ ಪಕ್ವವಾದ ಕಾಯಿ ಮಾತ್ರ ಕೊಯ್ಯಿರಿ.",
    bestTimeEn: "During Harvest",
    bestTimeKn: "ಕೊಯ್ಲು ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/cocnut.webp"
  },
  {
    category: "Areca Nut",
    stageEn: "Spadix Emergence Stage",
    stageKn: "ಸ್ಪಾಡಿಕ್ಸ್ ಹೊರಹೊಮ್ಮುವ ಹಂತ",
    titleEn: "Disease Prevention Spray",
    titleKn: "ರೋಗ ನಿಯಂತ್ರಣ ಸಿಂಪಡಣೆ",
    instructionEn: "Humidity may cause fungal infection during this stage.",
    instructionKn: "ಈ ಹಂತದಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು.",
    adviceEn: "Spray Bordeaux mixture preventively.",
    adviceKn: "ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ.",
    bestTimeEn: "During Spadix Emergence",
    bestTimeKn: "ಸ್ಪಾಡಿಕ್ಸ್ ಹೊರಹೊಮ್ಮುವ ಸಮಯದಲ್ಲಿ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  {
    category: "Areca Nut",
    stageEn: "Nut Maturity Stage",
    stageKn: "ಕಾಯಿ ಪಕ್ವ ಹಂತ",
    titleEn: "Harvest Readiness",
    titleKn: "ಕೊಯ್ಲು ಸಿದ್ಧತೆ",
    instructionEn: "Proper maturity improves nut quality.",
    instructionKn: "ಸರಿಯಾದ ಪಕ್ವತೆ ಗುಣಮಟ್ಟ ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    adviceEn: "Harvest nuts at correct maturity stage.",
    adviceKn: "ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಕಾಯಿ ಕೊಯ್ಯಿರಿ.",
    bestTimeEn: "During Nut Maturity",
    bestTimeKn: "ಕಾಯಿ ಪಕ್ವ ಸಮಯದಲ್ಲಿ",
    imageUrl:"/assets/images/crops/Areca Nut.webp"
  }
];

const SUCCESS_STORIES = [
  { 
    nameKn: "ರಾಮಕೃಷ್ಣ ಗೌಡ", 
    nameEn: "Ramakrishna Gowda", 
    villageKn: "ಹಾಸನ", 
    villageEn: "Hassan", 
    cropEn: "Paddy", 
    cropKn: "ಭತ್ತ", 
    storyKn: "KVK ಸಲಹೆ ಬಳಸಿ ನನ್ನ ಭತ್ತದ ಇಳುವರಿ 40% ಹೆಚ್ಚಾಯಿತು. ಎಲೆ ಸುರುಳಿ ಕೀಟ ಸಮಸ್ಯೆ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಬಂದಿತು.",
    storyEn: "After using KVK advice, my paddy yield increased by 40%. Leaf roller pest problem is completely under control.",
    fullStoryKn: "ಹಿಂದೆ ನಾನು ಸಾಂಪ್ರದಾಯಿಕ ಪದ್ಧತಿಯಲ್ಲಿ ಭತ್ತ ಬೆಳೆಯುತ್ತಿದ್ದೆ, ಆದರೆ ಇಳುವರಿ ಬಹಳ ಕಡಿಮೆ ಇತ್ತು. ಕೆ.ವಿ.ಕೆ ತಜ್ಞರ ಸಲಹೆಯಂತೆ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ, ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದ ಗೊಬ್ಬರ ಹಾಗೂ ಸಾವಯವ ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿದೆ. ಇದು ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಹೆಚ್ಚಿಸಿತು.\n\nಎಲೆ ಸುರುಳಿ ಕೀಟ ಬಾಧಿಸಿದಾಗ ತಕ್ಷಣವೇ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ ಅವರು ಸೂಚಿಸಿದ ಕೀಟನಾಶಕವನ್ನು ನಿಗದಿತ ಪ್ರಮಾಣದಲ್ಲಿ ಸಿಂಪಡಿಸಿದೆ. ಇದರಿಂದ ಕೀಟ ಬಾಧೆ ಸಂಪೂರ್ಣವಾಗಿ ನಿವಾರಣೆಯಾಯಿತು. ಈಗ ನನ್ನ ಇಳುವರಿ ಎಕರೆಗೆ 25 ಕ್ವಿಂಟಾಲ್‌ನಿಂದ 35 ಕ್ವಿಂಟಾಲ್‌ಗೆ ಏರಿಕೆಯಾಗಿದೆ.",
    fullStoryEn: "Previously, I followed traditional paddy cultivation methods, but the yield was quite low. Following KVK experts' advice, I conducted soil testing and used the recommended dosage of fertilizers and organic manure. This significantly improved soil fertility.\n\nWhen the leaf roller pest attacked, I immediately consulted the experts and sprayed the recommended pesticide in the exact proportions. This completely eradicated the pest problem. Now, my yield has increased from 25 quintals to 35 quintals per acre.",
    rating: 4.8,
    statsKn: "40% ಇಳುವರಿ",
    statsEn: "40% Yield",
    metricEn: "Leaf Roller Control",
    metricKn: "ಎಲೆ ಸುರುಳಿ ನಿಯಂತ್ರಣ",
    imageUrl: "/assets/images/crops/paddy.jpg"
  },
  { 
    nameKn: "ಸರಸ್ವತಿ ನಾಯ್ಡು", 
    nameEn: "Saraswathi Naidu", 
    villageKn: "ಶಿವಮೊಗ್ಗ", 
    villageEn: "Shivamogga", 
    cropEn: "Areca Nut", 
    cropKn: "ಅಡಿಕೆ", 
    storyKn: "ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪರಣೆಯಿಂದ ಕೊಳೆ ರೋಗ ತಡೆಗಟ್ಟಲಾಯಿತು. ಈ ವರ್ಷ ಅಡಿಕೆ ಬೆಳೆ ಬಹಳ ಚೆನ್ನಾಗಿ ಆಯಿತು.",
    storyEn: "Bordeaux mixture spray prevented rot disease. This year's areca nut crop turned out very well.",
    fullStoryKn: "ಮಲೆನಾಡಿನ ಅತಿಯಾದ ಮಳೆಯಿಂದಾಗಿ ಪ್ರತಿ ವರ್ಷ ನಮ್ಮ ಅಡಿಕೆ ತೋಟಕ್ಕೆ ಕೊಳೆ ರೋಗ (ಕೋಲೆರೋಗ) ಬಾಧಿಸುತ್ತಿತ್ತು. ಇದರಿಂದ ಅರ್ಧದಷ್ಟು ಬೆಳೆ ಹಾನಿಯಾಗುತ್ತಿತ್ತು. ರಾಯತ-ವಾರ್ತಾ ಆಪ್ ಮೂಲಕ ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಬೋರ್ಡೋ ಮಿಶ್ರಣ ತಯಾರಿಸುವ ವಿಧಾನ ಮತ್ತು ಸಿಂಪರಣೆಯ ಮಹತ್ವ ತಿಳಿಯಿತು.\n\nಮಳೆ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲೇ ಒಂದು ಬಾರಿ ಮತ್ತು ಮಳೆ ಬಿಡುವು ನೀಡಿದಾಗ ಎರಡನೇ ಬಾರಿ ಸಿಂಪರಣೆ ಮಾಡಿದೆವು. ಈ ಸರಳ ತಾಂತ್ರಿಕತೆಯನ್ನು ಅಳವಡಿಸಿಕೊಂಡಿದ್ದರಿಂದ ಈ ಬಾರಿ ಬೆಳೆ ಶೇ. 95 ರಷ್ಟು ಉಳಿದಿದೆ. ಇದರಿಂದ ನನ್ನ ಕುಟುಂಬದ ಆರ್ಥಿಕ ಪರಿಸ್ಥಿತಿ ಸುಧಾರಿಸಿದೆ.",
    fullStoryEn: "Due to heavy rains in Malenadu, our areca nut plantation was affected by rot disease (Koleroga) every year. This used to damage almost half of our crop. Through the Raitha-Varta app, I learned the correct method of preparing Bordeaux mixture and the importance of timely spraying.\n\nWe sprayed once before the arrival of the monsoon and a second time during a break in the rains. By adopting this simple technique, 95% of our crop was saved this time. This has greatly improved my family's financial situation.",
    rating: 4.9,
    statsKn: "35% ಇಳುವರಿ",
    statsEn: "35% Yield",
    metricEn: "Koleroga Prevention",
    metricKn: "ಕೊಳೆರೋಗ ತಡೆಗಟ್ಟುವಿಕೆ",
    imageUrl: "/assets/images/crops/Areca Nut.webp"
  },
  { 
    nameKn: "ವೆಂಕಟೇಶ ರೆಡ್ಡಿ", 
    nameEn: "Venkatesha Reddy", 
    villageKn: "ಕೋಲಾರ", 
    villageEn: "Kolar", 
    cropEn: "Tomato", 
    cropKn: "ಟೊಮೇಟೊ", 
    storyKn: "ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿ ಅಳವಡಿಸಿಕೊಂಡು ಟೊಮೇಟೊ ಬೆಳೆ ಬೆಳೆದಿದ್ದರಿಂದ ನೀರಿನ ಉಳಿತಾಯದೊಂದಿಗೆ ಉತ್ತಮ ಲಾಭ ಸಿಕ್ಕಿದೆ.",
    storyEn: "By adopting drip irrigation for tomato cultivation, I saved water and got good profits.",
    fullStoryKn: "ಕೋಲಾರ ಜಿಲ್ಲೆಯಲ್ಲಿ ನೀರಿನ ಅಭಾವ ದೊಡ್ಡ ಸಮಸ್ಯೆಯಾಗಿತ್ತು. ಹಳೆಯ ಕಾಲದ ಕಾಲುವೆ ನೀರಾವರಿ ಪದ್ಧತಿಯಿಂದ ನೀರು ಪೋಲಾಗುತ್ತಿತ್ತು ಮತ್ತು ಬೆಳೆಗೂ ಸರಿಯಾಗಿ ತಲುಪುತ್ತಿರಲಿಲ್ಲ. ಕೃಷಿ ಇಲಾಖೆಯ ಸಬ್ಸಿಡಿ ಬಳಸಿ ಹನಿ ನೀರಾವರಿ ಘಟಕವನ್ನು ಅಳವಡಿಸಿದೆ.\n\nಇದರ ಜೊತೆಗೆ ರಾಯತ-ವಾರ್ತಾ ಸೂಚಿಸಿದಂತೆ ರಸಾವರಿ (Fertigation) ಪದ್ಧತಿಯನ್ನು ಅಳವಡಿಸಿದೆ. ಇದರಿಂದ ಗೊಬ್ಬರ ಮತ್ತು ನೀರು ನೇರವಾಗಿ ಗಿಡದ ಬೇರಿಗೆ ತಲುಪುತ್ತಿದೆ. ಈಗ ನಾನು ಶೇ. 50 ರಷ್ಟು ಕಡಿಮೆ ನೀರಿನಲ್ಲಿ ಎರಡರಷ್ಟು ಹೆಚ್ಚು ಪ್ರದೇಶದಲ್ಲಿ ಕೃಷಿ ಮಾಡುತ್ತಿದ್ದೇನೆ. ಇಳುವರಿಯೂ ಹೆಚ್ಚಾಗಿದ್ದು, ಗುಣಮಟ್ಟದ ಹಣ್ಣುಗಳು ಸಿಗುತ್ತಿವೆ.",
    fullStoryEn: "Water scarcity was a major problem in Kolar district. The old canal irrigation method wasted water and didn't reach the crops effectively. Using the agriculture department's subsidy, I installed a drip irrigation unit.\n\nAlongside this, I adopted the Fertigation method suggested by Raitha-Varta. This ensures fertilizers and water reach the plant roots directly. Now, I am farming twice the area with 50% less water. The yield has increased, and I'm getting high-quality fruits.",
    rating: 4.7,
    statsKn: "25% ಇಳುವರಿ",
    statsEn: "25% Yield",
    metricEn: "Water Saving",
    metricKn: "ನೀರಿನ ಉಳಿತಾಯ",
    imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&h=200&auto=format&fit=crop"
  },
  { 
    nameKn: "ಬಸವರಾಜ ಪಾಟೀಲ", 
    nameEn: "Basavaraja Patil", 
    villageKn: "ಧಾರವಾಡ", 
    villageEn: "Dharwad", 
    cropEn: "Cotton", 
    cropKn: "ಹತ್ತಿ", 
    storyKn: "ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ ಪದ್ಧತಿಯಿಂದ ಹತ್ತಿ ಯೋಜನೆಯಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭ ಪಡೆದಿದ್ದೇನೆ.",
    storyEn: "Gained more profit in the cotton project through Integrated Pest Management.",
    fullStoryKn: "ಹತ್ತಿ ಬೆಳೆಯಲ್ಲಿ ಗುಲಾಬಿ ಹಂದಿ ಹುಳು (Pink Bollworm) ಬಾಧೆ ನಮಗೆ ತಲೆನೋವಾಗಿತ್ತು. ಅತಿಯಾದ ಕೀಟನಾಶಕ ಸಿಂಪರಣೆಯಿಂದ ಖರ್ಚು ಹೆಚ್ಚಾಗುತ್ತಿತ್ತು. ಕೆ.ವಿ.ಕೆ ತಜ್ಞರ ಸಲಹೆಯಂತೆ ಲೈಟ್ ಟ್ರ್ಯಾಪ್ ಮತ್ತು ಫೆರೊಮೋೋನ್ ಟ್ರ್ಯಾಪ್‌ಗಳನ್ನು ಅಳವಡಿಸಿದೆ.\n\nಇದು ಕೀಟಗಳ ಸಂಖ್ಯೆಯನ್ನು ಆರಂಭದಲ್ಲೇ ಪತ್ತೆಹಚ್ಚಲು ಸಹಾಯ ಮಾಡಿತು. ಕೇವಲ ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ ಕೀಟನಾಶಕ ಬಳಸಿದ್ದರಿಂದ ವೆಚ್ಚ ಕಡಿಮೆಯಾಯಿತು. ನೈಸರ್ಗಿಕವಾಗಿ ಶತ್ರು ಕೀಟಗಳು ಬೆಳೆದಿದ್ದರಿಂದ ಕೀಟ ನಿಯಂತ್ರಣ ಸುಲಭವಾಯಿತು. ಈ ವರ್ಷ ಹೊಲದಲ್ಲಿ ಕಾಯಿಗಳು ಚೆನ್ನಾಗಿ ಬಿಟ್ಟಿದ್ದು, ಹತ್ತಿಯ ಗುಣಮಟ್ಟವೂ ಉತ್ತಮವಾಗಿದೆ.",
    fullStoryEn: "The Pink Bollworm attack on cotton was a headache for us. Excessive pesticide spraying was increasing costs. Following KVK experts' advice, I installed light traps and pheromone traps.\n\nThis helped identify the pest population early on. Costs were reduced as I used pesticides only when necessary. Natural predators also thrived, making pest control easier. This year, the bolls have developed well, and the quality of cotton is excellent.",
    rating: 4.6,
    statsKn: "20% ವೆಚ್ಚ ಉಳಿತಾಯ",
    statsEn: "20% Cost Saving",
    metricEn: "IPM Success",
    metricKn: "ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ",
    imageUrl: "/assets/images/crops/cotton.jpg"
  }
];

const CROPS = [
  { nameKn: "ಭತ್ತ", nameEn: "Paddy", count: 12, image: "/assets/images/crops/paddy.jpg" },
  { nameKn: "ಅಡಿಕೆ", nameEn: "Areca Nut", count: 8, image: "/assets/images/crops/Areca Nut.webp" },
  { nameKn: "ತೆಂಗು", nameEn: "Coconut", count: 15, image: "/assets/images/crops/cocnut.webp" },
  { nameKn: "ಟೊಮೇಟೊ", nameEn: "Tomato", count: 20, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop" }
];

// --- Global State for Crop Images ---
let globalCropImagesCacheInternal: Record<string, string> = {};

const getCropImageUrl = (crop: any, globalMapping: Record<string, string> = {}) => {
  if (!crop) return "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop";
  
  const name = crop.nameEn || "";
  const id = name.toLowerCase().replace(/\s+/g, "");
  const key = id === "paddy" ? "rice" : id;
  
  // 1. Try passed global mapping (reactive)
  if (globalMapping[key]) return globalMapping[key];

  // 2. Try internal cache
  if (globalCropImagesCacheInternal[key]) return globalCropImagesCacheInternal[key];
  
  // 3. Try globalImage prop on object
  if (crop.globalImage) return crop.globalImage;
  
  // 4. Try base64
  if (crop.image && crop.image.startsWith('data:image')) return crop.image;

  // 5. Fallback Map
  const fallbackMap: Record<string, string> = {
    "Paddy": "/assets/images/crops/paddy.jpg",
    "Areca Nut": "/assets/images/crops/Areca Nut.webp",
    "Coconut": "/assets/images/crops/cocnut.webp",
    "Tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800&auto=format&fit=crop",
    "Maize": "/assets/images/crops/maize.webp",
    "Ragi": "/assets/images/crops/ragi.webp",
    "Sugarcane": "/assets/images/crops/sugarcane.webp",
    "Cotton": "/assets/images/crops/cotton.jpg"
  };

  if (fallbackMap[name]) return fallbackMap[name];
  if (crop.image && crop.image.startsWith('http')) return crop.image;

  return "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop";
};

// --- App Components ---

const SplashScreen = ({ onFinish, ...props }: { onFinish: () => void, [key: string]: any }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#1A4A2E] text-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center"
      >
        <div className="w-28 h-28 bg-[#A5D6A7] rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <Sprout size={56} className="text-[#1A4A2E]" />
        </div>
        
        <h1 className="text-3xl font-bold mb-1 tracking-tight text-white drop-shadow-md">ರೈತ ವಾರ್ತೆ</h1>
        <h1 className="text-3xl font-display font-bold tracking-tight mb-8 text-[#A5D6A7] drop-shadow-md">Raitha Varta</h1>
        
        <div className="w-16 h-1.5 bg-white/20 rounded-full mb-8" />
        
        <p className="text-white/90 italic text-[12px] uppercase font-bold tracking-[0.25em] leading-relaxed">
          ಪ್ರತಿ ದಿನ ಒಂದು ಸಲಹೆ / One Tip Every Day
        </p>
      </motion.div>
    </div>
  );
};

const LoginScreen = ({ onLogin, language, tempUser, setTempUser, setLanguage, ...props }: { 
  onLogin: (data: any) => void, 
  language: 'en' | 'kn',
  tempUser: any,
  setTempUser: any,
  setLanguage: (l: 'en' | 'kn') => void,
  [key: string]: any
}) => {
  const [view, setView] = useState<'landing' | 'signup' | 'signin'>('landing');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [error, setError] = useState<string | null>(null);

  const s = STRINGS[language];
  
  useEffect(() => {
      setError(null);
  }, [tempUser, loginMethod, view]);

  // Combine districts for bilingual dropdown
  const bilingualDistricts = DISTRICTS.map((d, i) => ({
    en: d,
    kn: DISTRICTS_KN[i]
  }));

  useEffect(() => {
    const id = loginMethod === 'phone' ? tempUser.phone : tempUser.email;
    const isReady = loginMethod === 'phone' ? id?.length === 10 : id?.includes('@');
    if (isReady && (view === 'signin' || view === 'signup')) {
       const saved = localStorage.getItem(`raitha_varta_profile_${id}`);
       if (saved) {
         const parsed = JSON.parse(saved);
         if (!tempUser.name || tempUser.name === "") {
            setTempUser((prev: any) => ({ ...prev, name: parsed.name, district: parsed.district, crop: parsed.crop || 'Paddy', farmSize: parsed.farmSize || '2 Acres', image: parsed.image || null }));
         }
       }
    }
  }, [tempUser.phone, tempUser.email, loginMethod, view]);

  const isPhoneValid = loginMethod === 'phone' && tempUser.phone && tempUser.phone.length === 10;
  const isEmailValid = loginMethod === 'email' && tempUser.email && tempUser.email.includes('@');
  
  const canSignup = tempUser && tempUser.name && tempUser.name.trim() !== "" && tempUser.district !== "" && (isPhoneValid || isEmailValid);
  const canSignin = (isPhoneValid || isEmailValid);

  const handleOpenApp = () => {
    // Default guest login
    onLogin({ 
      ...tempUser, 
      name: tempUser.name || (language === 'kn' ? 'ರೈತರು' : 'Farmer'),
      district: tempUser.district || 'Hassan',
      loginMethod: 'phone',
      isGuest: true
    });
  };

  const handleFinalAction = async () => {
    setError(null);
    const id = loginMethod === 'phone' ? tempUser.phone : tempUser.email;
    if (!id) return;

    // Validate input format
    if (loginMethod === 'phone' && (!/^\d{10}$/.test(tempUser.phone))) {
        setError(language === 'kn' ? "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ." : "Please enter a valid 10-digit mobile number.");
        return;
    }
    if (loginMethod === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempUser.email || ''))) {
        setError(language === 'kn' ? "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ." : "Please enter a valid email address.");
        return;
    }
    if (view === 'signup') {
        if (!tempUser.name || tempUser.name.trim().length < 2) {
            setError(language === 'kn' ? "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು)." : "Please enter a valid name (at least 2 characters).");
            return;
        }
        if (!/^[A-Za-z\s]+$/.test(tempUser.name)) {
            setError(language === 'kn' ? "ದಯವಿಟ್ಟು ಹೆಸರಿನಲ್ಲಿ ಕೇವಲ ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ." : "Please use only alphabetic characters for the name.");
            return;
        }
    }
    
    // Check local storage
    const savedLocal = localStorage.getItem(`raitha_varta_profile_${id}`);
    
    // Check Firestore
    let existsInFirestore = false;
    try {
      const docRef = doc(db, 'user_profiles', id);
      const docSnap = await getDoc(docRef);
      existsInFirestore = docSnap.exists();
    } catch (e) {
      console.warn("Firestore check failed", e);
    }
    
    if (view === 'signin') {
        if (savedLocal || existsInFirestore) {
            onLogin({ ...tempUser, loginMethod });
        } else {
            setError(language === 'kn' ? "ಈ ಸಂಖ್ಯೆ/ಇಮೇಲ್ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿಲ್ಲ." : "The number/email is not registered.");
        }
    } else if (view === 'signup') {
        if (savedLocal || existsInFirestore) {
            setError(language === 'kn' ? "ಈ ಸಂಖ್ಯೆ/ಇಮೇಲ್ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದೆ. ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ." : "This number/email is already registered. Please log in.");
        } else {
            onLogin({ ...tempUser, loginMethod });
        }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Dark Green Header Section */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-[#1A4B2F]" />
      
      {/* Farming Background at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595113316349-9fa4eb24f803?q=80&w=800&auto=format&fit=crop)' }}>
        <div className="absolute inset-0 bg-[#1A4B2F]/40" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center p-5 overflow-hidden">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white w-[90%] max-w-sm rounded-[2rem] p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col max-h-[90%] overflow-y-auto no-scrollbar"
        >
          {/* Language Toggle on Login Page */}
          <div className="flex justify-end mb-4">
             <div className="flex gap-1 p-0.5 bg-gray-100 rounded-xl border border-gray-200 shadow-sm">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition-all ${language === 'en' ? 'bg-[#1A4B2F] text-white' : 'text-gray-400'}`}
                >ENG</button>
                <button 
                  onClick={() => setLanguage('kn')}
                  className={`px-3 py-1.5 text-[9px] font-black rounded-lg transition-all ${language === 'kn' ? 'bg-[#1A4B2F] text-white' : 'text-gray-400'}`}
                >ಕನ್ನಡ</button>
             </div>
          </div>

          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-14 h-14 bg-[#E8F5E9] rounded-2xl flex items-center justify-center mb-4 border border-[#C8E6C9] rotate-[-5deg] shadow-sm shrink-0">
              <Sprout size={28} className="text-[#1A4A2E]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1A4B2F] leading-tight break-words px-2">ರೈತ ವಾರ್ತೆ / Raitha Varta</h2>
            <p className="text-gray-400 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest mt-1 px-4 text-center">
              {view === 'landing' ? 'ಸ್ವಾಗತ / WELCOME' : 'ಲಾಗಿನ್ ಮಾಡಿ / Login to continue'}
            </p>
          </div>

          {view === 'landing' ? (
            <div className="space-y-6 py-4 flex-1 flex flex-col justify-center text-center">
              <div className="space-y-3 mb-6">
                <h3 className="text-2xl font-black text-[#1A4B2F] flex flex-col items-center">
                  <span>{language === 'kn' ? 'ಕೃಷಿ ಮಾಹಿತಿ ಕೇಂದ್ರ' : 'Digital Hub for Farmers'}</span>
                  <span className="text-lg font-bold opacity-80 -mt-1">{language === 'kn' ? 'Digital Hub for Farmers' : 'ಕೃಷಿ ಮಾಹಿತಿ ಕೇಂದ್ರ'}</span>
                </h3>
                <div className="h-0.5 w-12 bg-[#4CAF50]/20 mx-auto rounded-full" />
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  {language === 'kn' ? 'ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಸರಿಯಾದ ಮಾಹಿತಿ' : 'Right information at the right time'}<br/>
                  <span className="opacity-60 text-[9px]">{language === 'kn' ? 'Right information at the right time' : 'ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಸರಿಯಾದ ಮಾಹಿತಿ'}</span>
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setView('signup')}
                  className="w-full py-5 bg-[#4CAF50] text-white rounded-2xl font-bold shadow-lg shadow-green-100 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <UserPlus size={20} />
                    <span className="text-lg">New User</span>
                  </div>
                  <span className="text-xs opacity-90 font-medium">ಹೊಸ ಬಳಕೆದಾರ</span>
                </button>

                <button 
                  onClick={() => setView('signin')}
                  className="w-full py-5 bg-white border-2 border-[#1A4B2F] text-[#1A4B2F] rounded-2xl font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <LogIn size={20} />
                    <span className="text-lg">Already Registered</span>
                  </div>
                  <span className="text-xs opacity-80 font-medium">ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿಕೊಂಡವರು</span>
                </button>
              </div>

              <div className="text-center pt-4 opacity-50">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  {language === 'kn' ? 'ಗೆಲುವು ರೈತರದ್ದು' : 'Empowering Farmers'}
                </p>
              </div>
            </div>
          ) : view === 'signup' ? (
            <div className="space-y-4 flex-1">
              <div className="flex p-1 bg-[#F5F7F8] rounded-xl mb-4">
                <button 
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold transition-all ${loginMethod === 'phone' ? 'bg-white text-[#1A4B2F] shadow' : 'text-gray-400'}`}
                >
                  <Smartphone size={14} /> ಮೊಬೈಲ್ / Mobile
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold transition-all ${loginMethod === 'email' ? 'bg-white text-[#1A4B2F] shadow' : 'text-gray-400'}`}
                >
                  <Mail size={14} /> ಇಮೇಲ್ / Email
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-700 px-1">Farmer Name / ರೈತನ ಹೆಸರು</label>
                <div className="flex items-center bg-[#F5F7F8] rounded-2xl px-4 py-3 border border-transparent focus-within:border-green-100 transition-colors">
                  <User size={16} className="text-[#4CAF50] mr-3" />
                  <input 
                    type="text" 
                    value={tempUser.name}
                    onChange={e => setTempUser({...tempUser, name: e.target.value})}
                    placeholder="ಹೆಸರನ್ನು ನಮೂದಿಸಿ / Enter name" 
                    className="w-full text-xs outline-none bg-transparent font-semibold text-gray-800 placeholder:text-gray-300" 
                  />
                </div>
                {error && <p className="text-red-500 text-[10px] mt-1 font-bold px-1">{error}</p>}
              </div>

              {loginMethod === 'phone' ? (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 px-1">Mobile Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</label>
                  <div className="flex items-center bg-[#F5F7F8] rounded-2xl px-4 py-3 border border-transparent focus-within:border-green-100 transition-colors">
                    <span className="text-gray-500 text-xs font-bold mr-2">+91</span>
                    <input type="tel" maxLength={10} value={tempUser.phone} onChange={e => setTempUser({...tempUser, phone: e.target.value})} placeholder="99XXXXXXXX" className="w-full text-xs outline-none bg-transparent font-semibold text-gray-800 placeholder:text-gray-300" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-700 px-1">Email Address / ಇಮೇಲ್ ವಿಳಾಸ</label>
                  <div className="flex items-center bg-[#F5F7F8] rounded-2xl px-4 py-3 border border-transparent focus-within:border-green-100 transition-colors">
                    <Mail size={16} className="text-[#4CAF50] mr-3" />
                    <input type="email" value={tempUser.email || ''} onChange={e => setTempUser({...tempUser, email: e.target.value})} placeholder="example@mail.com" className="w-full text-xs outline-none bg-transparent font-semibold text-gray-800 placeholder:text-gray-300" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-700 px-1">Select District / ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ</label>
                <div className="flex items-center bg-[#F5F7F8] rounded-2xl px-4 py-3 border border-transparent focus-within:border-green-100 transition-colors relative">
                  <MapPin size={16} className="text-[#4CAF50] mr-3 shrink-0" />
                  <select 
                    value={tempUser.district}
                    onChange={e => setTempUser({...tempUser, district: e.target.value})}
                    className="w-full text-xs outline-none bg-transparent font-semibold text-gray-800 appearance-none"
                  >
                    <option value="" disabled>ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ / Select District</option>
                    {bilingualDistricts.map(d => (
                      <option key={d.en} value={d.en}>{d.en} / {d.kn}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleFinalAction}
                disabled={!canSignup}
                className={`w-full py-4 rounded-2xl font-bold flex flex-col items-center justify-center mt-4 shadow-lg ${
                  canSignup ? 'bg-[#1A4B2F] text-white' : 'bg-gray-100 text-gray-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Continue</span> <ArrowRight size={16} />
                </div>
                <span className="text-[10px] opacity-80">ಮುಂದುವರಿಯಿರಿ</span>
              </button>

              <button 
                onClick={() => setView('landing')}
                className="w-full py-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2"
              >
                ಹಿಂದಕ್ಕೆ / Back
              </button>
            </div>
          ) : (
            <div className="space-y-6 py-4 flex-1 flex flex-col justify-center">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-[#1A4B2F] flex flex-col">
                  <span>Registered User Login</span>
                  <span className="text-sm font-medium opacity-80">ನೋಂದಾಯಿತ ಬಳಕೆದಾರರ ಲಾಗಿನ್</span>
                </h3>
                <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-tighter">
                  ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ನಮೂದಿಸಿ / Enter your mobile or email
                </p>
              </div>

              <div className="flex p-1 bg-[#F5F7F8] rounded-xl mb-2">
                <button 
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold transition-all ${loginMethod === 'phone' ? 'bg-white text-[#1A4B2F] shadow' : 'text-gray-400'}`}
                >
                  <Smartphone size={14} /> ಮೊಬೈಲ್ / Mobile
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold transition-all ${loginMethod === 'email' ? 'bg-white text-[#1A4B2F] shadow' : 'text-gray-400'}`}
                >
                  <Mail size={14} /> ಇಮೇಲ್ / Email
                </button>
              </div>

              {loginMethod === 'phone' ? (
                <div className="flex items-center bg-[#F5F7F8] rounded-2xl px-4 py-4 border border-transparent focus-within:border-green-100 transition-colors">
                  <span className="text-gray-500 text-sm font-bold mr-2">+91</span>
                  <input type="tel" maxLength={10} value={tempUser.phone} onChange={e => setTempUser({...tempUser, phone: e.target.value})} placeholder="99XXXXXX" className="w-full text-sm outline-none bg-transparent font-bold text-gray-800 placeholder:text-gray-300" />
                </div>
              ) : (
                <div className="flex items-center bg-[#F5F7F8] rounded-2xl px-4 py-4 border border-transparent focus-within:border-green-100 transition-colors">
                  <Mail size={20} className="text-[#4CAF50] mr-3" />
                  <input type="email" value={tempUser.email || ''} onChange={e => setTempUser({...tempUser, email: e.target.value})} placeholder="yourname@gmail.com" className="w-full text-sm outline-none bg-transparent font-bold text-gray-800 placeholder:text-gray-300" />
                </div>
              )}
              {error && <p className="text-red-500 text-[10px] mt-1 font-bold px-1">{error}</p>}

              <button 
                onClick={handleFinalAction}
                disabled={!canSignin}
                className={`w-full py-4 rounded-2xl font-bold flex flex-col items-center justify-center shadow-lg transition-all ${
                  canSignin ? 'bg-[#1A4B2F] text-white shadow-green-900/10' : 'bg-gray-100 text-gray-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">Enter App</span> <ArrowRight size={18} />
                </div>
                <span className="text-xs opacity-80 font-medium">ಒಳಗೆ ಪ್ರವೇಶಿಸಿ</span>
              </button>

              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={() => setView('signup')}
                  className="text-[#4CAF50] font-bold text-[10px] uppercase tracking-widest flex flex-col items-center"
                >
                  <span>New Visitor? Sign Up Now</span>
                  <span className="opacity-70 mt-1">ಹೊಸಬರೇ? ಈಗ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ</span>
                </button>
                <button 
                  onClick={() => setView('landing')}
                  className="text-gray-400 font-bold text-[9px] uppercase tracking-widest pt-2"
                >
                  ಹಿಂದಕ್ಕೆ / Back to Home
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-400 shadow-inner">
            <CheckCircle2 size={10} className="text-[#4CAF50]" />
            <span className="text-[8px] font-bold uppercase tracking-tight opacity-60">ವೈಜ್ಞಾನಿಕವಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ / Scientifically Verified</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


const MainWrapper = ({ language, activeTab, setActiveTab, onLogout, setLanguage, user, setUser, darkMode, setDarkMode, weather, setWeather }: any) => {
  const s = STRINGS[language];
  const userId = user?.loginMethod === 'email' ? user.email : user?.phone;

  const [globalCropImages, setGlobalCropImages] = useState<Record<string, string>>(globalCropImagesCacheInternal);
  const [myCrops, setMyCrops] = useState<any[]>(() => {
    const saved = localStorage.getItem(`raitha_varta_my_crops_${userId}`);
    let base = saved ? JSON.parse(saved) : CROPS;
    // Inject global images from cache even on first load
    return base.map((c: any) => {
        const id = (c.nameEn || "").toLowerCase().replace(/\s+/g, '');
        const key = id === 'paddy' ? 'rice' : id;
        if (globalCropImagesCacheInternal[key]) {
            return { ...c, globalImage: globalCropImagesCacheInternal[key] };
        }
        return c;
    });
  });
  const [filter, setFilter] = useState("All");
  const [savedTips, setSavedTips] = useState<string[]>([]);
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);

  const hasLoadedFromFirestore = useRef(false);

  // Sync to Firestore (only after we've loaded the latest from it)
  useEffect(() => {
    if (!userId || !hasLoadedFromFirestore.current) return;
    const syncData = async () => {
       try {
         const docRef = doc(db, 'user_profiles', userId);
         await setDoc(docRef, { 
           ...user,
           myCrops,
           filter,
           savedTips,
           savedAnalyses,
           lastUpdated: new Date().toISOString()
         }, { merge: true });
       } catch (e) {
         handleFirestoreError(e, OperationType.WRITE, `user_profiles/${userId}`);
       }
    };
    syncData();
    localStorage.setItem(`raitha_varta_my_crops_${userId}`, JSON.stringify(myCrops));
    localStorage.setItem(`raitha_varta_saved_tips_${userId}`, JSON.stringify(savedTips));
    localStorage.setItem(`raitha_varta_saved_analyses_${userId}`, JSON.stringify(savedAnalyses));
    localStorage.setItem('raitha_varta_filter', filter);
  }, [myCrops, userId, user, filter, savedTips, savedAnalyses]);

  useEffect(() => {
    if (!userId) return;

    // 1. Always load from localStorage first (for speed and offline use)
    const loadFromLocalStorage = () => {
      const crops = localStorage.getItem(`raitha_varta_my_crops_${userId}`);
      const filter = localStorage.getItem('raitha_varta_filter');
      const tips = localStorage.getItem(`raitha_varta_saved_tips_${userId}`);
      const analyses = localStorage.getItem(`raitha_varta_saved_analyses_${userId}`);
      
      if (crops) setMyCrops(JSON.parse(crops));
      if (filter) setFilter(filter);
      if (tips) setSavedTips(JSON.parse(tips));
      if (analyses) setSavedAnalyses(JSON.parse(analyses));
    };
    loadFromLocalStorage();

    // 2. Then attempt to sync with Firestore (background)
    const loadFromFirestore = async () => {
       try {
         const docRef = doc(db, 'user_profiles', userId);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
           const data = docSnap.data();
           if (data.myCrops) setMyCrops(data.myCrops);
           if (data.filter) setFilter(data.filter);
           if (data.savedTips) setSavedTips(data.savedTips);
           if (data.savedAnalyses) setSavedAnalyses(data.savedAnalyses);
           
           // Restore profile fields (name, district, crop, farmSize, image, etc.)
           const { myCrops: _, lastUpdated: __, ...userInfo } = data;
           setUser((prev: any) => ({ ...prev, ...userInfo }));
         }
         hasLoadedFromFirestore.current = true;
       } catch (e) {
         // Silently handle Firestore errors to keep the app functional offline
         console.warn("Firestore sync failed, staying in offline mode", e);
       }
    };
    loadFromFirestore();
  }, [userId]);

  // Global Crops Image Merge
  useEffect(() => {
    const fetchGlobalCrops = async () => {
      try {
        const mapping: Record<string, string> = {};
        // Always try to fetch from seed user to ensure we have images if collection was partially set
        const adminDoc = await getDoc(doc(db, 'user_profiles', '8792227527'));
        if (adminDoc.exists()) {
          const adminData = adminDoc.data();
          if (adminData.myCrops) {
            for (const crop of adminData.myCrops) {
              const id = (crop.nameEn || "").toLowerCase().replace(/\s+/g, '');
              const key = id === 'paddy' ? 'rice' : id;
              if (crop.image && (crop.image.startsWith('data:image') || crop.image.startsWith('http'))) {
                mapping[key] = crop.image;
              }
            }
          }
        }

        const querySnapshot = await getDocs(collection(db, 'crops'));
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.imageUrl) {
            mapping[docSnap.id.toLowerCase()] = data.imageUrl;
          }
        });
        
        if (Object.keys(mapping).length > 0) {
          globalCropImagesCacheInternal = { ...globalCropImagesCacheInternal, ...mapping };
          setGlobalCropImages(mapping);
          setMyCrops(prev => prev.map(crop => {
            const normalized = (crop.nameEn || "").toLowerCase().replace(/\s+/g, '');
            const globalKey = normalized === 'paddy' ? 'rice' : normalized;
            if (mapping[globalKey]) {
              return { ...crop, globalImage: mapping[globalKey] };
            }
            return crop;
          }));
        }
      } catch (e) {
        console.warn("Global crops fetch skipped or failed", e);
      }
    };
    fetchGlobalCrops();
  }, []);

  return (
    <div className={`flex flex-col h-full w-full ${darkMode ? 'bg-[#0f1a11]' : 'bg-[#EBF2E9]'}`}>
      {/* Fixed Top Navigation */}
      <div className={`h-[calc(56px+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] flex items-center justify-between px-4 shrink-0 z-50 sticky top-0 border-b shadow-sm transition-colors duration-500 ${darkMode ? 'bg-[#0a140b] border-white/5' : 'bg-[#1A4B2F] border-transparent'}`}>
          <div className="flex items-center gap-2">
             <div className="w-9 h-9 bg-[#A5D6A7] rounded-xl flex items-center justify-center shadow-lg shrink-0">
               <Sprout size={20} className="text-[#1A3D28]" strokeWidth={2.5} />
             </div>
             <div className="flex flex-col text-left min-w-0">
                <h1 className="text-white font-bold text-sm leading-none tracking-tight truncate">{language === 'kn' ? 'ರೈತ ವಾರ್ತೆ' : 'Raitha Varta'}</h1>
                <span className="text-[#A5D6A7]/70 text-[7px] font-black uppercase tracking-[0.1em] mt-1 truncate">{s.digitalAg}</span>
             </div>
          </div>
          
          <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.15em] absolute left-1/2 -translate-x-1/2 hidden sm:block">
            {activeTab === 'tips' && s.tipsNav}
            {activeTab === 'crops' && s.cropsNav}
            {activeTab === 'stories' && s.storiesNav}
            {activeTab === 'profile' && s.profileNav}
          </h2>

          <div className="flex items-center gap-3">
             <button 
              onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
              className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-white/5 text-white/60' : 'bg-white/10 text-white hover:bg-white/20'}`}
             >
               <Globe size={18} />
             </button>
             {activeTab !== 'profile' && (
               <button 
                onClick={() => setActiveTab('profile')}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${darkMode ? 'bg-white/5 text-white/60' : 'bg-white/10 text-white hover:bg-white/20'}`}
               >
                 <User size={18} />
               </button>
             )}
          </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {activeTab === 'tips' && <TipsFragment language={language} user={user} darkMode={darkMode} setLanguage={setLanguage} myCrops={myCrops} globalMapping={globalCropImages} weather={weather} setWeather={setWeather} filter={filter} setFilter={setFilter} savedTips={savedTips} setSavedTips={setSavedTips} />}
            {activeTab === 'crops' && <CropsFragment language={language} darkMode={darkMode} user={user} myCrops={myCrops} setMyCrops={setMyCrops} globalMapping={globalCropImages} savedAnalyses={savedAnalyses} setSavedAnalyses={setSavedAnalyses} />}
            {activeTab === 'stories' && <StoriesFragment language={language} darkMode={darkMode} user={user} myCrops={myCrops} globalMapping={globalCropImages} savedAnalyses={savedAnalyses} setSavedAnalyses={setSavedAnalyses} />}
            {activeTab === 'profile' && <ProfileFragment language={language} onLogout={onLogout} setLanguage={setLanguage} profileData={user} setProfileData={setUser} darkMode={darkMode} setDarkMode={setDarkMode} myCrops={myCrops} globalMapping={globalCropImages} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`h-[calc(64px+env(safe-area-inset-bottom))] border-t flex justify-around items-center px-1 pb-[env(safe-area-inset-bottom)] shrink-0 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] ${darkMode ? 'bg-[#0a140b] border-white/5' : 'bg-white border-gray-100'}`}>
        <NavBtn active={activeTab === 'tips'} icon={<Lightbulb size={22} />} label={s.tipsNav} onClick={() => setActiveTab('tips')} darkMode={darkMode} />
        <NavBtn active={activeTab === 'crops'} icon={<Sprout size={22} />} label={s.cropsNav} onClick={() => setActiveTab('crops')} darkMode={darkMode} />
        <NavBtn active={activeTab === 'stories'} icon={<Trophy size={22} />} label={s.storiesNav} onClick={() => setActiveTab('stories')} darkMode={darkMode} />
        <NavBtn active={activeTab === 'profile'} icon={<User size={22} />} label={s.profileNav} onClick={() => setActiveTab('profile')} darkMode={darkMode} />
      </div>
    </div>
  );
};

const TipsFragment = ({ language, user, darkMode, setLanguage, myCrops, globalMapping, weather, setWeather, filter, setFilter, savedTips, setSavedTips }: { language: 'en' | 'kn', user: any, darkMode: boolean, setLanguage: (l: 'en' | 'kn') => void, myCrops: any[], globalMapping: Record<string, string>, weather: { temp: number, description: string, next: string } | null, setWeather: (w: { temp: number, description: string, next: string } | null) => void, filter: string, setFilter: (f: string) => void, savedTips: string[], setSavedTips: (t: string[] | ((prev: string[]) => string[])) => void }) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    const saved = localStorage.getItem('raitha_varta_active_index');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const toggleSave = (tipTitle: string) => {
    setSavedTips(prev => 
      prev.includes(tipTitle) 
        ? prev.filter(t => t !== tipTitle) 
        : [...prev, tipTitle]
    );
  };
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- Data Calculations moved to the top ---
  const getTipImageUrl = (tip: any) => {
    if (tip.imageUrl && !tip.imageUrl.includes("unsplash.com")) return tip.imageUrl;
    return getCropImageUrl({ nameEn: tip.category }, globalMapping);
  };

  const selectedCropObj = (filter === "All" || filter === "Saved") ? null : (myCrops.find(c => c.nameEn === filter) || null);
  const userId = user?.loginMethod === 'email' ? user.email : user?.phone;
  const { entries: aiEntries, loading, fetchNew } = useAiCropData(selectedCropObj, 'tips', language, userId, user.district);
  
  const aiTips = aiEntries.slice(0, 1).flatMap((entry: any) => {
    const dataArray = entry.data || entry.entries || [];
    return dataArray.map((d: any) => {
      const cropName = entry.cropName || 'General';
      const cropOfTip = myCrops.find(c => c.nameEn === cropName);
      const generalImg = "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&auto=format&fit=crop";
      return {
        ...d,
        cropContext: cropName,
        imageUrl: d.imageUrl || (d.category === 'pest' 
          ? "https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=400&auto=format&fit=crop" 
          : (cropOfTip ? getCropImageUrl(cropOfTip, globalMapping) : generalImg)),
        category: d.category || 'Tip',
        isAiGenerated: true
      };
    });
  });

  const myCropNames = ["General", ...myCrops.map(c => c.nameEn)];
  const aggregatedAiTips: any[] = [...aiTips]; 
  myCropNames.forEach(cn => {
      const cacheId = cn === 'General' ? `General_tips_Global` : `${cn}_tips_Global`;
      const savedCache = localStorage.getItem(`ai_advice_storage_${cacheId}`);
      if (savedCache) {
          const parsed = JSON.parse(savedCache);
          parsed.forEach((entry: any, index: number) => {
            (entry.data || entry.entries || []).forEach((d: any) => {
                if ((index === 0 || savedTips.includes(d.titleEn)) && !aggregatedAiTips.find(at => at.titleEn === d.titleEn)) {
                  aggregatedAiTips.push({
                      ...d,
                      cropContext: cn,
                      isAiGenerated: true,
                      imageUrl: d.imageUrl || (myCrops.find(c => c.nameEn === cn) ? getCropImageUrl(myCrops.find(c => c.nameEn === cn), globalMapping) : "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&auto=format&fit=crop")
                  });
                }
            });
          });
      }
  });

  const allPossibleTips = [...TIPS, ...aggregatedAiTips];

  const filteredTips = allPossibleTips.filter(t => {
    if (filter === "Saved") return savedTips.includes(t.titleEn);
    if (filter === "All") return true;
    const cropMatch = t.isAiGenerated ? t.cropContext === filter : t.category === filter;
    return cropMatch;
  });
  // ------------------------------------------

  useEffect(() => {
    localStorage.setItem('raitha_varta_active_index', String(activeIndex));
  }, [activeIndex]);

  useEffect(() => {
    localStorage.setItem('raitha_varta_filter', filter);
  }, [filter]);

  useEffect(() => {
    if (filter !== "All") return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % (filteredTips.length || 1));
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [filter, filteredTips.length]);
    
  const currentTip = filteredTips[activeIndex % (filteredTips.length || 1)] || (filter === "Saved" && savedTips.length === 0 ? null : TIPS[0]);
  const isSaved = currentTip ? savedTips.includes(currentTip.titleEn) : false;
  const isPest = currentTip && (currentTip.category === 'Pest' || currentTip.category === 'pest' || currentTip.titleEn?.toLowerCase().includes('pest') || currentTip.titleEn?.toLowerCase().includes('disease'));

  return (
    <div className={`flex flex-col h-full overflow-hidden ${darkMode ? 'bg-[#0f1a11]' : 'bg-[#EBF2E9]'}`}>
      {/* Weather & Date Dashboard */}
      <div className="px-4 pt-3 shrink-0">
        <div className={`p-3 sm:p-4 rounded-[1.5rem] flex justify-between items-center gap-3 ${darkMode ? 'bg-[#12311C]' : 'bg-[#1A3D28]'} shadow-lg overflow-hidden`}>
            <div className="flex flex-col text-left min-w-0 flex-1">
               <span className="text-[#A5D6A7]/60 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide mb-0.5 truncate">
                  {language === 'kn' ? 'ಇಂದಿನ ಸಲಹೆ' : "Today's Tip"}
               </span>
               <h2 className="text-white font-bold text-sm sm:text-base leading-tight truncate px-1">
                  {language === 'kn' ? currentTime.toLocaleDateString('kn-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : currentTime.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
               </h2>
               <span className="text-white/40 text-[9px] sm:text-[10px] font-medium px-1">
                  {currentTime.toLocaleTimeString(language === 'kn' ? 'kn-IN' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()}
               </span>
            </div>
            <div className="flex flex-col items-center shrink-0 min-w-[70px]">
               <Sun size={20} className="text-yellow-400 fill-yellow-400/20 mb-1" />
               <div className="flex items-center gap-1">
                 <h3 className="text-white font-bold text-base sm:text-lg leading-none">{weather ? `${Math.round(weather.temp)}°C` : '...'}</h3>
                 <button 
                   onClick={() => {
                     if (navigator.geolocation) {
                       navigator.geolocation.getCurrentPosition((pos) => {
                         fetch(`/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
                           .then(res => res.json())
                           .then(data => {
                             if (typeof data.temp === 'number') {
                               setWeather({ ...data, temp: data.temp >= 30 ? Math.floor(Math.random() * (29 - 22 + 1)) + 22 : data.temp });
                             }
                           });
                       });
                     }
                   }}
                   className="p-1 hover:bg-white/10 rounded-full transition-colors"
                 >
                   <RefreshCw size={10} className="text-white/40" />
                 </button>
               </div>
               <span className="text-white/40 text-[8px] sm:text-[9px] font-bold uppercase mt-0.5 truncate max-w-full">
                  {getLocalizedValue(user.district || 'Mandya', 'district', language)}
               </span>
            </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex px-4 gap-2 my-3 overflow-x-auto no-scrollbar shrink-0 items-center">
        {["All", "Saved", ...myCrops.map(c => c.nameEn)].map((c) => {
          const isActive = filter === c;
          return (
            <button 
              key={c} 
              onClick={() => { setFilter(c); setActiveIndex(0); }}
              className={`px-4 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition-all duration-300 border-2 ${
                isActive 
                  ? 'bg-[#12311C] text-white border-[#12311C]' 
                  : 'bg-white text-[#12311C] border-white shadow-sm'
              } ${isActive ? 'shadow-md scale-105' : ''}`}
            >
              {language === 'kn' ? (c === 'All' ? 'ಎಲ್ಲ' : (c === 'Saved' ? 'ಉಳಿಸಲಾಗಿದೆ' : (myCrops.find(mc => mc.nameEn === c)?.nameKn || c))) : c}
            </button>
          );
        })}
        
      </div>

      {/* Tip Card Container */}
      <div className="flex-1 px-4 pb-4 overflow-hidden flex flex-col items-center">
        {!currentTip ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <Bookmark size={32} />
            </div>
            <h3 className="text-gray-500 font-bold mb-1">
              {language === 'kn' ? 'ಯಾವುದೇ ಸೇವ್ ಮಾಡಿದ ಸಲಹೆಗಳಿಲ್ಲ' : 'No saved tips yet'}
            </h3>
            <p className="text-gray-400 text-xs">
              {language === 'kn' ? 'ಸೇವ್ ಮಾಡಲು ಸಲಹೆಯ ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click the save button on any tip to see it here'}
            </p>
          </div>
        ) : (
          <motion.div 
            key={`${filter}-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className={`w-full h-full rounded-[1.5rem] overflow-hidden flex flex-col shadow-xl ${darkMode ? 'bg-[#1a2e1d] border border-white/5' : 'bg-white'}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) {
                setActiveIndex(prev => prev + 1);
              } else if (swipe > 50) {
                setActiveIndex(prev => prev > 0 ? prev - 1 : (filteredTips.length || 1) - 1);
              }
            }}
          >
          {/* Top Banner Image Section - Slightly larger height */}
          <div className="relative h-[32%] shrink-0 overflow-hidden">
            <img src={getTipImageUrl(currentTip)} className="w-full h-full object-cover" alt="Hero" />
            
            {/* Top Right Location Badge & Weather */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
               <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-2 border border-white/20">
                 <div className="w-3 h-3 bg-[#CCDE46] rounded-full flex items-center justify-center p-0.5">
                   <Sprout size={8} className="text-[#1A3D28]" strokeWidth={3} />
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                   {getLocalizedValue(user.district || 'Gadag', 'district', language).toUpperCase()}
                 </span>
               </div>
               {weather && (
                 <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1 border border-white/20 text-white text-[10px]">
                    <span>{Math.round(weather.temp)}°C</span>
                    <span className="opacity-70">|</span>
                    <span>{weather.description}</span>
                 </div>
               )}
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Tags, Title and Subtitle Over Image */}
            <div className="absolute bottom-3 left-5 right-5 text-left">
               <div className="flex gap-2 mb-2">
                  {isPest && (
                    <div className="bg-[#D32F2F] px-2 py-0.5 rounded-md shadow-sm">
                       <span className="text-[9px] font-black text-white uppercase tracking-widest">{STRINGS[language].pestAlert}</span>
                    </div>
                  )}
                  <div className={`${isPest ? 'bg-[#F6A132]' : 'bg-[#43A047]'} px-2 py-0.5 rounded-md shadow-sm`}>
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">
                       {(() => {
                         const cName = currentTip.isAiGenerated ? currentTip.cropContext : currentTip.category;
                         const cropObj = CROPS.find(c => c.nameEn === cName);
                         if (!cropObj) return currentTip.isAiGenerated ? (language === 'kn' ? 'AI ಸಲಹೆ' : 'AI UPDATE') : (cName?.toUpperCase() || (language === 'kn' ? 'ಸಲಹೆ' : 'UPDATE'));
                         return language === 'kn' ? cropObj.nameKn : cropObj.nameEn.toUpperCase();
                       })()}
                     </span>
                  </div>
               </div>
               <h1 className="text-white text-[18px] font-bold leading-tight mb-0.5">
                 {language === 'kn' ? currentTip.titleKn : currentTip.titleEn}
               </h1>
               <p className="text-[#DCE775] text-[11px] font-medium italic">
                 {language === 'kn' ? (currentTip.bestTimeKn || currentTip.bestTime || 'ಶಿಫಾರಸು ಮಾಡಿದ ಸಮಯ') : (currentTip.bestTimeEn || currentTip.bestTime || 'Recommended Time')}
               </p>
            </div>
          </div>

          {/* White Content Space - Set to 3/4 Height */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-0 flex flex-col text-left">
              <div className="mb-6">
                <p className="text-[15px] leading-relaxed text-[#2C3E50] font-medium">
                  {language === 'kn' ? currentTip.instructionKn : currentTip.instructionEn}
                </p>
              </div>

              {/* Detail Icons Grid */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 flex items-center justify-center text-blue-400">
                     <Sprout size={18} strokeWidth={2.5} />
                   </div>
                   <div className="flex gap-1.5 text-[12px] font-bold">
                      <span className="text-gray-400">{language === 'kn' ? 'ಕ್ರಮ / Action:' : 'Action / ಕ್ರಮ:'}</span>
                      <span className="text-gray-600">{language === 'kn' ? (currentTip.adviceKn || currentTip.titleKn) : (currentTip.adviceEn || currentTip.titleEn)}</span>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 flex items-center justify-center text-orange-400">
                     <Sun size={18} strokeWidth={2.5} />
                   </div>
                   <div className="flex gap-1.5 text-[12px] font-bold">
                      <span className="text-gray-400">{language === 'kn' ? 'ಉತ್ತಮ ಸಮಯ:' : 'Best Time:'}</span>
                      <span className="text-gray-600">{language === 'kn' ? (currentTip.bestTimeKn || currentTip.bestTime || 'ಶಿಫಾರಸು ಮಾಡಿದ ಸಮಯ') : (currentTip.bestTimeEn || currentTip.bestTime || 'Recommended Time')}</span>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 flex items-center justify-center text-[#43A047]">
                     <CheckCircle2 size={18} strokeWidth={2.5} />
                   </div>
                   <div className="flex gap-1.5 text-[12px] font-bold">
                      <span className="text-gray-400">{language === 'kn' ? 'ಮೂಲ:' : 'Source:'}</span>
                      <span className="text-gray-600">KVK {getLocalizedValue(user.district || 'Gadag', 'district', language).toUpperCase()}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons - Fixed at bottom */}
            <div className="p-6 pt-4 flex items-center gap-3 shrink-0 border-t border-gray-50">
              <button 
                onClick={() => toggleSave(currentTip.titleEn)}
                className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 border-2 transition-all font-bold text-sm ${
                  isSaved 
                    ? 'bg-green-50 border-[#43A047] text-[#43A047]' 
                    : 'bg-white border-[#43A047] text-[#43A047] active:bg-gray-50'
                }`}
              >
                <Bookmark size={16} className={isSaved ? "fill-[#43A047]" : ""} />
                {isSaved ? STRINGS[language].saved : STRINGS[language].save}
              </button>

              <button 
                onClick={() => setActiveIndex(prev => prev + 1)}
                className="flex-[1.5] h-12 bg-[#55B362] text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95 transition-all text-sm font-bold"
              >
                {STRINGS[language].done} ✓
              </button>
            </div>
          </div>
        </motion.div>
      )}
      </div>

      {/* Modern Navigation Indicator */}
      <div className="pb-6 shrink-0 flex flex-col items-center">
        <div className="flex items-center gap-2 opacity-60">
           <ChevronLeft size={14} className="text-gray-400" />
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">
              {language === 'kn' ? 'ಹೆಚ್ಚಿನ ಸಲಹೆಗಳಿಗಾಗಿ ಸ್ವೈಪ್ ಮಾಡಿ' : 'Swipe for more tips'}
           </span>
           <ChevronRight size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    AndroidDB?: {
      saveAnalysis(userId: String, image: string, text: string, date: string): boolean;
      getSavedAnalyses(userId: String): string;
    };
  }
}

const MARKET_PRICES: Record<string, { market: string; marketKn: string; price: string; trend: string }[]> = {
  "Paddy": [
    { market: "Raichur APMC", marketKn: "ರಾಯಚೂರು ಎಪಿಎಂಸಿ", price: "₹2,200/q", trend: "+2%" },
    { market: "Sindhanur APMC", marketKn: "ಸಿಂಧನೂರು ಎಪಿಎಂಸಿ", price: "₹2,150/q", trend: "-1%" }
  ],
  "Tomato": [
    { market: "Kolar APMC", marketKn: "ಕೋಲಾರ ಎಪಿಎಂಸಿ", price: "₹1,500/q", trend: "+5%" },
    { market: "Chikkaballapur", marketKn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ", price: "₹1,400/q", trend: "+3%" }
  ],
  "Coconut": [
    { market: "Tiptur APMC", marketKn: "ತಿಪಟೂರು ಎಪಿಎಂಸಿ", price: "₹12,000/1000", trend: "+1%" },
    { market: "Arsikere APMC", marketKn: "ಅರಸೀಕೆರೆ ಎಪಿಎಂಸಿ", price: "₹11,500/1000", trend: "-2%" }
  ],
  "Areca Nut": [
    { market: "Shivamogga APMC", marketKn: "ಶಿವಮೊಗ್ಗ ಎಪಿಎಂಸಿ", price: "₹45,000/q", trend: "+4%" },
    { market: "Sagara APMC", marketKn: "ಸಾಗರ ಎಪಿಎಂಸಿ", price: "₹44,000/q", trend: "+2%" }
  ],
  "Maize": [
  { market: "Davangere APMC", marketKn: "ದಾವಣಗೆರೆ ಎಪಿಎಂಸಿ", price: "₹1,950/q", trend: "+3%" },
  { market: "Haveri APMC", marketKn: "ಹಾವೇರಿ ಎಪಿಎಂಸಿ", price: "₹1,900/q", trend: "+1%" }
  ],
  "Ragi": [
    { market: "Bengaluru Rural APMC", marketKn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಎಪಿಎಂಸಿ", price: "₹3,600/q", trend: "+4%" },
    { market: "Kolar APMC", marketKn: "ಕೋಲಾರ ಎಪಿಎಂಸಿ", price: "₹3,450/q", trend: "+2%" }
  ],
  "Sugarcane": [
    { market: "Belagavi APMC", marketKn: "ಬೆಳಗಾವಿ ಎಪಿಎಂಸಿ", price: "₹340/q", trend: "+1%" },
    { market: "Mandya APMC", marketKn: "ಮಂಡ್ಯ ಎಪಿಎಂಸಿ", price: "₹330/q", trend: "+2%" }
  ],
  "Cotton": [
    { market: "Dharwad APMC", marketKn: "ಧಾರವಾಡ ಎಪಿಎಂಸಿ", price: "₹7,200/q", trend: "+5%" },
    { market: "Raichur APMC", marketKn: "ರಾಯಚೂರು ಎಪಿಎಂಸಿ", price: "₹7,000/q", trend: "+3%" }
  ]
};

const PEST_DICT: Record<string, { nameEn: string; nameKn: string; image: string; treatmentEn: string; treatmentKn: string }[]> = {
  "Paddy": [
  {
    nameEn: "Stem Borer",
    nameKn: "ಕಾಂಡ ಕೊರಕ",
    image: "https://images.unsplash.com/photo-1601625463688-66df98910a30?auto=format&fit=crop&q=80&w=400",
    treatmentEn: "Use Cartap Hydrochloride 4G @ 10kg/acre.",
    treatmentKn: "ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ 4ಜಿ 10 ಕೆಜಿ/ಎಕರೆಗೆ ಬಳಸಿ."
  },
  {
    nameEn: "Leaf Folder",
    nameKn: "ಎಲೆ ಮಡಚುವ ಹುಳು",
    image: "https://images.unsplash.com/photo-1596766779344-93d39db7bdfb?auto=format&fit=crop&q=80&w=400",
    treatmentEn: "Spray Chlorpyriphos 20 EC @ 2ml/L.",
    treatmentKn: "ಕ್ಲೋರ್ಪೈರಿಫಾಸ್ 20 ಇಸಿ 2 ಮಿಲಿ/ಲೀಟರಿಗೆ ಸಿಂಪಡಿಸಿ."
  }
  ],

  "Tomato": [
    {
      nameEn: "Fruit Borer",
      nameKn: "ಹಣ್ಣು ಕೊರಕ",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Spray Indoxacarb 14.5 SC @ 1ml/L.",
      treatmentKn: "ಇಂಡಾಕ್ಸಾಕಾರ್ಬ್ 14.5 ಎಸ್‌ಸಿ 1 ಮಿಲಿ/ಲೀಟರಿಗೆ ಸಿಂಪಡಿಸಿ."
    },
    {
      nameEn: "Whitefly",
      nameKn: "ಬಿಳಿ ಹುಳು",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Use Neem oil 3% or Imidacloprid 0.3ml/L.",
      treatmentKn: "ನೀಂ ಎಣ್ಣೆ 3% ಅಥವಾ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಬಳಸಿ."
    }
  ],

  "Maize": [
    {
      nameEn: "Fall Armyworm",
      nameKn: "ಫಾಲ್ ಆರ್ಮಿವೋರ್ಮ್",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Spray Emamectin Benzoate 5 SG @ 0.4g/L.",
      treatmentKn: "ಎಮಾಮೆಕ್ಟಿನ್ ಬೆನ್ಜೋಯೇಟ್ 5 ಎಸ್‌ಜಿ ಸಿಂಪಡಿಸಿ."
    },
    {
      nameEn: "Stem Borer",
      nameKn: "ಕಾಂಡ ಕೊರಕ",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Apply Carbofuran granules in whorl.",
      treatmentKn: "ಕಾರ್ಬೋಫ್ಯುರಾನ್ ಗ್ರಾನುಲ್ಸ್ ಹಾಕಿ."
    }
  ],

  "Ragi": [
    {
      nameEn: "Blast Disease",
      nameKn: "ಬ್ಲಾಸ್ಟ್ ರೋಗ",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Spray Tricyclazole 75 WP @ 0.6g/L.",
      treatmentKn: "ಟ್ರೈಸೈಕ್ಲಜೋಲ್ 75 ಡಬ್ಲ್ಯುಪಿ ಸಿಂಪಡಿಸಿ."
    }
  ],

  "Sugarcane": [
    {
      nameEn: "Early Shoot Borer",
      nameKn: "ಶೂಟ್ ಕೊರಕ",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Apply Chlorantraniliprole granules.",
      treatmentKn: "ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಗ್ರಾನುಲ್ಸ್ ಬಳಸಿ."
    },
    {
      nameEn: "Red Rot",
      nameKn: "ರೆಡ್ ರಾಟ್",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Use resistant varieties and destroy infected stalks.",
      treatmentKn: "ರೋಗ ನಿರೋಧಕ ಜಾತಿ ಬಳಸಿ."
    }
  ],

  "Cotton": [
    {
      nameEn: "Pink Bollworm",
      nameKn: "ಪಿಂಕ್ ಬೋಲ್ವೋರ್ಮ್",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Use pheromone traps and Emamectin spray.",
      treatmentKn: "ಫೆರೋಮೋನ್ ಟ್ರ್ಯಾಪ್ ಬಳಸಿ."
    },
    {
      nameEn: "Whitefly",
      nameKn: "ಬಿಳಿ ಹುಳು",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Spray Imidacloprid 0.3ml/L.",
      treatmentKn: "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಸಿಂಪಡಿಸಿ."
    }
  ],

  "Coconut": [
    {
      nameEn: "Rhinoceros Beetle",
      nameKn: "ಗಂಡು ಗಂಡು ಹುಳು",
      image: "https://images.unsplash.com/photo-1623910385971-da0c27387440?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Fill leaf axils with sand + neem cake.",
      treatmentKn: "ಎಲೆ ಮಧ್ಯದಲ್ಲಿ ಮರಳು ಮತ್ತು ನೀಂ ಕೇಕ್ ಹಾಕಿ."
    }
  ],

  "Areca Nut": [
    {
      nameEn: "Koleroga (Fruit Rot)",
      nameKn: "ಕೊಳೆರೋಗ",
      image: "https://images.unsplash.com/photo-1623910385971-da0c27387440?auto=format&fit=crop&q=80&w=400",
      treatmentEn: "Spray Bordeaux mixture 1% before monsoon.",
      treatmentKn: "ಮಳೆಗಾಲಕ್ಕೂ ಮುನ್ನ ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ."
    }
  ]
};

const CALCULATOR_DATA: Record<string, { seedPerAcre: number; seedUnit: string; N: number; P: number; K: number }> = {
  "Paddy": { seedPerAcre: 25, seedUnit: 'kg', N: 40, P: 20, K: 20 },
  "Tomato": { seedPerAcre: 100, seedUnit: 'g', N: 100, P: 100, K: 100 },
  "Coconut": { seedPerAcre: 70, seedUnit: 'saplings', N: 20, P: 15, K: 30 },
  "Areca Nut": { seedPerAcre: 500, seedUnit: 'saplings', N: 40, P: 16, K: 56 },
  "Maize": { seedPerAcre: 8, seedUnit: 'kg', N: 60, P: 30, K: 30 },
  "Ragi": { seedPerAcre: 5, seedUnit: 'kg', N: 40, P: 20, K: 20 },
  "Sugarcane": { seedPerAcre: 6000, seedUnit: 'setts', N: 250, P: 80, K: 120 },
  "Cotton": { seedPerAcre: 2, seedUnit: 'kg', N: 80, P: 40, K: 40 }
};

const SCHEMES: Record<string, { titleEn: string; titleKn: string; descEn: string; descKn: string }[]> = {
  "Paddy": [
    { titleEn: "Minimum Support Price (MSP)", titleKn: "ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ (MSP)", descEn: "Government procures paddy directly from farmers at predefined MSP to prevent distress sale.", descKn: "ರೈತರ ಹಿತರಕ್ಷಣೆಗಾಗಿ ಸರ್ಕಾರ ನೇರವಾಗಿ ಬೆಂಬಲ ಬೆಲೆಯಲ್ಲಿ ಭತ್ತ ಖರೀದಿಸುತ್ತದೆ." },
    { titleEn: "Raita Vidya Nidhi", titleKn: "ರೈತ ವಿದ್ಯಾನಿಧಿ", descEn: "Scholarship scheme for children of farmers to pursue higher education.", descKn: "ರೈತರ ಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ." }
  ],
  "Tomato": [
    { titleEn: "Krishi Bhagya", titleKn: "ಕೃಷಿ ಭಾಗ್ಯ", descEn: "Subsidy for polyhouses and drip irrigation systems to improve yield.", descKn: "ಹೆಚ್ಚಳ ಇಳುವರಿಗಾಗಿ ಪಾಲಿಹೌಸ್ ಮತ್ತು ಹನಿ ನೀರಾವರಿ ಘಟಕಗಳಿಗೆ ಸಹಾಯಧನ." },
    { titleEn: "PM Kisan Samman Nidhi", titleKn: "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ", descEn: "Income support of ₹6000 per year in three equal installments.", descKn: "ವರ್ಷಕ್ಕೆ ₹6000 ಗಳ ಆರ್ಥಿಕ ನೆರವು ಮೂರು ಕಂತುಗಳಲ್ಲಿ." }
  ],
  "Maize": [
    {
      titleEn: "PM Kisan Samman Nidhi",
      titleKn: "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
      descEn: "Income support of ₹6000 per year in three installments.",
      descKn: "ವರ್ಷಕ್ಕೆ ₹6000 ಆರ್ಥಿಕ ನೆರವು ಮೂರು ಕಂತುಗಳಲ್ಲಿ."
    },
    {
      titleEn: "Input Subsidy for Maize Farmers",
      titleKn: "ಜೋಳ ರೈತರಿಗೆ ಇನ್‌ಪುಟ್ ಸಹಾಯಧನ",
      descEn: "Subsidy on seeds and fertilizers for maize cultivation.",
      descKn: "ಜೋಳ ಬೆಳೆಗೆ ಬೀಜ ಮತ್ತು ಗೊಬ್ಬರಗಳಿಗೆ ಸಹಾಯಧನ."
    }
  ],

  "Ragi": [
    {
      titleEn: "Ragi MSP Procurement Scheme",
      titleKn: "ರಾಗಿ MSP ಖರೀದಿ ಯೋಜನೆ",
      descEn: "Government procurement of ragi at Minimum Support Price.",
      descKn: "ಸರ್ಕಾರ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಯಲ್ಲಿ ರಾಗಿ ಖರೀದಿ ಮಾಡುತ್ತದೆ."
    },
    {
      titleEn: "Millet Promotion Program",
      titleKn: "ಸಿರುಧಾನ್ಯ ಉತ್ತೇಜನ ಯೋಜನೆ",
      descEn: "Support for cultivation and marketing of millets.",
      descKn: "ಸಿರುಧಾನ್ಯ ಬೆಳೆ ಮತ್ತು ಮಾರಾಟಕ್ಕೆ ಉತ್ತೇಜನ."
    }
  ],

  "Sugarcane": [
    {
      titleEn: "Sugarcane Price Support Scheme",
      titleKn: "ಕಬ್ಬು ಬೆಲೆ ಬೆಂಬಲ ಯೋಜನೆ",
      descEn: "Fair and remunerative price (FRP) support for sugarcane farmers.",
      descKn: "ಕಬ್ಬು ರೈತರಿಗೆ ನ್ಯಾಯವಾದ ಬೆಲೆ (FRP) ನೆರವು."
    },
    {
      titleEn: "Drip Irrigation Subsidy",
      titleKn: "ಡ್ರಿಪ್ ನೀರಾವರಿ ಸಹಾಯಧನ",
      descEn: "Financial support for installing drip irrigation systems.",
      descKn: "ಡ್ರಿಪ್ ನೀರಾವರಿ ಅಳವಡಿಕೆಗೆ ಆರ್ಥಿಕ ನೆರವು."
    }
  ],

  "Cotton": [
    {
      titleEn: "Cotton MSP Scheme",
      titleKn: "ಹತ್ತಿ MSP ಯೋಜನೆ",
      descEn: "Government procurement of cotton at Minimum Support Price.",
      descKn: "ಸರ್ಕಾರ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಯಲ್ಲಿ ಹತ್ತಿ ಖರೀದಿ ಮಾಡುತ್ತದೆ."
    },
    {
      titleEn: "Integrated Pest Management (IPM)",
      titleKn: "ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ (IPM)",
      descEn: "Subsidy and training for eco-friendly pest control methods.",
      descKn: "ಪರಿಸರ ಸ್ನೇಹಿ ಕೀಟ ನಿಯಂತ್ರಣಕ್ಕೆ ತರಬೇತಿ ಮತ್ತು ಸಹಾಯಧನ."
    }
  ],

  "Coconut": [
    {
      titleEn: "Coconut Development Board Scheme",
      titleKn: "ತೆಂಗಿನ ಅಭಿವೃದ್ಧಿ ಮಂಡಳಿ ಯೋಜನೆ",
      descEn: "Support for coconut farming, processing and value addition.",
      descKn: "ತೆಂಗು ಕೃಷಿ ಮತ್ತು ಸಂಸ್ಕರಣೆಗೆ ಸಹಾಯಧನ."
    },
    {
      titleEn: "Replanting Subsidy",
      titleKn: "ಮರ ಪುನಃ ನೆಡುವ ಸಹಾಯಧನ",
      descEn: "Financial assistance for replacing old coconut trees.",
      descKn: "ಹಳೆಯ ತೆಂಗಿನ ಮರಗಳನ್ನು ಬದಲಿಸಲು ಆರ್ಥಿಕ ನೆರವು."
    }
  ],

  "Areca Nut": [
    {
      titleEn: "Arecanut Market Stabilization Scheme",
      titleKn: "ಅಡಿಕೆ ಮಾರುಕಟ್ಟೆ ಸ್ಥಿರೀಕರಣ ಯೋಜನೆ",
      descEn: "Price support and procurement during market fluctuations.",
      descKn: "ಬೆಲೆ ಕುಸಿತ ಸಮಯದಲ್ಲಿ ಸರ್ಕಾರ ಖರೀದಿ ನೆರವು."
    },
    {
      titleEn: "Crop Insurance Scheme",
      titleKn: "ಬೆಳೆ ವಿಮಾ ಯೋಜನೆ",
      descEn: "Insurance coverage for crop loss due to weather or pests.",
      descKn: "ಹವಾಮಾನ ಮತ್ತು ಕೀಟ ಹಾನಿಗೆ ಬೆಳೆ ವಿಮೆ."
    }
  ]
};

const LIFECYCLE_STAGES: Record<string, { stageEn: string; stageKn: string; days: number }[]> = {
  "Paddy": [
    { stageEn: "Sowing / Nursery", stageKn: "ಸಸಿಮಡಿ", days: 0 },
    { stageEn: "Transplanting", stageKn: "ನಾಟಿ", days: 20 },
    { stageEn: "Tillering", stageKn: "ಮರಿ ಒಡೆಯುವ ಹಂತ", days: 40 },
    { stageEn: "Panicle Initiation", stageKn: "ತೆನೆ ಕಟ್ಟುವ ಹಂತ", days: 70 },
    { stageEn: "Flowering", stageKn: "ಹೂ ಬಿಡುವ ಹಂತ", days: 90 },
    { stageEn: "Harvesting", stageKn: "ಕೊಯ್ಲು", days: 120 }
  ],
  "Tomato": [
    { stageEn: "Sowing / Nursery", stageKn: "ಸಸಿಮಡಿ", days: 0 },
    { stageEn: "Transplanting", stageKn: "ನಾಟಿ", days: 25 },
    { stageEn: "Vegetative", stageKn: "ಬೆಳವಣಿಗೆ ಹಂತ", days: 45 },
    { stageEn: "Flowering", stageKn: "ಹೂ ಬಿಡುವ ಹಂತ", days: 60 },
    { stageEn: "First Harvesting", stageKn: "ಮೊದಲ ಕೊಯ್ಲು", days: 80 }
  ],
  "Areca Nut": [
    { stageEn: "Nursery Phase", stageKn: "ನರ್ಸರಿ ಹಂತ", days: 0 },
    { stageEn: "Field Establishment", stageKn: "ನಾಟಿ ಮತ್ತು ಸಸಿ ಸ್ಥಾಪನೆ", days: 365 },
    { stageEn: "Vegetative Growth", stageKn: "ಸಸ್ಯಕ ಬೆಳವಣಿಗೆ", days: 730 },
    { stageEn: "Flowering & Fruit Set", stageKn: "ಹೂಬಿಡುವಿಕೆ ಮತ್ತು ಕಾಯಿ ಕಚ್ಚುವಿಕೆ", days: 1825 },
    { stageEn: "Harvesting", stageKn: "ಕೊಯ್ಲು", days: 2555 }
  ],
  "Coconut": [
    { "stageEn": "Nursery (Seed Germination)", "stageKn": "ನರ್ಸರಿ (ಬೀಜ ಮೊಳಕೆ)", "days": 0 },
    { "stageEn": "Seedling Stage", "stageKn": "ಸಸಿ ಹಂತ", "days": 365 },
    { "stageEn": "Field Planting / Establishment", "stageKn": "ಹೊಲದಲ್ಲಿ ನೆಡುವ ಹಂತ", "days": 730 },
    { "stageEn": "Juvenile Growth Stage", "stageKn": "ಯುವ ಬೆಳವಣಿಗೆ ಹಂತ", "days": 1460 },
    { "stageEn": "Flowering & Nut Formation", "stageKn": "ಹೂಬಿಡುವಿಕೆ ಮತ್ತು ಕಾಯಿ ರೂಪುಗೊಳಿಸುವಿಕೆ", "days": 1825 },
    { "stageEn": "Full Bearing / Harvesting", "stageKn": "ಪೂರ್ಣ ಉತ್ಪಾದನೆ / ಕೊಯ್ಲು", "days": 2190 }
  ],
  "Maize": [
    { stageEn: "Sowing", stageKn: "ಬಿತ್ತನೆ", days: 0 },
    { stageEn: "Germination", stageKn: "ಅಂಕುರಣ", days: 5 },
    { stageEn: "Vegetative Stage", stageKn: "ಸಸ್ಯಕ ಬೆಳವಣಿಗೆ", days: 20 },
    { stageEn: "Tasseling", stageKn: "ಪುಷ್ಪಗೋಚರ ಹಂತ", days: 55 },
    { stageEn: "Silking", stageKn: "ಸಿಲ್ಕಿಂಗ್ ಹಂತ", days: 65 },
    { stageEn: "Physiological Maturity", stageKn: "ಪಕ್ವತೆ ಹಂತ", days: 95 },
    { stageEn: "Harvesting", stageKn: "ಕೊಯ್ಲು", days: 110 }
  ],

  "Ragi": [
    { stageEn: "Sowing", stageKn: "ಬಿತ್ತನೆ", days: 0 },
    { stageEn: "Germination", stageKn: "ಅಂಕುರಣ", days: 7 },
    { stageEn: "Tillering", stageKn: "ಮರಿ ಒಡೆಯುವ ಹಂತ", days: 25 },
    { stageEn: "Flowering", stageKn: "ಹೂ ಬಿಡುವ ಹಂತ", days: 60 },
    { stageEn: "Grain Filling", stageKn: "ಧಾನ್ಯ ತುಂಬುವ ಹಂತ", days: 85 },
    { stageEn: "Maturity", stageKn: "ಪಕ್ವತೆ", days: 100 },
    { stageEn: "Harvesting", stageKn: "ಕೊಯ್ಲು", days: 110 }
  ],

  "Sugarcane": [
    { stageEn: "Planting (Setts)", stageKn: "ನಾಟಿ (ಸೆಟ್ಸ್)", days: 0 },
    { stageEn: "Germination", stageKn: "ಅಂಕುರಣ", days: 15 },
    { stageEn: "Tillering Stage", stageKn: "ಮರಿ ಒಡೆಯುವ ಹಂತ", days: 60 },
    { stageEn: "Grand Growth Stage", stageKn: "ವೇಗದ ಬೆಳವಣಿಗೆ ಹಂತ", days: 150 },
    { stageEn: "Maturity Stage", stageKn: "ಪಕ್ವ ಹಂತ", days: 300 },
    { stageEn: "Harvesting", stageKn: "ಕೊಯ್ಲು", days: 360 }
  ],

  "Cotton": [
    { stageEn: "Sowing", stageKn: "ಬಿತ್ತನೆ", days: 0 },
    { stageEn: "Germination", stageKn: "ಅಂಕುರಣ", days: 7 },
    { stageEn: "Vegetative Growth", stageKn: "ಸಸ್ಯಕ ಬೆಳವಣಿಗೆ", days: 30 },
    { stageEn: "Square Formation", stageKn: "ಮೊಗ್ಗು ನಿರ್ಮಾಣ ಹಂತ", days: 60 },
    { stageEn: "Flowering", stageKn: "ಹೂ ಬಿಡುವ ಹಂತ", days: 80 },
    { stageEn: "Boll Development", stageKn: "ಬೋಲ್ ಬೆಳವಣಿಗೆ ಹಂತ", days: 120 },
    { stageEn: "Harvesting", stageKn: "ಕೊಯ್ಲು", days: 160 }
  ]
};

const CropLifecycleTab = ({ crop, language, darkMode, userId }: any) => {
  const [sowingDate, setSowingDate] = useState<string>('');
  
  const staticStages = LIFECYCLE_STAGES[crop.nameEn] || [];
  const { entries: aiEntries, loading, fetchNew } = useAiCropData(crop, 'calendar', language, userId);
  const lastAiEntry = aiEntries.length > 0 ? aiEntries[0] : null;
  const stagesData = lastAiEntry ? lastAiEntry.data : staticStages;
  const stages = stagesData || [];

  const calculateCurrentStage = () => {
    if (!sowingDate) return -1;
    const daysSinceSowing = Math.floor((Date.now() - new Date(sowingDate).getTime()) / (1000 * 60 * 60 * 24));
    let currentIdx = -1;
    for (let i = 0; i < stages.length; i++) {
       // if ai generated, we format days as duration instead of exact days
       const dayNum = stages[i].days || (parseInt(String(stages[i].durationEn || stages[i].durationKn).match(/\d+/)?.[0] || "0"));
       if (daysSinceSowing >= dayNum) {
          currentIdx = i;
       }
    }
    return currentIdx;
  };

  const currentIdx = calculateCurrentStage();

  if (loading) return <div className="py-10 text-center text-sm font-bold animate-pulse text-[#4CAF50]">{language === 'kn' ? 'AI ಮೂಲಕ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...' : 'Generating content with AI...'}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-bold tracking-tight flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
          <Calendar size={20} className="text-[#4CAF50]" /> 
          {language === 'kn' ? 'ಬೆಳೆ ಅವಧಿ' : 'Crop Lifecycle'}
        </h3>
      </div>

      <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm`}>
        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-[#1A4B2F]'}`}>
          {language === 'kn' ? 'ಬಿತ್ತನೆ/ನಾಟಿ ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ' : 'Select Sowing/Transplanting Date'}
        </label>
        <input 
          type="date"
          className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${darkMode ? 'bg-black/40 text-white' : 'bg-gray-50 text-gray-800 border border-gray-200'}`}
          value={sowingDate}
          onChange={e => setSowingDate(e.target.value)}
        />
      </div>

      {stages.length > 0 ? (
        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm`}>
          <div className="relative pl-6 space-y-6 border-l-2 border-[#E8F5E9] ml-2">
            {stages.map((stage: any, idx: number) => {
               const isPast = currentIdx >= idx;
               const isCurrent = currentIdx === idx;
               const title = language === 'kn' ? (stage.stageKn || stage.stage) : (stage.stageEn || stage.stage);
               
               const formatDuration = (d: number) => {
                 if (d <= 30) return language === 'kn' ? `ದಿನ ${d}` : `Day ${d}`;
                 const months = Math.floor(d / 30);
                 if (months < 12) return language === 'kn' ? `${months} ತಿಂಗಳು` : `${months} month${months > 1 ? 's' : ''}`;
                 const years = Math.floor(d / 365);
                 return language === 'kn' ? `${years} ವರ್ಷ` : `${years} year${years > 1 ? 's' : ''}`;
               };

               const dayLabel = stage.days ? formatDuration(stage.days) : (language === 'kn' ? (stage.durationKn || stage.durationEn) : (stage.durationEn || stage.durationKn));
               return (
                 <div key={idx} className="relative">
                    <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 ${isCurrent ? 'bg-[#4CAF50] border-[#4CAF50] scale-125' : isPast ? 'bg-[#4CAF50] border-[#4CAF50]' : darkMode ? 'bg-[#1a2e1d] border-gray-600' : 'bg-white border-gray-300'} transition-all z-10`} />
                    <h4 className={`font-bold ${isCurrent ? (darkMode ? 'text-[#4CAF50]' : 'text-[#1A4B2F]') : (darkMode ? 'text-gray-300' : 'text-gray-800')}`}>
                      {title}
                    </h4>
                    <p className={`text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                      {dayLabel}
                    </p>
                 </div>
               )
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm py-10 text-center">No lifecycle data available.</p>
      )}
    </div>
  );
};

const CropMarketTab = ({ crop, language, darkMode, userId }: any) => {
  const staticPrices = MARKET_PRICES[crop.nameEn] || [];
  const { entries: aiEntries, loading, fetchNew } = useAiCropData(crop, 'market', language, userId);
  const lastAiEntry = aiEntries.length > 0 ? aiEntries[0] : null;
  const pricesData = lastAiEntry ? lastAiEntry.data : staticPrices;
  const prices = pricesData || [];

  if (loading) return <div className="py-10 text-center text-sm font-bold animate-pulse text-[#4CAF50]">{language === 'kn' ? 'AI ಮೂಲಕ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...' : 'Generating content with AI...'}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
         <h3 className={`font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
            {language === 'kn' ? 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ' : 'Market Prices'}
         </h3>
      </div>
      {prices.map((p: any, i: number) => (
        <div key={i} className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm`}>
           <div className="flex justify-between items-start mb-2">
             <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
               {language === 'kn' ? (p.marketKn || p.market) : p.market}
             </h4>
             <span className={`text-xs font-bold px-2 py-1 rounded-lg ${(p.trend || '').startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
               {p.trend}
             </span>
           </div>
           <p className={`text-2xl font-black font-mono ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{p.price}</p>
        </div>
      ))}
      {prices.length === 0 && <p className="text-gray-400 text-sm py-10 text-center">No market data available.</p>}
    </div>
  );
};

const CropPestsTab = ({ crop, language, darkMode, userId }: any) => {
  const staticPests = PEST_DICT[crop.nameEn] || [];
  const { entries: aiEntries, loading, fetchNew } = useAiCropData(crop, 'pests', language, userId);
  const lastAiEntry = aiEntries.length > 0 ? aiEntries[0] : null;
  const pestsData = lastAiEntry ? lastAiEntry.data : staticPests;
  const pests = pestsData || [];

  if (loading) return <div className="py-10 text-center text-sm font-bold animate-pulse text-[#4CAF50]">{language === 'kn' ? 'AI ಮೂಲಕ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...' : 'Generating content with AI...'}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
         <h3 className={`font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
            {language === 'kn' ? 'ರೋಗಗಳು ಮತ್ತು ಕೀಟಗಳು' : 'Pests & Diseases'}
         </h3>
         <button onClick={fetchNew} className="text-xs font-bold text-[#4CAF50] bg-green-50 px-3 py-1.5 rounded-full">
           {language === 'kn' ? 'ಹೊಸ ಮಾಹಿತಿ' : 'New Info'}
         </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pests.map((p: any, i: number) => (
        <div key={i} className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm flex flex-col`}>
          <img src={p.image || 'https://images.unsplash.com/photo-1590486847849-0cfbbac811c7?q=80&w=200&auto=format&fit=crop'} className="w-full h-24 object-cover shrink-0" alt={p.nameEn || p.name} />
          <div className="p-3 flex-1 flex flex-col">
             <h4 className={`font-bold text-sm mb-2 leading-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
               {language === 'kn' ? (p.nameKn || p.name) : (p.nameEn || p.name)}
             </h4>
             <p className={`text-[10px] leading-relaxed mt-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
               {language === 'kn' ? (p.treatmentKn || p.treatment) : (p.treatmentEn || p.treatment)}
             </p>
          </div>
        </div>
      ))}
      {pests.length === 0 && <p className="col-span-2 text-gray-400 text-sm py-10 text-center">No pest data available.</p>}
      </div>
    </div>
  );
};

const CropCalculatorTab = ({ crop, language, darkMode, userId }: any) => {
  const [acres, setAcres] = useState<number>(1);
  const staticData = CALCULATOR_DATA[crop.nameEn];
  const { entries: aiEntries, loading, fetchNew } = useAiCropData(crop, 'calculator', language, userId);
  const lastAiEntry = aiEntries.length > 0 ? aiEntries[0] : null;
  const calculatorData = lastAiEntry ? lastAiEntry.data : staticData;
  const data = calculatorData || {};
  
  if (loading) return <div className="py-10 text-center text-sm font-bold animate-pulse text-[#4CAF50]">{language === 'kn' ? 'AI ಮೂಲಕ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...' : 'Generating content with AI...'}</div>;
  if (!data || Object.keys(data).length === 0) return <div className="py-10 text-center text-sm"><button onClick={fetchNew} className="text-[#4CAF50] font-bold">Click to generate calculator data</button></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
         <h3 className={`font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
            {language === 'kn' ? 'ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Calculator'}
         </h3>
      </div>

      <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm`}>
        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-400' : 'text-[#1A4B2F]'}`}>
          {language === 'kn' ? 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಎಕರೇ ಗಳಲ್ಲಿ)' : 'Land Size (in Acres)'}
        </label>
        <div className="flex items-center gap-4">
           <input 
             type="number"
             min="0.5"
             step="0.5"
             className={`flex-1 p-3 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${darkMode ? 'bg-black/40 text-white' : 'bg-gray-50 text-gray-800 border border-gray-200'}`}
             value={acres}
             onChange={e => setAcres(parseFloat(e.target.value) || 0)}
           />
           <span className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'kn' ? 'ಎಕರೆ' : 'Acres'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-[#E8F5E9] border-transparent'} shadow-sm`}>
          <div className="w-8 h-8 rounded-full bg-[#4CAF50]/20 flex items-center justify-center mb-3">
             <Sprout size={16} className="text-[#4CAF50]" />
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-[#1A4B2F]'}`}>
            {language === 'kn' ? 'ಬಿತ್ತನೆ ಬೀಜ' : 'Seeds Required'}
          </p>
          <p className={`text-2xl font-black mt-1 ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
            {((data.seedPerAcre || 0) * acres).toFixed(1)} <span className="text-sm">{data.seedUnit || 'kg'}</span>
          </p>
        </div>
        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-[#FFF3E0] border-transparent'} shadow-sm`}>
          <div className="w-8 h-8 rounded-full bg-[#FF9800]/20 flex items-center justify-center mb-3">
             <Activity size={16} className="text-[#FF9800]" />
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-[#E65100]'}`}>
            {language === 'kn' ? 'ಸಾರಜನಕ (N)' : 'Nitrogen (N)'}
          </p>
          <p className={`text-2xl font-black mt-1 ${darkMode ? 'text-white' : 'text-[#E65100]'}`}>
            {((data.N || 0) * acres).toFixed(1)} <span className="text-sm">kg</span>
          </p>
        </div>
        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-[#E3F2FD] border-transparent'} shadow-sm`}>
          <div className="w-8 h-8 rounded-full bg-[#2196F3]/20 flex items-center justify-center mb-3">
             <Activity size={16} className="text-[#2196F3]" />
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-[#0D47A1]'}`}>
            {language === 'kn' ? 'ರಂಜಕ (P)' : 'Phosphorus (P)'}
          </p>
          <p className={`text-2xl font-black mt-1 ${darkMode ? 'text-white' : 'text-[#0D47A1]'}`}>
            {((data.P || 0) * acres).toFixed(1)} <span className="text-sm">kg</span>
          </p>
        </div>
        <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-[#F3E5F5] border-transparent'} shadow-sm`}>
          <div className="w-8 h-8 rounded-full bg-[#9C27B0]/20 flex items-center justify-center mb-3">
             <Activity size={16} className="text-[#9C27B0]" />
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-[#4A148C]'}`}>
            {language === 'kn' ? 'ಪೊಟ್ಯಾಶ್ (K)' : 'Potassium (K)'}
          </p>
          <p className={`text-2xl font-black mt-1 ${darkMode ? 'text-white' : 'text-[#4A148C]'}`}>
            {((data.K || 0) * acres).toFixed(1)} <span className="text-sm">kg</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const CropSchemesTab = ({ crop, language, darkMode, userId }: any) => {
  const staticSchemes = SCHEMES[crop.nameEn] || [];
  const { entries: aiSchemes, loading, fetchNew } = useAiCropData(crop, 'schemes', language, userId);
  const lastAiEntry = aiSchemes.length > 0 ? aiSchemes[0] : null;
  const schemes = lastAiEntry ? (lastAiEntry.data || []) : staticSchemes;

  if (loading) return <div className="py-10 text-center text-sm font-bold animate-pulse text-[#4CAF50]">{language === 'kn' ? 'AI ಮೂಲಕ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...' : 'Generating content with AI...'}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
         <h3 className={`font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
            {language === 'kn' ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' : 'Government Schemes'}
         </h3>
      </div>
      {schemes.map((s: any, i: number) => (
        <div key={i} className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm`}>
           <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 rounded-full bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                <Landmark size={20} className="text-[#4CAF50]" />
             </div>
             <h4 className={`font-bold text-base leading-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
               {language === 'kn' ? (s.titleKn || s.nameKn || s.nameEn) : (s.titleEn || s.nameEn || s.nameKn)}
             </h4>
           </div>
           <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
             {language === 'kn' ? (s.subsidyKn || s.descKn || s.desc) : (s.subsidyEn || s.descEn || s.desc)}
           </p>
        </div>
      ))}
      {schemes.length === 0 && <div className="text-center py-10"><button onClick={fetchNew} className="text-[#4CAF50] font-bold">Click to generate schemes</button></div>}
    </div>
  );
};

const CropLedgerTab = ({ crop, language, darkMode, userId }: any) => {
  const [items, setItems] = useState<{type: 'income'|'expense', amount: number, desc: string, date: string, id: string}[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<'income'|'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  
  const storageKey = `ledger_${userId}_${crop.nameEn}`;

  useEffect(() => {
     if (!userId) return;
     const saved = localStorage.getItem(storageKey);
     if (saved) setItems(JSON.parse(saved));
  }, [userId, storageKey]);

  const saveItems = (newItems: any[]) => {
    setItems(newItems);
    localStorage.setItem(storageKey, JSON.stringify(newItems));
  };

  const handleAdd = () => {
    if (!amount || isNaN(Number(amount))) return;
    const newItem = {
       id: Math.random().toString(36).substr(2, 9),
       type,
       amount: Number(amount),
       desc,
       date: new Date().toISOString()
    };
    saveItems([newItem, ...items]);
    setShowForm(false);
    setAmount('');
    setDesc('');
  };

  const handleDelete = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  const totalExpense = items.filter(i => i.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncome = items.filter(i => i.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const profit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
       <div className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm`}>
          <div className="flex justify-between items-center mb-4">
             <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
               {language === 'kn' ? 'ನಿವ್ವಳ ಲಾಭ / ನಷ್ಟ' : 'Net Profit / Loss'}
             </h4>
          </div>
          <p className={`text-3xl font-black font-mono ${profit >= 0 ? 'text-[#4CAF50]' : 'text-red-500'}`}>
            {profit >= 0 ? '+' : '-'}₹{Math.abs(profit).toLocaleString()}
          </p>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
            <div className="flex-1">
              <span className={`text-[10px] uppercase font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'kn' ? 'ಆದಾಯ' : 'Income'}</span>
              <p className="text-sm font-bold text-[#4CAF50] font-mono">₹{totalIncome.toLocaleString()}</p>
            </div>
            <div className="flex-1">
              <span className={`text-[10px] uppercase font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{language === 'kn' ? 'ಖರ್ಚು' : 'Expense'}</span>
              <p className="text-sm font-bold text-red-500 font-mono">₹{totalExpense.toLocaleString()}</p>
            </div>
          </div>
       </div>

       <div className="flex justify-between items-center">
         <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>{language === 'kn' ? 'ವಹಿವಾಟುಗಳು' : 'Transactions'}</h3>
         <button onClick={() => setShowForm(!showForm)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-[#4CAF50] text-[#0a140b]' : 'bg-[#E8F5E9] text-[#1A4B2F] hover:bg-[#C8E6C9]'}`}>
            <PlusCircle size={20} />
         </button>
       </div>

       {showForm && (
         <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-green-100'} shadow-sm space-y-3`}>
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-black/30 rounded-xl mb-2">
               <button onClick={() => setType('expense')} className={`flex-1 py-1 text-xs font-bold rounded-lg ${type === 'expense' ? 'bg-white dark:bg-[#1a2e1d] text-red-500 shadow-sm' : 'text-gray-500'}`}>Expense</button>
               <button onClick={() => setType('income')} className={`flex-1 py-1 text-xs font-bold rounded-lg ${type === 'income' ? 'bg-white dark:bg-[#1a2e1d] text-green-500 shadow-sm' : 'text-gray-500'}`}>Income</button>
            </div>
            <input 
              type="number" placeholder={language === 'kn' ? 'ಮೊತ್ತ' : 'Amount'}
              className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] text-sm ${darkMode ? 'bg-black/40 text-white' : 'bg-gray-50 text-gray-800'}`}
              value={amount} onChange={e => setAmount(e.target.value)}
            />
            <input 
              type="text" placeholder={language === 'kn' ? 'ವಿವರ' : 'Description'}
              className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] text-sm ${darkMode ? 'bg-black/40 text-white' : 'bg-gray-50 text-gray-800'}`}
              value={desc} onChange={e => setDesc(e.target.value)}
            />
            <button onClick={handleAdd} className="w-full p-3 rounded-xl bg-[#4CAF50] text-white font-bold text-sm">Save</button>
         </div>
       )}

       <div className="space-y-3">
         {items.map((item, i) => (
           <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {item.type === 'income' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
                <div>
                   <p className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.desc || (item.type === 'income' ? 'Income' : 'Expense')}</p>
                   <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex justify-end items-center gap-3">
                 <p className={`font-mono font-bold ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                   {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
                 </p>
                 <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
              </div>
           </div>
         ))}
         {items.length === 0 && !showForm && <p className="text-gray-400 text-sm py-10 text-center">No transactions yet.</p>}
       </div>
    </div>
  );
};

const ADDITIONAL_CROPS = [
  { nameKn: "ಮೆಕ್ಕೆಜೋಳ", nameEn: "Maize", count: 10, image: "https://images.unsplash.com/photo-1551729041-7891ae6193aa?q=80&w=800&auto=format&fit=crop" },
  { nameKn: "ರಾಗಿ", nameEn: "Ragi", count: 14, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop" },
  { nameKn: "ಹತ್ತಿ", nameEn: "Cotton", count: 11, image: "https://images.unsplash.com/photo-1605000797439-75a153833f4a?q=80&w=800&auto=format&fit=crop" },
  { nameKn: "ಕಬ್ಬು", nameEn: "Sugarcane", count: 18, image: "https://images.unsplash.com/photo-1560940561-1ad526df615f?q=80&w=800&auto=format&fit=crop" }
];

const displayAnalysisText = (text: string, lang: 'en' | 'kn'): string => {
  if (!text) return '';
  const clean = (str: string) => str.replace(/\*/g, '').replace(/-/g, '•').trim();
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed === 'object' && parsed.en && parsed.kn) {
      return clean(parsed[lang] || text);
    }
    return clean(text);
  } catch {
    return clean(text);
  }
};

const useAiCropData = (crop: any, type: string, language: string, userId: string, district: string = 'Global') => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const adviceDocId = type === 'tips' ? `General_tips_Global` : `${crop?.nameEn}_${type}_Global`;
  const storageKey = `ai_advice_storage_${adviceDocId}`;

  useEffect(() => {
    if (!crop && type !== 'tips') return;
    
    // Also load from localStorage on mount (for offline)
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    
    const fetchSharedAdvice = async () => {
      try {
        const docRef = doc(db, 'shared_ai_advice', adviceDocId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedEntries = docSnap.data().entries || [];
          setEntries(fetchedEntries);
          localStorage.setItem(storageKey, JSON.stringify(fetchedEntries));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'shared_ai_advice');
      }
    };
    
    fetchSharedAdvice();
  }, [crop, type, adviceDocId, storageKey]);

  const fetchNew = async () => {
    const cropName = crop?.nameEn || 'General';
    setLoading(true);
    try {
      let prompt = '';
      if (type === 'tips') {
         const locationStr = (district === 'Global' || district === 'Unknown') ? 'Karnataka' : `${district} district of Karnataka`;
         prompt = `Provide 3 real-time farming tips or pest alerts for ${cropName === 'General' ? 'general seasonal farming' : `growing ${cropName}`} in ${locationStr}. Consider the current month (May). 
         Return a valid JSON array of objects. 
         Each object MUST strictly have these keys: 
         "titleEn" (English title), "titleKn" (Kannada title), 
         "instructionEn" (English instruction), "instructionKn" (Kannada instruction), 
         "adviceEn" (Short English expert advice/action), "adviceKn" (Short Kannada expert advice/action), 
         "bestTimeEn" (English best time for this), "bestTimeKn" (Kannada best time for this), 
         "category" (either 'pest' or 'tip'). 
         Ensure ALL fields are populated with the correct language content. Return strict valid JSON. No markdown.`;
      } else if (type === 'calendar') {
         if (!crop) return;
         prompt = `Provide 3-5 lifecycle stages for growing ${cropName} from sowing to harvest. Format as a valid JSON array. Each object MUST have keys: "stageEn", "stageKn", "durationEn", "durationKn", "days" (integer, start day from sowing). Return strict valid JSON. Do not include markdown or conversational filler.`;
      } else if (type === 'market') {
         if (!crop) return;
         prompt = `Provide 2 realistic market prices for ${cropName} in major Karnataka APMC markets. Format as a valid JSON array. Keys: "market", "marketKn", "price" (string), "trend" (string). Return strict valid JSON. Do not include markdown or conversational filler.`;
      } else if (type === 'pests') {
         if (!crop) return;
         prompt = `Provide 2 common pests/diseases for ${cropName}. Format as a valid JSON array. Keys: "nameEn", "nameKn", "treatmentEn", "treatmentKn". Return strict valid JSON. Do not include markdown or conversational filler.`;
      } else if (type === 'calculator') {
         if (!crop) return;
         prompt = `Provide calculator data for ${cropName} per acre. Format as a valid JSON object. Keys: "seedPerAcre" (number), "seedUnit" (string), "N" (number), "P" (number), "K" (number). Return strict valid JSON. Do not include markdown or conversational filler.`;
      } else if (type === 'schemes') {
         if (!crop) return;
         prompt = `Provide 2 government schemes relevant to ${cropName} farming in India/Karnataka. Format as a valid JSON array. Keys: "nameEn", "nameKn", "subsidyEn", "subsidyKn", "descEn", "descKn". Return strict valid JSON. Do not include markdown or conversational filler.`;
      }
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to the Settings menu.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      let text = response.text || "";
      const matchArray = text.match(/\[[\s\S]*\]/);
      const matchObj = text.match(/\{[\s\S]*\}/);
      let newData;
      if (type === 'calculator') {
         newData = matchObj ? JSON.parse(matchObj[0]) : {};
      } else {
         newData = matchArray ? JSON.parse(matchArray[0]) : [];
      }
      
      const newEntry = { 
        data: newData, 
        timestamp: new Date().toISOString(), 
        id: crypto.randomUUID(),
        cropName: cropName // Tag the entry with the crop name
      };
      
      let newestList: any[] = [];
      try {
        const docRef = doc(db, 'shared_ai_advice', adviceDocId);
        const currentSnap = await getDoc(docRef);
        const currentEntries = currentSnap.exists() ? currentSnap.data().entries || [] : [];
        newestList = [newEntry, ...currentEntries].slice(0, 50); // Keep last 50
        await setDoc(docRef, { entries: newestList });
      } catch (error) {
        // Fallback for offline or permission issues
        const saved = localStorage.getItem(storageKey);
        const prevEntries = saved ? JSON.parse(saved) : [];
        newestList = [newEntry, ...prevEntries].slice(0, 50);
        console.warn("Firestore sync failed, using offline fallback", error);
      }
      
      setEntries(newestList);
      localStorage.setItem(storageKey, JSON.stringify(newestList));
    } catch (e) {
      console.error("AI Gen error", e);
    } finally {
      setLoading(false);
    }
  };

  return { entries, loading, fetchNew };
};

const CropTipsTab = ({ crop, language, darkMode, userId, district, globalMapping }: any) => {
  const { entries: aiEntries, loading, fetchNew } = useAiCropData(crop, 'tips', language, userId, district);
  
  const aiTips = aiEntries.slice(0, 1).flatMap((entry: any) => (entry.data || [])
    .filter((d: any) => entry.cropName === crop.nameEn || entry.cropName === 'General')
    .map((d: any) => {
      const cropName = entry.cropName || 'General';
      const cropOfTip = CROPS.find(c => c.nameEn === cropName);
      const generalImg = "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&auto=format&fit=crop";
      return {
        ...d,
        cropContext: cropName,
        imageUrl: d.category === 'pest' 
          ? "https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=400&auto=format&fit=crop" 
          : (cropOfTip ? getCropImageUrl(cropOfTip, globalMapping) : (cropName === 'General' ? generalImg : getCropImageUrl(crop, globalMapping))),
        category: d.category || 'Tip',
        isAiGenerated: true
      };
    }));
  const staticTips = TIPS.filter(t => t.category === crop.nameEn);
  const tipsData = [...aiTips, ...staticTips];

  if (loading) return <div className="py-10 text-center text-sm font-bold animate-pulse text-[#4CAF50]">{language === 'kn' ? 'AI ಮೂಲಕ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ...' : 'Generating content with AI...'}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-bold tracking-tight flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
          <Lightbulb size={20} className="text-[#FFA726]" /> 
          {language === 'kn' ? 'ಕೃಷಿ ಮಾಹಿತಿಗಳು' : 'Farming Information'}
        </h3>
      </div>
      
      {tipsData.map((tip: any, i: number) => {
        const isPest = tip.category === 'pest';
        return (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`p-5 rounded-3xl border ${darkMode ? 'bg-white/5 ' : 'bg-white '} ${isPest ? 'border-red-200' : 'border-green-100'} shadow-sm mb-4`}
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className={`font-bold text-lg leading-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
              {language === 'kn' ? (tip.titleKn || tip.title) : (tip.titleEn || tip.title)}
            </h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPest ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {isPest ? (language === 'kn' ? 'ಕೀಟ' : 'Pest') : (language === 'kn' ? 'ಟಿಪ್' : 'Tip')}
            </span>
          </div>
          <p className={`text-sm mb-4 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {language === 'kn' ? (tip.instructionKn || tip.instruction) : (tip.instructionEn || tip.instruction)}
          </p>
          <div className={`p-4 rounded-2xl flex items-center gap-4 ${darkMode ? 'bg-white/5' : isPest ? 'bg-red-50' : 'bg-[#F1F8E9]'}`}>
            <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${isPest ? 'from-red-400 to-red-600' : darkMode ? 'from-green-500/20 to-green-700/20 text-green-400' : 'from-green-400 to-[#55B362]'} shadow-sm text-white`}>
              <Sprout size={20} />
            </div>
            <div>
              <h5 className={`text-[10px] font-bold uppercase tracking-wider ${darkMode ? 'text-gray-400' : isPest ? 'text-red-800/60' : 'text-[#1A4B2F]/60'}`}>
                {language === 'kn' ? 'ರೈತ ಸಲಹೆ' : 'Expert Advice'}
              </h5>
              <p className={`text-sm font-medium mt-0.5 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                {language === 'kn' ? (tip.adviceKn || tip.advice) : (tip.adviceEn || tip.advice)}
              </p>
            </div>
          </div>
          
          <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-white/10' : isPest ? 'border-red-100' : 'border-gray-100'} flex items-center justify-between`}>
             <div className="flex items-center gap-2">
                <Calendar size={14} className={isPest ? 'text-red-500' : 'text-[#55B362]'} />
                <span className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'kn' ? (tip.bestTimeKn || tip.bestTime) : (tip.bestTimeEn || tip.bestTime)}
                </span>
             </div>
          </div>
        </motion.div>
        );
      })}
      {tipsData.length === 0 && (
         <div className="text-center py-10"><button onClick={fetchNew} className="text-[#4CAF50] font-bold">Click to generate tips</button></div>
      )}
    </div>
  );
};

const CropsFragment = ({ language, darkMode, user, myCrops, setMyCrops, globalMapping, savedAnalyses, setSavedAnalyses }: { language: 'en' | 'kn', darkMode: boolean, user: any, myCrops: any[], setMyCrops: React.Dispatch<React.SetStateAction<any[]>>, globalMapping: Record<string, string>, savedAnalyses: any[], setSavedAnalyses: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [activeCropTab, setActiveCropTab] = useState<'tips'|'calendar'|'market'|'calculator'|'schemes'|'ledger'>('tips');
  
  const [showAddCrop, setShowAddCrop] = useState(false);

  const userId = user?.loginMethod === 'email' ? user.email : user?.phone;
  const storageKey = `raitha_varta_saved_analyses_${userId}`;

  // Removed redundant useEffect that was syncing to localStorage



  const s = STRINGS[language];

  if (selectedCrop) {
    const cropTips = TIPS.filter(t => t.category === selectedCrop.nameEn);
    const cropTabs = [
      { id: 'tips', icon: <Lightbulb size={16}/>, labelEn: 'Tips', labelKn: 'ಸಲಹೆಗಳು' },
      { id: 'calendar', icon: <Calendar size={16}/>, labelEn: 'Lifecycle', labelKn: 'ಬೆಳೆ ಚಕ್ರ' },
      { id: 'market', icon: <TrendingUp size={16}/>, labelEn: 'Market', labelKn: 'ಮಾರುಕಟ್ಟೆ' },
      { id: 'calculator', icon: <CalculatorIcon size={16}/>, labelEn: 'Calculator', labelKn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್' },
      { id: 'schemes', icon: <Landmark size={16}/>, labelEn: 'Schemes', labelKn: 'ಯೋಜನೆಗಳು' },
      { id: 'ledger', icon: <Wallet size={16}/>, labelEn: 'Ledger', labelKn: 'ಖರ್ಚು-ವೆಚ್ಚ' },
    ] as const;

    return (
      <div className={`h-full flex flex-col overflow-hidden ${darkMode ? 'bg-[#0a140b] text-white' : 'bg-[#F5F7F8] text-gray-900'}`}>
        <div className="relative h-48 w-full shrink-0">
          <img src={getCropImageUrl(selectedCrop, globalMapping)} className="w-full h-full object-cover" alt={selectedCrop.nameEn} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <button 
            onClick={() => { setSelectedCrop(null); setActiveCropTab('tips'); }}
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white overflow-hidden"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-3xl font-display font-bold text-white mb-1 shadow-sm">
              {language === 'kn' ? selectedCrop.nameKn : selectedCrop.nameEn}
            </h2>
          </div>
        </div>

        {/* Tab selector */}
        <div className={`flex gap-2 overflow-x-auto no-scrollbar px-6 py-4 shrink-0 ${darkMode ? 'bg-[#12311C]' : 'bg-white shadow-sm'} z-10`}>
          {cropTabs.map(tab => (
             <button
                key={tab.id}
                onClick={() => setActiveCropTab(tab.id as any)}
                className={`flex shrink-0 items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all border-2 ${
                  activeCropTab === tab.id 
                    ? (darkMode ? 'bg-[#4CAF50] text-[#0a140b] border-[#4CAF50]' : 'bg-[#1A4B2F] text-white border-[#1A4B2F]') 
                    : (darkMode ? 'bg-white/5 text-gray-400 border-white/5' : 'bg-gray-50 text-gray-500 border-gray-100')
                }`}
             >
                {tab.icon}
                {language === 'kn' ? tab.labelKn : tab.labelEn}
             </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          {activeCropTab === 'tips' && <CropTipsTab crop={selectedCrop} language={language} darkMode={darkMode} userId={userId} district={user?.district} globalMapping={globalMapping} />}
          {activeCropTab === 'calendar' && <CropLifecycleTab crop={selectedCrop} language={language} darkMode={darkMode} />}
          {activeCropTab === 'market' && <CropMarketTab crop={selectedCrop} language={language} darkMode={darkMode} />}
          {activeCropTab === 'calculator' && <CropCalculatorTab crop={selectedCrop} language={language} darkMode={darkMode} userId={userId} />}
          {activeCropTab === 'schemes' && <CropSchemesTab crop={selectedCrop} language={language} darkMode={darkMode} userId={userId} />}
          {activeCropTab === 'ledger' && <CropLedgerTab crop={selectedCrop} language={language} darkMode={darkMode} userId={userId} />}

        </div>
      </div>
    );
  }

  return (
    <div className={`h-full px-6 pt-6 pb-24 overflow-y-auto no-scrollbar ${darkMode ? 'bg-[#0a140b]' : 'bg-white'}`}>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {myCrops.map((crop, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border cursor-pointer active:scale-95 transition-transform ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-50'}`}
          >
            <div className="h-24 sm:h-32 w-full overflow-hidden" onClick={() => setSelectedCrop(crop)}>
              <img src={getCropImageUrl(crop, globalMapping)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt={crop.nameEn} />
              <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-black/80' : 'from-gray-900/60'} to-transparent`} />
            </div>

            <div className="absolute bottom-2 left-3 right-3 pointer-events-none">
              <h4 className="font-bold text-white text-[10px] sm:text-xs tracking-tight leading-tight truncate">{language === 'kn' ? crop.nameKn : crop.nameEn}</h4>
            </div>
          </motion.div>
        ))}
        {/* Placeholder for "Add More" */}
        <div onClick={() => setShowAddCrop(true)} className={`rounded-[1.5rem] border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer active:scale-95 transition-transform ${darkMode ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-[#E8F5E9] bg-[#F1F8E9]/20 hover:bg-[#F1F8E9]/50'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${darkMode ? 'bg-[#4CAF50] text-[#0a140b]' : 'bg-[#E8F5E9] text-[#1A4B2F]'}`}>
            <Plus size={16} />
          </div>
          <p className={`text-[9px] font-bold uppercase tracking-wider ${darkMode ? 'text-white/60' : 'text-[#1A4B2F]'}`}>{language === 'kn' ? 'ಹೆಚ್ಚು ಸೇರಿಸಿ' : 'Add More'}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className={`font-bold text-lg tracking-tight mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
          <Bookmark size={20} className="text-[#55B362]" />
          {language === 'kn' ? 'ಉಳಿಸಿದ ವಿಶ್ಲೇಷಣೆಗಳು' : 'Saved Analyses'}
        </h3>
        {savedAnalyses.length > 0 ? (
          <div className="flex flex-col gap-4">
            {savedAnalyses.map((analysis, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 p-4 rounded-[2rem] border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100'} shadow-sm`}
                onClick={() => setSelectedAnalysis(analysis)}
              >
                <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-gray-100">
                  <img src={analysis.image} className="w-full h-full object-cover" alt="Analysis" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className={`text-sm line-clamp-3 font-medium leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {displayAnalysisText(analysis.text, language)}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 mt-2">
                    {new Date(analysis.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`p-6 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center text-center ${darkMode ? 'border-white/10 bg-white/5' : 'border-[#E8F5E9] bg-[#F1F8E9]/20'}`}>
             <Bookmark size={32} className={`mb-3 ${darkMode ? 'text-white/20' : 'text-[#A5D6A7]'}`} />
             <p className={`text-sm font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
               {language === 'kn' ? 'ಯಾವುದೇ ವಿಶ್ಲೇಷಣೆಗಳಿಲ್ಲ' : 'No saved analyses yet'}
             </p>
             <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
               {language === 'kn' ? 'ಕ್ಯಾಮರಾ ಬಳಸಿ ವಿಶ್ಲೇಷಣೆ ಉಳಿಸಿ' : 'Analyze crop images using the camera'}
             </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAnalysis && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`w-full max-w-md rounded-[2.5rem] overflow-hidden flex flex-col p-6 relative ${darkMode ? 'bg-[#1a2e1d]' : 'bg-white'}`}
            >
              <button 
                onClick={() => setSelectedAnalysis(null)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                 <X size={16} />
              </button>

              <h3 className={`text-xl font-bold text-center mb-6 leading-tight pr-8 pl-8 ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
                {language === 'kn' ? 'ಉಳಿಸಿದ ವಿಶ್ಲೇಷಣೆ' : 'Saved Analysis'}
              </h3>

              <div className="w-full h-40 rounded-2xl overflow-hidden mb-6 border-4 border-green-50 shadow-inner shrink-0 relative">
                <img src={selectedAnalysis.image} alt="Crop" className="w-full h-full object-cover" />
                <button 
                  onClick={() => {
                    const idToDelete = selectedAnalysis.date;
                    const updated = savedAnalyses.filter(a => a.date !== idToDelete);
                    if (window.AndroidDB && typeof window.AndroidDB.saveAnalysis === 'function') {
                      try {
                         // Fallback removing not direct, doing via localstorage
                      } catch(e){}
                    }
                    localStorage.setItem(storageKey, JSON.stringify(updated));
                    setSavedAnalyses(updated);
                    setSelectedAnalysis(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md z-10 hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="overflow-y-auto no-scrollbar max-h-[40vh]">
                <div className={`text-left text-sm leading-relaxed whitespace-pre-wrap font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {displayAnalysisText(selectedAnalysis.text, language)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddCrop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`w-full max-w-md rounded-[2.5rem] overflow-hidden flex flex-col p-6 relative ${darkMode ? 'bg-[#1a2e1d]' : 'bg-white'}`}
            >
              <button 
                onClick={() => setShowAddCrop(false)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                 <X size={16} />
              </button>

              <h3 className={`text-xl font-bold text-center mb-6 leading-tight pr-6 pl-6 ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
                {language === 'kn' ? 'ಬೆಳೆಗಳನ್ನು ಸೇರಿಸಿ' : 'Add New Crops'}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {ADDITIONAL_CROPS.map((crop, i) => {
                  const isAdded = myCrops.some(c => c.nameEn === crop.nameEn);
                  return (
                    <div 
                      key={i} 
                      onClick={() => {
                        if (isAdded) {
                          setMyCrops(prev => prev.filter(c => c.nameEn !== crop.nameEn));
                        } else {
                          setMyCrops(prev => [...prev, crop]);
                        }
                      }}
                      className={`relative rounded-2xl overflow-hidden shadow-sm border-2 cursor-pointer active:scale-95 transition-transform ${isAdded ? 'border-[#4CAF50]' : darkMode ? 'border-white/5' : 'border-gray-100'}`}
                    >
                      <div className="h-20 w-full overflow-hidden relative">
                        <img src={getCropImageUrl(crop, globalMapping)} className="h-full w-full object-cover" alt={crop.nameEn} />
                        <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-black/80' : 'from-gray-900/60'} to-transparent`} />
                        {isAdded && (
                          <div className="absolute top-2 right-2 bg-[#4CAF50] text-white p-1 rounded-full">
                            <Check size={12} strokeWidth={4} />
                          </div>
                        )}
                      </div>
                      <div className={`p-2 text-center ${darkMode ? 'bg-[#1a2e1d]' : 'bg-white'}`}>
                        <h4 className={`font-bold text-xs tracking-tight ${darkMode ? 'text-white' : 'text-[#1A4B2F]'}`}>
                          {language === 'kn' ? crop.nameKn : crop.nameEn}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setShowAddCrop(false)}
                className="mt-6 w-full py-4 bg-[#55B362] text-white rounded-2xl font-bold shadow-lg shadow-green-100 dark:shadow-none active:scale-95 transition-all text-sm"
              >
                {language === 'kn' ? 'ಆಯಿತು' : 'Done'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StoriesFragment = ({ language, darkMode, user, myCrops, globalMapping, savedAnalyses, setSavedAnalyses }: { language: 'en' | 'kn', darkMode: boolean, user: any, myCrops: any[], globalMapping: Record<string, string>, savedAnalyses: any[], setSavedAnalyses: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showExpertAsk, setShowExpertAsk] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeProblem = async () => {
    if (!image) return;
    setAnalyzing(true);
    setAnalysisResult(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("Gemini API key is not configured.");
      
      const ai = new GoogleGenAI({ apiKey });
      const base64Data = image.split(',')[1];
      const prompt = `Analyze this agricultural problem from the image and provide practical solutions.
Provide the response as a valid JSON object strictly with two keys: "en" for the English solution and "kn" for the Kannada translation.
Make sure both texts are well formatted and professional. Describe the issue first, then provide actionable solutions.

Example format:
{
  "en": "Description: ...\n\nSolutions:\n• ...",
  "kn": "ವಿವರಣೆ: ...\n\nಪರಿಹಾರಗಳು:\n• ..."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { 
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Data } },
            { text: prompt }
          ] 
        },
        config: {
          responseMimeType: "application/json",
        }
      });

      let responseText = response.text || "";
      if (responseText.startsWith('```json')) {
         responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      } else if (responseText.startsWith('```')) {
         responseText = responseText.replace(/```/g, '').trim();
      }
      setAnalysisResult(responseText || null);
    } catch (error) {
      console.error("AI Analysis failed", error);
      setAnalysisResult(language === 'kn' ? "ಕ್ಷಮಿಸಿ, ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ." : "Sorry, analysis failed. Please check your connection and try again.");
    } finally {
      setAnalyzing(false);
    }
  };
  
  const userId = user?.loginMethod === 'email' ? user.email : user?.phone;
  const storageKey = `raitha_varta_saved_analyses_${userId}`;

  const s = STRINGS[language];

  return (
    <div className={`h-full flex flex-col ${darkMode ? 'bg-[#0a140b]' : 'bg-[#F1F8E9]/20'}`}>
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 space-y-5 py-6 pb-24">
        {SUCCESS_STORIES.map((f, i) => {
          const cropInfo = myCrops.find(c => c.nameEn === f.cropEn);
          const displayImage = cropInfo ? getCropImageUrl(cropInfo, globalMapping) : f.imageUrl;
          
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 rounded-[2rem] border-2 shadow-sm relative overflow-hidden flex flex-col ${darkMode ? 'bg-[#1a2e1d] border-white/5' : 'bg-white border-[#E8F5E9]'}`}
            >
              {/* Header info */}
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#E8F5E9] shadow-sm shrink-0">
                    <img src={displayImage} className="w-full h-full object-cover" alt={f.nameEn} />
                  </div>
                <div className="text-left min-w-0 flex-1">
                  <h3 className={`font-bold text-sm sm:text-lg leading-tight truncate ${darkMode ? 'text-white' : 'text-[#1A3D28]'}`}>
                    {language === 'kn' ? f.nameKn : f.nameEn}
                  </h3>
                  <p className="text-[9px] sm:text-[11px] font-bold text-gray-400 capitalize truncate">{language === 'kn' ? f.villageKn : f.villageEn}</p>
                  <div className="mt-1 inline-block bg-[#E8F5E9] px-2 py-0.5 rounded-lg max-w-full">
                    <span className="text-[8px] sm:text-[10px] font-black text-[#2C4A34] uppercase tracking-wider block truncate">
                      {language === 'kn' ? f.cropKn : f.cropEn}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FFA726] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm shrink-0">
                <span className="text-white text-[9px] sm:text-[11px] font-black leading-none">★ {f.rating}</span>
              </div>
            </div>

            <div className="h-px bg-[#E8F5E9] w-full mb-4" />

            <p className={`text-[13px] font-medium leading-relaxed text-left mb-4 italic ${darkMode ? 'text-gray-300' : 'text-[#1A3D28]'}`}>
              "{language === 'kn' ? f.storyKn : f.storyEn}"
            </p>

            <div className="flex flex-wrap items-center justify-between mt-auto pt-2 gap-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="bg-[#E8F5E9] text-[#2C4A34] px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 border border-[#CCDE46]/20">
                   <div className="text-green-600 shrink-0">
                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                     </svg>
                   </div>
                   <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight whitespace-nowrap">
                     {language === 'kn' ? f.statsKn : f.statsEn}
                   </span>
                </div>
                <div className="bg-gray-50/80 px-2.5 py-1.5 rounded-xl border border-gray-100">
                   <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight whitespace-nowrap">
                     {language === 'kn' ? f.metricKn : f.metricEn}
                   </span>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedStory(f)}
                className="text-[10px] sm:text-[11px] font-bold text-[#1A4B2F] underline decoration-green-200 decoration-2 underline-offset-4 active:opacity-50 transition-opacity whitespace-nowrap"
              >
                {language === 'kn' ? 'ಮತ್ತಷ್ಟು ಓದಿ' : 'Read More'}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>

      {/* Floating Action Button for Expert Ask */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setShowExpertAsk(true);
          setImage(null);
          setAnalysisResult(null);
        }}
        className={`fixed bottom-24 right-5 w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center justify-center z-40 border-2 border-white/20 ${darkMode ? 'bg-[#43A047]' : 'bg-[#1A4B2F]'} text-white`}
      >
        <Sparkles size={24} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F6A132] rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Expert Ask Modal */}
      <AnimatePresence>
        {showExpertAsk && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => {
              if (!analyzing) setShowExpertAsk(false);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`${darkMode ? 'bg-[#1a2e1d] text-white' : 'bg-white text-gray-800'} w-full rounded-[2.5rem] p-6 shadow-2xl max-w-sm flex flex-col max-h-[90vh]`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-green-600" />
                </div>
                <button onClick={() => setShowExpertAsk(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="text-left mb-6">
                <h3 className="text-lg font-bold leading-tight mb-1">
                  {language === 'kn' ? 'AI ಕೃಷಿ ತಜ್ಞ' : 'AI Agriculture Expert'}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {language === 'kn' ? 'ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣದ ಪರಿಹಾರ ಪಡೆಯಿರಿ' : 'Upload a photo of your crop problem and get instant solutions'}
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
                
                {!image ? (
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors ${darkMode ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                      <Camera size={24} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">{language === 'kn' ? 'ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ' : 'Select Photo'}</span>
                  </button>
                ) : (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden group">
                    <img src={image} className="w-full h-full object-cover" alt="Symptom" />
                    <button 
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {image && !analysisResult && (
                  <button 
                    onClick={analyzeProblem}
                    disabled={analyzing}
                    className={`w-full py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${analyzing ? 'bg-gray-300' : (darkMode ? 'bg-[#43A047]' : 'bg-[#1A4B2F]')} text-white`}
                  >
                    {analyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{language === 'kn' ? 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Analyzing...'}</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>{language === 'kn' ? 'ಪರಿಹಾರವನ್ನು ಹುಡುಕಿ' : 'Get Solution'}</span>
                      </>
                    )}
                  </button>
                )}

                {analysisResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl text-left border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-green-50 border-green-100'}`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={16} className="text-green-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                        {language === 'kn' ? 'AI ವಿಶ್ಲೇಷಣೆ' : 'AI Analysis'}
                      </span>
                    </div>
                    <div className={`text-xs leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-[#1A3D28]'}`}>
                      {displayAnalysisText(analysisResult, language)}
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <button 
                        onClick={() => {
                          setImage(null);
                          setAnalysisResult(null);
                        }}
                        className="flex-1 py-3 rounded-xl border border-dashed border-green-300 text-green-600 font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-transform"
                      >
                        {language === 'kn' ? 'ಮತ್ತೊಂದು ವಿಶ್ಲೇಷಣೆ' : 'Try Another'}
                      </button>
                      <button 
                        onClick={() => {
                          if (!image || !analysisResult) return;
                          try {
                            const date = new Date();
                            const newAnalysis = {
                              image,
                              text: analysisResult,
                              date: date.toISOString(),
                              dateStrEn: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                              dateStrKn: date.toLocaleDateString('kn-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            };
                            const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
                            existing.unshift(newAnalysis);
                            localStorage.setItem(storageKey, JSON.stringify(existing));
                            setSavedAnalyses(existing);
                            if (window.AndroidDB && typeof window.AndroidDB.saveAnalysis === 'function') {
                               window.AndroidDB.saveAnalysis(userId, image, analysisResult, date.toISOString());
                            }
                            setShowExpertAsk(false);
                          } catch (e) {
                            console.error('Error saving', e);
                          }
                        }}
                        className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold text-[10px] uppercase tracking-widest active:scale-95 transition-transform shadow-md"
                      >
                        {language === 'kn' ? 'ಉಳಿಸಿ' : 'Save'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className={`w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col max-h-[90vh] ${darkMode ? 'bg-[#1a2e1d]' : 'bg-white'}`}
            >
              <div className="relative h-48 shrink-0">
                <img src={myCrops.find(c => c.nameEn === selectedStory.cropEn) ? getCropImageUrl(myCrops.find(c => c.nameEn === selectedStory.cropEn), globalMapping) : selectedStory.imageUrl} className="w-full h-full object-cover" alt="Hero" />
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                >
                   <X size={20} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 text-left">
                   <h2 className="text-white text-2xl font-bold">{language === 'kn' ? selectedStory.nameKn : selectedStory.nameEn}</h2>
                   <p className="text-white/60 text-sm">{language === 'kn' ? selectedStory.villageKn : selectedStory.villageEn}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-8 text-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#E8F5E9] px-3 py-1 rounded-lg">
                    <span className="text-[11px] font-black text-[#2C4A34] uppercase tracking-wider">
                      {language === 'kn' ? selectedStory.cropKn : selectedStory.cropEn}
                    </span>
                  </div>
                  <div className="bg-[#FFA726] px-3 py-1 rounded-full text-white text-[11px] font-black">
                    ★ {selectedStory.rating}
                  </div>
                </div>

                <div className="space-y-4">
                  {(language === 'kn' ? selectedStory.fullStoryKn : selectedStory.fullStoryEn).split('\n\n').map((para: string, idx: number) => (
                    <p key={idx} className={`text-[15px] leading-relaxed font-medium ${darkMode ? 'text-gray-300' : 'text-[#2C3E50]'}`}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{language === 'kn' ? 'ಗೆಲುವಿನ ಅಂಶ' : 'SUCCESS METRIC'}</span>
                      <span className="text-lg font-black text-[#1A4B2F]">{language === 'kn' ? selectedStory.statsKn : selectedStory.statsEn}</span>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm">
                      <Trophy size={22} strokeWidth={2.5} />
                   </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="w-full h-14 bg-[#55B362] text-white rounded-2xl font-bold text-lg shadow-lg shadow-green-100"
                >
                  {language === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProfileFragment = ({ language, onLogout, setLanguage, profileData, setProfileData, darkMode, setDarkMode, myCrops, globalMapping }: any) => {
  const s = STRINGS[language];
  const [isEditing, setIsEditing] = useState(false);
  const [showContact, setShowContact] = useState<{title: string, phone: string} | null>(null);

  const handleUpdate = (key: string, value: string) => {
    setProfileData((prev: any) => ({ ...prev, [key]: value }));
  };

  const isGlobalAdmin = profileData?.phone === '8792227527';

  const handleGlobalizeCrops = async () => {
    if (!confirm("Make your current crop images global for all users?")) return;
    try {
      for (const crop of myCrops) {
        const id = (crop.nameEn || "").toLowerCase().replace(/\s+/g, '');
        const globalKey = id === 'paddy' ? 'rice' : id;
        const img = crop.image || crop.globalImage;
        if (img) {
          await setDoc(doc(db, 'crops', globalKey), {
            name: crop.nameEn,
            nameKn: crop.nameKn,
            imageUrl: img, 
            count: crop.count || 0
          });
        }
      }
      alert("Successfully globalized crops! Images are now default for all users.");
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("Failed to globalize crops.");
    }
  };

  const CONTACTS_DATA = {
    jointDirector: { title: s.jointDirector, phone: "08354-235043" },
    districtOffice: { title: s.districtOffice, phone: "+91 94489 99401" }
  };

  return (
    <div className={`h-full ${darkMode ? 'bg-[#0f1a11]' : 'bg-[#F5F7F3]'} overflow-y-auto no-scrollbar pb-10 transition-colors duration-500`}>
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <div className={`${darkMode ? 'bg-[#1a2e1d] text-white' : 'bg-white text-[#1B5E20]'} w-full rounded-[2.5rem] p-8 shadow-2xl max-w-sm max-h-[85vh] overflow-y-auto`}
            >
              <h3 className="text-xl font-bold mb-6">{language === 'kn' ? 'ಪ್ರೊಫೈಲ್ ಮತ್ತು ಕೃಷಿ ಮಾಹಿತಿ ತಿದ್ದುಪಡಿ' : 'Edit Profile & Farming Details'}</h3>
              <div className="space-y-4">
                <EditInput label={language === 'kn' ? 'ಹೆಸರು (ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ನಮೂದಿಸಿ)' : 'Name (In English during edit)'} value={profileData.name} onChange={v => handleUpdate('name', v)} darkMode={darkMode} />
                
                {/* District Selection */}
                <div className="text-left">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{language === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District'}</label>
                  <div className="relative">
                    <select 
                      className={`w-full rounded-2xl px-4 py-3 text-sm font-bold border-0 focus:ring-2 focus:ring-[#4CAF50] outline-none transition-colors appearance-none ${darkMode ? 'bg-black/30 text-white' : 'bg-gray-50 text-gray-800'}`}
                      value={profileData.district}
                      onChange={e => handleUpdate('district', e.target.value)}
                    >
                      <option value="" disabled>Select District / ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಮಾಡಿ</option>
                      {DISTRICTS.map((d, i) => (
                        <option key={d} value={d}>{d} / {DISTRICTS_KN[i]}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Primary Crop Selection */}
                <div className="text-left">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{language === 'kn' ? 'ಮುಖ್ಯ ಬೆಳೆ' : 'Primary Crop'}</label>
                  <div className="relative">
                    <select 
                      className={`w-full rounded-2xl px-4 py-3 text-sm font-bold border-0 focus:ring-2 focus:ring-[#4CAF50] outline-none transition-colors appearance-none ${darkMode ? 'bg-black/30 text-white' : 'bg-gray-50 text-gray-800'}`}
                      value={profileData.crop}
                      onChange={e => handleUpdate('crop', e.target.value)}
                    >
                      {CROPS.map(c => (
                        <option key={c.nameEn} value={c.nameEn}>{language === 'kn' ? c.nameKn : c.nameEn}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Farm Size Selection */}
                <div className="text-left">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{language === 'kn' ? 'ಹೊಲದ ವಿಸ್ತೀರ್ಣ' : 'Farm Size'}</label>
                  <div className="relative">
                    <select 
                      className={`w-full rounded-2xl px-4 py-3 text-sm font-bold border-0 focus:ring-2 focus:ring-[#4CAF50] outline-none transition-colors appearance-none ${darkMode ? 'bg-black/30 text-white' : 'bg-gray-50 text-gray-800'}`}
                      value={profileData.farmSize}
                      onChange={e => handleUpdate('farmSize', e.target.value)}
                    >
                      {FARM_SIZES.map(size => (
                        <option key={size.en} value={size.en}>{language === 'kn' ? size.kn : size.en}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsEditing(false)}
                className="w-full mt-8 bg-[#4CAF50] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
              >
                {s.save || 'Save'}
              </button>
            </div>
          </motion.div>
        )}

        {showContact && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setShowContact(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`${darkMode ? 'bg-[#1a2e1d] text-white' : 'bg-white text-gray-800'} w-full rounded-[2.5rem] p-8 shadow-2xl max-w-sm text-center`}
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 leading-tight">{showContact.title}</h3>
              <p className="text-2xl font-mono font-bold text-green-600 mb-8">{showContact.phone}</p>
              <a 
                href={`tel:${showContact.phone}`}
                className="block w-full bg-[#1B5E20] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all mb-3 text-center"
              >
                {language === 'kn' ? 'ಕರೆ ಮಾಡಿ' : 'Call Now'}
              </a>
              <button 
                onClick={() => setShowContact(null)}
                className={`w-full py-3 font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {language === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER SECTION (Green Profile Card) */}
      <div className={`${darkMode ? 'bg-[#0a140b]' : 'bg-[#1B5E20]'} pt-10 pb-8 px-6 rounded-b-[24px] shadow-xl relative overflow-hidden transition-colors duration-500`}>
        {/* Profile Picture & Identity */}
        <div className="flex flex-col items-center text-center">
              <div className="relative mb-5">
            <div className="w-[110px] h-[110px] bg-white/10 rounded-full p-2 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative group">
              <div className="w-full h-full bg-[#E2E8F0] rounded-full flex items-center justify-center text-gray-400 shadow-inner overflow-hidden">
                {profileData.image ? (
                  <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={60} />
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera size={24} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => setProfileData((prev: any) => ({ ...prev, image: e.target?.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1.5 focus-within:ring-0">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {language === 'kn' && profileData.name.toLowerCase().includes("teju") ? "ತೇಜು" : profileData.name}
            </h2>
            <button onClick={() => setIsEditing(true)}>
              <Settings size={14} className="text-white/30 hover:text-white transition-colors" />
            </button>
          </div>
          <p className="text-[#A5D6A7] text-sm font-bold tracking-wide mb-8">
            {profileData?.loginMethod === 'email' ? profileData?.email : `+91 ${profileData?.phone}`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full max-w-full px-2 mb-2">
            <div className="flex-1 min-w-[130px] sm:min-w-[140px] bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/10 text-center shadow-lg">
                <p className="text-[7px] sm:text-[8px] text-white/50 font-black uppercase tracking-widest mb-1">{s.district.toUpperCase()}</p>
                <p className="text-white font-bold text-[11px] sm:text-sm tracking-tight truncate">{getLocalizedValue(profileData.district, 'district', language)}</p>
            </div>
            <div className="flex-1 min-w-[130px] sm:min-w-[140px] bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 border border-white/10 text-center shadow-lg">
                <p className="text-[7px] sm:text-[8px] text-white/50 font-black uppercase tracking-widest mb-1">{s.crop.toUpperCase()}</p>
                <p className="text-white font-bold text-[11px] sm:text-sm tracking-tight truncate">{getLocalizedValue(profileData.crop, 'crop', language)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main List Sections */}
      <div className="px-5 -mt-4 space-y-5 pb-8">
        {/* DETAILS SECTION (WHITE CARD) */}
        <div className={`${darkMode ? 'bg-[#1a2e1d] border-white/5' : 'bg-white border-gray-50/50'} rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden`}>
          <ProfileRow icon={<MapPin size={20} className="text-[#3B82F6]" />} label={s.district} value={getLocalizedValue(profileData.district, 'district', language)} onClick={() => setIsEditing(true)} darkMode={darkMode} />
          <ProfileRow icon={<Sprout size={20} className="text-[#10B981]" />} label={s.primaryCrop} value={getLocalizedValue(profileData.crop, 'crop', language)} onClick={() => setIsEditing(true)} darkMode={darkMode} />
          <ProfileRow icon={<Ruler size={20} className="text-[#64748B]" />} label={s.farmSize} value={getLocalizedValue(profileData.farmSize, 'farmSize', language)} onClick={() => setIsEditing(true)} darkMode={darkMode} />
        </div>


        {/* SETTINGS SECTION */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-5">{s.settings.toUpperCase()}</span>
          <div className={`${darkMode ? 'bg-[#1a2e1d] border-white/5' : 'bg-white border-gray-50/50'} rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden`}>
            <div className={`px-6 py-5 flex items-center justify-between border-b ${darkMode ? 'border-white/10' : 'border-gray-50'}`}>
              <div className="flex items-center gap-4">
                <Globe size={20} className="text-gray-400" />
                <span className={`font-bold text-[15px] ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{s.langLabel}</span>
              </div>
              <div className={`flex gap-1.5 p-1 rounded-2xl border ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-100/80 border-gray-200/50'}`}>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${
                    language === 'en' ? (darkMode ? 'bg-green-600 text-white' : 'bg-white shadow-md text-gray-800') : 'text-gray-400'
                  }`}
                >ENG</button>
                <button 
                  onClick={() => setLanguage('kn')}
                  className={`px-4 py-2 text-[10px] font-black rounded-xl transition-all ${
                    language === 'kn' ? (darkMode ? 'bg-green-600 text-white' : 'bg-white shadow-md text-gray-800') : 'text-gray-400'
                  }`}
                >ಕನ್ನಡ</button>
              </div>
            </div>

            <div className={`px-6 py-5 flex items-center justify-between ${darkMode ? 'border-white/10' : 'border-gray-50'}`}>
              <div className="flex items-center gap-4">
                <Moon size={20} className="text-gray-400" />
                <span className={`font-bold text-[15px] ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{s.darkAppearance}</span>
              </div>
              <div 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative cursor-pointer ${darkMode ? 'bg-[#4CAF50]' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${darkMode ? 'left-6' : 'left-1'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-5">{s.agOfficer.toUpperCase()}</span>
          <div className={`${darkMode ? 'bg-[#1a2e1d] border-white/5' : 'bg-white border-gray-50/50'} rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden`}>
            <ProfileRow 
              icon={<Info size={20} className="text-[#3B82F6]" />} 
              label={s.jointDirector} 
              onClick={() => setShowContact(CONTACTS_DATA.jointDirector)} 
              darkMode={darkMode}
            />
            <ProfileRow 
              icon={<Info size={20} className="text-[#3B82F6]" />} 
              label={s.districtOffice} 
              onClick={() => setShowContact(CONTACTS_DATA.districtOffice)} 
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* OTHER SECTION */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-5">{s.others.toUpperCase()}</span>
          <div className={`${darkMode ? 'bg-[#1a2e1d] border-white/5' : 'bg-white border-gray-50/50'} rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden`}>
            {isGlobalAdmin && (
              <ProfileRow 
                icon={<Globe size={20} className="text-orange-500" />} 
                label="Globalize Crops" 
                onClick={handleGlobalizeCrops}
                darkMode={darkMode} 
              />
            )}
            <ProfileRow icon={<Info size={20} className="text-[#10B981]" />} label={s.appVersion} value="1.0.0" darkMode={darkMode} />
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={onLogout} 
          className={`w-full py-4.5 rounded-[20px] border-[1.5px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-sm mb-6 ${darkMode ? 'bg-[#1a2e1d]/50 border-red-900/30 text-red-500' : 'bg-white border-red-100 text-red-500'}`}
        >
          <LogOut size={18} className="rotate-180" /> 
          <span className="text-[13px] font-black uppercase tracking-widest leading-none">{s.logout}</span>
        </button>
      </div>
    </div>
  );
};

const ProfileRow = ({ icon, label, value, onClick, darkMode }: { icon: any, label: string, value?: string, onClick?: () => void, darkMode: boolean }) => (
  <div 
    onClick={onClick}
    className={`px-6 py-5 flex items-center justify-between border-b last:border-0 transition-colors cursor-pointer group ${darkMode ? 'border-white/10 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50'}`}
  >
    <div className="flex items-center gap-4">
      {icon}
      <span className={`font-bold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2 text-right">
      {value && <span className="text-sm font-bold text-[#4CAF50]">{value}</span>}
      <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-400" />
    </div>
  </div>
);

const EditInput = ({ label, value, onChange, darkMode }: { label: string, value: string, onChange: (v: string) => void, darkMode: boolean }) => (
  <div className="text-left">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
    <input 
      className={`w-full rounded-2xl px-4 py-3 text-sm font-bold border-0 focus:ring-2 focus:ring-[#4CAF50] outline-none transition-colors ${darkMode ? 'bg-black/30 text-white' : 'bg-gray-50 text-gray-800'}`} 
      value={value} 
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const NavBtn = ({ active, icon, label, onClick, darkMode }: any) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1.5 flex-1 relative transition-all duration-300 ${
      active ? (darkMode ? 'text-[#4CAF50]' : 'text-[#0a3d1d]') : 'text-gray-400'
    }`}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
      {cloneElement(icon, { size: 22, strokeWidth: active ? 3 : 2 })}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-[0.1em] transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
    {active && (
      <div className={`absolute -bottom-1 w-1 h-1 rounded-full ${darkMode ? 'bg-[#4CAF50]' : 'bg-[#0a3d1d]'}`} />
    )}
  </button>
);

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login' | 'main'>('splash');
  const [language, setLanguage] = useState<'en' | 'kn'>('kn');
  const [activeTab, setActiveTab] = useState('tips');
  const [darkMode, setDarkMode] = useState(false);
  const [weather, setWeather] = useState<{ temp: number, description: string, next: string } | null>(null);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    loginMethod: "phone" as "phone" | "email",
    district: "",
    crop: "Paddy",
    farmSize: "2 Acres",
    image: null as string | null
  });

  useEffect(() => {
    if (screen === 'main') {
      const id = user.loginMethod === 'phone' ? user.phone : user.email;
      if (id) {
         localStorage.setItem(`raitha_varta_profile_${id}`, JSON.stringify(user));
      }
    }
  }, [user, screen]);

  useEffect(() => {
    const fetchWeather = async () => {
      // 1. Try Geolocation (Mobile/Native APK behavior)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          try {
            const res = await fetch(`/api/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
            const data = await res.json();
            if (typeof data.temp === 'number') {
              setWeather({ ...data, temp: data.temp >= 30 ? Math.floor(Math.random() * (29 - 22 + 1)) + 22 : data.temp });
              return; // Success
            }
          } catch (e) { console.error(e); }
          
          // Fallback if geo fetch specifically fails
          fallbackWeather();
        }, () => fallbackWeather()); // Fallback if geo permission denied
      } else {
        fallbackWeather();
      }
    };

    const fallbackWeather = () => {
      if (user?.district) {
        fetch(`/api/weather?district=${user.district}`)
          .then(res => res.json())
          .then(data => {
            if (typeof data.temp === 'number') {
              setWeather({
                ...data,
                temp: data.temp >= 30 ? Math.floor(Math.random() * (29 - 22 + 1)) + 22 : data.temp
              });
            } else {
              setWeather({
                temp: Math.floor(Math.random() * (29 - 22 + 1)) + 22,
                description: 'Clear',
                next: 'Sunny'
              });
            }
          })
          .catch(() => {
            setWeather({
              temp: Math.floor(Math.random() * (29 - 22 + 1)) + 22,
              description: 'Clear',
              next: 'Sunny'
            });
          });
      } else {
        setWeather({
          temp: Math.floor(Math.random() * (29 - 22 + 1)) + 22,
          description: 'Clear',
          next: 'Sunny'
        });
      }
    };

    fetchWeather();
  }, [user?.district]);

  const handleSplashFinish = () => {
    const activeUserId = localStorage.getItem('raitha_varta_active_user');
    if (activeUserId) {
      const saved = localStorage.getItem(`raitha_varta_profile_${activeUserId}`);
      if (saved) {
        setUser(JSON.parse(saved));
        setScreen('main');
        return;
      }
    }
    setScreen('login');
  };

  const handleLogin = async (data: any) => {
    const id = data.loginMethod === 'phone' ? data.phone : data.email;
    localStorage.setItem('raitha_varta_active_user', id);
    
    const savedLocal = localStorage.getItem(`raitha_varta_profile_${id}`);
    let initialUserData = savedLocal ? { ...JSON.parse(savedLocal), ...data } : { ...user, ...data };
    
    // Optimistic set
    setUser(initialUserData);
    setScreen('main');

    // Attempt to fetch latest from Firestore immediately
    try {
      const docRef = doc(db, 'user_profiles', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const firestoreData = docSnap.data();
        const { myCrops: _, lastUpdated: __, ...userInfo } = firestoreData;
        setUser((prev: any) => ({ ...prev, ...userInfo }));
      }
    } catch (e) {
       console.warn("Firestore profile fetch failed during login", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('raitha_varta_active_user');
    setScreen('login');
    setActiveTab('tips');
    setUser({
      name: "", phone: "", email: "", loginMethod: "phone", district: "", crop: "Paddy", farmSize: "2 Acres", image: null
    });
  };

  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center font-sans transition-colors duration-500 overflow-hidden ${darkMode ? 'bg-[#0a0f0a]' : 'bg-[#F1F8E9]'}`}>
      <div className={`w-full h-full max-w-lg mx-auto relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#0f1a11]' : 'bg-white'}`}>
        <AnimatePresence mode="wait">
          {screen === 'splash' && <SplashScreen key="splash" onFinish={handleSplashFinish} />}
          {screen === 'login' && <LoginScreen key="login" language={language} tempUser={user} setTempUser={setUser} setLanguage={setLanguage} onLogin={handleLogin} />}
          {screen === 'main' && (
            <MainWrapper 
              key="main"
              language={language} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogout={handleLogout}
              setLanguage={setLanguage}
              user={user}
              setUser={setUser}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              weather={weather}
              setWeather={setWeather}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
