

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      
      <nav className="flex justify-between items-center px-8 py-5 ">
        <h1 className="text-xl font-bold tracking-tight">
          HobbyAI
        </h1>
        <div>
            <button className="text-white mx-5">
          Login
        </button>
        <button className="px-3 py-2 border border-white text-white">
          Get Started
        </button>
        </div>
      </nav>

     
      <section className=" py-24 px-6 flex justify-around">
        <div>
            <h2 className="text-5xl font-bold leading-tight tracking-tight mb-6">
          Track Your Hobbies <br /> with AI
           </h2>

            <p className="text-gray-600 text-lg max-w-2xl  mb-10">
          A simple way to stay consistent, track progress, and build better habits using AI-driven insights.
            </p>
            <button className="px-6 py-3 border border-white rounded-md text-white">
          I have an account
            </button>
            
        </div>

    <div className="border border-white rounded-xl px-6 py-7">
  <div className="border-b border-gray-200 pb-4 mb-4">
    <h1 className="font-bold text-gray-200 mb-3">This week</h1>
    
    
    <div className="mb-3">
      <p className="mb-1">Play Guitar</p>
      <div className="w-full bg-gray-500 rounded-full h-2">
        <div className="bg-white h-2 rounded-full" style={{width: '60%'}}></div>
      </div>
    </div>
     <div className="mb-3">
      <p className="mb-1">Read Books</p>
      <div className="w-full bg-gray-500 rounded-full h-2">
        <div className="bg-white h-2 rounded-full" style={{width: '40%'}}></div>
      </div>
    </div>
     <div className="mb-3">
      <p className="mb-1">Morning Workouts</p>
      <div className="w-full bg-gray-500 rounded-full h-2">
        <div className="bg-white h-2 rounded-full" style={{width: '80%'}}></div>
      </div>
    </div>
  </div>

 
  <div className="flex text-sm text-gray-400 space-x-6">
  <div className="flex flex-col items-center">
    <h5 className="font-bold">3</h5>
    <p>Hobbies</p>
  </div>
  <div className="flex flex-col items-center">
    <h5 className="font-bold">45</h5>
    <p>sessions</p>
  </div>
  <div className="flex flex-col items-center">
    <h5 className="font-bold">95%</h5>
    <p>consistency</p>
  </div>
</div>
</div>

        
      </section>

   
      <section className="grid md:grid-cols-3 gap-8 px-8 py-16 max-w-6xl mx-auto">

        <div className="p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-3">
            AI Suggestions
          </h3>
          <p className="text-gray-600">
            Get intelligent recommendations based on your activity patterns.
          </p>
        </div>

        <div className="p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-3">
            Progress Tracking
          </h3>
          <p className="text-gray-600">
            Visualize your consistency and improve over time.
          </p>
        </div>

        <div className="p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-3">
            Smart Reminders
          </h3>
          <p className="text-gray-600">
            Minimal, non-intrusive reminders to keep you on track.
          </p>
        </div>

      </section>

    
      <section className="text-center py-20 ">

        <p className=" mb-4">
          How It works
        </p>

        <h1 className="text-white mb-8 text-6xl font-mono">
          Simple By Design
        </h1>
        <h2 className="text-3xl text-gray-500 font-serif">
            01
        </h2>
        <h1 className="text-5xl text-white mb-2 ">
            Add Hobbies
        </h1>
        <p className="mb-8 text-gray-600">
            Choose create your own custom hobbies and goals alos take suggestion from AI your daily life routine.
        </p>
        <h2 className="text-3xl text-gray-500 font-serif">
            02
        </h2>
        <h1 className="text-5xl text-white mb-2">
            Track Progress
        </h1>
        <p className="mb-8 text-gray-600">
            og sessions, notes, and milestones. Watch your skills compound over time.
        </p>
        <h2 className="text-3xl text-gray-500 font-serif">
            03
        </h2>
        <h1 className="text-5xl text-white mb-2">
            Get AI suggestions
        </h1>
        <p className="text-gray-600 mb-8">
            Receive personalized tips and adaptive schedules based on your real data.
        </p>
        
      </section>

    
      <footer className="text-center py-6 border-t border-gray-600 text-sm text-gray-500">
        © {new Date().getFullYear()} HobbyAI. All rights reserved.
      </footer>

    </div>
  );
};

export default Landing;