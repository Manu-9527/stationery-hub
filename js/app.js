// ==========================================================================
// 0. FIREBASE BACKEND (AUTH & DATABASE)
// ==========================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your exact Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCGi4MIBDcs5Z3DtPYfEWzKH0c9P19ORC0",
  authDomain: "stationery-hub-80895.firebaseapp.com",
  databaseURL: "https://stationery-hub-80895-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "stationery-hub-80895",
  storageBucket: "stationery-hub-80895.firebasestorage.app",
  messagingSenderId: "368432976126",
  appId: "1:368432976126:web:71361a16bfd3ae178dd5af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

// Connect to HTML Buttons
const navLoginBtn = document.getElementById('loginBtn');
const googleBtn = document.getElementById('googleLoginBtn');

// Handle Google Login
if(googleBtn) {
  googleBtn.addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, provider);
      document.getElementById('loginModal').style.display = "none"; // Close modal on success
    } catch (error) {
      console.error("Login failed:", error);
    }
  });
}

// Listen for Login/Logout state
onAuthStateChanged(auth, (user) => {
  if (user) {
    navLoginBtn.textContent = "SIGN OUT";
    navLoginBtn.onclick = () => signOut(auth);
    console.log("Logged in as:", user.email);
    // Here we would load their saved favorites from the DB!
  } else {
    navLoginBtn.textContent = "SIGN IN";
    navLoginBtn.onclick = () => {
      document.getElementById('loginModal').style.display = "flex";
    };
  }
});
// ==========================================================================
// 1. THE PREMIUM TAB SWITCHER (Segmented Controls)
// ==========================================================================
// This handles the smooth switching between your 3 calculators
window.switchCalc = function(id, clickedButton) {
  // Reset all tabs to inactive
  document.querySelectorAll('.calc-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Hide all panels by removing the active class
  document.querySelectorAll('.calc-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  // Activate the clicked tab and corresponding panel
  clickedButton.classList.add('active');
  document.getElementById('calc-' + id).classList.add('active');
  
  // Trigger calculations immediately so animations run
  if(id === 'smoothness') calcSmoothness();
  if(id === 'fatigue') calcFatigue();
  if(id === 'matcher') calcMatcher();
};

// ==========================================================================
// 2. THE ANIMATED NUMBER COUNTER
// ==========================================================================
// This makes numbers "roll up" to their final value instead of snapping
function animateValue(elementId, start, end, duration) {
  const obj = document.getElementById(elementId);
  if (!obj) return;
  
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Using a simple ease-out mathematical curve
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeOut * (end - start) + start);
    
    obj.textContent = currentVal;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = end; // Ensure it ends on the exact number
    }
  };
  window.requestAnimationFrame(step);
}

// ==========================================================================
// 3. THE CALCULATOR ENGINES
// ==========================================================================

window.calcSmoothness = function() {
  const g = +document.getElementById('s_grade').value;
  const gsm = +document.getElementById('s_gsm').value;
  const tex = +document.getElementById('s_texture').value;
  const pur = +document.getElementById('s_purity').value;
  
  const finalScore = Math.min(99, Math.max(10, g + gsm + tex + pur));
  
  // Trigger Number Animation (Counts from 0 to finalScore over 800ms)
  animateValue('s_score', 0, finalScore, 800);
  
  // Trigger Bar Animation
  setTimeout(() => {
    document.getElementById('s_bar').style.width = finalScore + '%';
  }, 100); // Slight delay makes it feel natural
  
  // Update Text
  let v = '', r = '';
  if (finalScore >= 88) {
    v = 'Exceptional smoothness. Near-frictionless glide optimal for rapid writing.';
    r = 'Ideal for: Gesture sketching, stream-of-consciousness journaling.';
  } else if (finalScore >= 74) {
    v = 'Good smoothness. Reliable consistency with subtle tactile feedback.';
    r = 'Ideal for: Mixed writing-sketching sessions, professional notes.';
  } else {
    v = 'Moderate/High resistance. Functional for controlled drafting.';
    r = 'Ideal for: Technical drafting, architectural linework.';
  }
  
  document.getElementById('s_verdict').textContent = v;
  document.getElementById('s_rec').textContent = r;
};

window.calcFatigue = function() {
  const w = +document.getElementById('f_weight').value;
  const c = +document.getElementById('f_cog').value;
  const g = +document.getElementById('f_grip').value;
  const p = +document.getElementById('f_pressure').value;
  const d = +document.getElementById('f_gripd').value;
  const s = +document.getElementById('f_session').value;
  
  const base = 60;
  const finalScore = Math.min(120, Math.max(10, base - w + c + g + p + d + s));
  
  // Animate the minutes
  animateValue('f_score', 0, finalScore, 800);
  
  // Animate the bar based on a 120-minute maximum
  setTimeout(() => {
    const percentage = Math.min(100, (finalScore / 120) * 100);
    document.getElementById('f_bar').style.width = percentage + '%';
  }, 100);
  
  let v = '', r = '';
  if (finalScore >= 90) {
    v = 'Extended comfort window. Lightweight setup suits all-day writing.';
    r = 'Suitable for: 3+ hour unbroken study sessions.';
  } else if (finalScore >= 60) {
    v = 'Standard comfort window. Mild hand fatigue expected at this threshold.';
    r = 'Recommended: Take 3–5 min break at this point to reset tension.';
  } else {
    v = 'Short comfort window. Heavy pencil creates accelerated fatigue.';
    r = 'Mitigation: Switch to Kuru Toga Advance (12g) for long sessions.';
  }
  
  document.getElementById('f_verdict').textContent = v;
  document.getElementById('f_rec').textContent = r;
};

// Placeholder for Matcher to prevent errors if you click it
window.calcMatcher = function() {
    // You can build this logic out later based on your data!
};


// ==========================================================================
// 4. HIGH-END UI EFFECTS (Initialization)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  
  // A. Staggered Scroll Reveal
  const revealElements = document.querySelectorAll('.card, .section-header, .comparison, .calc-panel');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // We add a slight delay based on the index so they load in a wave
        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0) rotateX(0)';
        }, index * 100); // 100ms delay between each item
        
        // Stop observing once it's revealed
        revealObserver.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach((el) => {
    el.style.opacity = 0;
    // Initial state: slightly lowered and tilted backward (3D effect)
    el.style.transform = 'translateY(40px) rotateX(5deg)'; 
    el.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    revealObserver.observe(el);
  });

  // B. Initialize Calculators
  calcSmoothness();
  calcFatigue();
});
