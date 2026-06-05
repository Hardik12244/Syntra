export default function CrushesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">

      <div
        className="
          bg-white
          rounded-3xl
          p-10
          shadow-xl
          w-[420px]
          text-center
        "
      >
        <div className="text-6xl mb-4">
          ❤️
        </div>

        <h1 className="text-2xl font-bold">
          Someone Crushed On You
        </h1>

        <p className="text-gray-500 mt-3">
          Reveal everyone who crushed on you.
        </p>

        <button
          className="
            mt-6
            w-full
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-pink-500
            to-rose-500
            text-white
            font-semibold
          "
        >
          Reveal ₹49
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Future Razorpay integration goes here
        </p>
      </div>

    </div>
  );
}