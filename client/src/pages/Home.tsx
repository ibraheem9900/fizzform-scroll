import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Leaf,
  Menu,
  Minus,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react";

const canSrc = "/fizzform-can.webp";

type Flavor = {
  name: string;
  note: string;
  color: string;
  accent: string;
};

const flavors: Flavor[] = [
  { name: "Ruby citrus", note: "Blood orange · yuzu · sea salt", color: "#e3262f", accent: "#ffd84d" },
  { name: "Lime static", note: "Key lime · mint leaf · ginger", color: "#a9cc2d", accent: "#202b13" },
  { name: "Tangerine pulse", note: "Tangerine · pink pepper · basil", color: "#f26834", accent: "#fff0cf" },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export default function Home() {
  const stageRef = useRef<HTMLElement>(null);
  const signalRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [signalProgress, setSignalProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("drop");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = stageRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const travel = Math.max(node.offsetHeight - window.innerHeight, 1);
        setProgress(clamp(-rect.top / travel));
        const signal = signalRef.current;
        if (signal) {
          const signalTravel = Math.max(signal.offsetHeight - window.innerHeight, 1);
          setSignalProgress(clamp(-signal.getBoundingClientRect().top / signalTravel));
        }
        setIsScrolled(window.scrollY > 24);

        const marker = window.scrollY + window.innerHeight * 0.38;
        const ids = ["drop", "ritual", "signal", "shop"];
        const current = ids.reduce((found, id) => {
          const element = document.getElementById(id);
          return element && element.offsetTop <= marker ? id : found;
        }, "drop");
        setActiveSection(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const current = flavors[activeFlavor];
  const canScale = 0.72 + progress * 0.31;
  const canY = 146 - progress * 292;
  const canRotation = -13 + progress * 25;
  const canX = progress > 0.55 ? (progress - 0.55) * 35 : 0;
  const labelOpacity = clamp((progress - 0.16) * 3.3);
  const glowOpacity = 0.14 + progress * 0.42;
  const leftOpacity = clamp(1 - progress * 2.1);
  const rightOpacity = clamp((progress - 0.24) * 2.2);
  const canReveal = clamp((signalProgress - 0.08) * 1.5);
  const ingredientOne = clamp((signalProgress - 0.2) * 2.8);
  const ingredientTwo = clamp((signalProgress - 0.42) * 2.8);
  const ingredientThree = clamp((signalProgress - 0.64) * 2.8);
  const openLid = clamp((signalProgress - 0.12) * 1.5);

  return (
    <main className="site-shell" style={{ "--flavor": current.color, "--flavor-accent": current.accent } as React.CSSProperties}>
      <header className={isScrolled ? "topbar topbar-scrolled" : "topbar"}>
        <button className="wordmark" onClick={() => scrollTo("drop")} aria-label="FIZZFORM home">
          <span className="brand-symbol" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="presentation"><rect width="32" height="32" rx="10" fill="currentColor" /><path d="M10 8h13v4h-8v3h7v4h-7v5h-5V8Z" fill="#28110d" /><circle cx="24" cy="23" r="2" fill="#28110d" /></svg>
          </span>
          <span className="brand-name">FIZZFORM</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {["drop", "ritual", "signal", "shop"].map((id) => (
            <button key={id} className={activeSection === id ? "nav-link is-active" : "nav-link"} onClick={() => scrollTo(id)}>
              {id === "drop" ? "The drop" : id === "ritual" ? "The ritual" : id === "signal" ? "The signal" : "Shop"}
            </button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <Minus size={18} /> : <Menu size={18} />}
        </button>
        <button className="top-order" onClick={() => scrollTo("shop")}>
          Get a 4-pack <ArrowUpRight size={15} />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {["drop", "ritual", "signal", "shop"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {id === "drop" ? "The drop" : id === "ritual" ? "The ritual" : id === "signal" ? "The signal" : "Shop"}
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      )}

      <div className="progress-rail" aria-hidden="true">
        <span className="rail-label">SCROLL TO POUR</span>
        <div className="rail-line"><span style={{ transform: `scaleY(${Math.max(progress, 0.04)})` }} /></div>
        <span className="rail-number">{String(Math.round(progress * 100)).padStart(2, "0")}</span>
      </div>

      <section className="hero-stage" id="drop" ref={stageRef}>
        <div className="hero-sticky">
          <div className="grain" />
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-grid" />
          <div className="stage-kicker"><span>01</span> A brighter kind of buzz</div>

          <div className="hero-copy hero-copy-left" style={{ opacity: leftOpacity, transform: `translate3d(0, ${progress * -36}px, 0)` }}>
            <p className="eyebrow">Sparkling botanical soda</p>
            <h1>FIZZ<br /><em>FORWARD.</em></h1>
            <p className="hero-deck">A crisp little jolt for the in-between moments. Zero sugar, real botanicals, and a finish that keeps the conversation going.</p>
            <button className="text-link" onClick={() => scrollTo("ritual")}>Meet the ritual <ArrowDownRight size={16} /></button>
          </div>

          <div className="hero-copy hero-copy-right" style={{ opacity: rightOpacity, transform: `translate3d(0, ${(1 - rightOpacity) * 32}px, 0)` }}>
            <span className="side-tag">01 / 04</span>
            <p>Open<br />something<br /><strong>unexpected.</strong></p>
            <span className="side-caption">Drag the page down<br />to wake it up.</span>
          </div>

          <div className="can-stage" style={{ transform: `translate3d(calc(-50% + ${canX}px), ${canY}px, 0) rotate(${canRotation}deg) scale(${canScale})` }}>
            <div className="can-shadow" style={{ opacity: glowOpacity }} />
            <div className="can-wrap">
              <img src={canSrc} alt="FIZZFORM ruby citrus sparkling soda can" />
              <div className="can-label" style={{ opacity: labelOpacity }}>
                <span className="label-spark">✦</span>
                <strong>FIZZFORM</strong>
                <span>RUBY CITRUS</span>
                <small>BOTANICAL SODA · 0G SUGAR</small>
              </div>
              <div className="can-badge" style={{ opacity: labelOpacity }}>RUBY<br />01</div>
            </div>
          </div>

          <div className="scroll-prompt" style={{ opacity: 1 - progress }}>
            <span>Keep going</span><ChevronDown size={16} />
          </div>
          <div className="hero-meta"><span>33 cl</span><span>0.0% ABV</span><span>Made for now</span></div>
        </div>
      </section>

      <section className="manifesto-section" id="ritual">
        <div className="manifesto-copy">
          <p className="eyebrow dark-eyebrow"><span>02</span> The ritual</p>
          <h2>Not a<br /><span>soft drink.</span></h2>
          <p className="section-deck">The ritual is simple: crack cold, take the long way, notice what happens next. FIZZFORM is built for the shift between one thing and the next.</p>
          <button className="outline-link" onClick={() => scrollTo("signal")}>See what's inside <ArrowUpRight size={16} /></button>
        </div>
        <div className="manifesto-art">
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <div className="art-sun"><Sparkles size={25} /></div>
          <span className="art-note note-top">botanical<br />energy</span>
          <span className="art-note note-bottom">slow fizz<br />/ fast mind</span>
          <div className="manifesto-pill">GOOD<br /><span>ENERGY</span></div>
        </div>
      </section>

      <section className="signal-section signal-reveal-section" id="signal" ref={signalRef}>
        <div className="signal-sticky">
          <div className="signal-glow" style={{ opacity: 0.18 + canReveal * 0.3 }} />
          <div className="signal-intro">
            <p className="eyebrow"><span>03</span> What's inside</p>
            <h2>Open the<br /><em>good stuff.</em></h2>
            <p className="section-deck">Scroll to crack the can. Every bright note lifts out one by one: real citrus, living botanicals, zero sugar.</p>
          </div>

          <div className="reveal-can" style={{ transform: `translate(-50%, calc(-50% + ${-openLid * 10}px)) rotate(${-8 + openLid * 8}deg) scale(${0.72 + canReveal * 0.2})`, opacity: 0.7 + canReveal * 0.3 }}>
            <div className="reveal-can-halo" />
            <img src={canSrc} alt="Opened FIZZFORM ruby citrus sparkling soda can" />
            <div className="reveal-can-lid" style={{ transform: `translate(-50%, ${-openLid * 92}px) rotate(${-10 + openLid * 18}deg)`, opacity: 0.55 + openLid * 0.45 }} />
            <div className="reveal-fizz" style={{ opacity: openLid, transform: `translate(-50%, ${-openLid * 42}px) scale(${0.8 + openLid * 0.3})` }}>✦</div>
          </div>

          <div className="ingredient-stack" aria-label="FIZZFORM ingredients">
            <article className="reveal-ingredient ingredient-citrus" style={{ opacity: ingredientOne, transform: `translate3d(${(1 - ingredientOne) * 45}px, ${(1 - ingredientOne) * 18}px, 0)` }}>
              <span className="reveal-number">01</span><Zap size={18} /><div><strong>Bright citrus</strong><p>Blood orange · yuzu</p></div>
            </article>
            <article className="reveal-ingredient ingredient-botanicals" style={{ opacity: ingredientTwo, transform: `translate3d(${(1 - ingredientTwo) * 45}px, ${(1 - ingredientTwo) * 18}px, 0)` }}>
              <span className="reveal-number">02</span><Leaf size={18} /><div><strong>Real botanicals</strong><p>Mint · ginger · rosemary</p></div>
            </article>
            <article className="reveal-ingredient ingredient-zero" style={{ opacity: ingredientThree, transform: `translate3d(${(1 - ingredientThree) * 45}px, ${(1 - ingredientThree) * 18}px, 0)` }}>
              <span className="reveal-number">03</span><Sparkles size={18} /><div><strong>Zero sugar</strong><p>15 kcal · clean finish</p></div>
            </article>
          </div>

          <div className="signal-bottomline"><span>SCROLL TO REVEAL</span><div className="signal-progress"><span style={{ transform: `scaleX(${signalProgress})` }} /></div><strong>{String(Math.round(signalProgress * 100)).padStart(2, "0")}</strong></div>
        </div>
      </section>

      <section className="flavor-section">
        <div className="flavor-header">
          <div>
            <p className="eyebrow dark-eyebrow"><span>04</span> Pick your frequency</p>
            <h2>Find your<br /><span>frequency.</span></h2>
          </div>
          <p className="section-deck flavor-deck">Three bright takes on a botanical soda. Tap a flavor to tune the can.</p>
        </div>
        <div className="flavor-tabs" role="tablist" aria-label="Flavor options">
          {flavors.map((flavor, index) => (
            <button key={flavor.name} role="tab" aria-selected={activeFlavor === index} className={activeFlavor === index ? "flavor-tab active" : "flavor-tab"} onClick={() => setActiveFlavor(index)}>
              <span className="flavor-swatch" style={{ background: flavor.color }} />
              <span>{flavor.name}</span>
              {activeFlavor === index && <Check size={15} />}
            </button>
          ))}
        </div>
        <div className="flavor-panel" style={{ background: current.color }}>
          <div className="flavor-panel-copy">
            <span className="panel-kicker">FIZZFORM / {String(activeFlavor + 1).padStart(2, "0")}</span>
            <h3>{current.name}</h3>
            <p>{current.note}</p>
            <div className="panel-stats"><span>0g sugar</span><span>15 kcal</span><span>Natural color</span></div>
          </div>
          <div className="mini-can" style={{ transform: `rotate(${activeFlavor === 1 ? 5 : -5}deg)` }}>
            <img src={canSrc} alt="" />
            <div className="mini-can-label">FIZZFORM<br /><small>{current.name.toUpperCase()}</small></div>
          </div>
          <div className="panel-blob" />
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="shop-marquee"><span>CRACK OPEN A BETTER MOMENT</span><span>CRACK OPEN A BETTER MOMENT</span></div>
        <div className="shop-content">
          <div className="shop-copy">
            <p className="eyebrow"><span>05</span> The first sip</p>
            <h2>Ready when<br /><em>you are.</em></h2>
            <p className="section-deck">One four-pack. Three flavors. Zero reason to keep the good stuff for later.</p>
            <button className={ordered ? "order-button ordered" : "order-button"} onClick={() => setOrdered(true)}>
              {ordered ? <>Added to your ritual <Check size={17} /></> : <>Get the starter pack <ArrowUpRight size={17} /></>}
            </button>
            <small className="fine-print">Ships cold-ish. Drinks fast. Cancel anytime.</small>
          </div>
          <div className="shop-orbit">
            <div className="orbit-line orbit-line-a" />
            <div className="orbit-line orbit-line-b" />
            <div className="orbit-copy">GOOD<br /><span>ENERGY</span><br />INSIDE</div>
            <div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" /><div className="orbit-dot dot-c" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <button className="wordmark" onClick={() => scrollTo("drop")}><span className="brand-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" role="presentation"><rect width="32" height="32" rx="10" fill="currentColor" /><path d="M10 8h13v4h-8v3h7v4h-7v5h-5V8Z" fill="#28110d" /><circle cx="24" cy="23" r="2" fill="#28110d" /></svg></span><span className="brand-name">FIZZFORM</span></button>
        <span>Made for the little lift.</span>
        <div className="footer-links"><a href="#ritual">Instagram</a><a href="#signal">Ingredients</a><a href="#shop">Contact</a></div>
      </footer>
    </main>
  );
}
