"use client";

import Header from "./header";
import { motion } from "framer-motion";
import { JSX, ReactElement, ReactHTMLElement, useEffect, useState, type ReactNode } from "react";
import React from "react";
import { BADGE_CHECK_ICON, BELT_ICON, CPU_ICON, GRADUATION_CAP_ICON, MAP_ICON, SCHOOL_ICON } from "./svgs";
import ProjectCard from "./projectcard";

import logoWhite from "../public/logo-title-white.png";
import antPng from "../public/ants.png";
import inkwDemo from "../public/inkwell-demo.png";
import webDemo from '../public/websiteDemo.png';
import car from '../public/car.png';
import shop from "../public/gimkit_shop.png";
import Wheel from "./Wheel";

type FadeProps = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

const Fade = ({ delay = 0, className, children }: FadeProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);


type WithChildren = { children?: ReactNode };

// narrows ReactNode -> ReactElement<{children?: ReactNode}>
// function isElementWithChildren(
//   node: ReactNode
// ): node is ReactElement<WithChildren> {
//   return React.isValidElement(node);
// }

// export function extractText(node: ReactNode): string {
//   if (node == null || typeof node === "boolean") return "";
//   if (typeof node === "string" || typeof node === "number") return String(node);
//   if (Array.isArray(node)) return node.map(extractText).join("");

//   if (isElementWithChildren(node)) {
//     return extractText(node.props.children);
//   }

//   return "";
// }


function highlight(code: string): string {
  const tokens = code.split(/(\s+|\/\/.*|\/\*[\s\S]*?\*\/|".*?"|'.*?'|`.*?`|\b)/);

  return tokens
    .map((tok) => {
      if (/^(function|return|if|else|for|while|const|let|var|class|import|export|new)\b/.test(tok)) {
        return `<span class="kw">${tok}</span>`;
      }
      if (/^(string|number|boolean|any|void|ReactNode)\b/.test(tok)) {
        return `<span class="type">${tok}</span>`;
      }
      if (/^".*?"|'.*?'|`.*?`$/.test(tok)) {
        return `<span class="str">${tok}</span>`;
      }
      if (/^\d+(\.\d+)?$/.test(tok)) {
        return `<span class="num">${tok}</span>`;
      }
      if (/^\/\/.*$/.test(tok) || /^\/\*[\s\S]*\*\/$/.test(tok)) {
        return `<span class="comment">${tok}</span>`;
      }
      if (/^[{}()\[\];,.:<>]$/.test(tok)) {
        return `<span class="punct">${tok}</span>`;
      }
      if (/(\+{1,2}|-{1,2}|==?=?|!=?=?|<=?|>=?|\*|\/|%|&&|\|\||!|=)/.test(tok)) {
        return `<span class="op">${tok}</span>`;
      }
      return tok; // default, leave alone
    })
    .join("");
}


type TypewriterProps = {
  delay?: number;
  text: string;
  speedMsPerChar?: number;
};

export function Typewriter({
  delay = 0,
  text,
  speedMsPerChar = 50,
}: TypewriterProps) {
  const [out, setOut] = useState("");
  const [endSymbol, setSymbol] = useState("▮");

  useEffect(() => {
    let i = 0;
    let id: number | null = null;

    const start = () => {
      id = window.setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i === text.length) setSymbol("");
        if (i >= text.length && id) clearInterval(id);
      }, speedMsPerChar);
    };

    const delayId = window.setTimeout(start, delay);

    return () => {
      if (id) clearInterval(id);
      clearTimeout(delayId);
    };
  }, [text, delay, speedMsPerChar]);  
  return (
  <code dangerouslySetInnerHTML={{ __html: highlight(out + endSymbol) }} />
  );
}

{/* <Fade delay={.2}>
          <h1 className="title"><Typewriter text={"Michael Shields"} delay={0}></Typewriter></h1>
        </Fade> */}

// delay={50/1000 * ("Michael Shields".length) }
const CODE_TEXT = `
export default function File({ 
displayTitle, filename, onClick, i, selectedFilePath, title, handleRightClick, path, accent_color 
}: FileProps) {
    // console.log(accent_color);
    if (!accent_color) {
        accent_color = 'none';
    }
    return (
        <div
          onClick={onClick}
          title={title}
          onContextMenu={(e) => {handleRightClick(e,"file", path)}}
        >

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="featherfile feather-file-text"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
            <p className="file-title">{displayTitle}</p>

        </div>
    )

}
`;




export default function Home() {
  return (
    <div className="page">
      <Fade delay={0}>

        <Header />

      </Fade>
      <div className="hero" role="main">
        <Fade delay={.2}>
          <h1 className="title">Michael Shields</h1>
        </Fade>
        <Fade delay={.5}><div className="subtitle">Computer Science</div></Fade>
        <Fade delay={.7}><div className="location">
          <span className="maroon">{GRADUATION_CAP_ICON}</span> <span className="orange">Virginia</span> <span className="maroon">Tech</span>
        </div></Fade>
        <Fade delay={.9}><div className="belt">{BELT_ICON} Taekwondo Black Belt</div></Fade>



      </div>

      <Fade className="resume" delay={1.2}>

          <div className="projects">
            

            <h2 className="resume-header">Projects</h2>

            <Fade className="project-cards" delay={1.5}>
                <ProjectCard
                  title="Ant Colony Simulation"
                  description="Using reinforcement learning to teach an ant with limited information to search for food."
                  image={antPng}
                  tags={["Python", "ML", "Pygame"]}
                  link="https://github.com/MichaelOShields/Ant-Colony-Simulation"
                  year="2024"
                />
                <ProjectCard
                    title="Inkwell (WIP)"
                    description="A minimalist note taking app, built for responsiveness and ease of use."
                    image={inkwDemo}
                    tags={["Tauri", "Rust", "React"]}
                    link="https://inkwellnotes.com/"
                    complete={false}
                    year="2025"
                    color="purple"
                  />
                <ProjectCard
                    title="Website"
                    description="A website overviewing my accomplishments, acting as an accessible portfolio."
                    image={webDemo}
                    tags={["NextJS", "React", "CSS"]}
                    newTab={false}
                    link="."
                    year="2025"
                  />
                <ProjectCard
                    title="Text Cropping Algorithm"
                    description="Using PIL to efficiently detect text in 500+ page documents and crop all margin whitespace."
                    image="https://images.unsplash.com/photo-1517512006864-7edc3b933137?q=80&w=1200&auto=format&fit=crop"
                    tags={["Python", "PIL", "Image Analysis"]}
                    year="2024"
                  />
                <ProjectCard
                    title="F1 Replay Engine (WIP)"
                    description="Using data on F1 races to build an immersive and interactive replay viewer."
                    image={car}
                    tags={["React", "OpenF1", "Three.js"]}
                    link="https://github.com/MichaelOShields/F1-Replay-Engine"
                    year="2025"
                    color="red"
                  />
                <ProjectCard
                    title="Gimkit Automation"
                    description="Algorithmically playing an education game, learning answers, and interacting with the website to buy upgrades."
                    image={shop}
                    tags={["Python", "Selenium"]}
                    year="2023"
                  />
            </Fade>


          </div>

          {/* <div className="education">
            

            <h2 className="resume-header">Education</h2>

            <Fade className="education-nodes" delay={1.5}>
              
              <div className="yorktown education-node">
                <div className="education-header">
                  <span style={{ color: "rgb(164,188,220)" }}>Yorktown</span>{" "}
                  <span style={{ color: "rgb(164,188,220)" }}>High</span>{" "}
                  <span style={{ color: "rgb(164,188,220)" }}>School</span>
                </div>
                <div className="education-subheader">{MAP_ICON} Arlington, VA</div>
                <div className="education-subheader">SAT 1560</div>
                <div className="education-subheader">GPA 4.3</div>


                <div className="education-resume">


                  <div className="education-item-header">
                    <span className="blue">{CPU_ICON}</span> <span className="blue">Computer Science Club</span>
                  </div>
                  <div className="education-item-subheader">

                    {`Participated in competitions\nAttended weekly meetings\nSolved puzzles`}

                  </div>

                </div>
              </div>

              <div className="vt education-node">
                <div className="education-header">
                  <span style={{ color: "#E87722" }}>Virginia</span>{" "}
                  <span style={{ color: "#861F41" }}>Tech</span>
                </div>
                <div className="education-subheader">{MAP_ICON} Blacksburg, VA</div>
              </div>

            </Fade>


          </div> */}

          <div className="experience">
            <h2 className="resume-header">Experience</h2>
            <Fade className="education-nodes" delay={1.5}>

              <Wheel></Wheel>
            </Fade>

            

          </div>

      </Fade>
      



      <div className="background">

          <Typewriter text={CODE_TEXT} speedMsPerChar={50}></Typewriter>

      </div>
    </div>
  );
}
