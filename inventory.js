function addProduct(){
 let file=imageInput.files[0];
 if(!file){ saveProduct(""); return }

 let r=new FileReader();
 r.onload=()=>saveProduct(r.result);
 r.readAsDataURL(file);
}

function saveProduct(img){
 let p=getProducts();

 p.push({
  id:Date.now(),
  name:name.value,
  price:+price.value,
  qty:+qty.value,
  expiry:expiry.value,
  image:img
 });

 saveProducts(p);
 loadProducts();
}

function getExpiryClass(date){
 if(!date) return "";
 let d=new Date(date);
 let now=new Date();
 let diff=(d-now)/(1000*60*60*24);

 if(diff<0) return "expired";
 if(diff<7) return "warning";
 return "";
}

function loadProducts(){
 let list=productList;
 if(!list) return;

 list.innerHTML="";

 getProducts().forEach(p=>{
  list.innerHTML+=`
   <div class="card">
    ${p.image?`<img src="${p.image}" width="60">`:''}
    <b>${p.name}</b><br>
    ₱${p.price} | ${p.qty} pcs<br>
    <span class="${getExpiryClass(p.expiry)}">Exp: ${p.expiry||"N/A"}</span>
    <button onclick="sellProduct(${p.id})">Sell</button>
    <button onclick="deleteProduct(${p.id})">Delete</button>
   </div>`;
 });
}

function loadGrid(){ renderGrid(getProducts()) }

function renderGrid(arr){
 let g=productGrid;
 if(!g) return;
 g.innerHTML="";

 arr.forEach(p=>{
  g.innerHTML+=`
   <div class="product">
    ${p.image?`<img src="${p.image}" width="60">`:''}
    <h4>${p.name}</h4>
    <p>₱${p.price}</p>
    <p>${p.qty}</p>
    <small class="${getExpiryClass(p.expiry)}">${p.expiry||""}</small>
    <button onclick="sellProduct(${p.id})">Sell</button>
   </div>`;
 });
}

function deleteProduct(id){
 saveProducts(getProducts().filter(p=>p.id!==id));
 loadProducts();
}

function searchProduct(){
 let k=search.value.toLowerCase();
 renderGrid(getProducts().filter(p=>p.name.toLowerCase().includes(k)));
}