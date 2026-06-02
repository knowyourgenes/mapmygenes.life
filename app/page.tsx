import Homepage from "../components/homepage";
import { getHomepageData } from "../sanity/fetch";
import { selectTodayRead, selectWeekReads } from "../lib/selectToday";

export const revalidate = 60;

export default async function Page() {
  const { homepage, themes, reads, chips } = await getHomepageData();
  const today = selectTodayRead(reads, themes);
  const weekReads = selectWeekReads(reads, today.read?.slug);

  return (
    <Homepage
      homepage={homepage}
      themes={themes}
      reads={reads}
      chips={chips}
      today={today}
      weekReads={weekReads}
    />
  );
}
