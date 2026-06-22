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
  },
  {
    id: "sub3",
    name: "AI Mastermind Session",
    description: "Attendance and active participation in the AI Mastermind Session (31 May 2026).",
    deadline: "Completed"
  },
  {
    id: "sub4",
    name: "Google Flow - Shots Explorer, Scene Explorer, Simple Sketch",
    description: "Creating assets using Google Flow tools (Shots Explorer, Scene Explorer, Simple Sketch).",
    deadline: "2026-06-12"
  },
  {
    id: "sub5",
    name: "Google NotebookLM",
    description: "Research, audio generation, and notes compilation using Google NotebookLM.",
    deadline: "2026-06-18"
  },
  {
    id: "sub6",
    name: "Session for to make AI tools - 20/6/26",
    description: "Attendance, output submission and participation in the Session for to make AI tools on 20 June 2026.",
    deadline: "Completed"
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
  },
  // AI Mastermind Session (sub3) Attendance
  {
    studentId: "s1",
    subjectId: "sub3",
    score: 100,
    feedback: "Attended the AI Mastermind Session",
    date: "2026-05-31"
  },
  {
    studentId: "s2",
    subjectId: "sub3",
    score: 0,
    feedback: "Absent (No attendance logged)",
    date: "2026-05-31"
  },
  {
    studentId: "s3",
    subjectId: "sub3",
    score: 100,
    feedback: "Attended the AI Mastermind Session",
    date: "2026-05-31"
  },
  {
    studentId: "s4",
    subjectId: "sub3",
    score: 0,
    feedback: "Absent (No attendance logged)",
    date: "2026-05-31"
  },
  {
    studentId: "s5",
    subjectId: "sub3",
    score: 100,
    feedback: "Attended the AI Mastermind Session",
    date: "2026-05-31"
  },
  {
    studentId: "s6",
    subjectId: "sub3",
    score: 100,
    feedback: "Attended the AI Mastermind Session",
    date: "2026-05-31"
  },
  {
    studentId: "s7",
    subjectId: "sub3",
    score: 100,
    feedback: "Attended the AI Mastermind Session",
    date: "2026-05-31"
  },
  {
    studentId: "s8",
    subjectId: "sub3",
    score: 100,
    feedback: "Attended the AI Mastermind Session",
    date: "2026-05-31"
  },
  // Google Flow - Shots Explorer, Scene Explorer, Simple Sketch (sub4) evaluations
  {
    studentId: "s7",
    subjectId: "sub4",
    score: 100,
    feedback: "Top Performer: Fully completed all 3 samples with perfect brand alignment. (Samples Shared: 3/3, Brand Alignment: ⭐⭐⭐⭐⭐)",
    date: "2026-06-12"
  },
  {
    studentId: "s5",
    subjectId: "sub4",
    score: 100,
    feedback: "Top Performer: Fully completed all 3 samples with perfect brand alignment. (Samples Shared: 3/3, Brand Alignment: ⭐⭐⭐⭐⭐)",
    date: "2026-06-12"
  },
  {
    studentId: "s1",
    subjectId: "sub4",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-12"
  },
  {
    studentId: "s2",
    subjectId: "sub4",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-12"
  },
  {
    studentId: "s3",
    subjectId: "sub4",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-12"
  },
  {
    studentId: "s4",
    subjectId: "sub4",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-12"
  },
  {
    studentId: "s8",
    subjectId: "sub4",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-12"
  },
  {
    studentId: "s6",
    subjectId: "sub4",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-12"
  },
  // Google NotebookLM (sub5) evaluations
  {
    studentId: "s5",
    subjectId: "sub5",
    score: 100,
    feedback: "Top Performer: Completed all samples with excellent quality. (Samples Shared: 3/3, Brand Alignment: ⭐⭐⭐⭐⭐)",
    date: "2026-06-18"
  },
  {
    studentId: "s8",
    subjectId: "sub5",
    score: 70,
    feedback: "Shared 2 samples, needs prompt enhancement. (Samples Shared: 2/3, Brand Alignment: ⭐⭐⭐)",
    date: "2026-06-18"
  },
  {
    studentId: "s6",
    subjectId: "sub5",
    score: 80,
    feedback: "All 3 shared, but needs prompt enhancement. (Samples Shared: 3/3, Brand Alignment: ⭐⭐⭐)",
    date: "2026-06-18"
  },
  {
    studentId: "s1",
    subjectId: "sub5",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-18"
  },
  {
    studentId: "s2",
    subjectId: "sub5",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-18"
  },
  {
    studentId: "s3",
    subjectId: "sub5",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-18"
  },
  {
    studentId: "s4",
    subjectId: "sub5",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-18"
  },
  {
    studentId: "s7",
    subjectId: "sub5",
    score: 0,
    feedback: "❌ No Submission (Deadline Missed)",
    date: "2026-06-18"
  },
  {
    studentId: "s5",
    subjectId: "sub6",
    score: 100,
    feedback: "Attended session and shared output (Performance: ⭐⭐⭐⭐⭐)",
    date: "2026-06-20"
  },
  {
    studentId: "s8",
    subjectId: "sub6",
    score: 80,
    feedback: "Attended session and shared output (Performance: ⭐⭐⭐⭐)",
    date: "2026-06-20"
  },
  {
    studentId: "s6",
    subjectId: "sub6",
    score: 60,
    feedback: "Attended session and shared output (Performance: ⭐⭐⭐)",
    date: "2026-06-20"
  },
  {
    studentId: "s1",
    subjectId: "sub6",
    score: 0,
    feedback: "Absent: Left due to some urgent work",
    date: "2026-06-20"
  },
  {
    studentId: "s2",
    subjectId: "sub6",
    score: 0,
    feedback: "Absent: On leave",
    date: "2026-06-20"
  },
  {
    studentId: "s3",
    subjectId: "sub6",
    score: 0,
    feedback: "Absent: On leave",
    date: "2026-06-20"
  },
  {
    studentId: "s4",
    subjectId: "sub6",
    score: 80,
    feedback: "Attended session and shared output (Performance: ⭐⭐⭐⭐)",
    date: "2026-06-20"
  },
  {
    studentId: "s7",
    subjectId: "sub6",
    score: 100,
    feedback: "Attended session and shared output (Performance: ⭐⭐⭐⭐⭐)",
    date: "2026-06-20"
  }
];
