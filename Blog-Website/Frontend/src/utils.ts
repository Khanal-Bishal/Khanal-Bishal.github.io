export const convertIsoToFormattedData = (isoData: string) => {
  const isoDate = isoData;
  const dateObject = new Date(isoDate);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
};

/**
 * checks if the provided role is admin or not
 * @param {string} role
 * @returns
 */
export const checkIsAdmin = (role: string) => {
  if (role === "admin") return true;
  return false;
};
