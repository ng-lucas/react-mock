import { toast } from "react-toastify";

export const formattedDate = (timer: string) => {
  const date = new Date(timer);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// handleError function
export const handleError = (error: Record<string, string[]>) => {
  if (error) {
    // eslint-disable-next-line prefer-const
    for (let key in error) {
      const errorMessage = `${key.charAt(0).toUpperCase() + key.slice(1)} ${
        error[key][0]
      }`;
      toast.error(errorMessage);
    }
  }
};
