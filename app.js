function goTo(p){location.href=p}

function logout(){
 localStorage.removeItem("role");
 location.href="index.html";
}

function showTab(tab){
 ["inventoryView","salesView","dashboardView"].forEach(v=>{
   let el=document.getElementById(v);
   if(el) el.style.display="none";
 });
 document.getElementById(tab+"View").style.display="block";
}

function setActiveTab(el){
 document.querySelectorAll(".tabs div").forEach(t=>t.classList.remove("active"));
 el.classList.add("active");
}

if('serviceWorker' in navigator){
 navigator.serviceWorker.register('service-worker.js');
}