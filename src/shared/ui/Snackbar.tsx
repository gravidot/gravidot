export function Snackbar({ message }: { message: string }) {
  return (
    <div className="absolute -left-2 top-10 z-50 rounded-full bg-slate-200 bg-opacity-90 px-6 py-2 text-xs text-black dark:bg-slate-400 dark:text-white">
      {message}
    </div>
  );
}
