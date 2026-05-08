<script>
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
</script>
