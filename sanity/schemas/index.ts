import type { SchemaTypeDefinition } from "sanity";
import { categoryChip } from "./categoryChip";
import { dailyRead } from "./dailyRead";
import { homepage } from "./homepage";
import { theme } from "./theme";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, theme, dailyRead, categoryChip],
};
