import { CloudXmark } from "iconoir-react";

export default function ErrorState() {
  return (
    <section className="mt-5 flex flex-col items-center gap-3">
      <CloudXmark width={36} height={36} />
      <h1 className="text-xs">Sorry we couldn&apos;t find anything</h1>
    </section>
  );
}
