import Link from "next/link";

const EditUserNotFound = () => {
  return (
    <>
      <div className="flex-col text-slate-800 gap-5 w-full h-full flex items-center justify-center text-5xl bold">
        Page not found
        <p className="text-sm font-semibold text-zinc-500">
          <Link href="/">Back to Home</Link>
        </p>
      </div>
    </>
  );
};
export default EditUserNotFound;
