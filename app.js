// Main Application Logic - AI Tools Learning Tracker

// --- State Definition ---
const STATE_KEY = 'ai_tracker_state';
let state = {
  students: [],
  subjects: [],
  grades: [],
  activeTab: 'leaderboard', // 'leaderboard' | 'dashboard' | 'admin'
  activeStudentId: null,
  isAdminAuthenticated: false
};

// --- Remote Synchronization ---
async function fetchRemoteData() {
  const owner = 'bcyekyascenehai-password';
  const repo = 'ai-performance-tracker';
  const path = 'data.json';
  const remoteUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}?t=${Date.now()}`;
  
  try {
    const res = await fetch(remoteUrl);
    if (res.status === 200) {
      const data = await res.json();
      state.students = data.students || [];
      state.subjects = data.subjects || [];
      state.grades = data.grades || [];
      
      // Update local storage cache
      localStorage.setItem(STATE_KEY, JSON.stringify({
        students: state.students,
        subjects: state.subjects,
        grades: state.grades
      }));
      console.log("Database successfully synced with GitHub raw content.");
      return true;
    }
  } catch (e) {
    console.warn("Failed to fetch remote data, using local fallback", e);
  }
  return false;
}

async function syncToGitHub(updatedData) {
  const token = localStorage.getItem('github_pat');
  if (!token) {
    console.log("No GitHub token configured, running in local-only mode.");
    return;
  }
  
  const owner = 'bcyekyascenehai-password';
  const repo = 'ai-performance-tracker';
  const path = 'data.json';
  
  try {
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const getRes = await fetch(getUrl, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    let sha = null;
    if (getRes.status === 200) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }
    
    const putRes = await fetch(getUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Sync database: ${new Date().toLocaleString()}`,
        content: btoa(unescape(encodeURIComponent(JSON.stringify({
          students: updatedData.students,
          subjects: updatedData.subjects,
          grades: updatedData.grades
        }, null, 2)))),
        sha: sha,
        branch: 'main'
      })
    });
    
    if (putRes.status === 200 || putRes.status === 201) {
      window.showToast("Database successfully published to GitHub!");
    } else {
      const errData = await putRes.json();
      window.showToast(`GitHub Publish Failed: ${errData.message}`, "error");
    }
  } catch (error) {
    console.error("Error syncing to GitHub", error);
    window.showToast("Error syncing to GitHub", "error");
  }
}

// --- Initialization ---
async function init() {
  loadState();
  render();
  
  // Fetch fresh remote data asynchronously
  const loadedRemote = await fetchRemoteData();
  if (loadedRemote) {
    if (state.students.length > 0 && (!state.activeStudentId || !state.students.some(s => s.id === state.activeStudentId))) {
      state.activeStudentId = state.students[0].id;
    }
    render();
  }
  
  if (state.students.length > 0 && !state.activeStudentId) {
    state.activeStudentId = state.students[0].id;
  }
  
  // Set active tab in UI
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });
  
  // Add listeners for dynamic contents (delegated events)
  setupEventListeners();
  
  render();
}

// --- LocalStorage Sync ---
function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state.students = parsed.students || [];
      state.subjects = parsed.subjects || [];
      state.grades = parsed.grades || [];
      
      // Auto-migrate: check if there are new subjects in seedData.js that are missing from localStorage
      let hasMigration = false;
      DEFAULT_SUBJECTS.forEach(defSub => {
        if (!state.subjects.some(s => s.id === defSub.id)) {
          state.subjects.push(defSub);
          const defGrades = DEFAULT_GRADES.filter(g => g.subjectId === defSub.id);
          state.grades.push(...defGrades);
          hasMigration = true;
        }
      });
      if (hasMigration) {
        saveState();
      }
    } else {
      // Seed default data
      state.students = [...DEFAULT_STUDENTS];
      state.subjects = [...DEFAULT_SUBJECTS];
      state.grades = [...DEFAULT_GRADES];
      saveState();
    }
  } catch (e) {
    console.error("Error reading localStorage, using defaults", e);
    state.students = [...DEFAULT_STUDENTS];
    state.subjects = [...DEFAULT_SUBJECTS];
    state.grades = [...DEFAULT_GRADES];
  }
  
  const isAdmin = sessionStorage.getItem('ai_tracker_admin_session');
  state.isAdminAuthenticated = isAdmin === 'true';
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify({
    students: state.students,
    subjects: state.subjects,
    grades: state.grades
  }));
  
  // Push updates to GitHub in the background
  syncToGitHub(state);
}

// --- Routing & View Switches ---
function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Update button active state
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'admin-active');
    if (btn.dataset.tab === tabId) {
      if (tabId === 'admin') {
        btn.classList.add('active', 'admin-active');
      } else {
        btn.classList.add('active');
      }
    }
  });
  
  render();
}

// --- Render Loop ---
function render() {
  const contentArea = document.getElementById('main-content');
  if (!contentArea) return;
  
  switch (state.activeTab) {
    case 'leaderboard':
      contentArea.innerHTML = renderLeaderboard(state);
      break;
    case 'dashboard':
      contentArea.innerHTML = renderStudentDashboard(state, state.activeStudentId, handleStudentSelectChange);
      // Bind event listener after content is written
      const studentSelect = document.getElementById('dashboard-student-select');
      if (studentSelect) {
        studentSelect.value = state.activeStudentId || (state.students[0] ? state.students[0].id : "");
        studentSelect.addEventListener('change', (e) => {
          state.activeStudentId = e.target.value;
          render(); // Re-render dashboard
        });
      }
      break;
    case 'admin':
      contentArea.innerHTML = renderAdminPanel(state);
      bindAdminEvents();
      break;
  }
}

// --- Event Handlers & Event Delegation ---
function setupEventListeners() {
  // Global toasts helper
  window.showToast = function(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span style="font-size: 1.15rem;">${type === 'success' ? '✓' : '⚠️'}</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    // Remove after 3 seconds (animation handles fading)
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };
}

function handleStudentSelectChange(studentId) {
  state.activeStudentId = studentId;
  render();
}

// Bind admin-specific listeners after admin HTML is rendered
function bindAdminEvents() {
  // 1. Password Form Submission
  const authForm = document.getElementById('admin-auth-form');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passcode = document.getElementById('admin-passcode').value;
      if (passcode === 'admin123') {
        state.isAdminAuthenticated = true;
        sessionStorage.setItem('ai_tracker_admin_session', 'true');
        showToast("Authenticated successfully. Welcome Admin!");
        render();
      } else {
        showToast("Access Denied: Incorrect passcode.", "error");
      }
    });
    return; // Stop if not authenticated yet
  }
  
  // 1.1 GitHub Token Save
  const saveTokenBtn = document.getElementById('save-github-token-btn');
  if (saveTokenBtn) {
    saveTokenBtn.addEventListener('click', () => {
      const tokenInput = document.getElementById('github-pat-input');
      const tokenValue = tokenInput.value.trim();
      if (tokenValue) {
        localStorage.setItem('github_pat', tokenValue);
        showToast("GitHub Access Token configured!");
        render();
      } else {
        showToast("Please enter a valid token.", "error");
      }
    });
  }
  
  // 1.2 GitHub Token Clear
  const clearTokenBtn = document.getElementById('clear-github-token-btn');
  if (clearTokenBtn) {
    clearTokenBtn.addEventListener('click', () => {
      localStorage.removeItem('github_pat');
      showToast("GitHub Token cleared. Auto-Sync deactivated.");
      render();
    });
  }
  
  // 2. Add New Grade Form
  const gradeForm = document.getElementById('grade-entry-form');
  if (gradeForm) {
    // Autofill date with current local date
    const dateInput = document.getElementById('grade-date');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    gradeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentId = document.getElementById('grade-student-select').value;
      const subjectId = document.getElementById('grade-subject-select').value;
      const score = parseInt(document.getElementById('grade-score').value, 10);
      const date = document.getElementById('grade-date').value;
      const feedback = document.getElementById('grade-feedback').value;
      
      if (!studentId || !subjectId || isNaN(score)) {
        showToast("Please fill out all fields correctly.", "error");
        return;
      }
      
      // Update or insert grade
      const existingIndex = state.grades.findIndex(g => g.studentId === studentId && g.subjectId === subjectId);
      if (existingIndex > -1) {
        state.grades[existingIndex] = { studentId, subjectId, score, feedback, date };
        showToast("Mark updated successfully!");
      } else {
        state.grades.push({ studentId, subjectId, score, feedback, date });
        showToast("New grade logged successfully!");
      }
      
      saveState();
      gradeForm.reset();
      
      // Keep date set to today
      if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
      
      render();
    });
  }
  
  // 3. Add Learner Form
  const studentForm = document.getElementById('add-student-form');
  if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-student-name').value.trim();
      if (!name) return;
      
      const newId = 's' + (Date.now());
      state.students.push({
        id: newId,
        name,
        joinedDate: new Date().toISOString().split('T')[0]
      });
      
      saveState();
      showToast(`Student "${name}" added to cohort.`);
      render();
    });
  }
  
  // 4. Add Subject Form
  const subjectForm = document.getElementById('add-subject-form');
  if (subjectForm) {
    subjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-subject-name').value.trim();
      const description = document.getElementById('new-subject-desc').value.trim();
      if (!name) return;
      
      const newId = 'sub' + (Date.now());
      state.subjects.push({
        id: newId,
        name,
        description
      });
      
      saveState();
      showToast(`Subject "${name}" added to syllabus.`);
      render();
    });
  }
  
  // 5. Delete Student (delegated listeners)
  document.querySelectorAll('.delete-student-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const student = state.students.find(s => s.id === id);
      if (confirm(`Are you sure you want to remove "${student ? student.name : id}" and delete all their grades?`)) {
        state.students = state.students.filter(s => s.id !== id);
        state.grades = state.grades.filter(g => g.studentId !== id);
        
        // If deleted student was active on dashboard, switch it
        if (state.activeStudentId === id) {
          state.activeStudentId = state.students.length > 0 ? state.students[0].id : null;
        }
        
        saveState();
        showToast("Learner and evaluations deleted.");
        render();
      }
    });
  });
  
  // 6. Delete Subject
  document.querySelectorAll('.delete-subject-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const subject = state.subjects.find(s => s.id === id);
      if (confirm(`Are you sure you want to remove "${subject ? subject.name : id}" and delete all grades for this subject?`)) {
        state.subjects = state.subjects.filter(s => s.id !== id);
        state.grades = state.grades.filter(g => g.subjectId !== id);
        saveState();
        showToast("Subject and associated marks deleted.");
        render();
      }
    });
  });
  
  // 7. Reset Data Trigger
  const resetBtn = document.getElementById('admin-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm("WARNING: This will erase all custom inputs and restore original seed data. Proceed?")) {
        localStorage.removeItem(STATE_KEY);
        loadState();
        showToast("Database restored to default seeds.");
        render();
      }
    });
  }
  
  // 8. Logout Admin
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.isAdminAuthenticated = false;
      sessionStorage.removeItem('ai_tracker_admin_session');
      showToast("Logged out from admin panel.");
      render();
    });
  }
  
  // 9. Export JSON Data
  const exportBtn = document.getElementById('admin-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `ai_tracker_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast("Data backup file exported!");
    });
  }
  
  // 10. Import JSON Data
  const importTrigger = document.getElementById('admin-import-trigger');
  const importInput = document.getElementById('admin-import-input');
  
  if (importTrigger && importInput) {
    importTrigger.addEventListener('click', () => {
      importInput.click();
    });
    
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed.students) && Array.isArray(parsed.subjects) && Array.isArray(parsed.grades)) {
            state.students = parsed.students;
            state.subjects = parsed.subjects;
            state.grades = parsed.grades;
            if (state.students.length > 0) {
              state.activeStudentId = state.students[0].id;
            }
            saveState();
            showToast("Database restored successfully from backup.");
            render();
          } else {
            showToast("Invalid file structure. Must contain students, subjects, and grades.", "error");
          }
        } catch (err) {
          showToast("Error parsing file. Ensure it is valid JSON.", "error");
        }
      };
      reader.readAsText(file);
    });
  }
}

// Start application
window.addEventListener('DOMContentLoaded', init);
