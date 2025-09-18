import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const HomeLanding = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/bg_video/civic_vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/60 to-neutral-100/60"></div>
      </div>
      
      {/* Main container without card system */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-14">
        <div className="relative">
          {/* Top Nav inside card (pill) */}
          <div className="sticky top-4 z-30 relative w-fit mx-auto rounded-full px-3 py-1.5 bg-white border shadow-sm">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full blur-2xl opacity-70" style={{
              background: "radial-gradient(ellipse at center, hsla(32,100%,50%,0.35), hsla(25,95%,55%,0.0) 60%)"
            }} />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-neutral-900">
                <div className="w-8 h-8 rounded-md" style={{ background: "linear-gradient(135deg, hsl(32 100% 50%), hsl(25 95% 55%))" }} />
                <span className="font-extrabold text-base tracking-wide">Civic Setu</span>
              </div>
              <nav className="hidden md:flex items-center gap-5 text-[14px] text-neutral-700 dock-nav">
                <a href="#home" className="dock-item btn-pop cursor-pointer select-none px-3 py-1.5 rounded-full hover:text-black hover:bg-neutral-50">Home</a>
                <a href="#features" className="dock-item btn-pop cursor-pointer select-none px-3 py-1.5 rounded-full hover:text-black hover:bg-neutral-50">Features</a>
                <a href="#ai-powered" className="dock-item btn-pop cursor-pointer select-none px-3 py-1.5 rounded-full hover:text-black hover:bg-neutral-50">AI Features</a>
                <a href="#how-it-works" className="dock-item btn-pop cursor-pointer select-none px-3 py-1.5 rounded-full hover:text-black hover:bg-neutral-50">How it Works</a>
                <a href="#about" className="dock-item btn-pop cursor-pointer select-none px-3 py-1.5 rounded-full hover:text-black hover:bg-neutral-50">About</a>
              </nav>
              <Link
                to="/login"
                className="hidden md:inline-flex btn-pop rounded-full px-4 py-1.5 font-semibold text-[hsl(32_100%_50%)] border border-[hsl(32_100%_50%)] hover:bg-[hsl(32_100%_50%/0.06)] transition-all duration-200"
              >
                Login
              </Link>
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button aria-label="Open menu" className="inline-flex items-center justify-center w-9 h-9 rounded-md border hover:bg-neutral-50">
                      <span className="relative block w-5 h-3">
                        <span className="absolute inset-x-0 top-0 h-0.5 bg-neutral-800"></span>
                        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800"></span>
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-800"></span>
                      </span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-white">
                    <div className="mt-8 flex flex-col gap-2">
                      <a href="#home" className="px-3 py-2 rounded-md text-neutral-800 hover:bg-neutral-50">Home</a>
                      <a href="#features" className="px-3 py-2 rounded-md text-neutral-800 hover:bg-neutral-50">Features</a>
                      <a href="#ai-powered" className="px-3 py-2 rounded-md text-neutral-800 hover:bg-neutral-50">AI Features</a>
                      <a href="#how-it-works" className="px-3 py-2 rounded-md text-neutral-800 hover:bg-neutral-50">How it Works</a>
                      <a href="#about" className="px-3 py-2 rounded-md text-neutral-800 hover:bg-neutral-50">About</a>
                      <Link
                        to="/login"
                        className="mt-2 inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold text-[hsl(32_100%_50%)] border border-[hsl(32_100%_50%)] hover:bg-[hsl(32_100%_50%/0.06)]"
                      >
                        Login
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div id="home" className="mt-16 text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
              Smart Civic Solutions
            </h1>
            <p className="mt-6 text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Civic Setu revolutionizes urban problem-solving with AI-powered features that automatically 
              locate issues, route them to the right departments, and generate intelligent descriptions 
              from photos. Making cities smarter, one report at a time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="btn-pop rounded-full px-8 py-3 font-semibold text-white bg-gradient-to-r from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
              <button className="btn-pop rounded-full px-8 py-3 font-semibold text-[hsl(32_100%_50%)] border-2 border-[hsl(32_100%_50%)] hover:bg-[hsl(32_100%_50%/0.06)] transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* AI-Powered Features Section */}
          <div id="ai-powered" className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">AI-Powered Intelligence</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Our advanced AI technology makes civic reporting effortless and intelligent
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Auto Location Detection */}
              <div className="feature-card scroll-reveal group text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Auto Location Detection</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Simply take a photo and our AI automatically detects the exact location using GPS, 
                  visual landmarks, and street recognition technology.
                </p>
              </div>

              {/* Smart Department Routing */}
              <div className="feature-card scroll-reveal group text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Department Routing</h3>
                <p className="text-neutral-600 leading-relaxed">
                  AI analyzes the problem type and automatically routes it to the correct municipal 
                  department, ensuring faster response times.
                </p>
              </div>

              {/* AI Description Generation */}
              <div className="feature-card scroll-reveal group text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Description Generation</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Upload a photo and our AI instantly generates detailed, professional descriptions 
                  of the problem for accurate reporting.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="mt-24">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-extrabold mb-4">How It Works</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Three simple steps to make your city better
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center scroll-reveal">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[hsl(32_100%_50%)] flex items-center justify-center text-white text-2xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-3">Snap & Upload</h3>
                <p className="text-neutral-600">Take a photo of the problem and upload it to our platform</p>
              </div>
              <div className="text-center scroll-reveal">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[hsl(32_100%_50%)] flex items-center justify-center text-white text-2xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-3">AI Processing</h3>
                <p className="text-neutral-600">Our AI locates the issue, generates description, and routes to the right department</p>
              </div>
              <div className="text-center scroll-reveal">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[hsl(32_100%_50%)] flex items-center justify-center text-white text-2xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-3">Track Progress</h3>
                <p className="text-neutral-600">Monitor the resolution status and get updates on your report</p>
              </div>
            </div>
          </div>

          {/* Mobile App Section */}
          <div className="mt-24">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-extrabold mb-4">Mobile App Experience</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Experience Civic Setu on your mobile device with our intuitive and powerful app
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center scroll-reveal">
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 mx-auto max-w-xs">
                  <img 
                    src="/screenshots/login page.jpg" 
                    alt="Login Page" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Login</h3>
                <p className="text-neutral-600">Quick and secure access to your civic dashboard</p>
              </div>

              <div className="text-center scroll-reveal">
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 mx-auto max-w-xs">
                  <img 
                    src="/screenshots/report_issue.jpg" 
                    alt="Report Issue" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Report Issues</h3>
                <p className="text-neutral-600">Easily report civic problems with photo uploads</p>
              </div>

              <div className="text-center scroll-reveal">
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-4 mx-auto max-w-xs">
                  <img 
                    src="/screenshots/profile.jpg" 
                    alt="Profile Page" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Profile Management</h3>
                <p className="text-neutral-600">Track your reports and manage your account</p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="mt-24">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-extrabold mb-4">Platform Features</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Comprehensive tools for citizens and administrators
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="feature-card scroll-reveal text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[hsl(32_100%_50%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2a5 5 0 0 1 10 0h2c0-3.866-3.134-7-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Citizen Portal</h3>
                <p className="text-sm text-neutral-600">Easy reporting and tracking for citizens</p>
              </div>

              <div className="feature-card scroll-reveal text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[hsl(32_100%_50%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Real-time Analytics</h3>
                <p className="text-sm text-neutral-600">Live insights and performance metrics</p>
              </div>

              <div className="feature-card scroll-reveal text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[hsl(32_100%_50%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V1H4v4zM15 3h5l-5-5v5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Smart Routing</h3>
                <p className="text-sm text-neutral-600">Automatic department assignment</p>
              </div>

              <div className="feature-card scroll-reveal text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[hsl(32_100%_50%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Mobile App</h3>
                <p className="text-sm text-neutral-600">Report on-the-go with mobile app</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="mt-24 text-center">
            <h2 className="text-4xl font-extrabold mb-6 scroll-reveal">About Civic Setu</h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed scroll-reveal">
              Civic Setu is an AI-powered civic engagement platform that bridges the gap between citizens 
              and municipal authorities. By leveraging cutting-edge artificial intelligence, we make urban 
              problem-solving effortless, efficient, and transparent. Our platform automatically processes 
              citizen reports, routes them to the appropriate departments, and provides real-time tracking 
              for both citizens and administrators.
            </p>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed mt-6 scroll-reveal">
              From potholes to streetlight outages, from sanitation issues to traffic problems - 
              Civic Setu ensures every urban concern is addressed promptly and professionally. 
              Join thousands of citizens who are already making their cities smarter and better.
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Civic Setu. All rights reserved. Built by Civic Crew.
      </footer>
    </div>
  );
};

export default HomeLanding;


