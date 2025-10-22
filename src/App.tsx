import { useState, useEffect } from 'react';
import { motion, easeOut } from 'framer-motion';
import { Menu, X, Moon, Sun, Github, Linkedin, Mail, Phone, MapPin, Code, Database, Terminal, Briefcase, Award } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const skills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Redux', 'TypeScript', 'Bootstrap', 'Tailwind CSS', 'Sass', 'jQuery'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'JWT Auth', 'RESTful APIs'],
    tools: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vite', 'Vercel', 'Render']
  };

  const projects = [
    {
      title: 'Audit-Info CRM',
      description: 'Cross-platform CRM and audit system for managing college operations including admissions, branches, leads, agents, expenses, and payments with JWT authentication and role-based dashboards.',
      tech: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
      category: 'Full Stack'
    },
    {
      title: 'ERP Software',
      description: 'Comprehensive ERP system unifying business processes including products, customers, purchases, stock, sales, vendors, and warehouse management with real-time data access.',
      tech: ['MERN Stack', 'RESTful APIs', 'MySQL'],
      category: 'Enterprise'
    },
    {
      title: 'Hospital Website',
      description: 'Hospital management platform featuring online appointments, doctor listings, contact information, and secure admin panel for data management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'Healthcare'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce website with product listings, shopping cart, secure checkout, and admin panel for inventory and order management.',
      tech: ['MERN Stack', 'Redux', 'JWT'],
      category: 'E-Commerce'
    }
  ];

  // Framer Motion variants for section reveal
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900'}`}>
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? (isDark ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg shadow-purple-500/10' : 'bg-white/95 backdrop-blur-lg shadow-lg') : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                &lt;/&gt;
              </div>


              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`transition-all duration-300 hover:text-purple-400 ${activeSection === item.toLowerCase() ? 'text-purple-400 font-semibold' : ''}`}
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => { setActiveSection(item.toLowerCase()); setIsMenuOpen(false); }}
                  className={`block px-4 py-3 transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Home Section */}
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
          className="min-h-screen flex items-center justify-center pt-16 px-4"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Hi, I'm Adnan
              </h1>
              <p className="text-2xl md:text-3xl mb-4 font-light">Full Stack Developer</p>
              <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Specializing in MERN Stack Development | Building Scalable Web Solutions
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a href="https://github.com/adnan-p-786" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${isDark ? 'bg-gray-800 hover:bg-purple-600' : 'bg-gray-200 hover:bg-purple-500 hover:text-white'}`}>
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/mohd-adnan-p" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${isDark ? 'bg-gray-800 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'}`}>
                  <Linkedin size={24} />
                </a>
                <a href="mailto:mohdadnanp21@gmail.com" className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${isDark ? 'bg-gray-800 hover:bg-pink-600' : 'bg-gray-200 hover:bg-pink-500 hover:text-white'}`}>
                  <Mail size={24} />
                </a>
              </div>
              <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50">
                Get In Touch
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className={`rounded-2xl p-8 md:p-12 ${isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-2xl transition-all duration-300 hover:shadow-purple-500/20`}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="text-purple-400" size={28} />
                    Experience
                  </h3>
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'} mb-6`}>
                    <h4 className="font-bold text-lg mb-2">MERN Stack Intern</h4>
                    <p className="text-purple-400 mb-2">Rootsys International</p>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>October 2024 - Present | Kottakkal</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Contributing to the Audit-Info CRM project, enhancing skills in full-stack development and CRM solutions.
                    </p>
                  </div>
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Award className="text-purple-400" size={20} />
                      Certifications
                    </h4>
                    <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• MERN Stack Development - Rootsys International</li>
                      <li>• NETD Certification - Rootsys International</li>
                      <li>• AI Appreciate - Intel</li>
                      <li>• AI Aware - Intel</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Summary</h3>
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Passionate Full Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js), with a strong focus on building fast, scalable, and user-focused web applications.
                  </p>
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Currently interning at Rootsys International, where I contribute to developing a CRM platform that enhances data management and workflow efficiency.
                  </p>
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    I enjoy turning complex problems into clean, intuitive solutions from crafting responsive UIs to optimizing backend performance. Always eager to learn new technologies, collaborate with creative teams, and deliver impactful digital experiences that make a difference.
                  </p>
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                    <h4 className="font-bold text-lg mb-3">Education</h4>
                    <p className="font-semibold">Bachelor of Business Administration</p>
                    <p className="text-purple-400">Calicut University</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>MCAS, Vengara | 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/** Frontend Skills */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-xl cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Code className="text-purple-400" size={32} />
                  <h3 className="text-2xl font-bold">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <span key={skill} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isDark ? 'bg-purple-900/50 hover:bg-purple-800' : 'bg-purple-100 hover:bg-purple-200 text-purple-900'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/** Backend Skills */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-xl cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Database className="text-pink-400" size={32} />
                  <h3 className="text-2xl font-bold">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <span key={skill} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isDark ? 'bg-pink-900/50 hover:bg-pink-800' : 'bg-pink-100 hover:bg-pink-200 text-pink-900'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/** Tools Skills */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-xl cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="text-blue-400" size={32} />
                  <h3 className="text-2xl font-bold">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span key={skill} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isDark ? 'bg-blue-900/50 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200 text-blue-900'}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.03 }}
                  className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-xl cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                      {project.category}
                    </span>
                  </div>
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className={`rounded-2xl p-8 md:p-12 ${isDark ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'} shadow-2xl`}>
              <p className={`text-center text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm currently open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <a href="mailto:mohdadnanp21@gmail.com" className={`flex items-center gap-4 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-gray-900/50 hover:bg-purple-900/30' : 'bg-gray-50 hover:bg-purple-50'}`}>
                  <Mail className="text-purple-400" size={28} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                    <p className="font-semibold">mohdadnanp21@gmail.com</p>
                  </div>
                </a>
                <a href="tel:+916238285404" className={`flex items-center gap-4 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-gray-900/50 hover:bg-pink-900/30' : 'bg-gray-50 hover:bg-pink-50'}`}>
                  <Phone className="text-pink-400" size={28} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                    <p className="font-semibold">+91 6238285404</p>
                  </div>
                </a>
                <a href="https://github.com/adnan-p-786" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-gray-900/50 hover:bg-blue-900/30' : 'bg-gray-50 hover:bg-blue-50'}`}>
                  <Github className="text-blue-400" size={28} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>GitHub</p>
                    <p className="font-semibold">github.com</p>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/mohd-adnan-p" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-gray-900/50 hover:bg-indigo-900/30' : 'bg-gray-50 hover:bg-indigo-50'}`}>
                  <Linkedin className="text-indigo-400" size={28} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>LinkedIn</p>
                    <p className="font-semibold">www.linkedin.com</p>
                  </div>
                </a>
              </div>
              <div className={`flex items-center justify-center gap-3 mt-8 p-4 rounded-xl ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <MapPin className="text-purple-400" size={24} />
                <p className="font-semibold">Malappuram, Kerala, India</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className={`py-8 text-center ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} backdrop-blur-sm`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            <span className='font-bold'>©</span> 2025 Adnan. All Rights Reserved.
          </p>
        </footer>

        <style>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}

export default App;
