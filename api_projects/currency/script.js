   
      const fromAmountElement = document.querySelector(".fromAmount");
      const toAmountElement = document.querySelector(".toAmount");
      const fromCurrencyElement = document.querySelector(".fromCurrency");
      const toCurrencyElement = document.querySelector(".toCurrency");
      const resultElement = document.querySelector(".result");
      let shadowInline = document.querySelector(".shadow-inline");

      const contries = [
        { code: "USD", name: "$ (United States Dollar) = ₹88.66" },
        { code: "EUR", name: "€ (Euro) = ₹103.53" },
        { code: "GBP", name: "£ (British Pound Sterling) = ₹118.43" },
        { code: "JPY", name: "¥ (Japanese Yen) = ₹0.59" },
        { code: "AUD", name: "A$ (Australian Dollar) = ₹57.20" },
        { code: "CAD", name: "C$ (Canadian Dollar) = ₹66.10" },
        { code: "CHF", name: "Fr (Swiss Franc) = ₹99.90" },
        { code: "CNY", name: "¥ (Chinese Yuan) = ₹12.40" },
        { code: "SGD", name: "S$ (Singapore Dollar) = ₹66.80" },
        { code: "NZD", name: "NZ$ (New Zealand Dollar) = ₹52.30" },
        { code: "HKD", name: "HK$ (Hong Kong Dollar) = ₹11.45" },
        { code: "KRW", name: "₩ (South Korean Won) = ₹0.062" },
        { code: "MYR", name: "RM (Malaysian Ringgit) = ₹19.40" },
        { code: "THB", name: "฿ (Thai Baht) = ₹2.33" },
        { code: "IDR", name: "Rp (Indonesian Rupiah) = ₹0.0058" },
        { code: "PHP", name: "₱ (Philippine Peso) = ₹1.37" },
        { code: "VND", name: "₫ (Vietnamese Dong) = ₹0.0033" },
        { code: "AED", name: "د.إ (UAE Dirham) = ₹24.15" },
        { code: "SAR", name: "﷼ (Saudi Riyal) = ₹23.67" },
        { code: "PKR", name: "₨ (Pakistani Rupee) = ₹0.24" },
        { code: "BDT", name: "৳ (Bangladeshi Taka) = ₹0.82" },
        { code: "LKR", name: "Rs (Sri Lankan Rupee) = ₹0.23" },
        { code: "NPR", name: "रु (Nepalese Rupee) = ₹0.62" },
        { code: "EGP", name: "E£ (Egyptian Pound) = ₹2.85" },
        { code: "NGN", name: "₦ (Nigerian Naira) = ₹0.17" },
        { code: "KES", name: "KSh (Kenyan Shilling) = ₹0.54" },
        { code: "GHS", name: "GH₵ (Ghanaian Cedi) = ₹8.90" },
        { code: "ZAR", name: "R (South African Rand) = ₹4.75" },
        { code: "BRL", name: "R$ (Brazilian Real) = ₹17.10" },
      ];

      contries.forEach((country) => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        option1.value = option2.value = country.code;
        option1.textContent =
          option2.textContent = `${country.code} ${country.name}`;
        fromCurrencyElement.append(option1);
        toCurrencyElement.append(option2);
      });
      const getExchange = async () => {
        let fromAmount = parseFloat(fromAmountElement.value);
        let fromCurrency = fromCurrencyElement.value;
        let toCurrency = toCurrencyElement.value;
        let apiKey = `2a2fda18292806510a16eab1`;
        resultElement.textContent = "Fetching Exchange Rate";
        try {
          const response = await fetch(
            `https://v6.exchangerate-api.com/v6/2a2fda18292806510a16eab1/latest/${fromCurrency}`
          );
          const data = await response.json();
          let conversionRate = data.conversion_rates[toCurrency];
          let totalAmount = (conversionRate * fromAmount).toFixed(2);
          if (typeof conversionRate == "undefined") {
            resultElement.textContent = `Exchange rate data is not available for selected countries !!!`;
            shadowInline.textContent = "";
          } else {
            toAmountElement.value = `${totalAmount}`;
            resultElement.textContent = `${fromAmount} ${fromCurrency} = ${totalAmount} ${toCurrency}`;
          }
        } catch (error) {
          shadowInline.textContent = `<h2>Error While Fetching Exchange Rate !!!</h2>`;
        }
      };
      fromAmountElement.addEventListener("input", getExchange);
      toCurrencyElement.addEventListener("change", getExchange);
      fromCurrencyElement.addEventListener("change", getExchange);
      window.addEventListener("load", getExchange);
  
