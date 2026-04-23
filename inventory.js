function val(id){
  let el = document.getElementById(id);
  return el ? el.value : "";
}

function addProduct(){

  let file = imageInput.files[0];

  if(!val("name")) return alert("Enter name");

  if(file){
    let r = new FileReader();
    r.onload = () => saveProduct(r.result);
    r.readAsDataURL(file);
  } else saveProduct("");
}

function saveProduct(img){

  let p = getProducts();

  p.push({
    id: Date.now(),
    name: val("name"),
    price: +val("price"),
    qty: +val("qty"),
    expiry: val("expiry"),
    image: img
  });

  saveProducts(p);
  loadProducts();
}

function expiryClass(date){

  if(!date) return "";

  let diff = (new Date(date) - new Date()) / (1000*60*60*24);

  if(diff < 0) return "expired";
  if(diff <= 3) return "warning";

  return "";
}

function loadProducts(){

  let list = document.getElementById("productList");
  list.innerHTML = "";

  getProducts().forEach(p=>{

    let low = p.qty <= 5 ? "style='border:2px solid red'" : "";

    list.innerHTML += `
      <div class="card" ${low}>
        ${p.image ? `<img src="${p.image}" width="60">` : ""}
        <b>${p.name}</b><br>
        ₱${p.price} | Stock: ${p.qty}<br>

        <small class="${expiryClass(p.expiry)}">
          ${p.expiry || ""}
        </small>

        <input type="number" id="sell-${p.id}" value="1">
        <button onclick="sellProduct(${p.id})">Sell</button>

        ${getRole() === "admin"
          ? `<button onclick="deleteProduct(${p.id})">Delete</button>`
          : ""}
      </div>
    `;
  });
}

function deleteProduct(id){
  saveProducts(getProducts().filter(p => p.id !== id));
  loadProducts();
}
