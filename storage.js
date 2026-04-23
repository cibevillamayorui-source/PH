function getProducts(){
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(d){
  localStorage.setItem("products", JSON.stringify(d));
}

function getSales(){
  return JSON.parse(localStorage.getItem("sales")) || [];
}

function saveSales(d){
  localStorage.setItem("sales", JSON.stringify(d));
}

function getRole(){
  return localStorage.getItem("role");
}
