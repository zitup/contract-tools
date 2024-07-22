const Error = ({ message }: { message: string }) => {
  return message ? <p className="mt-2 text-sm text-destructive break-all whitespace-break-spaces">{message}</p> : null;
};

export default Error;
