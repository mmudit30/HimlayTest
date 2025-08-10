
import { getCartCount, getWishlistCount, loadCurrency, currentCurrency, setCurrency } from './utils.js';
document.addEventListener('DOMContentLoaded', async () => {
  if (window.AOS) AOS.init({ once: true, duration: 600 });
  const header = document.getElementById('site-header');
  const onScroll = () => { header.style.boxShadow = window.scrollY>4 ? '0 4px 16px rgba(0,0,0,0.06)' : 'none'; };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const cartEl = document.getElementById('cart-count'); const wishEl = document.getElementById('wishlist-count');
  if (cartEl) cartEl.textContent = getCartCount(); if (wishEl) wishEl.textContent = getWishlistCount();
  await loadCurrency(); const sel = document.getElementById('currency-select');
  if (sel) { sel.value = currentCurrency(); sel.addEventListener('change', (e) => setCurrency(e.target.value)); }
  const search = document.getElementById('site-search');
  if (search) { search.addEventListener('keydown', (e) => { if (e.key==='Enter'){ const q=encodeURIComponent(search.value.trim()); if(q) location.href=`./pages/shop.html?search=${q}`; }}); }
});
