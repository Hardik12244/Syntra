export default function CrushesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl w-full max-w-[420px] text-center">
        <div className="text-5xl sm:text-6xl mb-4">❤️</div>

        <h1 className="text-xl sm:text-2xl font-bold">
          Someone Crushed On You
        </h1>

        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
          Reveal everyone who crushed on you.
        </p>

        <button className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow hover:opacity-95 transition">
          Reveal ₹49
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Future Razorpay integration goes here
        </p>
      </div>
    </div>
  );
}