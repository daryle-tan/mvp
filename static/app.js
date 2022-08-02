document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
  
    const nameInput = document
      .querySelector(`[name="name"]`)
      .value.toLowerCase();
    const amountInput = document
      .querySelector(`[name="amount"]`)
    .value.Number();
    const priceInput = document
      .querySelector(`[name="price"]`)
    .value.Number();
    const tokenInput = document
      .querySelector(`[name="token"]`)
    .value.Number();
    const dateInput = document
      .querySelector(`[name="date"]`)
      .value;
    const newCrypto = {
      name: nameInput,
      amount_invested: amountInput,
      price_at_purchase: priceInput,
      tokens_owned: tokenInput,
      date_purchased: dateInput
    };
    console.log(newCrypto);
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
      .then((data) => console.log(JSON.stringify(data)))
      .catch((err) => console.log("Error"));
});
  


// const getHistoricalPrice = async event => {
//   let id= "bitcoin";
//   let currency= "usd";
//   let string = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`;
//   await fetch(string)
//             .then(resp => resp.json())
//             .then(data => console.log(string))}
  
  // document.getElementById("find").addEventListener("click", (e) => {
  //   fetch("/api/crypto")
  //         .then((data) => data.json(data))
  //         .then((data) => console.log(JSON.stringify(data)));
  // });
