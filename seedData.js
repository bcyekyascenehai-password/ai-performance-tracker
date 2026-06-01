// Seed Data for AI Learning Tracker

const DEFAULT_STUDENTS = [
  { id: "s1", name: "Vinod Sir", joinedDate: "2026-05-01" },
  { id: "s2", name: "Aman", joinedDate: "2026-05-01" },
  { id: "s3", name: "Raghunath", joinedDate: "2026-05-02" },
  { id: "s4", name: "Shailesh", joinedDate: "2026-05-02" },
  { id: "s5", name: "Loukick", joinedDate: "2026-05-03" },
  { id: "s6", name: "Pranil", joinedDate: "2026-05-03" },
  { id: "s7", name: "Shubham", joinedDate: "2026-05-04" },
  { id: "s8", name: "Dinesh", joinedDate: "2026-05-04" }
];

const DEFAULT_SUBJECTS = [
  { 
    id: "sub1", 
    name: "Doc to PDF with AI", 
    description: "Converting documents to PDF using AI tools to create fully branded assets matching official guidelines.",
    deadline: "No active deadline"
  },
  { 
    id: "sub2", 
    name: "Index Option Tracker using Cloud", 
    description: "Building index option tracker HTML reports using cloud services.",
    deadline: "2026-05-30",
    participants: ["s1", "s2", "s3", "s4", "s7", "s8"] // Vinod Sir, Aman, Raghunath, Shailesh, Shubham, Dinesh
  }
];

// Sample grades to populate the app on first load.
// Points are on a scale of 0 to 100.
const DEFAULT_GRADES = [
  { 
    studentId: "s2", 
    subjectId: "sub1", 
    score: 95, 
    feedback: "Top Performer: Fully customized; followed brand guidelines. The 'Aman Standard': Aman's first sample is the current benchmark. It isn't just a conversion; it's a fully branded asset that matches our official guidelines. (Samples Shared: 2/3, Brand Alignment: ⭐⭐⭐⭐⭐)", 
    date: "2026-05-28" 
  },
  { 
    studentId: "s3", 
    subjectId: "sub1", 
    score: 60, 
    feedback: "In Progress (Draft shared) (Samples Shared: 1/3, Brand Alignment: ⚪ ⚪ ⚪ ⚪ ⚪)", 
    date: "2026-05-28" 
  },
  { 
    studentId: "s4", 
    subjectId: "sub1", 
    score: 60, 
    feedback: "In Progress (Draft shared) (Samples Shared: 1/3, Brand Alignment: ⚪ ⚪ ⚪ ⚪ ⚪)", 
    date: "2026-05-28" 
  },
  { 
    studentId: "s7", 
    subjectId: "sub1", 
    score: 60, 
    feedback: "In Progress (Draft shared) (Samples Shared: 1/3, Brand Alignment: ⚪ ⚪ ⚪ ⚪ ⚪)", 
    date: "2026-05-28" 
  },
  // Index Option Tracker (sub2) evaluations
  {
    studentId: "s1",
    subjectId: "sub2",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-05-30"
  },
  {
    studentId: "s2",
    subjectId: "sub2",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-05-30"
  },
  {
    studentId: "s3",
    subjectId: "sub2",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-05-30"
  },
  {
    studentId: "s4",
    subjectId: "sub2",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-05-30"
  },
  { 
    studentId: "s7", 
    subjectId: "sub2", 
    score: 80, 
    feedback: "Only Submission: Shared 1 sample before the deadline closed. (Samples Shared: 1/3, Brand Alignment: ⭐⭐⭐)", 
    date: "2026-05-30" 
  },
  {
    studentId: "s8",
    subjectId: "sub2",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-05-30"
  }
];
