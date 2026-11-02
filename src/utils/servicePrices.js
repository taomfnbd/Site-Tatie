import { routePageKeys } from "./business.js";
// The service cards are the catalogue; edits made on a detail page update it too.
export function syncServicePrices(
  pages,
  changedKey = "services",
  previousSections = [],
) {
  const next = structuredClone(pages);
  const cards =
    next.services?.filter((section) => section.type === "service_card") || [];
  for (const card of cards) {
    const key = routePageKeys[card.content.linkUrl];
    const sections = next[key];
    if (!sections) continue;
    const prices = card.content.prices || [];
    if (changedKey === key)
      for (const section of sections) {
        const previous = previousSections.find(
          (item) => item.id === section.id,
        )?.content;
        if (!previous) continue;
        if (section.type === "service_process")
          section.content.steps.forEach((step, index) => {
            if (!prices[index]) return;
            for (const field of ["price", "duration"])
              if (
                step[field] !== previous.steps?.[index]?.[field] &&
                typeof step[field] === "string"
              )
                prices[index][field] = step[field];
          });
        if (section.type === "service_cta" && prices[0])
          for (const field of ["price", "duration"])
            if (section.content[field] !== previous[field])
              prices[0][field] = section.content[field];
      }
    for (const section of sections) {
      if (section.type === "service_process")
        section.content.steps = section.content.steps.map((step, index) =>
          prices[index]
            ? {
                ...step,
                price: prices[index].price,
                duration: prices[index].duration,
              }
            : step,
        );
      if (section.type === "service_cta" && prices[0]) {
        section.content.price = prices[0].price;
        section.content.duration = prices[0].duration;
      }
    }
  }
  return next;
}
