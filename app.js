import { db, auth } from "./firebase.js";
/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
  '.card,.section-header,.calc-panel,.hero,.table-wrap'
);

const revealObserver = new IntersectionObserver(
  (entries)=>{
    entries.forEach((entry)=>{

      if(entry.isIntersecting){

        entry.target.classList.add('active');

      }

    });
  },
  {
    threshold:0.12
  }
);

revealElements.forEach((el)=>{

  el.classList.add('reveal');

  revealObserver.observe(el);

});
const glow = document.createElement('div');

glow.className = 'cursor-glow';

document.body.appendChild(glow);

document.addEventListener('mousemove',(e)=>{

  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';

});
// ===========================
// SIGNUP
// ===========================

async function signup() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created!");

  } catch (err) {

    alert(err.message);

  }

}

// ===========================
// LOGIN
// ===========================

async function login() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Logged in!");

  } catch (err) {

    alert(err.message);

  }

}

// ===========================
// LOGOUT
// ===========================

async function logout() {

  await signOut(auth);

  alert("Logged out");

}

// ===========================
// SESSION TRACKER
// ===========================

onAuthStateChanged(auth, (user) => {

  const status =
    document.getElementById("userStatus");

  if (user) {

    status.innerText =
      "LOGGED IN: " + user.email;

  } else {

    status.innerText =
      "NOT LOGGED IN";

  }

});
