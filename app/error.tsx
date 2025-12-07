"use client";
interface ErrorProps {
  error: Error;
  reset: () => void;
}
const ErrorPage = ({ error }: ErrorProps) => {
  return (
    <div className="text-center flex items-center justify-center text-2xl text-slate-700">
      {error.message}
    </div>
  );
};

export default ErrorPage;
