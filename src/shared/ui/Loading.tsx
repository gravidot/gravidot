export function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex gap-1" role="status" aria-label="Loading">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 dark:bg-stone-400"
            style={{
              animationDelay: `${index * 150}ms`,
              transform: `translateY(${index * 2}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
