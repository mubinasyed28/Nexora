import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Plane, Users, Bell, PackageSearch, Send, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import SignupStep1 from '../features/auth/components/SignupStep1';
import SignupStep2 from '../features/auth/components/SignupStep2';
import SignupStep3 from '../features/auth/components/SignupStep3';
import Popup from '../features/Popup';
import Loader from '../features/Loader';
import { useSelector } from 'react-redux';
import { selectSignupStatus } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const items1 = [
    { id: 1, content: 'Nexora', duration: 0.5, tailwindClass: "text-6xl font-bold mb-6" },
    { id: 2, content: 'Connect. Explore. Experience', duration: 0.8, tailwindClass: "text-2xl mb-8" },
    { id: 3, content: 'Join a community of passionate travelers who share your wanderlust. Create unforgettable memories and lifelong friendships around the globe.', duration: 1.2, tailwindClass: "text-xl mb-12" },
  ];

const items2 = [
    { id: 1, content: 'Welcome to Nexora!', duration: 0.5, tailwindClass: "text-6xl font-bold mb-6" },
    { id: 2, content: "You've successfully signed up for early access.", duration: 0.8, tailwindClass: "text-2xl mb-8" },
    { id: 3, content: "We'll notify you as soon as we launch and send exclusive early bird offers your way.", duration: 1.2, tailwindClass: "text-xl mb-12" },
    { id: 4, content: "Stay tuned for an exciting travel experience!", duration: 1.6, tailwindClass: "text-lg mb-12" },
  
]
const features = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Personalized Itineraries',
      description: 'Get custom travel plans tailored to your preferences and budget.'
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications about your travel plans and group activities.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Travel Partner Matching',
      description: 'Find like-minded travelers and create unforgettable memories together.'
    },
    {
      icon: <PackageSearch className="w-8 h-8" />,
      title: 'Smart Packing Lists',
      description: 'Never forget essential items with our AI-powered packing suggestions.'
    }
  ];

const AnimatedItem = ({ content, duration, tailwindClass  }) => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: 'easeIn' },
      },
    };
  
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        style={{ listStyle: 'none', marginBottom: '10px' }}
        className={`mb-4 ${tailwindClass}`}
      >
        {content}
      </motion.div>
    );
  };

function LandingPage() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate()
  const signupStatus = useSelector(selectSignupStatus);

  const nextStep = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Entering try block");

      try {
          const signupData = {
              email,
              timestamp: new Date().toISOString()
          };
          
          console.log("try block");
          await CreateObject('presignup', signupData);//have to create this function
          setStatus('success');
          setEmail('');
      } catch (error) {
        console.log("hello !!!");
          console.error('Signup error:', error);
          setStatus('error');
      }
  };

  return (
    <>
    <Popup/>
    <Loader/>
    
    <div className='min-h-screen'>
        {/* Header */}
        <header className="relative h-screen flex items-center justify-center overflow-hidden">

        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {items1.map((item) => (
          <AnimatedItem
          key={item.id}
          content={item.content}
          duration={item.duration}
          tailwindClass={item.tailwindClass}
          />
          ))}
        </div>

      </header>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Nexora?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Now */}
      <section className="flex flex-col justify-center items-center py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-600">
        {step === 1 && <SignupStep1 nextStep={nextStep} />}
        {step === 2 && <SignupStep2 nextStep={nextStep} email={userData.email} userData={userData} />}
        {step === 3 && <SignupStep3 nextStep={nextStep} userData={userData} />}

        {signupStatus && 
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {items2.map((item) => (
        <AnimatedItem
        key={item.id}
        content={item.content}
        duration={item.duration}
        tailwindClass={item.tailwindClass}
        />
        ))}
      </div>}
      </section>


            <section id="signup" data-name="signup" className="py-20 bg-white">
                <div data-name="signup-container" className="container mx-auto px-6 max-w-2xl">
                    <h2 data-name="signup-title" className="text-3xl md:text-4xl font-bold text-center mb-8">
                        Be First to Experience Nexora
                    </h2>
                    <p data-name="signup-description" className="text-gray-600 text-center mb-12">
                        Join our waitlist to get early access and exclusive updates about our launch.
                    </p>
                    
                    <form data-name="signup-form" onSubmit={handleSubmit} className="space-y-4">
                        <div data-name="input-group" className="flex flex-col md:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 input-focus"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Join Waitlist
                            </button>
                        </div>
                        
                        {status === 'success' && (
                            <div data-name="success-message" className="text-green-600 text-center">
                                Thanks for signing up! We'll keep you updated.
                            </div>
                        )}
                        
                        {status === 'error' && (
                            <div data-name="error-message" className="text-red-600 text-center">
                                Oops! Something went wrong. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </section>
 



      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Join Our WhatsApp Community</h2>
          <p className="text-xl text-gray-600 mb-12">
            Connect with fellow travelers, share experiences, and get instant updates about travel opportunities.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {['Adventure Seekers', 'Culture Explorers', 'Budget Travelers'].map((group, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm cursor-pointer">
                <h3 className="text-xl font-semibold mb-4">{group}</h3>
                <p className="text-gray-600 mb-4">
                  {group === 'Adventure Seekers' && 'Connect with adrenaline junkies and extreme sports enthusiasts'}
                  {group === 'Culture Explorers' && 'Discover local traditions, arts, and authentic experiences'}
                  {group === 'Budget Travelers' && 'Share tips and tricks for smart, affordable travel'}
                </p>
                <button
                  onClick={() => handleJoinGroup(group)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Join Group →
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {toast.success('WhatsApp invite sent!');
              window.open('https://chat.whatsapp.com/ERzDvgVPd6kFcewob14Sm6', '_blank');
            }}
            className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Join WhatsApp Group</span>
          </button>
        </div>
      </section>
    </div>

{/* Footer Newly added here */}

    <footer data-name="footer" className="bg-gray-900 text-white py-12">
                <div data-name="footer-content" className="container mx-auto px-6">
                    <div data-name="footer-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div data-name="footer-left">
                            <h3 data-name="footer-logo" className="text-2xl font-bold mb-4">Nexora</h3>
                            <p data-name="footer-description" className="text-gray-400 max-w-md">
                                The future of smart travel planning. Personalized itineraries, real-time updates, and a community of travelers.
                            </p>
                        </div>
                        <div data-name="footer-right" className="flex justify-start md:justify-end items-center space-x-6">
                            <a href="mailto:nexora195@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                            <i class="fa-solid fa-envelope text-2xl"></i>
                            </a>
                            <a href="https://www.instagram.com/nexora.official2025?igsh=MWUzaDFwdjNwdHk2NA%3D%3D&utm_source=qr" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-instagram text-2xl mr-5"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/nexora-official-2025/" className="text-gray-400 hover:text-white transition-colors">
                                <i className="fab fa-linkedin text-2xl"></i>
                            </a>
                        </div>
                    </div>
                    <div data-name="footer-bottom" className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Nexora. All rights reserved.</p>
                    </div>
                </div>
    </footer>
    <ToastContainer />
  </>
  )
}

export default LandingPage