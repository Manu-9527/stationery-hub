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
