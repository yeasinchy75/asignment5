let ticCount = 0;
let totalprice = 0;
const ticketprice = 550;
let discountprice = 0;
let grandtotalprice = 0;


const tickets = document.getElementsByClassName ('ticket');


for(let ticket of tickets)
{
    ticket.addEventListener('click', action);
}

document.getElementById("phone").addEventListener('keyup',checkNumber);

document.getElementById('next-btn').addEventListener('click',(e)=>{
    location.href = 'index.html';
})

function action(event){
    
    if(ticCount < 4){
        ticCount++;
        SetInnerText("seat-cnt", ticCount);
        checkNumber();
        addSeatInfo(event);
        totalprice += ticketprice;
        grandtotalprice = totalprice;
        SetInnerText("total-price",totalprice);
        SetInnerText("grand-total",grandtotalprice);
        let seatLeft = parseInt(document.getElementById("seat-left").innerText);
        document.getElementById("seat-left").innerText = seatLeft-1;

        
        if(ticCount==4){
            applyEnable(); // start apply button
            document.getElementById("apply").addEventListener('click',checkValidation);
        }
    }
    else{
        alert("Sorry! You can not buy more than 4 tickets at a time.")
    }
    
}
document.getElementById('btn-continue').addEventListener('click',(e)=>{
    location.href = 'index.html';
})
function SetInnerText(id, value) {
    document.getElementById(id).innerText = value;
  }
  
  // start apply button enable when 4 tickets selected
  function applyEnable() {
    document.getElementById("apply").removeAttribute("disabled");
  }
  
  function getValue(id) {
    return parseInt(document.getElementById(id).innerText);
  }
  
  function checkNumber(){
    let numberStr = document.getElementById("phone").value;
    let number = parseInt(numberStr);
    let ticket = getValue('seat-cnt');
    if(numberStr.length > 0 && ticket>0){
      let nextBtn = document.getElementById("next-btn");
      nextBtn.removeAttribute('disabled');
    }
    else{
      let nextBtn = document.getElementById('next-btn');
      nextBtn.setAttribute('disabled','');
    }
  }
  
  // start apply coupon and price with e-mail and phone number
  function checkValidation() {
    const coupon = document.getElementById("coupon-input");
    if (coupon.value === "NEW15") {
      let final = getValue("grand-total");
      let discountprice = (final / 100) * 15;
      final = final - discountprice;
      SetInnerText("discount-price", discountprice);
      SetInnerText("grand-total", final);
      let applyDiv = document.getElementById("apply-div");
      applyDiv.classList.add("hidden");
      let discount = document.getElementById("discount");
      discount.classList.remove("hidden");
    } else if (coupon.value === "Couple 20") {
      let final = getValue("grand-total");
  
      let discountprice = (final / 100) * 20;
      final = final - discountprice;
      SetInnerText("discount-price", discountprice);
      SetInnerText("grand-total", final);
      let applyDiv = document.getElementById("apply-div");
      applyDiv.classList.add("hidden");
      let discount = document.getElementById("discount");
      discount.classList.remove("hidden");
    } else {
      alert('Sorry! You have no coupon codeto get discount.');
    }
  }
  function addSeatInfo(event) {
    const id = event.target.id;
    let ticketclassList = event.target.classList;
    ticketclassList.remove("bg-[#F7F8F8]");
    ticketclassList.add("bg-[#1DD100]", "text-white");
    event.target.setAttribute("disabled", "");
    let seatInfo = document.getElementById("seat-info");
    let div = document.createElement("div");
    div.classList.add("flex", "justify-between");
    let p1 = document.createElement("p");
    p1.innerText = id;
    let p2 = document.createElement("p");
    p2.innerText = "Economy";
    let p3 = document.createElement("p");
    p3.innerText = "550";
    div.append(p1, p2, p3);
    seatInfo.appendChild(div);
  }