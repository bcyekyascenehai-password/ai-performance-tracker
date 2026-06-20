// Components Module for AI Tools Performance Tracker

// Helper to get student stats
function calculateStudentStats(studentId, state) {
  // Filter subjects where the student is actually participating
  const enrolledSubjects = state.subjects.filter(s => !s.participants || s.participants.includes(studentId));
  const enrolledSubjectIds = enrolledSubjects.map(s => s.id);
  
  const studentGrades = state.grades.filter(g => g.studentId === studentId && enrolledSubjectIds.includes(g.subjectId));
  const enrolledCount = enrolledSubjects.length;
  
  if (enrolledCount === 0) {
    return { average: 0, completedCount: 0, enrolledCount: 0, strength: "None", weakness: "None" };
  }
  
  const sum = studentGrades.reduce((acc, g) => acc + g.score, 0);
  const average = studentGrades.length > 0 ? Math.round((sum / studentGrades.length) * 10) / 10 : 0;
  
  // Find strength and weakness
  let bestGrade = { score: -1, subjectId: "" };
  let worstGrade = { score: 101, subjectId: "" };
  
  studentGrades.forEach(g => {
    if (g.score > bestGrade.score) bestGrade = g;
    if (g.score < worstGrade.score) worstGrade = g;
  });
  
  const strengthSub = state.subjects.find(s => s.id === bestGrade.subjectId);
  const weaknessSub = state.subjects.find(s => s.id === worstGrade.subjectId);
  
  return {
    average,
    completedCount: studentGrades.length,
    enrolledCount,
    strength: strengthSub ? strengthSub.name : "N/A",
    weakness: weaknessSub ? weaknessSub.name : "N/A"
  };
}

// Helper to compute rankings for all students
function getRankings(state) {
  return state.students.map(student => {
    const stats = calculateStudentStats(student.id, state);
    return {
      ...student,
      average: stats.average,
      completedCount: stats.completedCount,
      enrolledCount: stats.enrolledCount,
      strength: stats.strength,
      weakness: stats.weakness
    };
  }).sort((a, b) => b.average - a.average);
}

// HELPER: SVG Icon Generator
function getIconHtml(iconName) {
  const icons = {
    trophy: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"/></svg>`,
    award: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    export: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    import: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>`,
    reset: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.72 2.78L21 8"/><path d="M21 3v5h-5"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    badge: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-alert"><path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2c.5.13.76.62.76 1.05z"/></svg>`
  };
  return icons[iconName] || "";
}

// ----------------------------------------------------
// 1. LEADERBOARD VIEW
// ----------------------------------------------------
function renderLeaderboard(state) {
  const ranked = getRankings(state);
  
  if (ranked.length === 0) {
    return `<div class="glass-panel" style="padding: 3rem; text-align: center; color: var(--text-secondary);">No student data available. Head to Admin Panel to add students!</div>`;
  }
  
  // Identify top 3
  const top1 = ranked[0] || null;
  const top2 = ranked[1] || null;
  const top3 = ranked[2] || null;
  const rest = ranked.slice(3);
  
  // Custom helper for avatar initials
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  // Badge thresholds
  const getBadgeName = (avg) => {
    if (avg >= 95) return "AI Sage 👑";
    if (avg >= 90) return "Master Promptist ⚡";
    if (avg >= 80) return "Co-Pilot Pro 🚀";
    if (avg >= 70) return "AI Navigator 🗺️";
    return "AI Cadet 🌱";
  };
  
  // Render podium columns
  let podiumHtml = "";
  if (top1 || top2 || top3) {
    podiumHtml = `
      <div class="podium-container">
        <!-- 2nd Place -->
        ${top2 ? `
          <div class="podium-column second">
            <div class="podium-avatar">
              ${getInitials(top2.name)}
              <div class="podium-badge">2</div>
            </div>
            <div class="podium-box">
              <div class="podium-name">${top2.name}</div>
              <div class="podium-score">${top2.average}<span class="points-text">pts</span></div>
              <div class="badge-tag" style="margin-top: 0.5rem; font-size: 0.65rem;">${getBadgeName(top2.average)}</div>
            </div>
          </div>
        ` : ''}
        
        <!-- 1st Place -->
        ${top1 ? `
          <div class="podium-column first">
            <div class="podium-avatar">
              ${getInitials(top1.name)}
              <div class="podium-badge">1</div>
            </div>
            <div class="podium-box">
              <div class="podium-name" style="font-weight: 700;">${top1.name}</div>
              <div class="podium-score" style="color: #ffd700;">${top1.average}<span class="points-text">pts</span></div>
              <div class="badge-tag" style="margin-top: 0.5rem; font-size: 0.65rem; background: rgba(255, 215, 0, 0.12); color: #ffd700; border-color: rgba(255, 215, 0, 0.2);">${getBadgeName(top1.average)}</div>
            </div>
          </div>
        ` : ''}
        
        <!-- 3rd Place -->
        ${top3 ? `
          <div class="podium-column third">
            <div class="podium-avatar">
              ${getInitials(top3.name)}
              <div class="podium-badge">3</div>
            </div>
            <div class="podium-box">
              <div class="podium-name">${top3.name}</div>
              <div class="podium-score">${top3.average}<span class="points-text">pts</span></div>
              <div class="badge-tag" style="margin-top: 0.5rem; font-size: 0.65rem; background: rgba(205, 127, 50, 0.12); color: #ffc078; border-color: rgba(205, 127, 50, 0.2);">${getBadgeName(top3.average)}</div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  // Render main ranking table
  let tableRows = ranked.map((student, index) => {
    return `
      <tr class="leaderboard-row">
        <td>
          <div class="rank-badge">${index + 1}</div>
        </td>
        <td>
          <div class="student-info">
            <div class="student-avatar">${getInitials(student.name)}</div>
            <div>
              <div style="font-weight: 600;">${student.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary)">Joined ${student.joinedDate}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="badge-tag">${getBadgeName(student.average)}</span>
        </td>
        <td>
          <div style="color: var(--text-secondary); font-size: 0.9rem;">
            ${student.completedCount} / ${student.enrolledCount} subjects completed
          </div>
        </td>
        <td>
          <div class="score-badge text-gradient">${student.average} <span class="points-text">pts</span></div>
        </td>
      </tr>
    `;
  }).join('');
  
  // Render subject-wise mini leaderboards
  let miniBoardsHtml = "";
  if (state.subjects.length > 0) {
    miniBoardsHtml = state.subjects.map(subject => {
      // Get all grades for this subject
      const subjectGrades = state.grades
        .filter(g => g.subjectId === subject.id)
        .map(g => {
          const student = state.students.find(s => s.id === g.studentId);
          return {
            name: student ? student.name : "Unknown",
            score: g.score
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Get top 3
        
      let listItems = "";
      if (subjectGrades.length === 0) {
        listItems = `<div style="padding: 1rem; text-align: center; font-size: 0.8rem; color: var(--text-muted)">No grades entered yet</div>`;
      } else {
        listItems = subjectGrades.map((g, idx) => `
          <div class="mini-board-item">
            <span class="mini-board-name">
              <span style="color: var(--text-muted); margin-right: 0.5rem; font-weight: 700;">#${idx + 1}</span>
              ${g.name}
            </span>
            <span class="mini-board-score">${g.score} <span style="font-size: 0.7rem; color: var(--text-secondary)">pts</span></span>
          </div>
        `).join('');
      }
      
      return `
        <div class="glass-panel" style="overflow: hidden;">
          <div class="mini-board-title">
            <span style="font-weight: 700;">${subject.name}</span>
            <span style="font-size: 0.75rem; color: var(--text-secondary)">Leader</span>
          </div>
          <div class="mini-board-list">
            ${listItems}
          </div>
        </div>
      `;
    }).join('');
  }
  
  return `
    <div class="tab-content" id="view-leaderboard">
      
      <!-- Onboarding Welcome Banner -->
      <div class="glass-panel study-hero-banner" style="margin-bottom: 2.5rem; padding: 2rem; position: relative;">
        <div style="position: absolute; right: 2rem; top: 1.5rem; opacity: 0.08; font-size: 5.5rem; pointer-events: none; user-select: none;">🎓</div>
        <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; color: #fff;">
          AI Learning Lab Tracker
        </h2>
        <p style="color: var(--text-secondary); max-width: 850px; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem;">
          Welcome to the cohort dashboard! This page monitors learning growth, practical assignments scores, and time-based performance milestones across advanced AI tools. It is designed to help team members track their progress transparently.
        </p>
        <div class="hero-steps-grid" style="border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
          <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
            <div class="step-card-num" style="background: rgba(0, 242, 254, 0.1); color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.2);">1</div>
            <div>
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">🏆 Cohort Rankings</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Compare average marks, check leaderboard standings, and view subject-wise champions below.</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
            <div class="step-card-num" style="background: rgba(127, 0, 255, 0.15); color: #c084fc; border: 1px solid rgba(127, 0, 255, 0.2);">2</div>
            <div>
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">📊 Skills Radar Map</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Switch to the <b>Learner Dashboard</b> above to inspect detailed capabilities maps and teacher reviews.</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
            <div class="step-card-num" style="background: rgba(56, 239, 125, 0.1); color: #38ef7d; border: 1px solid rgba(56, 239, 125, 0.2);">3</div>
            <div>
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem;">⚡ Automatic Database Sync</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Updates submitted in the <b>Management View</b> sync instantly to everyone's device via GitHub.</p>
            </div>
          </div>
        </div>
      </div>
      
      ${podiumHtml}
      
      <div class="glass-panel leaderboard-table-container">
        <div class="mini-board-title" style="border-bottom: 1px solid var(--border-color); font-weight: 700; padding: 1.25rem 1.5rem;">
          Cohort Ranking Table
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style="width: 80px;">Rank</th>
                <th>Learner</th>
                <th>Achievement Badge</th>
                <th>Coverage</th>
                <th>Avg Score</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      </div>
      
      <h3 class="section-title" style="margin-top: 4rem; font-size: 1.5rem;">
        ${getIconHtml('award')} Subject Leaders
      </h3>
      <div class="grid-container-2">
        ${miniBoardsHtml}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// 2. STUDENT DASHBOARD VIEW
// ----------------------------------------------------
function renderStudentDashboard(state, activeStudentId, onStudentChange) {
  if (state.students.length === 0) {
    return `<div class="glass-panel" style="padding: 3rem; text-align: center; color: var(--text-secondary);">No student data available. Head to Admin Panel to add students!</div>`;
  }
  
  const currentStudentId = activeStudentId || state.students[0].id;
  const currentStudent = state.students.find(s => s.id === currentStudentId) || state.students[0];
  
  // Calculate rankings to find rank index
  const rankings = getRankings(state);
  const rankIndex = rankings.findIndex(s => s.id === currentStudent.id) + 1;
  
  const stats = calculateStudentStats(currentStudent.id, state);
  
  // Options for student selector
  const selectOptionsHtml = state.students.map(s => `
    <option value="${s.id}" ${s.id === currentStudent.id ? 'selected' : ''}>${s.name}</option>
  `).join('');
  
  // Calculate student timeline/grades feed
  const studentGrades = state.grades
    .filter(g => g.studentId === currentStudent.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
    
  let timelineItemsHtml = "";
  if (studentGrades.length === 0) {
    timelineItemsHtml = `<div style="text-align: center; color: var(--text-secondary); padding: 2rem;">No grades or comments posted for this learner yet.</div>`;
  } else {
    timelineItemsHtml = studentGrades.map(g => {
      const subject = state.subjects.find(s => s.id === g.subjectId);
      return `
        <div class="timeline-item">
          <div class="timeline-marker">${g.score}</div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-subject">${subject ? subject.name : "Deleted Subject"}</span>
              <span class="timeline-date">${g.date}</span>
            </div>
            <div class="timeline-feedback">${g.feedback || "No additional comments left by teacher."}</div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Draw the SVG Progress radar/bar chart
  // Let's draw a stunning horizontal bar chart inside the dashboard
  let barChartsHtml = "";
  if (state.subjects.length > 0) {
    barChartsHtml = state.subjects.map(subject => {
      const isEnrolled = !subject.participants || subject.participants.includes(currentStudent.id);
      const grade = state.grades.find(g => g.studentId === currentStudent.id && g.subjectId === subject.id);
      const score = grade ? grade.score : 0;
      const isGraded = grade !== undefined;
      
      // Select bar color based on score
      let colorClass = "var(--grad-primary)";
      if (!isEnrolled) {
        colorClass = "rgba(255, 255, 255, 0.05)";
      } else if (score >= 90) {
        colorClass = "var(--grad-success)";
      } else if (score < 75) {
        colorClass = "var(--grad-warning)";
      }
      
      // Render deadline tag
      const deadlineHtml = isEnrolled && subject.deadline && subject.deadline !== "No active deadline"
        ? `<span style="font-size: 0.7rem; background: rgba(248, 87, 166, 0.15); color: #f857a6; border: 1px solid rgba(248, 87, 166, 0.25); padding: 0.15rem 0.4rem; border-radius: 4px; margin-left: 0.5rem; font-weight: 600;">Due ${subject.deadline}</span>`
        : "";
        
      // Render status text
      let statusText = "Not Graded Yet";
      if (!isEnrolled) {
        statusText = "Not Enrolled";
      } else if (isGraded) {
        statusText = `${score} / 100`;
      }
      
      return `
        <div style="margin-bottom: 1.5rem; opacity: ${isEnrolled ? 1 : 0.4};">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.5rem; align-items: center; flex-wrap: wrap; gap: 0.25rem;">
            <span style="font-weight: 600; display: inline-flex; align-items: center;">
              ${subject.name}
              ${deadlineHtml}
            </span>
            <span style="font-weight: 700; ${isGraded && isEnrolled ? 'color: #00f2fe;' : 'color: var(--text-muted);'}">
              ${statusText}
            </span>
          </div>
          <div style="width: 100%; height: 10px; background: rgba(255, 255, 255, 0.05); border-radius: 5px; overflow: hidden; border: 1px solid var(--border-color);">
            <div style="width: ${isEnrolled ? score : 0}%; height: 100%; background: ${colorClass}; border-radius: 5px; box-shadow: ${isEnrolled && isGraded ? 'var(--shadow-glow)' : 'none'}; transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);"></div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Custom Dynamic SVG Visualization
  // A beautiful SVG Radar/Polygon graphic indicating AI capabilities
  const drawCapabilitiesRadar = () => {
    const size = 300;
    const center = size / 2;
    const radius = 90;
    const subjectsCount = state.subjects.length;
    
    if (subjectsCount < 3) {
      // Fallback: draw a simple progress circle
      const scorePercentage = stats.average;
      const circ = 2 * Math.PI * 50;
      const offset = circ - (scorePercentage / 100) * circ;
      return `
        <svg width="220" height="220" viewBox="0 0 120 120" style="margin: 0 auto;">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="8"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="url(#radialGlow)" stroke-width="8" 
                  stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"
                  transform="rotate(-90 60 60)"/>
          <defs>
            <linearGradient id="radialGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00f2fe" />
              <stop offset="100%" stop-color="#4facfe" />
            </linearGradient>
          </defs>
          <text x="60" y="65" text-anchor="middle" font-family="Outfit" font-weight="800" font-size="18" fill="#fff">${stats.average}</text>
          <text x="60" y="80" text-anchor="middle" font-family="Inter" font-weight="500" font-size="7" fill="var(--text-secondary)">OVERALL PTS</text>
        </svg>
      `;
    }
    
    // Compute vertices
    const points = [];
    const maxVal = 100;
    
    state.subjects.forEach((subject, i) => {
      const grade = state.grades.find(g => g.studentId === currentStudent.id && g.subjectId === subject.id);
      const score = grade ? grade.score : 30; // default 30 for visualization if ungraded
      
      const angle = (Math.PI * 2 / subjectsCount) * i - Math.PI / 2;
      const distance = (score / maxVal) * radius;
      
      const x = center + distance * Math.cos(angle);
      const y = center + distance * Math.sin(angle);
      points.push({ x, y });
    });
    
    // Web grids
    let gridsHtml = "";
    for (let level = 1; level <= 4; level++) {
      const levelRadius = (radius / 4) * level;
      const levelPoints = [];
      for (let i = 0; i < subjectsCount; i++) {
        const angle = (Math.PI * 2 / subjectsCount) * i - Math.PI / 2;
        const lx = center + levelRadius * Math.cos(angle);
        const ly = center + levelRadius * Math.sin(angle);
        levelPoints.push(`${lx},${ly}`);
      }
      gridsHtml += `<polygon points="${levelPoints.join(' ')}" class="radar-level" />`;
    }
    
    // Axes and Labels
    let axesHtml = "";
    let labelsHtml = "";
    state.subjects.forEach((subject, i) => {
      const angle = (Math.PI * 2 / subjectsCount) * i - Math.PI / 2;
      const ax = center + radius * Math.cos(angle);
      const ay = center + radius * Math.sin(angle);
      
      // Axes lines
      axesHtml += `<line x1="${center}" y1="${center}" x2="${ax}" y2="${ay}" class="radar-axis" />`;
      
      // Subject labels text positioning slightly offset from axis end
      const labelDistance = radius + 22;
      const tx = center + labelDistance * Math.cos(angle);
      const ty = center + labelDistance * Math.sin(angle) + 4; // slight vertical adjust
      
      // Truncate subject names for space
      const name = subject.name.length > 12 ? subject.name.substring(0, 10) + ".." : subject.name;
      labelsHtml += `<text x="${tx}" y="${ty}" class="chart-label-text">${name}</text>`;
    });
    
    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
    
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="margin: 0 auto;">
        ${gridsHtml}
        ${axesHtml}
        <polygon points="${polygonPoints}" class="radar-poly-fill" />
        ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" class="radar-poly-point" />`).join('')}
        ${labelsHtml}
      </svg>
    `;
  };

  return `
    <div class="tab-content" id="view-dashboard">
      <div class="dashboard-controls">
        <div>
          <h2 class="section-title" style="margin-bottom: 0.25rem;">
            ${getIconHtml('user')} Learner Performance Center
          </h2>
          <p style="color: var(--text-secondary);">Visualize skills profiles, academic scores, and constructive comments.</p>
        </div>
        <div class="select-container">
          <select id="dashboard-student-select">
            ${selectOptionsHtml}
          </select>
        </div>
      </div>
      
      <!-- Key Stats Grid -->
      <div class="grid-container-4">
        <div class="glass-panel stat-card" style="border-left: 3px solid #00f2fe; position: relative;">
          <div style="position: absolute; right: 1rem; top: 1rem; font-size: 1.25rem; opacity: 0.8;">📈</div>
          <span class="stat-label">Average Mark</span>
          <span class="stat-val text-gradient">${stats.average}<span class="points-text" style="font-size: 1.25rem;">%</span></span>
          <span class="stat-desc">Across ${stats.completedCount} graded courses</span>
        </div>
        <div class="glass-panel stat-card" style="border-left: 3px solid #ffd700; position: relative;">
          <div style="position: absolute; right: 1rem; top: 1rem; font-size: 1.25rem; opacity: 0.8;">🏆</div>
          <span class="stat-label">Cohort Rank</span>
          <span class="stat-val" style="color: #ffd700;">#${rankIndex}</span>
          <span class="stat-desc">Out of ${state.students.length} students</span>
        </div>
        <div class="glass-panel stat-card" style="border-left: 3px solid #38ef7d; position: relative;">
          <div style="position: absolute; right: 1rem; top: 1rem; font-size: 1.25rem; opacity: 0.8;">💪</div>
          <span class="stat-label">Core Strength</span>
          <span class="stat-val" style="font-size: 1.15rem; color: #38ef7d; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 0.75rem; max-width: calc(100% - 24px);">
            ${stats.strength}
          </span>
          <span class="stat-desc">Highest scoring subject</span>
        </div>
        <div class="glass-panel stat-card" style="border-left: 3px solid #ff5858; position: relative;">
          <div style="position: absolute; right: 1rem; top: 1rem; font-size: 1.25rem; opacity: 0.8;">🎯</div>
          <span class="stat-label">Focus Area</span>
          <span class="stat-val" style="font-size: 1.15rem; color: #ff5858; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 0.75rem; max-width: calc(100% - 24px);">
            ${stats.weakness}
          </span>
          <span class="stat-desc">Lowest scoring subject</span>
        </div>
      </div>
      
      <!-- Charts Grid -->
      <div class="analytics-section">
        <!-- Horizontal Progress Bars -->
        <div class="glass-panel chart-card" style="align-items: stretch; justify-content: flex-start;">
          <h3 class="chart-title" style="display: flex; align-items: center; gap: 0.5rem;">
            ${getIconHtml('chart')} Skill Distribution
          </h3>
          <div style="margin-top: 1rem;">
            ${barChartsHtml}
          </div>
        </div>
        
        <!-- SVG Capability Map -->
        <div class="glass-panel chart-card">
          <h3 class="chart-title" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center;">
            ${getIconHtml('badge')} AI Capabilities radar
          </h3>
          <div class="chart-container">
            ${drawCapabilitiesRadar()}
          </div>
        </div>
      </div>
      
      <!-- Grading Timeline -->
      <div class="glass-panel timeline-card">
        <h3 style="font-size: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          ${getIconHtml('award')} Feedback Timeline & Evaluations
        </h3>
        <div class="timeline-list">
          ${timelineItemsHtml}
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// 3. ADMIN PANEL VIEW
// ----------------------------------------------------
function renderAdminPanel(state, actions) {
  // If not authenticated, render auth lock screen
  if (!state.isAdminAuthenticated) {
    return `
      <div class="tab-content" id="view-admin">
        <div class="auth-overlay-container">
          <div class="glass-panel auth-card">
            <div class="auth-icon">🔒</div>
            <h3>Management Access</h3>
            <p>Please enter the administrative passcode to log marks, add courses, and sync database.</p>
            <form id="admin-auth-form" class="auth-form">
              <div class="form-group" style="text-align: left;">
                <label for="admin-passcode">Access Passcode</label>
                <input type="password" id="admin-passcode" placeholder="••••••••" required autocomplete="current-password">
              </div>
              <button type="submit" class="btn btn-primary" style="justify-content: center; width: 100%;">
                Authenticate
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  // Options for form dropdowns
  const studentOptionsHtml = state.students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  const subjectOptionsHtml = state.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  
  const githubPat = localStorage.getItem('github_pat') || '';
  const isPatConfigured = githubPat.length > 0;
  const statusHtml = isPatConfigured 
    ? `<span style="color: #38ef7d; font-weight: 500;">✓ Auto-Sync Active (Token saved locally)</span> <button id="clear-github-token-btn" class="btn btn-outline" style="padding: 0.15rem 0.4rem; font-size: 0.65rem; border-color: rgba(239, 68, 68, 0.3); color: #f87171; margin-left: 0.5rem; border-radius: 4px; display: inline-flex; align-items: center; cursor: pointer;">Deactivate</button>`
    : `<span style="color: var(--text-muted);">⚠️ Local Only Mode: Changes won't sync to other users until a token is set.</span>`;

  // List of students for editing
  const studentsListHtml = state.students.map(student => `
    <div class="list-item">
      <div>
        <span class="list-item-title">${student.name}</span>
        <div class="list-item-desc">ID: ${student.id} | Joined ${student.joinedDate}</div>
      </div>
      <div class="list-item-actions">
        <button class="action-icon-btn delete delete-student-btn" data-id="${student.id}" title="Remove Learner">
          ${getIconHtml('trash')}
        </button>
      </div>
    </div>
  `).join('');
  
  // List of subjects for editing
  const subjectsListHtml = state.subjects.map(subject => `
    <div class="list-item">
      <div>
        <span class="list-item-title">${subject.name}</span>
        <div class="list-item-desc">${subject.description || "No description."}</div>
      </div>
      <div class="list-item-actions">
        <button class="action-icon-btn delete delete-subject-btn" data-id="${subject.id}" title="Remove Subject">
          ${getIconHtml('trash')}
        </button>
      </div>
    </div>
  `).join('');

  return `
    <div class="tab-content" id="view-admin">
      <div class="admin-section">
        
        <!-- Controls bar -->
        <div class="admin-header">
          <div>
            <h2 class="section-title" style="margin-bottom: 0.25rem;">
              ${getIconHtml('lock')} Cohort Management panel
            </h2>
            <p style="color: var(--text-secondary);">Add scores, update course catalog, export backup JSON, or restore database state.</p>
          </div>
          <div class="admin-controls-bar">
            <button id="admin-export-btn" class="btn btn-outline">
              ${getIconHtml('export')} Export Data
            </button>
            <button id="admin-import-trigger" class="btn btn-outline">
              ${getIconHtml('import')} Import Data
            </button>
            <input type="file" id="admin-import-input" accept=".json" style="display: none;">
            <button id="admin-reset-btn" class="btn btn-danger">
              ${getIconHtml('reset')} Seed Reset
            </button>
            <button id="admin-logout-btn" class="btn btn-outline" style="border-color: rgba(239, 68, 68, 0.4); color: #f87171;">
              Logout
            </button>
          </div>
        </div>
        
        <!-- GitHub Sync Configuration Card -->
        <div class="glass-panel form-panel" style="margin-bottom: 2rem; border-left: 3px solid #00f2fe;">
          <h3 class="form-title" style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">⚡ GitHub Auto-Sync Database</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">
            Configure your GitHub Personal Access Token (PAT) with <code>repo</code> scope to automatically save and publish all evaluations, learners, and courses to the public repository. Once set up, any changes you make will instantly be visible to all users who visit the tracker.
          </p>
          <div style="display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;">
            <div class="form-group" style="margin-bottom: 0; flex: 1; min-width: 250px;">
              <label for="github-pat-input" style="font-size: 0.8rem; font-weight: 600;">GitHub Personal Access Token (PAT)</label>
              <input type="password" id="github-pat-input" placeholder="${isPatConfigured ? '••••••••••••••••••••••••••••••••••••' : 'ghp_your_github_token'}" style="width: 100%; margin-top: 0.5rem;">
            </div>
            <div class="form-actions" style="margin-top: 0; padding-top: 0;">
              <button id="save-github-token-btn" class="btn btn-accent" style="height: 42px;">Save Token</button>
            </div>
          </div>
          <div id="github-sync-status" style="font-size: 0.8rem; margin-top: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
            ${statusHtml}
          </div>
        </div>

        <!-- Main Form Panel -->
        <div class="glass-panel form-panel">
          <h3 class="form-title">📝 Evaluate Performance & Log Grade</h3>
          <form id="grade-entry-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="grade-student-select">Select Learner</label>
                <select id="grade-student-select" required>
                  ${studentOptionsHtml}
                </select>
              </div>
              <div class="form-group">
                <label for="grade-subject-select">Select Subject</label>
                <select id="grade-subject-select" required>
                  ${subjectOptionsHtml}
                </select>
              </div>
              <div class="form-group">
                <label for="grade-score">Numerical Mark (0 - 100)</label>
                <input type="number" id="grade-score" min="0" max="100" placeholder="e.g. 88" required>
              </div>
              <div class="form-group">
                <label for="grade-date">Date of Evaluation</label>
                <input type="date" id="grade-date" required>
              </div>
              <div class="form-group form-group-full">
                <label for="grade-feedback">Written Assessment / Performance Comments</label>
                <textarea id="grade-feedback" placeholder="Provide constructive feedback about the learner's prompt structuring, workflow design, error handling, etc." required></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-accent">Save Evaluation</button>
            </div>
          </form>
        </div>
        
        <!-- Columns for Course and Cohort Management -->
        <div class="management-grid">
          <!-- Student list -->
          <div class="glass-panel list-panel">
            <div class="list-panel-header">
              <h3 style="font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                👥 Manage Cohort Learners (${state.students.length})
              </h3>
            </div>
            <div class="list-items">
              ${studentsListHtml}
            </div>
            <form id="add-student-form" class="add-item-form">
              <input type="text" id="new-student-name" placeholder="Full name of student" required style="flex: 1; padding: 0.5rem 0.75rem; font-size: 0.85rem;">
              <button type="submit" class="btn btn-primary" style="padding: 0.5rem 0.75rem;">
                ${getIconHtml('plus')} Add
              </button>
            </form>
          </div>
          
          <!-- Subject list -->
          <div class="glass-panel list-panel">
            <div class="list-panel-header">
              <h3 style="font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                📚 Course & Subject Syllabus (${state.subjects.length})
              </h3>
            </div>
            <div class="list-items">
              ${subjectsListHtml}
            </div>
            <form id="add-subject-form" class="add-item-form" style="flex-direction: column; gap: 0.5rem;">
              <input type="text" id="new-subject-name" placeholder="Subject Name (e.g. Claude Projects)" required style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">
              <input type="text" id="new-subject-desc" placeholder="Brief subject details" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">
              <button type="submit" class="btn btn-primary" style="padding: 0.5rem 0.75rem; align-self: flex-end;">
                ${getIconHtml('plus')} Add Subject
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  `;
}
