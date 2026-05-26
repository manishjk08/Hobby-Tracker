import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">

      
      <nav className="border-b border-gray-200 bg-white">

        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <div>
            <h1 className="text-sm font-semibold tracking-tight">
              HabitFlow
            </h1>

            <p className="text-[11px] text-gray-500 mt-0.5">
              Smart habit tracking
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={handleLogin}
              className="text-xs text-gray-600 hover:text-black transition-colors"
            >
              Login
            </button>

            <button
              onClick={handleSignUp}
              className="bg-black text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-90 transition-all"
            >
              Get Started
            </button>

          </div>

        </div>
      </nav>

      
      <main className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          
          <div>

            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-5">
              Build better routines
            </p>

            <h1 className="text-5xl font-semibold tracking-tight leading-tight text-black">
              Stay consistent
              <br />
              with your habits
            </h1>

            <p className="text-sm text-gray-500 leading-7 mt-6 max-w-lg">
              Track your daily routines, monitor progress,
              and improve consistency with a clean and
              focused habit tracking experience.
            </p>

            <div className="flex items-center gap-3 mt-8">

              <button
                onClick={handleSignUp}
                className="bg-black text-white text-xs font-medium px-5 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Start Tracking
              </button>

              <button
                className="border border-gray-300 text-xs font-medium px-5 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                View Demo
              </button>

            </div>

            <div className="flex items-center gap-8 mt-10">

              <div>
                <h3 className="text-xl font-semibold">
                  12k+
                </h3>

                <p className="text-[11px] text-gray-500 mt-1">
                  Active users
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  89%
                </h3>

                <p className="text-[11px] text-gray-500 mt-1">
                  Weekly consistency
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  4.9
                </h3>

                <p className="text-[11px] text-gray-500 mt-1">
                  User rating
                </p>
              </div>

            </div>

          </div>

          
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-sm font-semibold">
                  Weekly Overview
                </h2>

                <p className="text-[11px] text-gray-500 mt-1">
                  Your habit progress
                </p>
              </div>

              <span className="text-[11px] text-gray-400">
                This Week
              </span>

            </div>

            
            <div className="space-y-5">

              {[
                {
                  name: "Workout",
                  progress: "80%",
                  width: "80%",
                },
                {
                  name: "Reading",
                  progress: "60%",
                  width: "60%",
                },
                {
                  name: "Meditation",
                  progress: "90%",
                  width: "90%",
                },
              ].map((item, index) => (
                <div key={index}>

                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-black">
                      {item.name}
                    </p>

                    <p className="text-[11px] text-gray-500">
                      {item.progress}
                    </p>
                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full"
                      style={{ width: item.width }}
                    />
                  </div>

                </div>
              ))}

            </div>

            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">

              <div>
                <p className="text-lg font-semibold">
                  24
                </p>

                <p className="text-[11px] text-gray-500 mt-1">
                  Habits completed
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold">
                  16
                </p>

                <p className="text-[11px] text-gray-500 mt-1">
                  Day streak
                </p>
              </div>

              <div>
                <p className="text-lg font-semibold">
                  92%
                </p>

                <p className="text-[11px] text-gray-500 mt-1">
                  Success rate
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

      
      <section className="py-20 border-t border-gray-200 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-12">

            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-3">
              Features
            </p>

            <h2 className="text-2xl font-semibold tracking-tight">
              Designed for consistency
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                title: "Simple Tracking",
                description:
                  "Track habits daily with a clean and distraction free interface.",
              },
              {
                title: "Progress Analytics",
                description:
                  "Monitor streaks, completion rates, and weekly performance.",
              },
              {
                title: "Smart Insights",
                description:
                  "Understand patterns and improve your routines over time.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5"
              >

                <h3 className="text-sm font-semibold text-black">
                  {feature.title}
                </h3>

                <p className="text-xs text-gray-500 leading-6 mt-3">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      
      <section className="py-20">

        <div className="max-w-3xl mx-auto px-6 text-center">

          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Start today
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-black">
            Build habits that last
          </h2>

          <p className="text-sm text-gray-500 leading-7 mt-5">
            Create routines, stay accountable, and improve
            consistency with HabitFlow.
          </p>

          <button
            onClick={handleSignUp}
            className="mt-8 bg-black text-white text-xs font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-all"
          >
            Create Account
          </button>

        </div>

      </section>

      
      <footer className="border-t border-gray-200 bg-white">

        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

          <p className="text-[11px] text-gray-500">
            © 2026 HabitFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <a
              href="#"
              className="text-[11px] text-gray-500 hover:text-black transition-colors"
            >
              Github
            </a>

            <a
              href="#"
              className="text-[11px] text-gray-500 hover:text-black transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="text-[11px] text-gray-500 hover:text-black transition-colors"
            >
              Contact
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Landing;