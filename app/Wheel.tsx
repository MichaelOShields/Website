import React from 'react';
import JSLogo from '../public/jslogo.png';
import PythonLogo from '../public/pythonlogo.png';
import PyTorchLogo from '../public/pytorchlogo.png';
import TauriLogo from '../public/taurilogo.png';
import DataLogo from '../public/datalogo.png';
import SQLLogo from '../public/sqllogo.png';
import ScrapingLogo from '../public/scrapinglogo.png';
import RustLogo from "../public/rustlogo.png";
import DNALogo from "../public/DNALogo.png";
import { StaticImageData } from "next/image";

type CircleProps = {
    size?: number;
    color?: string;
    style?: React.CSSProperties;
    setLastHovered: React.Dispatch<React.SetStateAction<WheelComponentProps | null>>;
    lastHovered: WheelComponentProps | null;
}
export type WheelComponentProps = {
    text: string;
    id: string;
    image: StaticImageData;
    percent: number;
};

const wheelComponents: WheelComponentProps[] = [
    // { id: 'JavaScript', text: '', image: JSLogo, percent: 35 },
    /*{ id: 'PyTorch', text: '', image: PyTorchLogo, percent: 3 },*/
    // { id: 'Web Scraping', text: '', image: ScrapingLogo, percent: 45 },
    { id: 'Tauri', text: '', image: TauriLogo, percent: 15 },
    
    /*{ id: 'SQL', text: '', image: SQLLogo, percent: 1 },*/
    { id: 'Python', text: '', image: PythonLogo, percent: 65 },
    { id: 'Rust', text: '', image: RustLogo, percent: 30 },
    { id: 'DNAsm', text: 'An assembly language I made for my virtual machine.', image: DNALogo, percent: 100 },
];

const Wheel: React.FC<CircleProps> = ({
    size = 300,
    style = {},
    lastHovered,
    setLastHovered,
    ...rest
}) => {

    return (
        <div className="wheel-wrapper" style={{ position: "relative", width: size, height: size }} {...rest}>
            <div className="wheel">
                {wheelComponents.map((comp, idx) => {
                    const itemSize = 4 * 16;
                    const radius = (size / 2) + (itemSize / 2);
                    const angle = idx * (360 / wheelComponents.length);
                    const rad = angle * Math.PI / 180;

                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;

                    const [hovered, setHovered] = React.useState(false);

                    return (
                        <div
                            key={comp.id}
                            className="wheel-component"
                            id={comp.id}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg) scale(${hovered ? 1.1 : 1})`,
                                transition: "transform 0.3s ease"
                            }}
                            onMouseEnter={() => {
                                setHovered(true);
                                setLastHovered(comp);
                            }}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <div className="wheel-component-img-wrapper">
                                <img
                                    src={comp.image.src}
                                    style={{
                                        transform: `scale(${hovered ? 1.15 : 1})`,
                                        transition: "transform 0.3s ease"
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}

            </div>
            <div className="wheel-center">
                {lastHovered ? (
                    <>
                        <div className="wheel-center-id">{lastHovered.id}</div>
                        <div className="wheel-center-percent">{lastHovered.percent}%</div>
                        <div className="wheel-center-sub">{lastHovered.text}</div>
                        <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${(lastHovered.percent / 100) * 100}%` }}
                            />
                        </div>
                        <div className="wheel-center-img-wrapper">
                            <img
                                src={lastHovered.image.src}
                            />
                        </div>
                    </>
                ) : (
                    <div style={{fontSize:'1.2rem'}}>Hover an item</div>
                )}
            </div>

        </div>
    );
};

export default Wheel;
