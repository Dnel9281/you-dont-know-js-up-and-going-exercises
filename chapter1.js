// ============================================
// Chapter 1
// ============================================

const TAX_RATE = .08;
const PHONE_PRICE = 100;
const ACCESSORY_PRICE = 10;
const SPENDING_LIMIT = 800;
let amountInBank;

let chapter1Btn = document.getElementById('chapter1Btn');
let chapter1BankAmount = document.getElementById('chapter1BankAmount');
let buyPhonesBtn = document.getElementById('buyPhones');
let purchaseMessage = document.getElementById('purchaseMessage');

let phoneCost = document.getElementById('phoneCost');
let accessoryCost = document.getElementById('accessoryCost');
let taxRate = document.getElementById('taxRate');

phoneCost.innerHTML = String(PHONE_PRICE);
accessoryCost.innerHTML = String(ACCESSORY_PRICE);
taxRate.innerHTML = String(TAX_RATE);

chapter1Btn.addEventListener('click', () => {
  let amount = prompt('How much do you have in your bank account? (numbers only)');
  if (amount) {
    amountInBank = String(amount);
    chapter1BankAmount.innerHTML = String(amountInBank);
    purchaseMessage.innerHTML = "";
  } else {
    amountInBank = '0';
    chapter1BankAmount.innerHTML = '0';    
  }
});

function purchaseMaxAmountOfPhones(phone, accessory, tax, bankAmount) {
  let taxAmount = (phone + accessory) * tax;
  let itemWithTax = (phone + accessory) + taxAmount;
  let items = {
    count: 0,
    purchaseAmount: 0
  };
  let finished = false;
  while (!finished) {
    items.purchaseAmount = items.purchaseAmount + itemWithTax;
    if (items.purchaseAmount < bankAmount) items.count++;
    if (items.purchaseAmount > bankAmount) {
      items.purchaseAmount = items.purchaseAmount - itemWithTax;
      finished = true;
    }
  }
  items.purchaseAmount = `$${String(items.purchaseAmount.toFixed(2))}`;
  return items;
}

buyPhonesBtn.addEventListener('click', () => {
  if (!amountInBank) {
    purchaseMessage.innerHTML = "You cannot buy any phones.";
    return;
  }
  let info = purchaseMaxAmountOfPhones(PHONE_PRICE, ACCESSORY_PRICE, TAX_RATE, amountInBank);
  purchaseMessage.innerHTML = `You can buy ${info.count} phones for a total of ${info.purchaseAmount}.`;
});