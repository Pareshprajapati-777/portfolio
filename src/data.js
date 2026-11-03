// Single source of truth for all portfolio content.
// Edit this file to update the whole site.

export const profile = {
  name: 'Paresh Prajapati',
  monogram: 'PP',
  titles: ['AI & ML Engineer', 'Data Scientist', 'Data Analyst'],
  headline: 'AI & ML Engineer | Data Scientist | Data Analyst',
  tagline: 'Building practical AI, machine learning and data-driven solutions.',
  shortBio:
    'B.Sc. Information Technology student focused on Artificial Intelligence, Machine Learning, Data Science, Deep Learning, Computer Vision and practical application development.',
  location: 'Ahmedabad, Gujarat, India',
  role: 'AI & ML Engineer | Data Scientist | Data Analyst',
  email: 'pareshprajapati999b@gmail.com',
  phone: '+91 7096377561',
  github: 'https://github.com/Pareshprajapati-777',
  linkedin: 'https://linkedin.com/in/pareshprajapati-co',
  githubHandle: 'Pareshprajapati-777'
};

export const about = {
  body:
    'I build practical AI and data-driven applications using Python, TensorFlow, Keras, Scikit-learn, OpenCV, Pandas, NumPy, Streamlit, FastAPI and modern web technologies. My projects include real-time face mask detection, face recognition attendance automation, AI-powered solar planning, weather and air-quality analytics, CNN-based image classification and interactive data dashboards. I am currently pursuing an AI & Machine Learning Engineer Program at CDMI and continuously developing practical AI/ML applications.',
  focus: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Data Science',
    'Data Analytics'
  ],
  strengths: [
    'Problem Solving',
    'Analytical Thinking',
    'System Design',
    'Machine Learning',
    'Data Analysis',
    'Computer Vision',
    'Self Learning',
    'Attention to Detail',
    'Practical Project Development'
  ]
};

export const skillGroups = [
  { title: 'Programming Languages', items: ['Python', 'SQL', 'C', 'C++', 'JavaScript', 'HTML', 'CSS'] },
  {
    title: 'Data Science',
    items: ['Pandas', 'NumPy', 'EDA', 'Data Cleaning', 'Data Preprocessing', 'Feature Engineering', 'Statistical Analysis', 'Data Visualization', 'Advanced Excel']
  },
  {
    title: 'Machine Learning',
    items: ['Scikit-learn', 'Regression', 'Classification', 'Forecasting', 'Model Training', 'Model Evaluation']
  },
  {
    title: 'Deep Learning',
    items: ['TensorFlow', 'Keras', 'CNN', 'Transfer Learning', 'Image Classification']
  },
  {
    title: 'Computer Vision',
    items: ['OpenCV', 'face_recognition', 'dlib', 'Face Detection', 'Face Recognition', 'Image Processing', 'Real-Time Detection']
  },
  {
    title: 'Data Visualization',
    items: ['Matplotlib', 'Seaborn', 'Plotly', 'Folium', 'Power BI']
  },
  {
    title: 'Web & Deployment',
    items: ['Streamlit', 'FastAPI', 'React', 'Vite', 'Node.js', 'Express.js']
  },
  { title: 'Database & Tools', items: ['SQLite', 'Git', 'GitHub', 'Jupyter Notebook', 'Google Colab', 'VS Code'] }
];

export const featuredProjects = [
  {
    n: '01',
    title: 'Face Mask Detection',
    category: 'AI / ML / Computer Vision / Full Stack',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'FastAPI', 'Express.js', 'React', 'Vite'],
    description:
      'A real-time face mask detection system using a CNN-based deep learning model with live webcam inference.',
    features: [
      'Real-time webcam detection',
      'Multi-face detection',
      'MASK / NO MASK / UNKNOWN classification',
      'Confidence scores & bounding boxes',
      'Transfer learning + model evaluation',
      'Confusion matrix, accuracy & loss analysis',
      'FastAPI backend + React frontend'
    ],
    url: 'https://github.com/Pareshprajapati-777/Face-Mask-Detection',
    liveUrl: 'https://face-mask-detections.vercel.app'
  },
  {
    n: '02',
    title: 'Face Recognition Attendance System',
    category: 'Computer Vision / Automation / AI',
    tech: ['Python', 'Streamlit', 'face_recognition', 'dlib', 'SQLite'],
    description:
      'An offline face recognition attendance system that identifies registered students and automatically records attendance.',
    features: [
      'Face registration & embeddings',
      'Face matching with adjustable threshold',
      'Present / Absent detection',
      'SQLite database',
      'Date-wise attendance & student-wise reports',
      'CSV export, offline processing'
    ],
    url: 'https://github.com/Pareshprajapati-777/FACE-ATTENDANCE-SYSTEM',
    liveUrl: 'https://face-attendance-system-on.streamlit.app'
  },
  {
    n: '03',
    title: 'AI Solar Planning & Financial Analysis',
    category: 'AI / ML / Data Science / Financial Analysis',
    tech: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Plotly'],
    description:
      'An ML-powered solar planning application combining solar power prediction with financial planning, cost estimation, ROI analysis and subsidy analysis.',
    features: [
      'Solar power prediction',
      'Residential & commercial planning',
      'Cost estimation, ROI & subsidy analysis',
      'Multiple input scenarios & prediction history',
      'Interactive charts',
      'PDF / Excel / CSV reports'
    ],
    url: 'https://github.com/Pareshprajapati-777/AI-Solar-Planning-Financial-Analysis-System',
    liveUrl: 'https://solar-planning-financial-analysis-system.streamlit.app/'
  },
  {
    n: '04',
    title: 'Weather & Air Quality Dashboard',
    category: 'Data Analytics / API / Visualization',
    tech: ['Python', 'Streamlit', 'Pandas', 'Folium', 'OpenWeather API'],
    description:
      'Real-time weather and air-quality monitoring across multiple locations using the OpenWeather REST API.',
    features: [
      'Temperature, humidity, AQI',
      'PM2.5, PM10, CO, NO2, O3, SO2',
      'Multiple locations',
      'AQI & pollutant analysis',
      'Interactive maps (Folium)',
      'KPI cards & REST API integration'
    ],
    url: 'https://github.com/Pareshprajapati-777/Weather-Air-Quality-Dashboard',
    liveUrl: 'https://weather-air-quality-dashboard.streamlit.app'
  },
  {
    n: '05',
    title: 'MNIST Digit Classification',
    category: 'Deep Learning / Computer Vision',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'NumPy', 'Streamlit'],
    description:
      'CNN-based classification of 70,000 handwritten digit images across 10 digit classes.',
    features: [
      'Image upload & preprocessing',
      '28x28 resizing',
      'CNN classification',
      'Prediction confidence',
      'Streamlit interface'
    ],
    url: 'https://github.com/Pareshprajapati-777/MNIST-Digit-Classification',
    liveUrl: 'https://mnist-classification-number.streamlit.app/'
  },
  {
    n: '06',
    title: 'Car Data Analysis Dashboard',
    category: 'Data Analytics / EDA / Visualization',
    tech: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
    description:
      'EDA and visualization dashboard over 10,000+ car records with 19+ attributes.',
    features: [
      'Data cleaning & EDA',
      'KPI cards & dynamic filters',
      'Price & mileage analysis',
      'Bar / line / scatter / pie charts',
      'Correlation heatmap'
    ],
    url: 'https://github.com/Pareshprajapati-777/Car-Data-Analysis-Dashboard',
    liveUrl: 'https://car-data-analysis-dashboard.streamlit.app/'
  },
  {
    n: '07',
    title: 'Cat vs Dog Detection',
    category: 'Computer Vision / Deep Learning',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Streamlit'],
    description:
      'An image classification application for identifying cats and dogs using deep learning.',
    features: [
      'Image classification',
      'CNN-based model',
      'Image preprocessing',
      'Prediction',
      'Streamlit interface'
    ],
    url: 'https://github.com/Pareshprajapati-777/Cat-Dog-Detection',
    liveUrl: 'https://cat-dog-detection-system.streamlit.app/'
  },
  {
    n: '08',
    title: 'Pandas Practical Solver',
    category: 'Data Analytics / Learning Application',
    tech: ['Python', 'Pandas', 'Streamlit'],
    description:
      '27+ practical Pandas problems covering cleaning, preprocessing, GroupBy, aggregation and analysis.',
    features: [
      '27+ practical Pandas problems',
      'Data cleaning & preprocessing',
      'Missing-value handling',
      'GroupBy & aggregation',
      'Outlier detection',
      'Data analysis'
    ],
    url: 'https://github.com/Pareshprajapati-777/Pandas-Practical-Solver',
    liveUrl: 'https://pandas-practical-solver.streamlit.app/'
  },
  {
    n: '09',
    title: 'Cruise Hunt – Maritime Booking Platform',
    category: 'Full Stack / Web / Three.js',
    tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'SQLite', 'Tailwind CSS', 'Three.js'],
    description:
      'A full-stack cruise and water sports booking platform connecting travelers with ship owners and activity operators.',
    features: [
      'Cruise and water sports discovery',
      'Customer, Owner & Admin dashboards',
      'Booking and availability management',
      'Digital tickets, QR verification and booking records'
    ],
    url: 'https://github.com/Pareshprajapati-777/Cross-Hunt',
    liveUrl: 'https://cruise-hunt.vercel.app/'
  },
  {
    n: '10',
    title: 'Sangeet – Music Intelligence Platform',
    category: 'AI / ML / Deep Learning / Audio',
    tech: ['Python', 'Streamlit', 'PyTorch', 'Scikit-learn', 'SQLite', 'Plotly', 'Folium'],
    description:
      'An AI-powered music discovery and analytics platform combining machine learning, deep learning and computer vision.',
    features: [
      'Content-based music recommendation system',
      'AI musicologist and conversational assistant',
      'Facial recognition for artist identification',
      'Interactive music analytics and geospatial maps'
    ],
    url: 'https://github.com/Pareshprajapati-777/Sangeet',
    liveUrl: 'https://mymusic7.streamlit.app/'
  },
  {
    n: '11',
    title: 'Lucky Bowl – 3D Lucky Draw Experience',
    category: '3D Web / Interactive / Three.js',
    tech: ['JavaScript', 'Three.js', 'GSAP', 'HTML', 'CSS', 'Vite', 'Canvas Confetti'],
    description:
      'An interactive 3D lucky draw experience featuring a realistic glass bowl, animated paper selection and cinematic winner reveals.',
    features: [
      'Realistic 3D glass bowl visualization',
      'Interactive hand-picking experience',
      'Animated paper unfolding and winner reveal',
      'Smooth GSAP animations and confetti celebration'
    ],
    url: 'https://github.com/Pareshprajapati-777/Lucky-Bowl',
    liveUrl: 'https://luckybowl.vercel.app/'
  },
  {
    n: '12',
    title: 'Score Dude – Student Evaluation System',
    category: 'Full Stack / Automation / Web App',
    tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'SQLite', 'Tailwind CSS', 'Framer Motion'],
    description:
      'A student and candidate evaluation platform that automates scoring, weighted calculations and performance tracking.',
    features: [
      'Customizable evaluation criteria',
      'Automatic scores, percentages and grades',
      'Candidate management and evaluation history',
      'CSV exports and printable scorecards'
    ],
    url: 'https://github.com/Pareshprajapati-777/Scoredude',
    liveUrl: 'https://scoredude.vercel.app/'
  },
  {
    n: '13',
    title: 'Movie Explorer – Cinematic Discovery',
    category: 'AI / ML / Recommendation System',
    tech: ['Python', 'Streamlit', 'Pandas', 'REST API', 'NLP'],
    description:
      'An intelligent movie recommendation and exploration dashboard with dynamic filtering, ratings analytics and metadata discovery.',
    features: [
      'Smart genre, rating and cast-based discovery',
      'Similarity-based movie recommendation',
      'Interactive analytics and streaming indicators',
      'Responsive Streamlit interface'
    ],
    url: 'https://github.com/Pareshprajapati-777/Movie-Explorer',
    liveUrl: 'https://movie-explorers.streamlit.app'
  }
];

export const otherProjects = [
  'Tourist Plan',
  'Wikipedia Search Engine',
  'Game Hub',
  'Quizizz Game',
  'ATM System',
  'Employee Salary Management',
  'Table Generator',
  'Infinity Coders'
];

export const education = [
  {
    type: 'Bachelor',
    title: 'B.Sc. Information Technology',
    org: 'Swarrnim University, Gandhinagar, Gujarat',
    period: '2025 – Present',
    detail: 'CGPA: 6.09 / 10.0'
  },
  {
    type: 'H.S.C.',
    title: 'Higher Secondary (Commerce)',
    org: 'Super High School, Ahmedabad, Gujarat',
    period: '2024 – 2025',
    detail: '90% — Distinction'
  },
  {
    type: 'S.S.C.',
    title: 'Secondary School',
    org: 'Super High School, Ahmedabad, Gujarat',
    period: '2023 – 2024',
    detail: '80%'
  }
];

export const certification = {
  title: 'AI & Machine Learning Engineer Program',
  org: 'Creative Design & Multimedia Institute (CDMI), Ahmedabad',
  period: 'January 2026 – Present'
};

export const stats = [
  { value: 13, suffix: '+', label: 'Featured Projects' },
  { value: 70000, suffix: '', label: 'MNIST Dataset Images' },
  { value: 10000, suffix: '+', label: 'Car Dataset Records' },
  { value: 27, suffix: '+', label: 'Pandas Problems' },
  { value: 128, suffix: '-D', label: 'Face Embeddings' }
];

export const captions = [
  'Yes, I have that many skills. No, this site is not regenerating my wounds.',
  'Too many skills? No such thing. That’s my healing factor talking.',
  'AI that wears masks. Attendance that stalks you. Built with maximum effort.',
  'Hit me up — I don’t have a healing factor for unanswered emails.'
];

export const comicReel = [
  {
    id: 'origin',
    src: '/1000171027.jpg',
    tag: 'SCENE 01 · STANCE',
    title: 'THE MERC WITH AN ALGORITHM',
    quote: 'Dual swords? Nah, dual GPUs for Deep Learning & Computer Vision.',
    badge: 'BADASS MODE',
    accent: '#da2011'
  },
  {
    id: 'blush',
    src: '/1000171037.jpg',
    tag: 'SCENE 02 · REACTION',
    title: 'WHO, ME? JUST AN AI ENGINEER!',
    quote: 'You really scrolled all this way? Stop it, you’re making my mask blush.',
    badge: 'CUTE & LETHAL',
    accent: '#ff2a18'
  },
  {
    id: 'katana',
    src: '/1000171035.jpg',
    tag: 'SCENE 03 · COMBAT',
    title: 'KATANA PRECISION IN CODE',
    quote: 'Slicing through 70k MNIST images and fine-tuning CNNs with comic intensity.',
    badge: 'WHA-POW!',
    accent: '#f7d117'
  },
  {
    id: 'heart',
    src: '/1000171036.jpg',
    tag: 'SCENE 04 · PASSION',
    title: 'MADE WITH MAXIMUM LOVE',
    quote: 'Heart hands for everyone building real-time models & automated workflows.',
    badge: 'WITH LOVE ❤️',
    accent: '#ff4d6d'
  },
  {
    id: 'chimichanga',
    src: '/1000171038.jpg',
    tag: 'SCENE 05 · FINALE',
    title: 'MAXIMUM EFFORT. CHIMICHANGAS!',
    quote: 'No half measures. Ready to build, train, and deploy practical AI solutions.',
    badge: 'MAX EFFORT!',
    accent: '#da2011'
  }
];

export const actionWords = ['BAM!', 'BOOM!', 'ZOOM!', 'KABOOM!', 'WHA-POW!', 'POW!'];
