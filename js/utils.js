
export const money = (amountInINR) => {
  const rates = JSON.parse(localStorage.getItem('currencyRates')||'{}');
  const cur = localStorage.getItem('currency') || 'INR';
  let amount = amountInINR;
  if (cur !== 'INR' && rates[cur]) amount = amountInINR * rates[cur];
  const fmt = new Intl.NumberFormat(undefined, { style: 'currency', currency: cur });
  return fmt.format(amount);
};
export const currentCurrency = () => localStorage.getItem('currency') || 'INR';
export const setCurrency = (cur) => { localStorage.setItem('currency', cur); window.location.reload(); };
export const loadCurrency = async () => {
  if (!localStorage.getItem('currencyRates')) {
    try { const res = await fetch('./currency.json'); const data = await res.json(); localStorage.setItem('currencyRates', JSON.stringify(data.rates)); }
    catch(e){ localStorage.setItem('currencyRates', JSON.stringify({ USD: 0.012, EUR: 0.011 })); }
  }
};
export const getCart = () => JSON.parse(localStorage.getItem('cart')||'[]');
export const setCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
export const getCartCount = () => getCart().reduce((a,i)=>a+i.qty,0);
export const getWishlist = () => JSON.parse(localStorage.getItem('wishlist')||'[]');
export const setWishlist = (w) => localStorage.setItem('wishlist', JSON.stringify(w));
export const getWishlistCount = () => getWishlist().length;
export const addToCart = (item) => { const cart = getCart(); const idx = cart.findIndex(x => x.id===item.id);
  if (idx>-1) cart[idx].qty += item.qty||1; else cart.push({ ...item, qty: item.qty||1 }); setCart(cart); };
export const removeFromCart = (id) => { setCart(getCart().filter(i => i.id !== id)); };
export const updateQty = (id, qty) => { const cart = getCart().map(i => i.id===id ? { ...i, qty: Math.max(1, qty) } : i); setCart(cart); };
export const toggleWishlist = (id) => { const w = new Set(getWishlist()); if (w.has(id)) w.delete(id); else w.add(id); setWishlist([...w]); };
export const isWishlisted = (id) => new Set(getWishlist()).has(id);
