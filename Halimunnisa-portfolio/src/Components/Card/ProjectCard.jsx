import React, { useMemo, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

// ====== Design Tokens (easy theming) ======
const tokens = {
  radius: 18,
  blur: 14,
  gap: 14,
};

// Neon shimmer for buttons & border glow
const shimmer = keyframes`
  0% { transform: translateX(-100%); opacity: .2; }
  60% { opacity: .6; }
  100% { transform: translateX(120%); opacity: 0; }
`;

// Soft float-in
const rise = keyframes`
  from { opacity: 0; transform: translateY(14px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// ====== Card Shell with gradient border + 3D tilt ======
const CardWrap = styled.div`
  perspective: 1200px;
`;

const Card = styled.article`
  --r: ${tokens.radius}px;
  width: 360px;
  height: 520px;
  border-radius: var(--r);
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap}px;
  background: radial-gradient(
      120% 120% at 0% 0%,
      rgba(255, 255, 255, 0.14),
      rgba(255, 255, 255, 0.06) 40%,
      rgba(255, 255, 255, 0.02) 70%
    ),
    rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(${tokens.blur}px) saturate(140%);
  -webkit-backdrop-filter: blur(${tokens.blur}px) saturate(140%);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform-style: preserve-3d;
  transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
  animation: ${rise} 0.5s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      #6e8efb,
      #a777e3 30%,
      #22d3ee 65%,
      #60a5fa
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 10px;
`;

const Pill = styled.span`
  font-size: 11px;
  letter-spacing: 0.3px;
  color: #fff;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(110, 142, 251, 0.9),
    rgba(167, 119, 227, 0.9)
  );
  box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.4);
`;

const Image = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: calc(var(--r) - 6px);
  overflow: hidden;
  transform: translateZ(40px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);

  img {
    width: 100%;
    height: 100%;
 display: block;
    transition: transform 0.7s ease;
    will-change: transform;
  }

  &:hover img {
    transform: scale(1.06);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      120% 120% at 80% 0%,
      transparent 40%,
      rgba(0, 0, 0, 0.28) 100%
    );
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #ffffff;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #111827, #1f2937);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);

  i {
    font-style: normal;
    opacity: 0.85;
  }
`;

const Title = styled.h3`
  font-size: 22px;
  line-height: 1.25;
  font-weight: 800;
  color: ${({ theme }) => theme?.text_primary || "#e5e7eb"};
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
`;

const Sub = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme?.text_secondary || "#a3a3a3"};
  font-size: 12px;
  opacity: 0.9;
`;

// === Description with toggle ===
const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme?.text_secondary || "#cbd5e1"};
  ${({ expanded }) =>
    !expanded &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

const ReadMoreButton = styled.button`
  margin-top: 6px;
  font-size: 13px;
  font-weight: 600;
  background: none;
  border: none;
  color: #60a5fa;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  transition: color 0.2s;

  &:hover {
    color: #93c5fd;
  }
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 2px;
`;

const AvatarStack = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.18);
    margin-left: -10px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    background: #0b0f1a;
  }
  > img:first-child {
    margin-left: 0;
  }
  > img:hover {
    transform: translateY(-2px) scale(1.07) rotate(3deg);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
  }
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: ${({ single }) => (single ? "center" : "space-between")};
`;

const Button = styled.a`
  position: relative;
  overflow: hidden;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  border-radius: 12px;
  padding: 12px 14px;
  letter-spacing: 0.2px;
  color: white;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  box-shadow: 0 10px 20px rgba(110, 142, 251, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(110, 142, 251, 0.35);
  }
  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    transform: translateX(-100%);
    animation: ${shimmer} 1.6s ease infinite;
  }
`;

const ButtonGhost = styled(Button)`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: none;
`;

const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.05)
  );
  animation: ${shimmer} 1.8s linear infinite;
`;

// ====== Component ======
const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fallback = useMemo(
    () =>
      project?.image ||
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
    [project?.image]
  );

  // 3D tilt
  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (+py * -10).toFixed(2);
    const rotateY = (+px * 12).toFixed(2);
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (imgRef.current)
      imgRef.current.style.transform = `scale(1.06) translate(${px * 8}px, ${py * 8
        }px)`;
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (imgRef.current)
      imgRef.current.style.transform = "scale(1) translate(0,0)";
  };

  const iconFor = (t) => {
    const s = String(t).toLowerCase();
    if (s.includes("react")) return "⚛️";
    if (s.includes("three") || s.includes("3d")) return "🧊";
    if (s.includes("node")) return "🟩";
    if (s.includes("api")) return "🔌";
    if (s.includes("ml") || s.includes("ai")) return "🤖";
    if (s.includes("css")) return "🎨";
    return "🏷️";
  };

  return (
    <CardWrap>
      <Card
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        role="article"
        aria-label={project?.title || "Project card"}
      >
        <HeaderRow>
          <Pill>✨ Featured</Pill>
          <Sub>
            <span role="img" aria-label="calendar">
              📅
            </span>
            <time dateTime={project?.date}>{project?.date}</time>
          </Sub>
        </HeaderRow>

        <Image>
          {!imgLoaded && <Skeleton aria-hidden />}
          <img
            ref={imgRef}
            src={fallback}
            alt={project?.title || "Project screenshot"}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
            loading="lazy"
          />
        </Image>

        {!!project?.tags?.length && (
          <Tags>
            {project.tags.map((tag, i) => (
              <Tag key={i} title={String(tag)}>
                <i>{iconFor(tag)}</i> {tag}
              </Tag>
            ))}
          </Tags>
        )}

        <div>
          <Title>{project?.title}</Title>
        </div>

        {/* Description with toggle */}
        <Description expanded={expanded}>{project?.description}</Description>
        {project?.description?.length > 120 && (
          <ReadMoreButton onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less" : "Read more"}
          </ReadMoreButton>
        )}

        {!!project?.member?.length && (
          <Members>
            <span style={{ fontSize: 12, opacity: 0.9 }}>Team</span>
            <AvatarStack>
              {project.member.map((m, i) => (
                <img
                  key={i}
                  src={m?.img}
                  alt={m?.name || `member-${i}`}
                  title={m?.name || "Member"}
                />
              ))}
            </AvatarStack>
          </Members>
        )}

        <Footer single={!project.webapp}>
          <Button
            href={project?.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View code on GitHub for ${project?.title}`}
          >
            View Code
          </Button>

          {project?.webapp && (
            <ButtonGhost
              href={project.webapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project?.title}`}
            >
              Live Demo
            </ButtonGhost>
          )}
        </Footer>


      </Card>
    </CardWrap>
  );
};

export default ProjectCard;
