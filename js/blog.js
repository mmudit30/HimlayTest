
const qs = (s)=>document.querySelector(s);
export const renderBlogList = async () => {
  const res = await fetch('../blog.json'); const posts = await res.json();
  qs('#blog-list').innerHTML = posts.map(p => `
    <a class="card wm" href="./post.html?id=${p.slug}">
      <img src="${p.cover.md}" srcset="${p.cover.sm} 800w, ${p.cover.md} 1200w, ${p.cover.lg} 1600w" sizes="(max-width: 600px) 100vw, 33vw" alt="${p.title}">
      <div class="card__body"><h3>${p.title}</h3><small>${new Date(p.date).toLocaleDateString()} · ${p.readingTime} min read</small></div>
    </a>`).join('');
};
export const renderPost = async () => {
  const slug = new URLSearchParams(location.search).get('id'); const res = await fetch('../blog.json'); const posts = await res.json(); const p = posts.find(x => x.slug===slug) || posts[0];
  qs('#post').innerHTML = `
    <header class="section__header"><h1>${p.title}</h1><small>${new Date(p.date).toLocaleDateString()} · ${p.readingTime} min read</small></header>
    <img src="${p.cover.md}" srcset="${p.cover.sm} 800w, ${p.cover.md} 1200w, ${p.cover.lg} 1600w" sizes="100vw" alt="${p.title}" style="width:100%;border-radius:12px">
    <div class="prose">${p.html}</div>`;
};
