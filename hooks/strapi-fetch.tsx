const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const EMPTY = { data: [], meta: { pagination: { total: 0 } } };

export const fetchData = async (api: string): Promise<any> => {
  const url = `${BASE_URL}${api}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 10 },
      headers: {
        "Strapi-Response-Format": "v4",
        "Accept": "application/json",
      },
    });

    const ct = response.headers.get("content-type") || "";
    const raw = await response.text();

    if (!response.ok) return EMPTY;
    if (!ct.includes("application/json")) return EMPTY;

    return JSON.parse(raw);
  } catch {
    return EMPTY;
  }
};
