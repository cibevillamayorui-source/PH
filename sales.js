function sellProduct(id){

  let products = getProducts();
  let sales = getSales();

  let qty = +document.getElementById("sell-"+id).value || 1;

  let p = products.find(x => x.id === id);

  if(!p) return;

  if(p.qty < qty){
    alert("Not enough stock");
    return;
  }

  p.qty -= qty;

  sales.push({
    id: Date.now(),
    name: p.name,
    qty,
    price: p.price,
    total: p.price * qty,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  saveProducts(products);
  saveSales(sales);

  loadProducts();
  loadSales();

  if(typeof drawChart === "function") drawChart();
}

function loadSales(){

  let list = document.getElementById("salesList");
  list.innerHTML = "";

  let total = 0;

  getSales().forEach(s=>{
    total += s.total;

    list.innerHTML += `
      <div class="card">
        <b>${s.name}</b><br>
        Qty: ${s.qty} | ₱${s.total}<br>
        <small>${s.date} ${s.time}</small>
      </div>
    `;
  });

  list.innerHTML += `<h3>Total: ₱${total}</h3>`;
}
