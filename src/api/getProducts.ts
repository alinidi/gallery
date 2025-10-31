export async function getProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.ok) throw new Error('Fetch error');
    const data = await res.json();
    return data.products;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return [];
  }
}
