export default function AuthInput({
  name,
  type,
  placeholder,
  register,
  error,
}) {
  return (
    <div className="mt-4 content-center dark:text-dark_text_1 space-y-1">
      <input
        className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}