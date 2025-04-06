
export interface ExamPaper {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  questions: number;
  image: string;
}

export interface PracticePaper {
  id: string;
  title: string;
  description: string;
  level: string;
  topics: string[];
  downloadUrl: string;
  image: string;
}

export interface ProgressData {
  date: string;
  score: number;
}

export interface UserProgress {
  userId: string;
  name: string;
  email: string;
  averageScore: number;
  completedExams: number;
  progressData: ProgressData[];
}

export const exams: ExamPaper[] = [
  {
    id: "exam-1",
    title: "Foundation Level Abacus",
    description: "Basic abacus operations including addition and subtraction",
    level: "Beginner",
    duration: 60,
    questions: 25,
    image: "/placeholder.svg",
  },
  {
    id: "exam-2",
    title: "Intermediate Abacus Skills",
    description: "Addition, subtraction, and multiplication techniques",
    level: "Intermediate",
    duration: 90,
    questions: 35,
    image: "/placeholder.svg",
  },
  {
    id: "exam-3",
    title: "Advanced Abacus Techniques",
    description: "Complex calculations and mental math techniques",
    level: "Advanced",
    duration: 120,
    questions: 50,
    image: "/placeholder.svg",
  },
  {
    id: "exam-4",
    title: "Master Abacus Certification",
    description: "Comprehensive assessment for master level certification",
    level: "Master",
    duration: 180,
    questions: 75,
    image: "/placeholder.svg",
  },
];

export const practicePapers: PracticePaper[] = [
  {
    id: "practice-1",
    title: "Addition Practice Set",
    description: "Practice sheets for basic addition using abacus",
    level: "Beginner",
    topics: ["Addition", "Number recognition"],
    downloadUrl: "#",
    image: "/placeholder.svg",
  },
  {
    id: "practice-2",
    title: "Subtraction Worksheets",
    description: "Complete subtraction practice for beginners",
    level: "Beginner",
    topics: ["Subtraction", "Borrowing technique"],
    downloadUrl: "#",
    image: "/placeholder.svg",
  },
  {
    id: "practice-3",
    title: "Multiplication Drills",
    description: "Practice sets for multiplication on abacus",
    level: "Intermediate",
    topics: ["Multiplication", "Pattern recognition"],
    downloadUrl: "#",
    image: "/placeholder.svg",
  },
  {
    id: "practice-4",
    title: "Division Practice",
    description: "Complete guide to division using abacus",
    level: "Intermediate",
    topics: ["Division", "Remainder calculation"],
    downloadUrl: "#",
    image: "/placeholder.svg",
  },
  {
    id: "practice-5",
    title: "Mental Math Exercises",
    description: "Advanced mental calculation practice without abacus",
    level: "Advanced",
    topics: ["Visualization", "Speed calculation", "Memory techniques"],
    downloadUrl: "#",
    image: "/placeholder.svg",
  },
  {
    id: "practice-6",
    title: "Mixed Operations Challenge",
    description: "Combined operations practice for advanced students",
    level: "Advanced",
    topics: ["Mixed operations", "Problem solving", "Time management"],
    downloadUrl: "#",
    image: "/placeholder.svg",
  },
];

export const demoUser: UserProgress = {
  userId: "user-1",
  name: "Alex Johnson",
  email: "alex@example.com",
  averageScore: 78,
  completedExams: 12,
  progressData: [
    { date: "2023-01-15", score: 62 },
    { date: "2023-02-10", score: 68 },
    { date: "2023-03-05", score: 71 },
    { date: "2023-04-20", score: 75 },
    { date: "2023-05-15", score: 79 },
    { date: "2023-06-30", score: 82 },
    { date: "2023-07-25", score: 85 },
    { date: "2023-08-18", score: 83 },
    { date: "2023-09-14", score: 88 },
    { date: "2023-10-20", score: 90 },
    { date: "2023-11-15", score: 87 },
    { date: "2023-12-10", score: 93 },
  ],
};
