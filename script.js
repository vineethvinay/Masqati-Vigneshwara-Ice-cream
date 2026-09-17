const products = [
  {name:"Chocolate Ice Cream",type:"Ice Cream",size:"500 ml",price:120,icon:"🍫🍨",rating:"4.5",reviews:124},
  {name:"Vanilla Ice Cream",type:"Ice Cream",size:"500 ml",price:120,icon:"🍦",rating:"4.6",reviews:98},
  {name:"Ice Cream Cone",type:"Ice Cream",size:"1 pc",price:40,icon:"🍦",rating:"4.4",reviews:78},
  {name:"Malai Kulfi",type:"Ice Cream",size:"1 pc",price:35,icon:"🍡",rating:"4.6",reviews:112},
  {name:"Toned Milk",type:"Dairy",size:"1 Ltr",price:52,icon:"🥛",rating:"4.7",reviews:86},
  {name:"Fresh Curd",type:"Dairy",size:"500 g",price:45,icon:"🥣",rating:"4.5",reviews:67},
  {name:"Lassi",type:"Dairy",size:"200 ml",price:30,icon:"🧋",rating:"4.6",reviews:54},
  {name:"Family Ice Cream Pack",type:"Ice Cream",size:"1 Ltr",price:220,icon:"🍨",rating:"4.8",reviews:91}
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("search");
let currentFilter = "all";

function renderProducts(){
  const term = search.value.toLowerCase().trim();
  const list = products.filter(p =>
    (currentFilter === "all" || p.type === currentFilter) &&
    p.name.toLowerCase().includes(term)
  );
  grid.innerHTML = list.length ? list.map((p,i)=>`
    <article class="product-card">
      <div class="product-visual"><div class="product-icon ${i===7?'pack':''}">${p.icon}</div></div>
      <h3>${p.name}</h3>
      <p class="size">${p.size}</p>
      <p class="price">MRP: ₹${p.price}</p>
      <p class="rating-line">★ ${p.rating} <span>(${p.reviews} reviews)</span></p>
      <button class="cart" data-product="${p.name}">🛒 Add to Cart</button>
    </article>`).join("") : `<p>No products found.</p>`;
}

renderProducts();

document.querySelectorAll(".category-strip button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category-strip button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});
document.querySelector('.category-strip button[data-filter="all"]').classList.add("active");
search.addEventListener("input",renderProducts);

document.addEventListener("click",e=>{
  const cart=e.target.closest(".cart");
  if(cart) showToast(`${cart.dataset.product} added to your basket 🛒`);
});

function showToast(msg){
  const toast=document.getElementById("toast");
  toast.textContent=msg; toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}

const reviewWrap=document.getElementById("reviewFormWrap");
document.getElementById("reviewBtn").onclick=()=>reviewWrap.classList.toggle("hidden");
document.getElementById("cancelReview").onclick=()=>reviewWrap.classList.add("hidden");

document.getElementById("reviewForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("reviewName").value.trim();
  const rating=Number(document.getElementById("reviewRating").value);
  const text=document.getElementById("reviewText").value.trim();
  const stars="★".repeat(rating)+"☆".repeat(5-rating);
  const article=document.createElement("article");
  article.className="review";
  article.innerHTML=`<div class="avatar">${name.charAt(0).toUpperCase()}</div><div><div class="stars">${stars}</div><p>“${text.replace(/[<>]/g,"")}”</p><small>— ${name.replace(/[<>]/g,"")}</small></div>`;
  document.getElementById("reviewGrid").prepend(article);
  e.target.reset(); reviewWrap.classList.add("hidden");
  showToast("Thank you for your review ⭐");
});

document.getElementById("menuBtn").onclick=()=>document.querySelector(".navbar").classList.toggle("open");
document.getElementById("year").textContent=new Date().getFullYear();

document.querySelectorAll('nav a').forEach(a=>{
  a.addEventListener("click",()=>document.querySelector(".navbar").classList.remove("open"));
});
