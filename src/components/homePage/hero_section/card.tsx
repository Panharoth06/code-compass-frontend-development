"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  language?: "java" | "cpp" | "python";
  title?: string;
  code?: string;
}

// Built-in content data
interface HeroContent {
  title: {
    prefix: string;
    animated: string;
  };
}

interface CodeCard {
  id: number;
  language: "java" | "cpp" | "python";
  title: string;
  content: string;
}

export const heroContent: HeroContent = {
  title: {
    prefix: "Master",
    animated: "Algorithms",
  },
};

export const codeCards: CodeCard[] = [
  {
    id: 1,
    language: "python",
    title: "CodeCompass",
    content: `# CodeCompass Search 🧭
def find(arr, x):
    l, r = 0, len(arr) - 1
    while l <= r:
        m = (l + r) // 2
        if arr[m] == x: return m
        elif arr[m] < x: l = m + 1
        else: r = m - 1
    return -1

# Usage
nums = [1, 5, 9, 13]
print(find(nums, 9))  # 2`,
  },
  {
    id: 2,
    language: "java",
    title: "CodeCompass",
    content: `// CodeCompass Sort ⚡
class CodeCompass {
    static void sort(int[] a, int l, int h) {
        if (l < h) {
            int p = part(a, l, h);
            sort(a, l, p-1); sort(a, p+1, h);
        }
    }
    static int part(int[] a, int l, int h) {
        int p = a[h], i = l-1;
        for (int j = l; j < h; j++)
            if (a[j] <= p) swap(a, ++i, j);
        swap(a, i+1, h); return i+1;
    }
    static void swap(int[] a, int i, int j) {
        int t=a[i]; a[i]=a[j]; a[j]=t; }
}`,
  },
  {
    id: 3,
    language: "cpp",
    title: "CodeCompass",
    content: `// CodeCompass Path 🗺️
#include <vector>
#include <queue>
class CodeCompass {
public:
    vector<int> path(int n, auto& g, int s) {
        vector<int> d(n, 1e9);
        priority_queue<pair<int,int>> pq;
        d[s] = 0; pq.push({0, s});
        while (!pq.empty()) {
            auto [dist, u] = pq.top(); pq.pop();
            for (auto [v, w] : g[u])
                if (d[u] + w < d[v])
                    d[v] = d[u] + w, pq.push({-d[v], v});
        } return d;
    }
};`,
  },
];

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, language, title, code, children, ...rest }, ref) => {
    // Language-specific styling and icons
    const getLanguagesStyle = (lang?: string) => {
      switch (lang) {
        case "java":
          return {
            gradient: "from-red-500/20 via-orange-500/20 to-yellow-500/20",
            border: "border-orange-400/30",
            accent: "text-orange-400",
            icon: "☕",
            bgPattern: "bg-gradient-to-br from-red-900/10 to-orange-900/10",
            shadowColor: "orange",
          };
        case "cpp":
          return {
            gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
            border: "border-blue-400/30",
            accent: "text-blue-400",
            icon: "⚡",
            bgPattern: "bg-gradient-to-br from-blue-900/10 to-indigo-900/10",
            shadowColor: "blue",
          };
        case "python":
          return {
            gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
            border: "border-green-400/30",
            accent: "text-green-400",
            icon: "🐍",
            bgPattern: "bg-gradient-to-br from-green-900/10 to-emerald-900/10",
            shadowColor: "green",
          };
        default:
          return {
            gradient: "from-gray-500/20 via-slate-500/20 to-zinc-500/20",
            border: "border-gray-400/30",
            accent: "text-gray-400",
            icon: "💻",
            bgPattern: "bg-gradient-to-br from-gray-900/10 to-slate-900/10",
            shadowColor: "gray",
          };
      }
    };

    const langStyle = getLanguagesStyle(language);

    // Syntax highlighting function
    const highlightCode = (code: string, lang?: string) => {
      if (!code) return code;

      let highlighted = code;

      // Keywords by language
      const keywords = {
        java: [
          "public",
          "class",
          "private",
          "void",
          "int",
          "boolean",
          "if",
          "else",
          "return",
          "new",
          "null",
          "static",
          "for",
          "while",
        ],
        cpp: [
          "#include",
          "class",
          "public",
          "private",
          "void",
          "int",
          "vector",
          "std",
          "using",
          "namespace",
          "if",
          "else",
          "return",
          "for",
          "while",
        ],
        python: [
          "def",
          "if",
          "else",
          "return",
          "for",
          "in",
          "enumerate",
          "True",
          "False",
          "None",
          "while",
          "len",
          "print",
        ],
      };

      const langKeywords = keywords[lang as keyof typeof keywords] || [];

      // Apply basic syntax highlighting
      langKeywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "g");
        highlighted = highlighted.replace(
          regex,
          `<span style="color: #ff6b6b; font-weight: bold;">${keyword}</span>`
        );
      });

      return highlighted;
    };

    return (
      <div
        ref={ref}
        {...rest}
        className={`
          absolute top-1/2 left-1/2 rounded-2xl 
          transition-all duration-500 ease-out
          [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]
          hover:scale-[1.02] cursor-pointer
          overflow-hidden group
          shadow-2xl shadow-black/50
          w-[400px] h-[300px] sm:w-[450px] sm:h-[350px] md:w-[500px] md:h-[400px]
          ${langStyle.border}
          ${langStyle.bgPattern}
          ${customClass ?? ""} 
          ${rest.className ?? ""}
        `.trim()}
        style={{
          backgroundColor: "#1a1a1a",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${langStyle.gradient} opacity-50`}
        />

        {/* Outer grid pattern */}
        <div
          className="absolute -inset-4 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
               `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* VS Code-like title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800/50 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            {title && (
              <span className={`text-sm font-mono ml-2 ${langStyle.accent}`}>
                {title}.{language}
              </span>
            )}
          </div>
          {language && (
            <div className="flex items-center gap-2">
              <span className="text-xl">{langStyle.icon}</span>
              <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 uppercase font-mono">
                {language === "cpp" ? "C++" : language}
              </span>
            </div>
          )}
        </div>

        {/* Line numbers and code content */}
        <div className="flex h-[calc(100%-50px)] relative z-10">
          {/* Line numbers */}
          <div className="w-12 bg-gray-800/30 border-r border-gray-700 flex flex-col text-gray-500 text-xs font-mono">
            {code &&
              code.split("\n").map((_, index) => (
                <div key={index} className="px-2 py-0.5 text-right leading-5">
                  {index + 1}
                </div>
              ))}
          </div>

          {/* Code content */}
          <div className="flex-1 relative overflow-hidden">
            {/* Inner grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                     linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
                   `,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Code */}
            {code ? (
              <div className="relative z-10 p-4 h-full overflow-auto">
                <pre className="text-xs sm:text-sm font-mono leading-5 text-gray-300">
                  <code
                    className="block"
                    dangerouslySetInnerHTML={{
                      __html: highlightCode(code, language),
                    }}
                  />
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-4">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Language accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
          style={{
            background:
              language === "java"
                ? "#f97316"
                : language === "cpp"
                ? "#3b82f6"
                : language === "python"
                ? "#10b981"
                : "#6b7280",
          }}
        />

        {/* Hover glow effect */}
        <div
          className={`absolute -inset-1 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10 rounded-2xl`}
          style={{
            background:
              language === "java"
                ? "#f97316"
                : language === "cpp"
                ? "#3b82f6"
                : language === "python"
                ? "#10b981"
                : "#6b7280",
          }}
        />
      </div>
    );
  }
);

Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );

  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr] // Include the actual array, not just its length
  );
  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current!,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    config.durDrop,
    config.durMove,
    config.durReturn,
    config.ease,
    config.promoteOverlap,
    config.returnDelay,
    refs,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="absolute top-1/2 right-0 transform translate-x-[5%] translate-y-[-35%] origin-center perspective-[900px] overflow-visible 
           sm:translate-x-[10%] sm:translate-y-[-45%] sm:scale-90
           md:translate-x-[5%] md:translate-y-[-35%] md:scale-100
           max-sm:translate-x-[15%] max-sm:translate-y-[-40%] max-sm:scale-75
           max-xs:translate-x-[20%] max-xs:translate-y-[-45%] max-xs:scale-[0.6]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
