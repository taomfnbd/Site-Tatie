import { getStore } from "@netlify/blobs";
import { dayUTC } from "../lib/analytics.mjs";
export default async function handler() {
  const store = getStore({ name: "audience-v1", consistency: "strong" });
  const cutoff = dayUTC(new Date(Date.now() - 89 * 86400000));
  for await (const page of store.list({ paginate: true })) {
    const expired = page.blobs.filter(
      ({ key }) =>
        /^\d{4}-\d{2}-\d{2}\/[0-3]$/.test(key) && key.slice(0, 10) < cutoff,
    );
    await Promise.all(expired.map(({ key }) => store.delete(key)));
  }
}
export const config = { schedule: "15 3 * * *" };
