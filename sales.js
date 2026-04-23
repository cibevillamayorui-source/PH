function sellProduct(id){
 let p=getProducts(), s=getSales(), today=new Date().toDateString();

 p=p.map(x=>{
  if(x.id===id && x.qty>0){
   x.qty--;
   s.push({name:x.name,price:x.price,date:today,time:new Date().toLocaleTimeString()});
   generateReceipt(x);
  }
  return x;
 });

 saveProducts(p); saveSales(s);
 loadProducts(); loadGrid(); loadSales(); drawChart();
}

function loadSales(){
 let list=salesList;
 if(!list) return;

 let total=0;
 list.innerHTML="";

 getSales().forEach(s=>{
  total+=s.price;
  list.innerHTML+=`<div class="card">${s.name} - ₱${s.price}<br><small>${s.time}</small></div>`;
 });

 list.innerHTML+=`<h3>Total ₱${total}</h3>`;
}