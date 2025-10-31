export async function getProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    if (!res.status) return;
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
