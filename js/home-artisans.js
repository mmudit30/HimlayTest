
document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('artisan-grid'); if (!grid) return;
  try{
    const res = await fetch('./artisans.json'); const data = await res.json();
    grid.innerHTML = data.map(a => `
      <figure class="card wm">
        <img 
          src="${a.image.md}"
          srcset="${a.image.sm} 400w, ${a.image.md} 600w, ${a.image.lg} 900w"
          sizes="(max-width: 600px) 100vw, 33vw"
          alt="${a.name}">
        <figcaption class="card__body"><strong>${a.name}</strong><br><small>${a.village}, ${a.state}</small></figcaption>
      </figure>
    `).join('');
  }catch(e){ grid.innerHTML = '<p>Artisan profiles coming soon.</p>'; }
});
