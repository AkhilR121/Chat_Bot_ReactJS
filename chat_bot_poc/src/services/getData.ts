export async function getCustomers() {
  return await fetch("/customers.json")
    .then(res => res.json())
    .then(date => date);
}