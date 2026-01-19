import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

function App() {
  const headerRef = useRef(null); // Ref for the header to append the canvas
  const animationFrameId = useRef<number | null>(null); // To store animation frame ID for cleanup
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for sections to observe for animations
  const sectionRefs = {
    summary: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    achievements: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
  };

  // State to track if a section is in view
  const [inView, setInView] = useState({
    summary: false,
    skills: false,
    experience: false,
    projects: false,
    achievements: false,
    education: false,
  });

  // Intersection Observer callback
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      // Ensure sectionId is a valid key before updating state
      if (Object.keys(inView).includes(sectionId)) {
        setInView(prev => ({
          ...prev,
          [sectionId as keyof typeof inView]: entry.isIntersecting,
        }));
      }
    });
  }, [inView]); // Dependency on inView to ensure observer is recreated if inView structure changes (unlikely here)

  useEffect(() => {
    // Setup Intersection Observer for sections
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the section is visible
    });

    // Observe each section
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup Intersection Observer
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, [observerCallback, sectionRefs]); // Added sectionRefs to dependencies

  // Three.js setup for the header background
  useEffect(() => {
    if (!headerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Make background transparent

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.4), 0.1, 1000);
    camera.position.z = 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight * 0.4); // Set size to 40% of viewport height
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append renderer's DOM element to the header
    const currentHeaderRef = headerRef.current;
    currentHeaderRef.appendChild(renderer.domElement);

    // Style the canvas to be absolute and cover the header
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '0'; // Ensure it's behind the content
    renderer.domElement.style.pointerEvents = 'none'; // Allow clicks to pass through

    // Add a simple 3D object (e.g., a Dodecahedron)
    const geometry = new THREE.DodecahedronGeometry(0.8, 0); // Smaller size
    const material = new THREE.MeshPhongMaterial({
      color: 0x87CEEB, // Sky blue
      emissive: 0x000000,
      specular: 0x000000,
      shininess: 0,
      flatShading: true,
      transparent: true,
      opacity: 0.7 // Slightly transparent
    });
    const dodecahedron = new THREE.Mesh(geometry, material);
    scene.add(dodecahedron);

    // Add subtle lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Directional light
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      dodecahedron.rotation.x += 0.002;
      dodecahedron.rotation.y += 0.003;

      renderer.render(scene, camera);
    };

    // Handle window resize
    const onWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight * 0.4;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onWindowResize);

    animate(); // Start animation

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentHeaderRef && renderer.domElement) {
        currentHeaderRef.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Dispose of the renderer
      geometry.dispose(); // Dispose of geometry
      material.dispose(); // Dispose of material
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handle scroll for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Helper function to get animation classes
  const getAnimationClasses = (sectionId: keyof typeof inView) =>
    inView[sectionId] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      {/* Three.js CDN */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand for Mobile */}
            <div className="flex-shrink-0 flex items-center md:hidden">
              <span className="font-bold text-xl text-blue-900">Portfolio</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex justify-center w-full space-x-1 lg:space-x-8">
              {['Summary', 'Skills', 'Experience', 'Projects', 'Achievements', 'Education'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 text-sm lg:text-base px-3 py-2 rounded-md hover:bg-blue-50"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Summary', 'Skills', 'Experience', 'Projects', 'Achievements', 'Education'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header ref={headerRef} className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 md:p-12 shadow-xl rounded-b-3xl overflow-hidden min-h-[200px] md:min-h-[300px] flex items-center justify-center">
        {/* Content of the header */}
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10"> {/* z-10 to keep content above 3D */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-2 leading-tight">Ragul Sethuraman</h1>
            <p className="text-lg sm:text-xl md:text-3xl font-light opacity-90">Full-Stack Developer | 3+ Years Experience</p>
            <p className="text-base sm:text-lg md:text-xl font-light opacity-80 mt-2">MEAN Stack | AWS | Tailwindcss | PostgresSQL</p>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-3">
            <a href="mailto:ragul.sethuraman1999@gmail.com" className="flex items-center text-white hover:text-blue-200 transition-colors duration-300 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mr-3"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              ragul.sethuraman1999@gmail.com
            </a>
            <a href="tel:+917397363765" className="flex items-center text-white hover:text-blue-200 transition-colors duration-300 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone mr-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.18 2.19l-.7.69a19 19 0 0 0 6 6l.69-.7a2 2 0 0 1 2.19-1.18 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              +91 73973 63765
            </a>
            <a href="https://www.linkedin.com/in/ragul-sethuraman/" target="_blank" rel="noopener noreferrer" className="flex items-center text-white hover:text-blue-200 transition-colors duration-300 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin mr-3"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-12 max-w-5xl">
        {/* Summary Section */}
        <section
          id="summary"
          ref={sectionRefs.summary}
          className={`bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 transform transition-all duration-700 ${getAnimationClasses('summary')}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user mr-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            Summary
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            Full-Stack Developer with 3+ years of hands-on experience building scalable enterprise-grade web applications using the
            MEAN stack (MongoDB, Express.js, Angular, Node.js) and MERN stack(MongoDB, Express.js, Node.js). Adept at designing robust RESTful APIs, integrating cloud
            services (AWS S3), implementing CI/CD (GitHub Actions, Jenkins), and following Agile methodologies. Known for
            delivering impactful, user-centric applications including AI-powered learning platforms and automation tools. Seeking
            opportunities to leverage full-stack expertise to solve complex business problems.
          </p>
        </section>

        {/* Technical Skills Section */}
        <section
          id="skills"
          ref={sectionRefs.skills}
          className={`bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 transform transition-all duration-700 ${getAnimationClasses('skills')}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench mr-4"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77Z" /><path d="m14.7 6.3 1.6 1.6" /></svg>
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill Category: Frontend */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Frontend</h3>
              <ul className="space-y-2">
                {['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Backend */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Backend</h3>
              <ul className="space-y-2">
                {['Node.js', 'Express.js', 'REST APIs', 'Microservices'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Databases */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Databases</h3>
              <ul className="space-y-2">
                {['PostgreSQL', 'MongoDB', 'NoSQL'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: DevOps & Cloud */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">DevOps & Cloud</h3>
              <ul className="space-y-2">
                {['AWS (S3)', 'CI/CD (Jenkins, GitHub Actions)'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Tools & Version Control */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Tools & Version Control</h3>
              <ul className="space-y-2">
                {['Git', 'GitHub', 'GitLab', 'Confluence', 'Jira', 'VS Code', 'Visual Studio', 'Postman', 'WinSCP', 'PuTTY'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Monitoring & Logging */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Monitoring & Logging</h3>
              <ul className="space-y-2">
                {['OpenSearch'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Testing & Performance */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Testing & Performance</h3>
              <ul className="space-y-2">
                {['API Performance Optimization', 'Playwright automation'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Software Development & Architecture */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Software Development & Architecture</h3>
              <ul className="space-y-2">
                {['Full Stack Development', 'Product Development', 'Configuration Management', 'UML', 'Integration Solutions'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skill Category: Soft Skills */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-blue-700 mb-4">Soft Skills</h3>
              <ul className="space-y-2">
                {['Communication', 'Analytical Thinking', 'Problem-Solving', 'Teamwork'].map(skill => (
                  <li key={skill} className="flex items-center text-gray-700 text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle mr-2 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section
          id="experience"
          ref={sectionRefs.experience}
          className={`bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 transform transition-all duration-700 ${getAnimationClasses('experience')}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase mr-4"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            Work Experience
          </h2>
          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">Full-Stack Developer - Infosys Private Limited</h3>
              <p className="text-md text-gray-600 mb-4">April 2022 - Present</p>
              <ul className="list-none space-y-4">
                <li>
                  <span className="font-bold text-blue-700 text-xl">Project 1: Adaptive Course Creator (R-CAT)</span>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-700">
                    <li>Developed a dynamic course platform that personalized learning paths based on user behaviour using Angular, Node.js, and MongoDB.</li>
                    <li>Reduced user drop-off by 40% and increased engagement by 60% by integrating adaptive content delivery.</li>
                    <li>Collaborated with cross-functional teams, enhancing product feedback loop and time-to-delivery.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold text-blue-700 text-xl">Project 2: Cohort Management Application</span>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-700">
                    <li>Automated the manual cohort creation process, reducing team workload by 100% and cutting admin time by 3+ hours daily.</li>
                    <li>Designed intuitive UI components using Angular and optimized backend flows with Node.js and MongoDB.</li>
                    <li>Received Insta Award for operational impact and innovation.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold text-blue-700 text-xl">Project 3: AI Emulator - Game-Based Learning</span>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-700">
                    <li>Engineered an AI-powered gamified learning platform using custom AI scoring algorithms and real-time feedback.</li>
                    <li>Enhanced learning outcomes through gamification, boosting retention by 45% and user satisfaction by 4.8/5 in internal surveys.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Personal Projects Section */}
        <section
          id="projects"
          ref={sectionRefs.projects}
          className={`bg-white p-8 md:p-10 rounded-xl shadow-lg mb-12 transform transition-all duration-700 ${getAnimationClasses('projects')}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket mr-4"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
            Personal Projects
          </h2>
          <div className="space-y-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
              {/* Building Stage Badge */}
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm z-10">
                Building Stage
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-2xl font-semibold text-blue-700">StyleLab</h3>
                <a href="https://styleslab.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base mt-2 md:mt-0 flex items-center">
                  Visit Website
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                An AI-powered CSS generator featuring 18+ free tools including Flexbox, Grid, Gradient, and Animation generators.
              </p>

              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Comprehensive suite of CSS tools to streamline web design.</li>
                <li>Includes performance optimization analysis and accessibility checking.</li>
                <li>Designed for developers to quickly generate and test CSS properties.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          ref={sectionRefs.achievements}
          className={`bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 transform transition-all duration-700 ${getAnimationClasses('achievements')}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award mr-4"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17.18 21l-5.15-3.62L6.82 21l1.703-8.11" /></svg>
            Achievements
          </h2>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="2xl font-semibold text-blue-700 mb-3">Award</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-lg">
                <li>Insta Award for best contribution - Cohort Management Application (Infosys).</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
              <h3 className="2xl font-semibold text-blue-700 mb-3">Certifications</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-lg">
                <li>MEAN Stack Developer - Infosys Foundation Program</li>
                <li>API Development using Node & Express - Infosys</li>
                <li>Prompt Engineering - Infosys</li>
                <li>Privacy by Design (Beginner & Intermediate) - Infosys</li>
                <li>Fundamentals of Red Hat Enterprise Linux - Coursera</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          ref={sectionRefs.education}
          className={`bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 transform transition-all duration-700 ${getAnimationClasses('education')}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap mr-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v4c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-4" /><path d="M12 22v-6" /></svg>
            Education
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg shadow-inner hover:shadow-md transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800">Prince Shri Venkateshwara Padmavathy Engineering College</h3>
            <p className="text-lg text-gray-600">Chennai</p>
            <p className="text-lg text-gray-600 mb-2">Bachelors in Mechanical Engineering - CGPA - 8.2</p>
            <p className="text-lg text-gray-600">May 2021</p>
          </div>
        </section>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-6 text-center rounded-t-3xl shadow-xl">
        <p className="text-lg">&copy; {new Date().getFullYear()} Ragul Sethuraman. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
