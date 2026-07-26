import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CodeModal from '../components/CodeModal';

type Cat = 'All' | 'Python AI' | 'Physics/Math' | 'Web Dev' | 'Core Algorithms';

interface Project {
  id: number;
  title: string;
  cat: Cat;
  tech: string[];
  desc: string;
  codeKey?: string;
}

/* ── 24 Projects ── */
const PROJECTS: Project[] = [
  // ── Python AI (5) ──
  {
    id: 1,
    title: 'Sentiment Analyzer',
    cat: 'Python AI',
    tech: ['Python', 'NLP'],
    desc: 'Analyzes text sentiment using keyword scoring and lexical analysis. Returns positive/negative/neutral classification with a confidence score, no external ML libraries required.',
    codeKey: 'sentiment',
  },
  {
    id: 2,
    title: 'Word Frequency Counter & Visualizer',
    cat: 'Python AI',
    tech: ['Python', 'Data Analysis'],
    desc: 'Tokenizes input text, strips stopwords, and generates a sorted frequency distribution map — identifying the most common terms with percentage weighting.',
    codeKey: 'wordfreq',
  },
  {
    id: 3,
    title: 'Rule-Based Chatbot',
    cat: 'Python AI',
    tech: ['Python', 'AI', 'NLP'],
    desc: 'Conversational AI using pattern matching and a response dictionary. Implements keyword detection, intent classification, and context tracking for natural Q&A interactions.',
    codeKey: 'chatbot',
  },
  {
    id: 4,
    title: 'Data Pattern Recognizer',
    cat: 'Python AI',
    tech: ['Python', 'Data Science'],
    desc: 'Analyzes numerical datasets to find patterns, outliers, and statistical properties. Flags anomalies using z-score thresholding and generates human-readable insight summaries.',
    codeKey: 'pattern',
  },
  {
    id: 5,
    title: 'Text Keyword Extractor',
    cat: 'Python AI',
    tech: ['Python', 'NLP'],
    desc: 'Extracts the most significant keywords from any text using TF-IDF-inspired scoring. Useful for summarization, tagging, and search indexing without external libraries.',
    codeKey: 'keywords',
  },

  // ── Physics/Math (9) ──
  {
    id: 6,
    title: 'Physics Optics Lens Calculator',
    cat: 'Physics/Math',
    tech: ['JavaScript', 'React', 'Physics'],
    desc: "Real-time focal length calculator using the Lens Maker's equation (1/f = 1/v − 1/u). Input object and image distances to instantly compute focal length with edge case handling.",
  },
  {
    id: 7,
    title: 'Projectile Motion Simulator',
    cat: 'Physics/Math',
    tech: ['JavaScript', 'Math', 'React'],
    desc: 'Calculates range, maximum height, and time of flight for a projectile. Input launch angle and initial velocity — visualizes the full trajectory arc.',
  },
  {
    id: 8,
    title: "Ohm's Law Calculator",
    cat: 'Physics/Math',
    tech: ['JavaScript', 'React'],
    desc: "Multi-mode calculator for Ohm's Law. Solve for Voltage, Current, or Resistance given any two known values with real-time computation.",
  },
  {
    id: 9,
    title: 'Simple Pendulum Period Calculator',
    cat: 'Physics/Math',
    tech: ['JavaScript', 'Math'],
    desc: 'Computes the time period of a simple pendulum using T = 2π√(L/g). Input pendulum length to find oscillation frequency and period.',
  },
  {
    id: 10,
    title: 'Gravitational Force Calculator',
    cat: 'Physics/Math',
    tech: ['Python', 'Math'],
    desc: 'Calculates gravitational attraction between two masses using Newton\'s Universal Law of Gravitation: F = Gm₁m₂/r². Supports scientific notation output.',
    codeKey: 'gravity',
  },
  {
    id: 11,
    title: 'Wave Speed & Frequency Calculator',
    cat: 'Physics/Math',
    tech: ['Python', 'JavaScript'],
    desc: 'Calculates wave speed, frequency, or wavelength using v = fλ. Supports both sound and electromagnetic wave types with unit conversions.',
    codeKey: 'wave',
  },
  {
    id: 12,
    title: 'Quadratic Equation Solver',
    cat: 'Physics/Math',
    tech: ['Python', 'JavaScript'],
    desc: 'Solves quadratic equations ax² + bx + c = 0 using the quadratic formula. Handles real and complex roots with discriminant analysis and step-by-step output.',
    codeKey: 'quadratic',
  },
  {
    id: 13,
    title: 'Prime Number Generator',
    cat: 'Physics/Math',
    tech: ['Python'],
    desc: 'Implements the Sieve of Eratosthenes to efficiently generate all prime numbers up to a user-specified limit. Includes prime factorization for individual numbers.',
    codeKey: 'primes',
  },
  {
    id: 14,
    title: 'Statistics Calculator',
    cat: 'Physics/Math',
    tech: ['Python', 'JavaScript'],
    desc: 'Computes mean, median, mode, variance, standard deviation, and range for any dataset. Includes frequency distribution analysis and percentile ranking.',
    codeKey: 'stats',
  },

  // ── Web Dev (4) ──
  {
    id: 15,
    title: 'BMI & Health Calculator',
    cat: 'Web Dev',
    tech: ['HTML', 'CSS', 'JavaScript'],
    desc: 'Calculates Body Mass Index with color-coded health category classification (Underweight / Normal / Overweight / Obese). Clean input form with animated result display.',
  },
  {
    id: 16,
    title: 'Interactive Quiz App',
    cat: 'Web Dev',
    tech: ['React', 'JavaScript', 'CSS'],
    desc: 'Multiple-choice quiz system with timer, score tracking, progress bar, and answer explanations. Supports custom question sets and difficulty levels.',
  },
  {
    id: 17,
    title: 'Digital Clock & Stopwatch',
    cat: 'Web Dev',
    tech: ['HTML', 'CSS', 'JavaScript'],
    desc: 'Fully functional digital clock with 12/24hr toggle, combined with a lap-tracking stopwatch. Uses CSS animations for smooth display transitions.',
  },
  {
    id: 18,
    title: 'Responsive Portfolio Website',
    cat: 'Web Dev',
    tech: ['React', 'TypeScript', 'Tailwind'],
    desc: "This very portfolio — built from scratch with React, TypeScript, Framer Motion, and Tailwind CSS. Features glassmorphism design, animated background, and full mobile responsiveness.",
  },

  // ── Core Algorithms (6) ──
  {
    id: 19,
    title: 'Binary Search & Sorting Suite',
    cat: 'Core Algorithms',
    tech: ['Python'],
    desc: 'Collection of classic algorithms: Binary Search (O log n), Bubble Sort, Selection Sort, Insertion Sort, and Merge Sort — each with annotated complexity analysis and step-by-step output.',
    codeKey: 'binary',
  },
  {
    id: 20,
    title: 'Fibonacci Sequence Generator',
    cat: 'Core Algorithms',
    tech: ['Python'],
    desc: 'Generates Fibonacci sequences using both iterative and recursive (with memoization) approaches. Compares time and space complexity — demonstrates Big-O in action.',
    codeKey: 'fibonacci',
  },
  {
    id: 21,
    title: 'Caesar Cipher Encoder/Decoder',
    cat: 'Core Algorithms',
    tech: ['Python'],
    desc: 'Implements the Caesar Cipher encryption algorithm with any shift value. Encodes and decodes messages, plus includes a brute-force cracker that tries all 25 shifts.',
    codeKey: 'caesar',
  },
  {
    id: 22,
    title: 'Password Strength Generator',
    cat: 'Core Algorithms',
    tech: ['Python', 'JavaScript'],
    desc: 'Generates cryptographically strong passwords with configurable length, character sets, and exclusion rules. Includes an entropy-based strength analyzer with visual feedback.',
    codeKey: 'password',
  },
  {
    id: 23,
    title: 'Matrix Operations Tool',
    cat: 'Core Algorithms',
    tech: ['Python'],
    desc: 'Performs matrix addition, subtraction, multiplication, transpose, and determinant calculation for 2×2 and 3×3 matrices — implemented from scratch without NumPy.',
    codeKey: 'matrix',
  },
  {
    id: 24,
    title: 'Number Guessing Game',
    cat: 'Core Algorithms',
    tech: ['Python'],
    desc: 'Interactive CLI game with difficulty modes (Easy 1–50 / Hard 1–200). Computer generates a random number; player guesses with binary-style hot/cold hints and optimal-move suggestions.',
    codeKey: 'guess',
  },
];

/* ── Syntax-Highlighted Python Snippets ── */
const CODE_SNIPPETS: Record<string, string> = {
  sentiment: `<span class="cm"># Sentiment Analyzer — keyword scoring approach</span>
<span class="kw">def</span> <span class="fn">analyze_sentiment</span>(text):
    positive_words = [<span class="str">"good"</span>, <span class="str">"great"</span>, <span class="str">"amazing"</span>, <span class="str">"excellent"</span>,
                      <span class="str">"happy"</span>, <span class="str">"love"</span>, <span class="str">"wonderful"</span>, <span class="str">"fantastic"</span>]
    negative_words = [<span class="str">"bad"</span>, <span class="str">"terrible"</span>, <span class="str">"awful"</span>, <span class="str">"horrible"</span>,
                      <span class="str">"hate"</span>, <span class="str">"poor"</span>, <span class="str">"worst"</span>, <span class="str">"disappointing"</span>]

    words = text.lower().split()
    pos_score = <span class="fn">sum</span>(<span class="num">1</span> <span class="kw">for</span> w <span class="kw">in</span> words <span class="kw">if</span> w <span class="kw">in</span> positive_words)
    neg_score = <span class="fn">sum</span>(<span class="num">1</span> <span class="kw">for</span> w <span class="kw">in</span> words <span class="kw">if</span> w <span class="kw">in</span> negative_words)
    total = pos_score + neg_score

    <span class="kw">if</span> total == <span class="num">0</span>:
        <span class="kw">return</span> {<span class="str">"label"</span>: <span class="str">"Neutral"</span>, <span class="str">"confidence"</span>: <span class="num">0.5</span>}

    confidence = <span class="fn">max</span>(pos_score, neg_score) / total
    label = <span class="str">"Positive"</span> <span class="kw">if</span> pos_score >= neg_score <span class="kw">else</span> <span class="str">"Negative"</span>
    <span class="kw">return</span> {<span class="str">"label"</span>: label, <span class="str">"confidence"</span>: <span class="fn">round</span>(confidence, <span class="num">2</span>)}

<span class="cm"># Example usage</span>
result = <span class="fn">analyze_sentiment</span>(<span class="str">"This project is absolutely amazing!"</span>)
<span class="fn">print</span>(result)  <span class="cm"># {'label': 'Positive', 'confidence': 1.0}</span>`,

  wordfreq: `<span class="kw">from</span> collections <span class="kw">import</span> Counter

<span class="kw">def</span> <span class="fn">word_frequency</span>(text, top_n=<span class="num">10</span>):
    STOPWORDS = {<span class="str">"the"</span>, <span class="str">"a"</span>, <span class="str">"an"</span>, <span class="str">"is"</span>, <span class="str">"in"</span>, <span class="str">"it"</span>,
                 <span class="str">"of"</span>, <span class="str">"to"</span>, <span class="str">"and"</span>, <span class="str">"this"</span>, <span class="str">"that"</span>}

    words = [w.lower().strip(<span class="str">".,!?"</span>)
             <span class="kw">for</span> w <span class="kw">in</span> text.split()
             <span class="kw">if</span> w.lower() <span class="kw">not in</span> STOPWORDS <span class="kw">and</span> <span class="fn">len</span>(w) > <span class="num">2</span>]

    counts = Counter(words)
    total  = <span class="fn">sum</span>(counts.values())

    <span class="kw">return</span> [
        {<span class="str">"word"</span>: word, <span class="str">"count"</span>: count,
         <span class="str">"pct"</span>: <span class="fn">round</span>(count / total * <span class="num">100</span>, <span class="num">1</span>)}
        <span class="kw">for</span> word, count <span class="kw">in</span> counts.most_common(top_n)
    ]`,

  chatbot: `<span class="kw">import</span> re

RULES = [
    (<span class="str">r"hello|hi|hey"</span>,      <span class="str">"Hello! How can I help you today?"</span>),
    (<span class="str">r"your name"</span>,         <span class="str">"I'm Yash's Python Chatbot!"</span>),
    (<span class="str">r"how are you"</span>,       <span class="str">"I'm running smoothly — thanks for asking!"</span>),
    (<span class="str">r"python"</span>,            <span class="str">"Python is my favourite language too!"</span>),
    (<span class="str">r"bye|goodbye"</span>,      <span class="str">"Goodbye! Come back anytime."</span>),
]

<span class="kw">def</span> <span class="fn">respond</span>(user_input):
    text = user_input.lower().strip()
    <span class="kw">for</span> pattern, reply <span class="kw">in</span> RULES:
        <span class="kw">if</span> re.<span class="fn">search</span>(pattern, text):
            <span class="kw">return</span> reply
    <span class="kw">return</span> <span class="str">"Interesting! Tell me more about that."</span>

<span class="cm"># Main loop</span>
<span class="kw">while</span> <span class="kw">True</span>:
    user = <span class="fn">input</span>(<span class="str">"You: "</span>)
    <span class="kw">if</span> user.lower() == <span class="str">"quit"</span>: <span class="kw">break</span>
    <span class="fn">print</span>(<span class="str">f"Bot: {<span class="fn">respond</span>(user)}"</span>)`,

  pattern: `<span class="kw">def</span> <span class="fn">detect_anomalies</span>(data, threshold=<span class="num">2.0</span>):
    <span class="cm">"""Detect outliers using z-score method."""</span>
    mean = <span class="fn">sum</span>(data) / <span class="fn">len</span>(data)
    variance = <span class="fn">sum</span>((x - mean) ** <span class="num">2</span> <span class="kw">for</span> x <span class="kw">in</span> data) / <span class="fn">len</span>(data)
    std_dev = variance ** <span class="num">0.5</span>

    anomalies = []
    <span class="kw">for</span> i, x <span class="kw">in</span> <span class="fn">enumerate</span>(data):
        z = <span class="fn">abs</span>(x - mean) / std_dev <span class="kw">if</span> std_dev != <span class="num">0</span> <span class="kw">else</span> <span class="num">0</span>
        <span class="kw">if</span> z > threshold:
            anomalies.append({<span class="str">"index"</span>: i, <span class="str">"value"</span>: x,
                               <span class="str">"z_score"</span>: <span class="fn">round</span>(z, <span class="num">2</span>)})
    <span class="kw">return</span> {<span class="str">"mean"</span>: <span class="fn">round</span>(mean, <span class="num">2</span>), <span class="str">"std"</span>: <span class="fn">round</span>(std_dev, <span class="num">2</span>),
            <span class="str">"anomalies"</span>: anomalies}`,

  keywords: `<span class="kw">def</span> <span class="fn">extract_keywords</span>(text, top_n=<span class="num">5</span>):
    <span class="kw">import</span> math
    STOPWORDS = {<span class="str">"the"</span>, <span class="str">"a"</span>, <span class="str">"is"</span>, <span class="str">"in"</span>, <span class="str">"and"</span>, <span class="str">"of"</span>, <span class="str">"to"</span>}

    words = [w.lower().strip(<span class="str">'.,!?'</span>) <span class="kw">for</span> w <span class="kw">in</span> text.split()
             <span class="kw">if</span> w.lower() <span class="kw">not in</span> STOPWORDS <span class="kw">and</span> <span class="fn">len</span>(w) > <span class="num">3</span>]
    total = <span class="fn">len</span>(words)
    freq = {}
    <span class="kw">for</span> w <span class="kw">in</span> words:
        freq[w] = freq.get(w, <span class="num">0</span>) + <span class="num">1</span>

    <span class="cm"># TF-IDF-inspired score: tf * log(1 + 1/tf)</span>
    scores = {w: (c / total) * math.<span class="fn">log</span>(<span class="num">1</span> + total / c)
              <span class="kw">for</span> w, c <span class="kw">in</span> freq.items()}

    <span class="kw">return</span> <span class="fn">sorted</span>(scores, key=scores.get, reverse=<span class="kw">True</span>)[:top_n]`,

  gravity: `<span class="kw">def</span> <span class="fn">gravitational_force</span>(m1, m2, r):
    <span class="cm">"""Newton's Law of Universal Gravitation: F = G*m1*m2 / r²"""</span>
    G = <span class="num">6.674e-11</span>  <span class="cm"># N·m²/kg²</span>

    <span class="kw">if</span> r == <span class="num">0</span>:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="str">"Distance r cannot be zero."</span>)

    force = G * m1 * m2 / (r ** <span class="num">2</span>)
    <span class="kw">return</span> <span class="fn">round</span>(force, <span class="num">6</span>)

<span class="cm"># Example: Earth–Moon gravitational pull</span>
m_earth = <span class="num">5.972e24</span>  <span class="cm"># kg</span>
m_moon  = <span class="num">7.342e22</span>  <span class="cm"># kg</span>
r       = <span class="num">3.844e8</span>   <span class="cm"># metres</span>
F = <span class="fn">gravitational_force</span>(m_earth, m_moon, r)
<span class="fn">print</span>(<span class="str">f"Force: {F:.3e} N"</span>)  <span class="cm"># ≈ 1.982e20 N</span>`,

  wave: `<span class="kw">def</span> <span class="fn">wave_calculator</span>(speed=<span class="kw">None</span>, freq=<span class="kw">None</span>, wavelength=<span class="kw">None</span>):
    <span class="cm">"""Solve v = f × λ given any two values."""</span>
    known = <span class="fn">sum</span>(x <span class="kw">is not None</span> <span class="kw">for</span> x <span class="kw">in</span> [speed, freq, wavelength])
    <span class="kw">if</span> known != <span class="num">2</span>:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="str">"Exactly 2 values must be provided."</span>)

    <span class="kw">if</span> speed <span class="kw">is None</span>:
        <span class="kw">return</span> {<span class="str">"speed"</span>: <span class="fn">round</span>(freq * wavelength, <span class="num">4</span>)}
    <span class="kw">elif</span> freq <span class="kw">is None</span>:
        <span class="kw">return</span> {<span class="str">"frequency"</span>: <span class="fn">round</span>(speed / wavelength, <span class="num">4</span>)}
    <span class="kw">else</span>:
        <span class="kw">return</span> {<span class="str">"wavelength"</span>: <span class="fn">round</span>(speed / freq, <span class="num">4</span>)}

<span class="cm"># Speed of light example</span>
<span class="fn">print</span>(<span class="fn">wave_calculator</span>(speed=<span class="num">3e8</span>, freq=<span class="num">6e14</span>))
<span class="cm"># {'wavelength': 5e-07}  ← 500 nm (green light)</span>`,

  quadratic: `<span class="kw">import</span> math

<span class="kw">def</span> <span class="fn">solve_quadratic</span>(a, b, c):
    <span class="cm">"""Solve ax² + bx + c = 0"""</span>
    <span class="kw">if</span> a == <span class="num">0</span>:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="str">"'a' cannot be 0 (not a quadratic)"</span>)

    discriminant = b**<span class="num">2</span> - <span class="num">4</span>*a*c
    <span class="fn">print</span>(<span class="str">f"Discriminant (Δ) = {discriminant}"</span>)

    <span class="kw">if</span> discriminant > <span class="num">0</span>:
        x1 = (-b + math.<span class="fn">sqrt</span>(discriminant)) / (<span class="num">2</span>*a)
        x2 = (-b - math.<span class="fn">sqrt</span>(discriminant)) / (<span class="num">2</span>*a)
        <span class="kw">return</span> [<span class="fn">round</span>(x1,<span class="num">4</span>), <span class="fn">round</span>(x2,<span class="num">4</span>)]
    <span class="kw">elif</span> discriminant == <span class="num">0</span>:
        x = -b / (<span class="num">2</span>*a)
        <span class="kw">return</span> [<span class="fn">round</span>(x,<span class="num">4</span>)]
    <span class="kw">else</span>:
        real = -b / (<span class="num">2</span>*a)
        imag = math.<span class="fn">sqrt</span>(-discriminant) / (<span class="num">2</span>*a)
        <span class="kw">return</span> [<span class="str">f"{real:.4f}+{imag:.4f}i"</span>,
                <span class="str">f"{real:.4f}-{imag:.4f}i"</span>]`,

  primes: `<span class="kw">def</span> <span class="fn">sieve_of_eratosthenes</span>(limit):
    <span class="cm">"""Find all primes up to 'limit' efficiently."""</span>
    is_prime = [<span class="kw">True</span>] * (limit + <span class="num">1</span>)
    is_prime[<span class="num">0</span>] = is_prime[<span class="num">1</span>] = <span class="kw">False</span>

    p = <span class="num">2</span>
    <span class="kw">while</span> p * p <= limit:
        <span class="kw">if</span> is_prime[p]:
            <span class="cm"># Mark all multiples of p as composite</span>
            <span class="kw">for</span> multiple <span class="kw">in</span> <span class="fn">range</span>(p*p, limit+<span class="num">1</span>, p):
                is_prime[multiple] = <span class="kw">False</span>
        p += <span class="num">1</span>

    primes = [i <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>, limit+<span class="num">1</span>) <span class="kw">if</span> is_prime[i]]
    <span class="fn">print</span>(<span class="str">f"Found {<span class="fn">len</span>(primes)} primes up to {limit}"</span>)
    <span class="kw">return</span> primes

<span class="fn">print</span>(<span class="fn">sieve_of_eratosthenes</span>(<span class="num">50</span>))
<span class="cm"># [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]</span>`,

  stats: `<span class="kw">def</span> <span class="fn">statistics</span>(data):
    n = <span class="fn">len</span>(data)
    <span class="kw">if</span> n == <span class="num">0</span>: <span class="kw">return</span> {}

    mean     = <span class="fn">sum</span>(data) / n
    sorted_d = <span class="fn">sorted</span>(data)
    mid      = n // <span class="num">2</span>
    median   = (sorted_d[mid] <span class="kw">if</span> n % <span class="num">2</span>
                <span class="kw">else</span> (sorted_d[mid-<span class="num">1</span>] + sorted_d[mid]) / <span class="num">2</span>)
    variance = <span class="fn">sum</span>((x - mean)**<span class="num">2</span> <span class="kw">for</span> x <span class="kw">in</span> data) / n
    std_dev  = variance ** <span class="num">0.5</span>

    <span class="cm"># Mode — most frequent value</span>
    freq = {}
    <span class="kw">for</span> x <span class="kw">in</span> data: freq[x] = freq.get(x, <span class="num">0</span>) + <span class="num">1</span>
    mode = <span class="fn">max</span>(freq, key=freq.get)

    <span class="kw">return</span> {<span class="str">"mean"</span>: <span class="fn">round</span>(mean,<span class="num">2</span>), <span class="str">"median"</span>: median,
            <span class="str">"mode"</span>: mode, <span class="str">"std_dev"</span>: <span class="fn">round</span>(std_dev,<span class="num">2</span>),
            <span class="str">"range"</span>: <span class="fn">max</span>(data) - <span class="fn">min</span>(data)}`,

  binary: `<span class="kw">def</span> <span class="fn">binary_search</span>(arr, target):
    <span class="cm">"""O(log n) search in sorted array."""</span>
    left, right = <span class="num">0</span>, <span class="fn">len</span>(arr) - <span class="num">1</span>
    <span class="kw">while</span> left <= right:
        mid = (left + right) // <span class="num">2</span>
        <span class="kw">if</span>   arr[mid] == target: <span class="kw">return</span> mid
        <span class="kw">elif</span> arr[mid] <  target: left  = mid + <span class="num">1</span>
        <span class="kw">else</span>:                    right = mid - <span class="num">1</span>
    <span class="kw">return</span> -<span class="num">1</span>

<span class="kw">def</span> <span class="fn">merge_sort</span>(arr):
    <span class="cm">"""O(n log n) divide-and-conquer sort."""</span>
    <span class="kw">if</span> <span class="fn">len</span>(arr) <= <span class="num">1</span>: <span class="kw">return</span> arr
    mid   = <span class="fn">len</span>(arr) // <span class="num">2</span>
    left  = <span class="fn">merge_sort</span>(arr[:mid])
    right = <span class="fn">merge_sort</span>(arr[mid:])
    result, i, j = [], <span class="num">0</span>, <span class="num">0</span>
    <span class="kw">while</span> i < <span class="fn">len</span>(left) <span class="kw">and</span> j < <span class="fn">len</span>(right):
        <span class="kw">if</span> left[i] <= right[j]: result.<span class="fn">append</span>(left[i]);  i += <span class="num">1</span>
        <span class="kw">else</span>:                   result.<span class="fn">append</span>(right[j]); j += <span class="num">1</span>
    <span class="kw">return</span> result + left[i:] + right[j:]`,

  fibonacci: `<span class="kw">from</span> functools <span class="kw">import</span> lru_cache

<span class="cm"># Iterative — O(n) time, O(1) space</span>
<span class="kw">def</span> <span class="fn">fib_iterative</span>(n):
    a, b = <span class="num">0</span>, <span class="num">1</span>
    sequence = [a, b]
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>, n):
        a, b = b, a + b
        sequence.<span class="fn">append</span>(b)
    <span class="kw">return</span> sequence[:n]

<span class="cm"># Recursive + memoization — O(n) time, O(n) space</span>
@lru_cache(maxsize=<span class="kw">None</span>)
<span class="kw">def</span> <span class="fn">fib_memo</span>(n):
    <span class="kw">if</span> n <= <span class="num">1</span>: <span class="kw">return</span> n
    <span class="kw">return</span> <span class="fn">fib_memo</span>(n-<span class="num">1</span>) + <span class="fn">fib_memo</span>(n-<span class="num">2</span>)

<span class="fn">print</span>(<span class="fn">fib_iterative</span>(<span class="num">10</span>))
<span class="cm"># [0,1,1,2,3,5,8,13,21,34]</span>`,

  caesar: `<span class="kw">def</span> <span class="fn">caesar_cipher</span>(text, shift, mode=<span class="str">"encode"</span>):
    <span class="kw">if</span> mode == <span class="str">"decode"</span>: shift = -shift
    result = []
    <span class="kw">for</span> ch <span class="kw">in</span> text:
        <span class="kw">if</span> ch.<span class="fn">isalpha</span>():
            base = <span class="fn">ord</span>(<span class="str">'A'</span>) <span class="kw">if</span> ch.<span class="fn">isupper</span>() <span class="kw">else</span> <span class="fn">ord</span>(<span class="str">'a'</span>)
            result.<span class="fn">append</span>(<span class="fn">chr</span>(((<span class="fn">ord</span>(ch) - base + shift) % <span class="num">26</span>) + base))
        <span class="kw">else</span>:
            result.<span class="fn">append</span>(ch)
    <span class="kw">return</span> <span class="str">''</span>.<span class="fn">join</span>(result)

<span class="kw">def</span> <span class="fn">brute_force_crack</span>(ciphertext):
    <span class="kw">for</span> shift <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="num">26</span>):
        <span class="fn">print</span>(<span class="str">f"Shift {shift:2d}: {<span class="fn">caesar_cipher</span>(ciphertext, shift, 'decode')}"</span>)

<span class="fn">print</span>(<span class="fn">caesar_cipher</span>(<span class="str">"Hello, World!"</span>, <span class="num">13</span>))
<span class="cm"># Uryyb, Jbeyq!  (ROT-13)</span>`,

  password: `<span class="kw">import</span> secrets, string, math

<span class="kw">def</span> <span class="fn">generate_password</span>(length=<span class="num">16</span>, use_symbols=<span class="kw">True</span>):
    chars = string.ascii_letters + string.digits
    <span class="kw">if</span> use_symbols: chars += <span class="str">"!@#$%^&*()-_=+"</span>
    <span class="kw">return</span> <span class="str">''</span>.<span class="fn">join</span>(secrets.<span class="fn">choice</span>(chars) <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(length))

<span class="kw">def</span> <span class="fn">password_strength</span>(pwd):
    charset = <span class="num">0</span>
    <span class="kw">if</span> <span class="fn">any</span>(c.<span class="fn">islower</span>()   <span class="kw">for</span> c <span class="kw">in</span> pwd): charset += <span class="num">26</span>
    <span class="kw">if</span> <span class="fn">any</span>(c.<span class="fn">isupper</span>()   <span class="kw">for</span> c <span class="kw">in</span> pwd): charset += <span class="num">26</span>
    <span class="kw">if</span> <span class="fn">any</span>(c.<span class="fn">isdigit</span>()   <span class="kw">for</span> c <span class="kw">in</span> pwd): charset += <span class="num">10</span>
    <span class="kw">if</span> <span class="fn">any</span>(c <span class="kw">in</span> <span class="str">"!@#$"</span>   <span class="kw">for</span> c <span class="kw">in</span> pwd): charset += <span class="num">14</span>
    entropy = math.<span class="fn">log2</span>(charset ** <span class="fn">len</span>(pwd))
    label = (<span class="str">"Weak"</span> <span class="kw">if</span> entropy < <span class="num">40</span> <span class="kw">else</span>
             <span class="str">"Fair"</span> <span class="kw">if</span> entropy < <span class="num">60</span> <span class="kw">else</span>
             <span class="str">"Strong"</span> <span class="kw">if</span> entropy < <span class="num">80</span> <span class="kw">else</span> <span class="str">"Very Strong"</span>)
    <span class="kw">return</span> {<span class="str">"entropy"</span>: <span class="fn">round</span>(entropy,<span class="num">1</span>), <span class="str">"strength"</span>: label}`,

  matrix: `<span class="kw">def</span> <span class="fn">matrix_multiply</span>(A, B):
    rows_A, cols_A = <span class="fn">len</span>(A), <span class="fn">len</span>(A[<span class="num">0</span>])
    rows_B, cols_B = <span class="fn">len</span>(B), <span class="fn">len</span>(B[<span class="num">0</span>])
    <span class="kw">if</span> cols_A != rows_B:
        <span class="kw">raise</span> <span class="fn">ValueError</span>(<span class="str">"Incompatible dimensions."</span>)
    C = [[<span class="num">0</span>]*cols_B <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(rows_A)]
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(rows_A):
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(cols_B):
            <span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(cols_A):
                C[i][j] += A[i][k] * B[k][j]
    <span class="kw">return</span> C

<span class="kw">def</span> <span class="fn">determinant_2x2</span>(m):
    <span class="kw">return</span> m[<span class="num">0</span>][<span class="num">0</span>]*m[<span class="num">1</span>][<span class="num">1</span>] - m[<span class="num">0</span>][<span class="num">1</span>]*m[<span class="num">1</span>][<span class="num">0</span>]

A = [[<span class="num">1</span>,<span class="num">2</span>],[<span class="num">3</span>,<span class="num">4</span>]]; B = [[<span class="num">5</span>,<span class="num">6</span>],[<span class="num">7</span>,<span class="num">8</span>]]
<span class="fn">print</span>(<span class="fn">matrix_multiply</span>(A, B))  <span class="cm"># [[19,22],[43,50]]</span>`,

  guess: `<span class="kw">import</span> random

<span class="kw">def</span> <span class="fn">number_guessing_game</span>(difficulty=<span class="str">"easy"</span>):
    limit  = <span class="num">50</span> <span class="kw">if</span> difficulty == <span class="str">"easy"</span> <span class="kw">else</span> <span class="num">200</span>
    secret = random.<span class="fn">randint</span>(<span class="num">1</span>, limit)
    tries  = <span class="num">0</span>
    <span class="fn">print</span>(<span class="str">f"Guess a number between 1 and {limit}!"</span>)

    <span class="kw">while</span> <span class="kw">True</span>:
        guess = <span class="fn">int</span>(<span class="fn">input</span>(<span class="str">f"Attempt {tries+1}: "</span>))
        tries += <span class="num">1</span>

        <span class="kw">if</span>   guess == secret:
            <span class="fn">print</span>(<span class="str">f"Correct in {tries} tries!"</span>)
            <span class="kw">break</span>
        <span class="kw">elif</span> guess < secret:
            hint = <span class="str">"Way too low"</span> <span class="kw">if</span> secret - guess > <span class="num">20</span> <span class="kw">else</span> <span class="str">"A bit low"</span>
        <span class="kw">else</span>:
            hint = <span class="str">"Way too high"</span> <span class="kw">if</span> guess - secret > <span class="num">20</span> <span class="kw">else</span> <span class="str">"A bit high"</span>
        <span class="fn">print</span>(hint)

<span class="fn">number_guessing_game</span>()`,
};

/* ── Badge colour helpers ── */
const TECH_CLASS: Record<string, string> = {
  Python: 'badge-python', JavaScript: 'badge-js', React: 'badge-react',
  TypeScript: 'badge-react', HTML: 'badge-html', CSS: 'badge-css',
  'C++': 'badge-cpp',
};

const CAT_COLOR: Record<Cat, { bg: string; text: string }> = {
  All:              { bg: 'rgba(148,163,184,0.12)',   text: 'var(--text-3)' },
  'Python AI':      { bg: 'rgba(59,130,246,0.15)',    text: '#60a5fa' },
  'Physics/Math':   { bg: 'rgba(139,92,246,0.15)',    text: '#a78bfa' },
  'Web Dev':        { bg: 'rgba(6,182,212,0.15)',     text: '#22d3ee' },
  'Core Algorithms':{ bg: 'rgba(34,197,94,0.13)',     text: '#4ade80' },
};

const CATS: Cat[] = ['All', 'Python AI', 'Physics/Math', 'Web Dev', 'Core Algorithms'];

/* ── Project Card ── */
function ProjectCard({ project, onViewCode }: { project: Project; onViewCode?: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const c = CAT_COLOR[project.cat];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="glass-card"
      style={{
        padding: '30px 30px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 1000,
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((event.clientY - rect.top) / rect.height - 0.5) * -3,
          y: ((event.clientX - rect.left) / rect.width - 0.5) * 3,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Category pill */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span
          style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 'var(--radius-full)',
            background: c.bg, color: c.text,
          }}
        >
          {project.cat}
        </span>
        {project.codeKey && (
          <span
            style={{
              fontSize: 9, fontWeight: 800, letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--cyan)', background: 'var(--cyan-a10)',
              padding: '2px 8px', borderRadius: 4,
              border: '1px solid rgba(0,229,255,0.2)',
            }}
          >
            PYTHON
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 16, fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.3, marginBottom: 10,
          letterSpacing: '-0.01em',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 13, color: 'var(--text-2)',
          lineHeight: 1.7, marginBottom: 18, flex: 1,
        }}
      >
        {project.desc}
      </p>

      {/* Tech badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {project.tech.map((t) => (
          <span key={t} className={`tech-badge ${TECH_CLASS[t] ?? 'badge-default'}`}>
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 14,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: 'var(--text-3)', fontWeight: 600,
          }}
        >
          <Code2 size={12} /> Personal Project
        </span>

        {project.codeKey && onViewCode && (
          <button
            onClick={onViewCode}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, fontWeight: 700, color: 'var(--cyan)',
              background: 'var(--cyan-a10)', border: '1px solid rgba(0,229,255,0.2)',
              padding: '5px 12px', borderRadius: 6,
              cursor: 'pointer', transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            <Terminal size={11} />
            View Code
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Page ── */
export default function ProjectsPage() {
  const [active, setActive] = useState<Cat>('All');
  const [modal, setModal] = useState<{ title: string; code: string } | null>(null);

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.cat === active);

  const openModal = (p: Project) => {
    if (p.codeKey && CODE_SNIPPETS[p.codeKey]) {
      setModal({ title: p.title, code: CODE_SNIPPETS[p.codeKey] });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <section className="page-section">
        <div className="container-base text-[18px] font-semibold text-center pl-[70px] pr-[70px] pt-[0px] pb-[0px]">
          <SectionHeader
            eyebrow="Portfolio"
            title="Featured Work"
            subtitle="24 projects across AI, Physics, Mathematics, Web Dev, and Algorithms."
          />

          {/* Filter tabs */}
          <div
            style={{
              display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40,
              paddingBottom: 24, borderBottom: '1px solid var(--border)',
            }}
          >
            {CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-tab ${active === cat ? 'active' : ''}`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="project-tab-indicator"
                    className="filter-tab-indicator"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="filter-tab-label">
                {cat}
                <span
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 4, padding: '1px 6px',
                    fontSize: 10, fontWeight: 800,
                  }}
                >
                  {cat === 'All'
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.cat === cat).length}
                </span>
                </span>
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
               gap: 24,
              alignItems: 'stretch',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onViewCode={p.codeKey ? () => openModal(p) : undefined}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      {/* Code Modal */}
      <CodeModal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title ?? ''}
        code={modal?.code ?? ''}
      />
    </motion.div>
  );
}
