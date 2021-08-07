const getPrices = async () => {
    const url = `https://coingecko.p.rapidapi.com/simple/price?ids=ethereum&vs_currencies=USD`;
  
    try {
      const res = await fetch(url , {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "731cabf830msh06088b535cbc883p1cb288jsn7e8616efa3dc",
          "x-rapidapi-host": "coingecko.p.rapidapi.com"
         } });
      const data = await res.json();
      const price = data.ethereum.usd 
      return price;
    } catch (err) {
      console.error(err);
    }
  };


  export async function toUSD(ETH) {
    const value = await getPrices() * ETH
    return value; 
  }

  export async function toETH(USD) {
    const value = USD /  await getPrices()
    return value
  }