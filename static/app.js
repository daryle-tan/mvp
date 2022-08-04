const portfolioGrid = document.querySelector(".portfolio-grid");

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  portfolioGrid.innerHTML = ""
  const nameInput = document
    .querySelector(`[name="name"]`).value.toUpperCase();
  const amountInput = document
      .querySelector(`[name="amount"]`).value;
  const priceInput = document
      .querySelector(`[name="price"]`).value
  const tokenInput = document
      .querySelector(`[name="tokens"]`).value
  const dateInput = document
    .querySelector(`[name="date"]`).value;
  
  
  
  const newCrypto = {
      name: nameInput,
      amount_invested: amountInput,
      price_at_purchase: priceInput,
      tokens_owned: tokenInput,
      date_purchased: dateInput
  };
  
    fetch("/api/crypto", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCrypto),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        showPortfolio()
        // console.log(JSON.stringify(data))
      })
      .catch((err) => console.log("Error"));
});

document.querySelector(".logo").addEventListener("click", (e) => {
  showPortfolio()
})
// document.addEventListener('DOMContentLoaded', (e) => {
function showPortfolio() {
  fetch("/api/crypto")
    .then((data) => {
      return data.json();
    }).then((completedData) => {
      let data1 = "";
      completedData.map((values) => {
        let id = values.id;
        data1 += `<div class="addedToken">
                    <div class="token">${values.name}</div>
                    <div class="token">${values.amount_invested}</div>    
                    <div class="token">${values.price_at_purchase}</div>    
                    <div class="token">${values.tokens_owned}</div>
                    <div class="token">PNL</div>     
                    <div class="token">${values.date_purchased}</div>
                    <button class="delete">X</button> 
                  </div>`
       
        portfolioGrid.innerHTML = data1;
        const deleteBtn = document.querySelector(".delete");
        const addedToken = document.querySelector(".addedToken")

        deleteBtn.addEventListener("click", (e) => {
          // if (e.target.id === id) {           
            addedToken.remove();
            console.log(values.id)
            fetch("/api/crypto/" + values.id, {
              method: 'DELETE'
            })
          // }          
          // }
        })
      })
    }).catch()
}
// });





// function loadNewToken(data) {
//   document.addEventListener('DOMContentLoaded', (e) => {
//     // document.querySelector(".portfolio-grid").innerHTML = ''
//     fetch("/api/crypto")
//       .then((data) => {
//         return data.json();
//       })
//   })
// }
// const getHistoricalPrice = async event => {
//   let id= "bitcoin";
//   let currency= "usd";
//   let string = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`;
//   await fetch(string)
//             .then(resp => resp.json())
//             .then(data => console.log(string))}

  // const loadTokens = (data) => {
  //   const tokenName = document.querySelector("name");
  //   tokenName.innerText = `${data.name}`;
  //   const amountInvested = document.querySelector("amount");
  //   const priceAtPurchase = document.querySelector("price");
  //   const tokenOwned = document.querySelector("tokens");
  //   const dateOfPurchase = document.querySelector("date");
  //   const profitNLoss = document.querySelector("pnl");
  // }

     // addedToken.addEventListener('click', clicked)
        // function clicked(e) {
        //   return console.log(e.target.className);
        // }