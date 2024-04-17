let fetchErrorProps = [{ message: "", context: { label: "", key: "" } }];

export const handleFetchError = (data = fetchErrorProps) => {
  const result = {};

  data.map((dt) => {
    result[dt.context.label] = dt.message;
  });

  return result;
};
