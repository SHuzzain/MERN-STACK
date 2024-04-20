import { replaceChar } from "../utils/removeChar";

let fetchErrorProps = [{ message: "", context: { label: "", key: "" } }];

export const handleFetchError = (data = fetchErrorProps) => {
  const errorMessage = {
    fetchError: true,
  };
  data.map((dt) => {
    errorMessage[dt.context.label] = replaceChar(dt.message, `"`);
  });

  return errorMessage;
};
