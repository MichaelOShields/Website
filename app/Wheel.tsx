import React from 'react';
import JSLogo from '../public/jslogo.png';
import PythonLogo from '../public/pythonlogo.png';
import PyTorchLogo from '../public/pytorchlogo.png';
import TauriLogo from '../public/taurilogo.png';
import DataLogo from '../public/datalogo.png';
import SQLLogo from '../public/sqllogo.png';
import ScrapingLogo from '../public/scrapinglogo.png';
import { StaticImageData } from "next/image";

type CircleProps = {
    size?: number;
    color?: string;
    style?: React.CSSProperties;
};

type WheelComponentProps = {
    text: string;
    id: string;
    image: StaticImageData;
    years: number;
};

const wheelComponents: WheelComponentProps[] = [
    { id: 'JavaScript', text: '', image: JSLogo, years: 2.5 },
    { id: 'PyTorch', text: '', image: PyTorchLogo, years: 3 },
    { id: 'Web Scraping', text: '', image: ScrapingLogo, years: 4 },
    { id: 'Tauri', text: '', image: TauriLogo, years: 2 },
    { id: 'SQL', text: '', image: SQLLogo, years: 1 },
    { id: 'Python', text: '', image: PythonLogo, years: 7 },
];

const Wheel: React.FC<CircleProps> = ({
    size = 300,
    style = {},
    ...rest
}) => {
    const [lastHovered, setLastHovered] = React.useState<WheelComponentProps | null>(null);

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
                        <div className="wheel-center-years">{lastHovered.years} {lastHovered.years != 1 ? "years" : 'year'}</div>
                        <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${(lastHovered.years / 5) * 100}%` }}
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
