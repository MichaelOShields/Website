"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DOWNLOAD_ICON, GITHUB_ICON, LINKEDIN_ICON, MAIL_ICON } from "./svgs";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    const home_svg = <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="feather feather-home"
        >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>


    const DownloadIcon = (
        <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon-download"
        >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
    );

    return (
        <div className="header" aria-label="Inkwell site header">
            <div className="logos">
            {/* Use a single element to swap background via CSS */}
            <Link aria-label="Inkwell home" href="/" className="logo" style={{height: "2.5rem", width: "6.5rem"}}/>
            </div>

            <nav className="nav" aria-label="Primary">
            <Link className="ribbon-item link" target="_blank" href="https://github.com/MichaelOShields">
                {GITHUB_ICON} GitHub
            </Link>
            <Link className="ribbon-item link" href="mailto:michaelolivershields@outlook.com">
                {MAIL_ICON} Email
            </Link>
            <Link className="ribbon-item link" target="_blank" href="https://www.linkedin.com/in/michaeloshields/">
                {LINKEDIN_ICON} LinkedIn
            </Link>
            <Link className="ribbon-item link" target="_blank" href="/resume.pdf">
                {DOWNLOAD_ICON} Resume
            </Link>
            </nav>

            <div className="actions">
            {/* <Link className="download-btn" href="/download" aria-label="Download Inkwell">
                <span className="download-label">Download</span>
                {DownloadIcon}
            </Link> */}
            </div>
      </div>
    )
}