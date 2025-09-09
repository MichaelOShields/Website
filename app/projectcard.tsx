import React from "react";
import { EXTERNAL_LINK_ICON } from "./svgs";
import { StaticImageData } from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string | StaticImageData;
  tags?: string[];
  link?: string;
  complete?: boolean;
  newTab?:boolean;
  year?: string;
  color?:string; // red, blue, purple, etc
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image = "https://wallpapers.com/images/hd/pure-black-background-with-dark-face-rkryds04rsmmqv3n.jpg",
  tags = [],
  link,
  complete = true,
  newTab = true,
  year,
  color,
}) => {
  return (
    <div className={`project-card ${color ? color : 'blank'}`}>
      {image && (
        <div className="project-img-container">
          <img src={typeof image === "string" ? image : image?.src} alt={title} />
          {/* <div
            className={`${complete ? "complete" : "ongoing"} ongoing-tag`}
          >
            {complete ? "Complete" : "Ongoing"}
          </div> */}
        </div>
      )}

      <div className="content">
        <div className="card-title-year">
          {link ? (
            <a href={link} target={newTab ? "_blank" : ""} rel="noreferrer" className="card-title">
              {title} {EXTERNAL_LINK_ICON}
            </a>
          ) : (
            <div className="card-title">{title}</div>
          )}
          {year ? (
            <div className="card-year">{year}</div>
          ) : (
            null
          )}
        </div>
        <p className="description">{description}</p>
        {tags.length > 0 && (
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
