import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap, Users, ArrowRight, CheckCircle, Sparkles, Target, Clock, Shield } from 'lucide-react';

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="pt-16 bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Enhanced with modern gradients and animations */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 border border-indigo-100">
              <Sparkles className="text-indigo-600" size={16} />
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                AI-Powered Developer Support
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Resolve Code Issues
              </span>
              <br />
              <span className="text-gray-900">Instantly with AI</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get instant support from expert mentors. Our AI agent identifies your issues and matches you with the perfect mentor in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to={token ? "/dashboard" : "/signup"} 
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link 
                to="#how-it-works" 
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-indigo-300"
              >
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">10min</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-gray-600 mt-1">Issue Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-gray-600 mt-1">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                How DevTriage AI Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent system streamlines the entire support process from ticket creation to resolution
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
              <div className="flex-1 order-2 lg:order-1">
                <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-sm mb-4">
                  Step 1
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Create Your Ticket</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Simply describe your coding issue with a title and detailed description. Add code snippets, error messages, or relevant links. No need to search for a mentor manually.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Easy-to-use ticket creation form</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Support for code snippets and attachments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Automatic categorization</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <div className="bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-100 rounded mb-6"></div>
                    <div className="h-24 w-full bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-lg flex items-center justify-center">
                      <Brain className="text-indigo-400" size={48} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
              <div className="flex-1">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <Target className="text-purple-400" size={24} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-20 bg-red-200 rounded"></div>
                        <span className="text-xs text-gray-400">High Priority</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="h-2 w-24 bg-yellow-200 rounded"></div>
                        <span className="text-xs text-gray-400">Medium</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="h-2 w-16 bg-green-200 rounded"></div>
                        <span className="text-xs text-gray-400">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm mb-4">
                  Step 2
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">AI Analyzes & Prioritizes</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced AI agent instantly analyzes your issue, determines its priority level, and generates helpful notes to guide the resolution process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Automatic priority assessment (High/Medium/Low)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">AI-generated solution guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Intelligent categorization and tagging</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 order-2 lg:order-1">
                <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full font-semibold text-sm mb-4">
                  Step 3
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Matched with Expert Mentor</h3>
                <p className="text-lg text-gray-600 mb-6">
                  The system automatically matches your ticket with the best-suited mentor based on their skills and expertise. Get personalized guidance from industry professionals.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Skill-based mentor matching</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Instant email notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Real-time status updates</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 order-1 lg:order-2">
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                        <Users className="text-white" size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-2 w-24 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">React</span>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs">Node.js</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Python</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Why Choose DevTriage AI?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to accelerate your development workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">AI-Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our intelligent AI analyzes your issue in real-time and matches you with the perfect mentor based on skills, expertise, and availability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Get resolutions in minutes, not hours. Our streamlined process ensures you're never stuck waiting for help with your code.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Expert Mentors</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with industry professionals who have real-world experience across any tech stack you're working with.
              </p>
            </div>

            {/* Additional Features */}
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">24/7 Availability</h3>
              <p className="text-gray-600 leading-relaxed">
                Create tickets anytime. Our AI is always ready to analyze and route your issues to the right experts.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Prioritization</h3>
              <p className="text-gray-600 leading-relaxed">
                AI automatically assesses urgency and priority, ensuring critical issues get immediate attention.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your code and issues are protected with enterprise-grade security. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Loved by Developers
              </span>
            </h2>
            <p className="text-xl text-gray-600">See what our community has to say</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-indigo-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "Fixed my React bug in 10 minutes! The AI matching is incredible. Got paired with a mentor who knew exactly what the issue was."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Jane Doe</p>
                  <p className="text-sm text-gray-600">Full-Stack Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-cyan-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "Best tool for code support I've ever used. The mentors are absolute pros and the AI prioritization is spot-on."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-600">Senior Engineer</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-purple-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "AI prioritization saved my project deadline. Got help exactly when I needed it most. Game changer for students!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                  AL
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alex Lee</p>
                  <p className="text-sm text-gray-600">CS Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* CTA Section - Enhanced */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Fix Your Bugs?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-10">
              Join thousands of developers getting instant AI-powered support
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to={token ? "/dashboard" : "/login"} 
                className="group px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-lg"
              >
                Get Started Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </Link>
              <Link 
                to="/signup" 
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-200 text-lg"
              >
                Create Account
              </Link>
            </div>

            <p className="mt-8 text-white/80">
              No credit card required • Free trial available • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}