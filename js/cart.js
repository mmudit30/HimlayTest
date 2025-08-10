
import { getCart, setCart, removeFromCart, updateQty, getWishlist, setWishlist, money } from './utils.js';
const qs = (s)=>document.querySelector(s);
const renderCart = () => {
  const target = qs('#cart-page'); if (!target) return; const cart = getCart();
  if (!cart.length) { target.innerHTML = '<p>Your cart is empty.</p>'; return; }
  const rows = cart.map(i => `
    <div class="card" style="display:grid;grid-template-columns:80px 1fr auto;gap:12px;align-items:center;padding:10px">
      <img src="${i.image}" alt="${i.name}" style="width:80px;height:80px;object-fit:cover;border-radius:10px">
      <div><strong>${i.name}</strong><br><small>${money(i.priceINR)}</small>
        <div style="margin-top:6px">Qty: <input type="number" min="1" value="${i.qty}" data-id="${i.id}" class="qty" style="width:70px"></div>
      </div>
      <button class="btn" data-remove="${i.id}">Remove</button>
    </div>`).join('');
  const total = cart.reduce((a,i)=>a+i.priceINR*i.qty,0);
  target.innerHTML = rows + `<div class="section__header"><h3>Total: ${money(total)}</h3>
    <a class="btn btn--primary" id="wa-order" href="#" target="_blank">Order via WhatsApp</a>
    <a class="btn" id="email-order" href="mailto:hello@himlay.com?subject=Order%20from%20Himlay&body=Order%20details%3A">Order via Email</a></div>`;
  target.querySelectorAll('.qty').forEach(input => { input.addEventListener('change', () => { updateQty(input.dataset.id, parseInt(input.value,10)||1); renderCart(); }); });
  target.querySelectorAll('[data-remove]').forEach(btn => { btn.addEventListener('click', () => { removeFromCart(btn.dataset.remove); renderCart(); }); });
  const wa = qs('#wa-order'); const cartText = cart.map(i=>`${i.name} x ${i.qty}`).join(', ');
  wa.href = 'https://wa.me/919999999999?text=' + encodeURIComponent('Order from Himlay: ' + cartText);
};
const renderWishlist = async () => {
  const target = qs('#wishlist-page'); if (!target) return; const ids = getWishlist(); if (!ids.length) { target.innerHTML = '<p>Your wishlist is empty.</p>'; return; }
  const res = await fetch('../products.json'); const products = await res.json(); const list = products.filter(p => ids.includes(p.id));
  target.innerHTML = list.map(p=>{ const i=p.images[0]; return `
    <a class="card wm" href="./product.html?id=${p.id}">
      <img src="${i.md}" srcset="${i.sm} 400w, ${i.md} 600w, ${i.lg} 900w" sizes="(max-width: 600px) 100vw, 33vw" alt="${p.name}">
      <div class="card__body"><h3>${p.name}</h3><p>${money(p.priceINR)}</p></div>
    </a>`}).join('');
};
document.addEventListener('DOMContentLoaded', () => { renderCart(); renderWishlist(); });
