// utils/startCheckout.ts
export async function startCheckout(priceId: string) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ priceId }),
  });
  
  const { url, error } = await response.json();
  if (error) throw new Error(error);
  window.location.href = url;
}