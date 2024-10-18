import { cn } from "@/shared/utils";

export function IconX({className}: {className?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={
        cn(
            "h-6 w-6 text-neutral-100 dark:text-neutral-900", 
            className
        )
      }
      viewBox="0 0 24 24"
      
    >
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  );
}



export function IconArrowNarrowRight({className}: {className?: string}) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className={
            cn(
                "h-6 w-6 text-gray-500", 
                className
            )
        }
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M15 16l4-4M15 8l4 4"></path>
      </svg>
    );
  }


export function IconArrowNarrowLeft({className}: {className?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={
            cn(
                "h-6 w-6 text-gray-500", 
                className
            )
      }
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M5 12l4 4M5 12l4-4"></path>
    </svg>
  );
}