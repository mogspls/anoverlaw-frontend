const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const EMPTY = {
  data: [],
  meta: { pagination: { total: 0 } },
};

export const fetchData = async (api: string): Promise<any> => {
  const url = `${BASE_URL}${api}`;

  try {
    const response = await fetch(url, { next: { revalidate: 10 } });

    const ct = response.headers.get("content-type") || "";
    const raw = await response.text(); // read ONCE

    if (!response.ok) {
      console.error("STRAPI_NOT_OK(fetchData)", {
        url,
        status: response.status,
        statusText: response.statusText,
        ct,
        bodyPreview: raw.slice(0, 300),
      });
      return EMPTY;
    }

    if (!ct.includes("application/json")) {
      console.error("STRAPI_NON_JSON(fetchData)", {
        url,
        status: response.status,
        ct,
        bodyPreview: raw.slice(0, 300),
      });
      return EMPTY;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("STRAPI_FETCH_FAILED(fetchData)", { url, error: String(error) });
    return EMPTY;
  }
};