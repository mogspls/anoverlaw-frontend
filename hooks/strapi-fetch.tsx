const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
export const fetchData = async (api: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}${api}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data as any[];
    } else {
      const text = await response.text();
      console.error(`Non JSON response received: ${text}`);
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error(`Error fetching articles: ${error}`);
  }
};
