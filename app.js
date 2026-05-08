
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  })
},{threshold:0.15});

 document.querySelectorAll('.card,.section-header,.calc-panel').forEach(el=>{
   el.classList.add('hidden-anim');
   observer.observe(el);
 })
/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
  '.card,.section-header,.calc-panel,.hero,.table-wrap'
);

const revealObserver = new IntersectionObserver(
  (entries)=>{
    entries.forEach((entry)=>{

      if(entry.isIntersecting){

        entry.target.classList.add('reveal');
        
        setTimeout(()=>{
          entry.target.classList.add('active');
        },50);

      }

    });
  },
  {
    threshold:0.12
  }
);

revealElements.forEach((el)=>{
  revealObserver.observe(el);
});
