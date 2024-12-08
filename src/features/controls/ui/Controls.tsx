import { ZoomController } from "../../background";

export function Controls() {
  return (
    <div className="fixed right-0 top-0 z-50 m-4 flex flex-row gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-xs drop-shadow-2xl dark:border-zinc-700 dark:bg-black">
      <ZoomController />
    </div>
  );
}
