function goTo(page){
  window.location.href = page;
}

function logout(){
  localStorage.removeItem("role");
  location.href = "index.html";
}

function switchTab(tab, el){

  const views = {
    inventory: "inventoryView",
    sales: "salesView",
    dashboard: "dashboardView"
  };

  Object.values(views).forEach(id=>{
    let v = document.getElementById(id);
    if(v) v.style.display = "none";
  });

  let view = document.getElementById(views[tab]);
  if(view) view.style.display = "block";

  document.querySelectorAll(".tabs div").forEach(t=>{
    t.classList.remove("active");
  });

  if(el) el.classList.add("active");

  if(tab === "inventory") loadProducts();
  if(tab === "sales") loadSales();
  if(tab === "dashboard") drawChart();
}
