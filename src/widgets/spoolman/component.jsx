import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  // eslint-disable-next-line prefer-const
  let { data: spoolData, error: spoolError } = useWidgetAPI(widget, "spools");

  if (spoolError) {
    return <Container service={service} error={spoolError} />;
  }

  if (!spoolData) {
    const nBlocksGuess = widget.spoolFilterValues?.length ?? 4;
    return (
      <Container service={service}>
        {[...Array(nBlocksGuess)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Block key={i} label="spoolman.loading" />
        ))}
      </Container>
    );
  }

  if (spoolData.error || spoolData.message) {
    return <Container service={service} error={spoolData?.error ?? spoolData} />;
  }

  if (spoolData.length === 0) {
    return (
      <Container service={service}>
        <Block label="spoolman.noSpools" />
      </Container>
    );
  }

  // Apply filtering on the spools
  if (widget.spoolFilter === "id") {
    spoolData = spoolData.filter((spool) => widget.spoolFilterValues.includes(spool.id));
  }
  else if (widget.spoolFilter === "location") {
    spoolData = spoolData.filter((spool) => widget.spoolFilterValues.includes(spool.location));
  }
  else if (widget.spoolFilter === "lot_nr") {
    spoolData = spoolData.filter((spool) => widget.spoolFilterValues.includes(spool.lot_nr));
  }
  else if (widget.spoolFilter === "comment") {
    spoolData = spoolData.filter((spool) => widget.spoolFilterValues.includes(spool.comment));
  }
  // if widget.spoolFilter is blank or undefined, no filtering is applied

  // Apply sorting on the spools
  if (widget.spoolSort === "lastUsed") {
    spoolData = spoolData.slice().sort((a, b) => new Date(b.last_used) - new Date(a.last_used));
  }
  else if (widget.spoolSort === "leastRemaining") {
    spoolData = spoolData.slice().sort((a, b) => (a.remaining_weight / a.initial_weight) - (b.remaining_weight / b.initial_weight));
  }
  // if widget.spoolSort is blank or undefined, no sorting is applied

  if (spoolData.length > 4) {
    spoolData = spoolData.slice(0, 4);
  }

  return (
    <Container service={service}>
      {spoolData.map((spool) => (
        <Block
          key={spool.id}
          label={spool.filament.name}
          value={t("common.percent", {
            value: (spool.remaining_weight / spool.initial_weight) * 100,
          })}
        />
      ))}
    </Container>
  );
}
