
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
