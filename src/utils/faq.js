export function resolveFAQItems(section, site) {
  const cards = site.pages.services.filter(
    (item) => item.type === "service_card",
  );
  return (section.items || []).map((item) => {
    const selected = item.priceSummary
      ? cards
      : cards.filter((card) => card.content.linkUrl === item.priceRef?.path);
    if (!item.priceSummary && !item.priceRef) return item;
    const parts = selected.flatMap((card) =>
      card.content.prices
        .filter(
          (_, index) =>
            item.priceSummary ||
            item.priceRef?.kind === "all" ||
            index === (item.priceRef?.index || 0),
        )
        .map(
          (price) =>
            `${card.content.title} — ${price.type.toLowerCase()} : ${price.duration}, ${price.price.replace("€", " €")}`,
        ),
    );
    return parts.length
      ? {
          ...item,
          answer:
            parts.join(" ; ") +
            ". Les séances se réservent au cabinet de Vacqueyras.",
        }
      : item;
  });
}
