import React, { useEffect, useRef, useState } from 'react';

// Ultimate Interactive Cursor Graphics Engine
const SnakeCursor = () => {
    const [effect, setEffect] = useState('network');
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // 1. Global Mouse & Resize Tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        const handleResize = () => {
            if (canvasRef.current && effect !== 'none') {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [effect]);

    // 2. The Heavy Mathematical Graphics Engines
    useEffect(() => {
        if (effect === 'none') return; // Completely disable canvas rendering

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animationFrameId;
        
        // ------------- ENGINE 1: NEURAL NETWORK CONSTELLATION -------------
        if (effect === 'network') {
            const numParticles = 80;
            const maxDist = 150;
            const mouseDist = 200;
            const particles = [];

            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    baseColor: `rgba(100, 200, 255, `
                });
            }

            const renderNetwork = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;
                
                // Draw Mouse Core
                ctx.beginPath();
                ctx.arc(mx, my, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#ff3d00';
                ctx.fill();
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#ff3d00';
                ctx.beginPath();
                ctx.arc(mx, my, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
                ctx.shadowBlur = 0;

                for (let i = 0; i < numParticles; i++) {
                    let p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                    const dxMouse = mx - p.x;
                    const dyMouse = my - p.y;
                    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                    
                    if (distMouse < mouseDist) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mx, my);
                        ctx.strokeStyle = `rgba(255, 61, 0, ${1 - (distMouse / mouseDist)})`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                        p.x += dxMouse * 0.01;
                        p.y += dyMouse * 0.01;
                    }

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.baseColor + '0.8)';
                    ctx.fill();

                    for (let j = i + 1; j < numParticles; j++) {
                        let p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < maxDist) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(100, 200, 255, ${(1 - (dist / maxDist)) * 0.5})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
                animationFrameId = requestAnimationFrame(renderNetwork);
            };
            renderNetwork();
        }

        // ------------- ENGINE 2: BIOLUMINESCENT JELLYFISH -------------
        else if (effect === 'jellyfish') {
            const numTentacles = 6;
            const nodesPerTentacle = 25;
            let tentacles = [];
            for (let t = 0; t < numTentacles; t++) {
                tentacles.push(Array(nodesPerTentacle).fill({x: canvas.width / 2, y: canvas.height / 2}));
            }
            let time = 0;

            const renderJelly = () => {
                time += 0.05;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                let hX = mouseRef.current.x;
                let hY = mouseRef.current.y;
                const pulse = 15 + Math.sin(time) * 3;

                // Pulsate Glow
                const grad = ctx.createRadialGradient(hX, hY, 0, hX, hY, pulse * 2.5);
                grad.addColorStop(0, 'rgba(0,191,255,0.8)');
                grad.addColorStop(0.4, 'rgba(0,191,255,0.4)');
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath(); ctx.arc(hX, hY, pulse * 2.5, 0, Math.PI * 2); ctx.fill();
                
                // Head Solid
                ctx.fillStyle = '#e0f7fa';
                ctx.beginPath(); ctx.arc(hX, hY, pulse, 0, Math.PI * 2); ctx.fill();

                for (let t = 0; t < numTentacles; t++) {
                    let cNodes = tentacles[t];
                    let nNodes = [];
                    const angOff = (Math.PI * 2 / numTentacles) * t;
                    
                    nNodes.push({ 
                        x: hX + Math.cos(angOff + time * 0.2) * (pulse * 0.6), 
                        y: hY + Math.sin(angOff + time * 0.2) * (pulse * 0.6) 
                    });

                    for (let i = 1; i < cNodes.length; i++) {
                        let prev = nNodes[i - 1];
                        let cur = { ...cNodes[i] };
                        
                        cur.x += Math.sin(time + i * 0.2 + t) * 0.5;
                        cur.y += Math.cos(time + i * 0.15 + t) * 0.5;
                        
                        const ang = Math.atan2(prev.y - cur.y, prev.x - cur.x);
                        cur.x = prev.x - Math.cos(ang) * 5;
                        cur.y = prev.y - Math.sin(ang) * 5;
                        nNodes.push(cur);
                    }
                    tentacles[t] = nNodes;

                    ctx.beginPath();
                    ctx.moveTo(nNodes[0].x, nNodes[0].y);
                    for (let i = 1; i < nNodes.length - 1; i++) {
                        ctx.quadraticCurveTo(nNodes[i].x, nNodes[i].y, (nNodes[i].x + nNodes[i+1].x)/2, (nNodes[i].y + nNodes[i+1].y)/2);
                    }
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'rgba(0,191,255,0.6)';
                    ctx.stroke();

                    // Suction Cups
                    for (let i = 2; i < nNodes.length; i += 4) {
                        ctx.beginPath();
                        ctx.arc(nNodes[i].x, nNodes[i].y, Math.max(0.5, 3 - i*0.1), 0, Math.PI * 2);
                        ctx.fillStyle = '#fff'; ctx.fill();
                    }
                }
                animationFrameId = requestAnimationFrame(renderJelly);
            };
            renderJelly();
        }

        // ------------- ENGINE 3: SKELETAL REPTILE / CENTIPEDE -------------
        else if (effect === 'skeleton') {
            let nodes = Array(40).fill({x: canvas.width / 2, y: canvas.height / 2});
            
            const renderSkel = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let head = { ...nodes[0] };
                head.x += (mouseRef.current.x - head.x) * 0.15;
                head.y += (mouseRef.current.y - head.y) * 0.15;

                let nNodes = [head];
                for (let i = 1; i < nodes.length; i++) {
                    let prev = nNodes[i - 1];
                    let cur = { ...nodes[i] };
                    const ang = Math.atan2(prev.y - cur.y, prev.x - cur.x);
                    cur.x = prev.x - Math.cos(ang) * 8; // rigid 8px
                    cur.y = prev.y - Math.sin(ang) * 8;
                    nNodes.push(cur);
                }
                nodes = nNodes;

                // Spine
                ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
                for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                for (let i = 0; i < nodes.length; i++) {
                    ctx.fillStyle = '#333';
                    ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, i===0?5:2, 0, Math.PI*2); ctx.fill();

                    // Ribs
                    if (i > 2 && i < nodes.length - 2 && i % 2 === 0) {
                        const ang = Math.atan2(nodes[i+1].y - nodes[i-1].y, nodes[i+1].x - nodes[i-1].x);
                        const ribLen = Math.sin((i / nodes.length) * Math.PI) * 22;
                        
                        const lx = nodes[i].x + Math.cos(ang - Math.PI/2) * ribLen;
                        const ly = nodes[i].y + Math.sin(ang - Math.PI/2) * ribLen;
                        const rx = nodes[i].x + Math.cos(ang + Math.PI/2) * ribLen;
                        const ry = nodes[i].y + Math.sin(ang + Math.PI/2) * ribLen;

                        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                        ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5; ctx.stroke();
                        
                        ctx.beginPath(); ctx.arc(lx, ly, 1.5, 0, Math.PI*2); ctx.arc(rx, ry, 1.5, 0, Math.PI*2); ctx.fill();
                    }
                }

                // Mandibles
                const fAng = Math.atan2(nodes[1].y - nodes[0].y, nodes[1].x - nodes[0].x) + Math.PI;
                ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.lineTo(nodes[0].x + Math.cos(fAng - 0.5) * 12, nodes[0].y + Math.sin(fAng - 0.5) * 12);
                ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.lineTo(nodes[0].x + Math.cos(fAng + 0.5) * 12, nodes[0].y + Math.sin(fAng + 0.5) * 12);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                animationFrameId = requestAnimationFrame(renderSkel);
            };
            renderSkel();
        }

        // ------------- ENGINE 4: DRAGON SKELETON (WINGS) -------------
        else if (effect === 'dragon_skeleton') {
            let nodes = Array(50).fill({x: canvas.width / 2, y: canvas.height / 2});
            
            const renderDragonSkel = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let head = { ...nodes[0] };
                const dxMouse = mouseRef.current.x - head.x;
                const dyMouse = mouseRef.current.y - head.y;
                head.x += dxMouse * 0.15;
                head.y += dyMouse * 0.15;

                let nNodes = [head];
                for (let i = 1; i < nodes.length; i++) {
                    let prev = nNodes[i - 1];
                    let cur = { ...nodes[i] };
                    const ang = Math.atan2(prev.y - cur.y, prev.x - cur.x);
                    cur.x = prev.x - Math.cos(ang) * 7;
                    cur.y = prev.y - Math.sin(ang) * 7;
                    nNodes.push(cur);
                }
                nodes = nNodes;

                // Spine
                ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
                for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                // Calculate velocity to mathematically sweep wings realistically
                const velocity = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                const sweep = Math.min(velocity * 0.05, Math.PI / 3);

                for (let i = 0; i < nodes.length; i++) {
                    ctx.fillStyle = '#333';
                    ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, i===0?6:1.5, 0, Math.PI*2); ctx.fill();

                    const ang = i > 0 && i < nodes.length - 1 ? Math.atan2(nodes[i+1].y - nodes[i-1].y, nodes[i+1].x - nodes[i-1].x) : 0;

                    // Ribs over the whole body
                    if (i > 3 && i < nodes.length - 8 && i % 2 === 0) {
                        const ribLen = 8 + Math.sin((i / nodes.length) * Math.PI) * 12;
                        
                        // Bend ribs slightly backward
                        const lx = nodes[i].x + Math.cos(ang - Math.PI/2 - 0.4) * ribLen;
                        const ly = nodes[i].y + Math.sin(ang - Math.PI/2 - 0.4) * ribLen;
                        const rx = nodes[i].x + Math.cos(ang + Math.PI/2 + 0.4) * ribLen;
                        const ry = nodes[i].y + Math.sin(ang + Math.PI/2 + 0.4) * ribLen;

                        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                        ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.stroke();
                    }

                    // WINGS (Attached exactly at vertebra 8)
                    if (i === 8) {
                        const wingLen = 60;
                        const lTipX = nodes[i].x + Math.cos(ang - Math.PI/2 - sweep) * wingLen;
                        const lTipY = nodes[i].y + Math.sin(ang - Math.PI/2 - sweep) * wingLen;
                        const rTipX = nodes[i].x + Math.cos(ang + Math.PI/2 + sweep) * wingLen;
                        const rTipY = nodes[i].y + Math.sin(ang + Math.PI/2 + sweep) * wingLen;

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(lTipX, lTipY);
                        ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(rTipX, rTipY);
                        ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.stroke();

                        // Wing fingers
                        for (let j = 1; j <= 3; j++) {
                            const spread = 0.4 * j;
                            ctx.beginPath();
                            ctx.moveTo(nodes[i].x, nodes[i].y);
                            ctx.lineTo(nodes[i].x + Math.cos(ang - Math.PI/2 - sweep + spread) * (wingLen - j*12), nodes[i].y + Math.sin(ang - Math.PI/2 - sweep + spread) * (wingLen - j*12));
                            ctx.moveTo(nodes[i].x, nodes[i].y);
                            ctx.lineTo(nodes[i].x + Math.cos(ang + Math.PI/2 + sweep - spread) * (wingLen - j*12), nodes[i].y + Math.sin(ang + Math.PI/2 + sweep - spread) * (wingLen - j*12));
                            ctx.lineWidth = 1.5; ctx.stroke();
                        }
                    }
                }

                // Dragon Horns
                const fAng = Math.atan2(nodes[1].y - nodes[0].y, nodes[1].x - nodes[0].x) + Math.PI;
                ctx.beginPath(); 
                ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.quadraticCurveTo(nodes[0].x + Math.cos(fAng - 0.8) * 15, nodes[0].y + Math.sin(fAng - 0.8) * 15, nodes[0].x + Math.cos(fAng - Math.PI/2) * 20, nodes[0].y + Math.sin(fAng - Math.PI/2) * 20);
                ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.quadraticCurveTo(nodes[0].x + Math.cos(fAng + 0.8) * 15, nodes[0].y + Math.sin(fAng + 0.8) * 15, nodes[0].x + Math.cos(fAng + Math.PI/2) * 20, nodes[0].y + Math.sin(fAng + Math.PI/2) * 20);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                animationFrameId = requestAnimationFrame(renderDragonSkel);
            };
            renderDragonSkel();
        }

        // ------------- ENGINE 5: FISH SKELETON -------------
        else if (effect === 'fish_skeleton') {
            let nodes = Array(35).fill({x: canvas.width / 2, y: canvas.height / 2});
            
            const renderFishSkel = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let head = { ...nodes[0] };
                head.x += (mouseRef.current.x - head.x) * 0.15;
                head.y += (mouseRef.current.y - head.y) * 0.15;

                let nNodes = [head];
                for (let i = 1; i < nodes.length; i++) {
                    let prev = nNodes[i - 1]; let cur = { ...nodes[i] };
                    const ang = Math.atan2(prev.y - cur.y, prev.x - cur.x);
                    cur.x = prev.x - Math.cos(ang) * 6; 
                    cur.y = prev.y - Math.sin(ang) * 6;
                    nNodes.push(cur);
                }
                nodes = nNodes;

                // Spine
                ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
                for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                for (let i = 0; i < nodes.length; i++) {
                    ctx.fillStyle = '#333';
                    ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, i===0?4:1.5, 0, Math.PI*2); ctx.fill();

                    // Sharp triangular ribs
                    if (i > 3 && i < 20 && i % 2 === 0) {
                        const ang = Math.atan2(nodes[i+1].y - nodes[i-1].y, nodes[i+1].x - nodes[i-1].x);
                        const ribLen = 20 - Math.abs(i - 11) * 1.8; 
                        if (ribLen > 0) {
                            const lx = nodes[i].x + Math.cos(ang - Math.PI/2) * ribLen;
                            const ly = nodes[i].y + Math.sin(ang - Math.PI/2) * ribLen;
                            const rx = nodes[i].x + Math.cos(ang + Math.PI/2) * ribLen;
                            const ry = nodes[i].y + Math.sin(ang + Math.PI/2) * ribLen;

                            ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                            ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5; ctx.stroke();
                        }
                    }
                }

                // Fish Tail
                const lastIdx = nodes.length - 1;
                const tailAng = Math.atan2(nodes[lastIdx].y - nodes[lastIdx-2].y, nodes[lastIdx].x - nodes[lastIdx-2].x);
                ctx.beginPath(); ctx.moveTo(nodes[lastIdx].x, nodes[lastIdx].y);
                ctx.lineTo(nodes[lastIdx].x + Math.cos(tailAng - 0.6) * 15, nodes[lastIdx].y + Math.sin(tailAng - 0.6) * 15);
                ctx.moveTo(nodes[lastIdx].x, nodes[lastIdx].y);
                ctx.lineTo(nodes[lastIdx].x + Math.cos(tailAng + 0.6) * 15, nodes[lastIdx].y + Math.sin(tailAng + 0.6) * 15);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                // Fish Skull
                const fAng = Math.atan2(nodes[1].y - nodes[0].y, nodes[1].x - nodes[0].x) + Math.PI;
                ctx.beginPath(); 
                ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.lineTo(nodes[0].x + Math.cos(fAng - 0.3) * 15, nodes[0].y + Math.sin(fAng - 0.3) * 15);
                ctx.lineTo(nodes[0].x + Math.cos(fAng + 0.3) * 15, nodes[0].y + Math.sin(fAng + 0.3) * 15);
                ctx.closePath();
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                animationFrameId = requestAnimationFrame(renderFishSkel);
            };
            renderFishSkel();
        }

        // ------------- ENGINE 6: WALKING IK SPIDER -------------
        else if (effect === 'spider_skeleton') {
            let body = { x: canvas.width/2, y: canvas.height/2 };
            const numLegs = 8;
            const legs = [];
            const legLength = 60; // Length of a single bone (Total leg reach is 120)
            const stepRadius = 45; // How far the body must move before a foot steps

            for (let i = 0; i < numLegs; i++) {
                const side = i % 2 === 0 ? 1 : -1; // 1=Right, -1=Left
                const row = Math.floor(i / 2); // 0, 1, 2, 3 front-to-back
                const angOffset = side * (Math.PI/2) + side * ((row - 1.5) * 0.4);
                
                legs.push({
                    angOffset,
                    side,
                    targetDist: 50 + Math.abs(row - 1.5) * 15,
                    foot: { x: body.x + Math.cos(angOffset)*60, y: body.y + Math.sin(angOffset)*60 },
                    oldFoot: { x: body.x + Math.cos(angOffset)*60, y: body.y + Math.sin(angOffset)*60 },
                    targetFoot: { x: body.x, y: body.y },
                    stepProgress: 1 // 1 means physically planted on the mathematical ground
                });
            }

            let bodyAngle = 0;

            const renderSpider = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // 1. Move Central Body (Easing strongly towards mouse)
                const dxMouse = mouseRef.current.x - body.x;
                const dyMouse = mouseRef.current.y - body.y;
                body.x += dxMouse * 0.08;
                body.y += dyMouse * 0.08;

                if (Math.abs(dxMouse) > 1 || Math.abs(dyMouse) > 1) {
                    bodyAngle = Math.atan2(dyMouse, dxMouse); 
                }

                // 2. Loop through 8 Legs to solve Inverse Kinematics Gait
                for (let i = 0; i < numLegs; i++) {
                    let leg = legs[i];
                    
                    const shoulderX = body.x + Math.cos(bodyAngle + leg.angOffset*0.2) * 12;
                    const shoulderY = body.y + Math.sin(bodyAngle + leg.angOffset*0.2) * 12;

                    // Ideal target point on the ground mathematically relative to body
                    const idealX = body.x + Math.cos(bodyAngle + leg.angOffset) * leg.targetDist;
                    const idealY = body.y + Math.sin(bodyAngle + leg.angOffset) * leg.targetDist;

                    const distToIdeal = Math.sqrt(Math.pow(leg.foot.x - idealX, 2) + Math.pow(leg.foot.y - idealY, 2));

                    // Procedural Stepping Logic: Step if foot is stretched too far
                    if (leg.stepProgress >= 1 && distToIdeal > stepRadius) {
                        // Anti-clumsiness calculation: Only step if the opposite leg isn't currently mid-air
                        const oppositeIdx = i % 2 === 0 ? i + 1 : i - 1;
                        if (legs[oppositeIdx].stepProgress >= 1) {
                            leg.stepProgress = 0;
                            leg.oldFoot = { ...leg.foot };
                            // Step slightly PAST the ideal point (Overstep based on velocity prediction)
                            leg.targetFoot = { 
                                x: idealX + dxMouse * 0.5, 
                                y: idealY + dyMouse * 0.5 
                            };
                        }
                    }

                    // Process Physical 3D Stepping Animation (Parabolic Lift)
                    let currentFootX = leg.foot.x;
                    let currentFootY = leg.foot.y;
                    
                    if (leg.stepProgress < 1) {
                        leg.stepProgress += 0.12; // Stepping speed
                        if (leg.stepProgress > 1) leg.stepProgress = 1;
                        
                        // Z-Axis Lift (Sine wave arc physically lifts foot off canvas)
                        const lift = Math.sin(leg.stepProgress * Math.PI) * 25; 
                        
                        currentFootX = leg.oldFoot.x + (leg.targetFoot.x - leg.oldFoot.x) * leg.stepProgress;
                        currentFootY = leg.oldFoot.y + (leg.targetFoot.y - leg.oldFoot.y) * leg.stepProgress - lift;
                        
                        // Save physical ground contact strictly as XY (ignoring lift)
                        leg.foot.x = leg.oldFoot.x + (leg.targetFoot.x - leg.oldFoot.x) * leg.stepProgress;
                        leg.foot.y = leg.oldFoot.y + (leg.targetFoot.y - leg.oldFoot.y) * leg.stepProgress; 
                    }

                    // 3. Inverse Kinematics 2-Bone Knee Solver
                    const dx = currentFootX - shoulderX;
                    const dy = currentFootY - shoulderY;
                    let d = Math.sqrt(dx*dx + dy*dy);
                    
                    const maxReach = legLength * 2;
                    if (d > maxReach) d = maxReach; // Prevent structural breaks

                    const legAng = Math.atan2(dy, dx);
                    // Pythagorean solver for the perpendicular height of the knee
                    const h = Math.sqrt(Math.max(0, legLength*legLength - (d/2)*(d/2)));
                    
                    // Bend knee symmetrically outwards
                    const kneeBendDir = leg.side; 
                    const kneeX = shoulderX + dx/2 + Math.cos(legAng - Math.PI/2 * kneeBendDir) * h;
                    const kneeY = shoulderY + dy/2 + Math.sin(legAng - Math.PI/2 * kneeBendDir) * h;

                    // Draw Femur (Upper body-to-knee)
                    ctx.beginPath(); ctx.moveTo(shoulderX, shoulderY); ctx.lineTo(kneeX, kneeY);
                    ctx.strokeStyle = '#222'; ctx.lineWidth = 3; ctx.stroke();
                    
                    // Draw Tibia (Knee-to-ground foot)
                    ctx.beginPath(); ctx.moveTo(kneeX, kneeY); ctx.lineTo(currentFootX, currentFootY);
                    ctx.strokeStyle = '#444'; ctx.lineWidth = 1.8; ctx.stroke();
                    
                    // Draw Knee & Foot Joints
                    ctx.beginPath(); ctx.arc(kneeX, kneeY, 2.5, 0, Math.PI*2); ctx.fillStyle = '#111'; ctx.fill();
                    ctx.beginPath(); ctx.arc(currentFootX, currentFootY, 2, 0, Math.PI*2); ctx.fillStyle = '#555'; ctx.fill();
                }

                // 4. Draw Black Widow Thorax / Body
                ctx.beginPath(); ctx.arc(body.x, body.y, 16, 0, Math.PI*2);
                ctx.fillStyle = '#1a1a1a'; ctx.fill();
                
                // Draw 8 glowing Red eyes tracking the velocity
                for(let e=0; e<4; e++) {
                    const lEyeAng = bodyAngle - 0.15 - e*0.12;
                    const rEyeAng = bodyAngle + 0.15 + e*0.12;
                    ctx.beginPath(); ctx.arc(body.x + Math.cos(lEyeAng)*13, body.y + Math.sin(lEyeAng)*13, e<2?2:1, 0, Math.PI*2);
                    ctx.fillStyle = '#ff1744'; ctx.fill();
                    ctx.beginPath(); ctx.arc(body.x + Math.cos(rEyeAng)*13, body.y + Math.sin(rEyeAng)*13, e<2?2:1, 0, Math.PI*2);
                    ctx.fillStyle = '#ff1744'; ctx.fill();
                }

                animationFrameId = requestAnimationFrame(renderSpider);
            };
            renderSpider();
        }

        // ------------- ENGINE 7: WALKING REPTILE SKELETON -------------
        else if (effect === 'walking_skeleton') {
            const numNodes = 40;
            let nodes = Array(numNodes).fill({x: canvas.width / 2, y: canvas.height / 2});
            
            // 6 Walking Legs (3 pairs) attached at specific spine vertebrae
            const legConfig = [
                { idx: 6, len: 40, dist: 40, stepRad: 30 },
                { idx: 16, len: 45, dist: 45, stepRad: 35 },
                { idx: 26, len: 40, dist: 40, stepRad: 30 }
            ];
            
            const legs = [];
            for (let c of legConfig) {
                legs.push({ spineIdx: c.idx, side: -1, length: c.len, targetDist: c.dist, stepRadius: c.stepRad, stepProgress: 1, foot: {x:0, y:0}, oldFoot: {x:0, y:0}, targetFoot: {x:0, y:0} });
                legs.push({ spineIdx: c.idx, side: 1, length: c.len, targetDist: c.dist, stepRadius: c.stepRad, stepProgress: 0, foot: {x:0, y:0}, oldFoot: {x:0, y:0}, targetFoot: {x:0, y:0} });
            }

            const renderWalkingSkel = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // 1. Move Head
                let head = { ...nodes[0] };
                const dxMouse = mouseRef.current.x - head.x;
                const dyMouse = mouseRef.current.y - head.y;
                head.x += dxMouse * 0.15;
                head.y += dyMouse * 0.15;

                // 2. Spine IK Solver
                let nNodes = [head];
                for (let i = 1; i < nodes.length; i++) {
                    let prev = nNodes[i - 1];
                    let cur = { ...nodes[i] };
                    const ang = Math.atan2(prev.y - cur.y, prev.x - cur.x);
                    cur.x = prev.x - Math.cos(ang) * 8; 
                    cur.y = prev.y - Math.sin(ang) * 8;
                    nNodes.push(cur);
                }
                nodes = nNodes;

                // Draw Spine
                ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
                for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                for (let i = 0; i < nodes.length; i++) {
                    ctx.fillStyle = '#333';
                    ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, i===0?5:2, 0, Math.PI*2); ctx.fill();

                    // Short static ribs to make it look skeletal
                    if (i > 2 && i < nodes.length - 2 && i % 2 === 0) {
                        const nextP = nodes[i+1];
                        const prevP = nodes[i-1];
                        if (nextP && prevP) {
                            const ang = Math.atan2(nextP.y - prevP.y, nextP.x - prevP.x);
                            const ribLen = Math.sin((i / nodes.length) * Math.PI) * 12; // Shorter ribs to leave room for legs
                            
                            const lx = nodes[i].x + Math.cos(ang - Math.PI/2) * ribLen;
                            const ly = nodes[i].y + Math.sin(ang - Math.PI/2) * ribLen;
                            const rx = nodes[i].x + Math.cos(ang + Math.PI/2) * ribLen;
                            const ry = nodes[i].y + Math.sin(ang + Math.PI/2) * ribLen;

                            ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                            ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.stroke();
                        }
                    }
                }

                // 3. Update & Draw Walking Legs
                for (let i = 0; i < legs.length; i++) {
                    let leg = legs[i];
                    
                    const shoulderNode = nodes[leg.spineIdx];
                    const nextP = nodes[leg.spineIdx+1];
                    const prevP = nodes[leg.spineIdx-1];
                    let spineAng = 0;
                    if (nextP && prevP) {
                        spineAng = Math.atan2(nextP.y - prevP.y, nextP.x - prevP.x);
                    }
                    
                    // Ideal footing position on the ground smoothly tracking the spine
                    const idealX = shoulderNode.x + Math.cos(spineAng - Math.PI/2 * leg.side) * leg.targetDist;
                    const idealY = shoulderNode.y + Math.sin(spineAng - Math.PI/2 * leg.side) * leg.targetDist;

                    const distToIdeal = Math.sqrt(Math.pow(leg.foot.x - idealX, 2) + Math.pow(leg.foot.y - idealY, 2));

                    if (leg.stepProgress >= 1 && distToIdeal > leg.stepRadius) {
                        const oppositeIdx = i % 2 === 0 ? i + 1 : i - 1;
                        if (legs[oppositeIdx].stepProgress >= 1) {
                            leg.stepProgress = 0;
                            leg.oldFoot = { ...leg.foot };
                            leg.targetFoot = { 
                                x: idealX + dxMouse * 0.2, 
                                y: idealY + dyMouse * 0.2 
                            };
                        }
                    }

                    if (leg.foot.x === 0 && leg.foot.y === 0) {
                        leg.foot = { x: idealX, y: idealY };
                        leg.targetFoot = { x: idealX, y: idealY };
                        leg.oldFoot = { x: idealX, y: idealY };
                    }

                    let currentFootX = leg.foot.x;
                    let currentFootY = leg.foot.y;
                    
                    if (leg.stepProgress < 1) {
                        leg.stepProgress += 0.15; // Leg speed
                        if (leg.stepProgress > 1) leg.stepProgress = 1;
                        
                        const lift = Math.sin(leg.stepProgress * Math.PI) * 15; 
                        
                        currentFootX = leg.oldFoot.x + (leg.targetFoot.x - leg.oldFoot.x) * leg.stepProgress;
                        currentFootY = leg.oldFoot.y + (leg.targetFoot.y - leg.oldFoot.y) * leg.stepProgress - lift;
                        
                        leg.foot.x = leg.oldFoot.x + (leg.targetFoot.x - leg.oldFoot.x) * leg.stepProgress;
                        leg.foot.y = leg.oldFoot.y + (leg.targetFoot.y - leg.oldFoot.y) * leg.stepProgress; 
                    }

                    // 2-Bone IK Knee Solver
                    const dx = currentFootX - shoulderNode.x;
                    const dy = currentFootY - shoulderNode.y;
                    let d = Math.sqrt(dx*dx + dy*dy);
                    
                    if (d > leg.length * 2) d = leg.length * 2; 

                    const legAng = Math.atan2(dy, dx);
                    const h = Math.sqrt(Math.max(0, leg.length*leg.length - (d/2)*(d/2)));
                    
                    const kneeBendDir = leg.side; 
                    const kneeX = shoulderNode.x + dx/2 + Math.cos(legAng - Math.PI/2 * kneeBendDir) * h;
                    const kneeY = shoulderNode.y + dy/2 + Math.sin(legAng - Math.PI/2 * kneeBendDir) * h;

                    ctx.beginPath(); ctx.moveTo(shoulderNode.x, shoulderNode.y); ctx.lineTo(kneeX, kneeY);
                    ctx.strokeStyle = '#222'; ctx.lineWidth = 2.5; ctx.stroke();
                    
                    ctx.beginPath(); ctx.moveTo(kneeX, kneeY); ctx.lineTo(currentFootX, currentFootY);
                    ctx.strokeStyle = '#444'; ctx.lineWidth = 1.5; ctx.stroke();
                    
                    ctx.beginPath(); ctx.arc(kneeX, kneeY, 2, 0, Math.PI*2); ctx.fillStyle = '#111'; ctx.fill();
                    ctx.beginPath(); ctx.arc(currentFootX, currentFootY, 1.5, 0, Math.PI*2); ctx.fillStyle = '#555'; ctx.fill();
                }

                // Mandibles
                const fAng = Math.atan2(nodes[1].y - nodes[0].y, nodes[1].x - nodes[0].x) + Math.PI;
                ctx.beginPath(); ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.lineTo(nodes[0].x + Math.cos(fAng - 0.5) * 12, nodes[0].y + Math.sin(fAng - 0.5) * 12);
                ctx.moveTo(nodes[0].x, nodes[0].y);
                ctx.lineTo(nodes[0].x + Math.cos(fAng + 0.5) * 12, nodes[0].y + Math.sin(fAng + 0.5) * 12);
                ctx.strokeStyle = '#333'; ctx.lineWidth = 2; ctx.stroke();

                animationFrameId = requestAnimationFrame(renderWalkingSkel);
            };
            renderWalkingSkel();
        }

        // ------------- ENGINE 8: ORGANIC GREEN SNAKE -------------
        else if (effect === 'snake') {
            let sDots = Array(25).fill({x: canvas.width / 2, y: canvas.height / 2});
            
            const renderSnake = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let head = { ...sDots[0] };
                const dx = mouseRef.current.x - head.x;
                const dy = mouseRef.current.y - head.y;
                head.x += dx * 0.15;
                head.y += dy * 0.15;

                let nDots = [head];
                for (let i = 1; i < sDots.length; i++) {
                    let cur = { ...sDots[i] };
                    cur.x += (nDots[i-1].x - cur.x) * 0.4;
                    cur.y += (nDots[i-1].y - cur.y) * 0.4;
                    nDots.push(cur);
                }
                sDots = nDots;

                for (let i = sDots.length - 1; i >= 0; i--) {
                    const r = Math.max(2, 12 - (i * 0.35));
                    ctx.beginPath(); ctx.arc(sDots[i].x, sDots[i].y, r, 0, Math.PI * 2);
                    
                    if (i === 0) ctx.fillStyle = '#2e7d32'; // Head
                    else if (i % 3 === 0) ctx.fillStyle = '#ffb300'; // Stripe
                    else ctx.fillStyle = '#4caf50'; // Body
                    ctx.fill();
                    
                    // Eyes and Tongue
                    if (i === 0) {
                        const ang = Math.atan2(dy, dx);
                        const ex1 = sDots[i].x + Math.cos(ang - 0.7)*r*0.6;
                        const ey1 = sDots[i].y + Math.sin(ang - 0.7)*r*0.6;
                        const ex2 = sDots[i].x + Math.cos(ang + 0.7)*r*0.6;
                        const ey2 = sDots[i].y + Math.sin(ang + 0.7)*r*0.6;
                        
                        ctx.beginPath(); ctx.arc(ex1, ey1, 2, 0, Math.PI*2); ctx.arc(ex2, ey2, 2, 0, Math.PI*2);
                        ctx.fillStyle = '#fff'; ctx.fill();
                        
                        ctx.beginPath(); ctx.arc(ex1+Math.cos(ang), ey1+Math.sin(ang), 1, 0, Math.PI*2);
                        ctx.arc(ex2+Math.cos(ang), ey2+Math.sin(ang), 1, 0, Math.PI*2);
                        ctx.fillStyle = '#d32f2f'; ctx.fill();

                        if (Math.random() > 0.95) {
                            ctx.beginPath(); ctx.moveTo(sDots[i].x + Math.cos(ang)*r, sDots[i].y + Math.sin(ang)*r);
                            ctx.lineTo(sDots[i].x + Math.cos(ang)*(r+10), sDots[i].y + Math.sin(ang)*(r+10));
                            ctx.strokeStyle = '#d32f2f'; ctx.lineWidth = 2; ctx.stroke();
                        }
                    }
                }
                animationFrameId = requestAnimationFrame(renderSnake);
            };
            renderSnake();
        }

        // Cleanup the current specific engine!
        return () => { cancelAnimationFrame(animationFrameId); };

    }, [effect]); // Re-run effect strictly when the state toggle naturally changes!

    return (
        <>
            {/* The Mathematical Canvas Box */}
            {effect !== 'none' && (
                <canvas 
                    ref={canvasRef}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none', // Crucial: Clicks logically pass completely through to the real React links beneath!
                        zIndex: 9998
                    }}
                />
            )}
            
            {/* The Tiny Subtle Dropdown Box */}
            <div style={{ 
                position: 'fixed', 
                bottom: 20, 
                right: 20, 
                zIndex: 9999, 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                padding: '6px 12px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                border: '1px solid #eee'
            }}>
                <span style={{ color: '#666', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                    CURSOR FX:
                </span>
                <select 
                    value={effect} 
                    onChange={(e) => setEffect(e.target.value)}
                    style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: '#f9f9f9',
                        color: '#333',
                        fontSize: '12px',
                        cursor: 'pointer',
                        outline: 'none',
                        textTransform: 'capitalize'
                    }}
                >
                    <option value="none">None</option>
                    <option value="network">Network Constellation</option>
                    <option value="jellyfish">Jellyfish</option>
                    <option value="skeleton">Snake Skeleton</option>
                    <option value="dragon_skeleton">Dragon Skeleton</option>
                    <option value="fish_skeleton">Fish Skeleton</option>
                    <option value="spider_skeleton">Walking Spider IK</option>
                    <option value="walking_skeleton">Walking Reptile IK</option>
                    <option value="snake">Green Snake</option>
                </select>
            </div>
        </>
    );
};

export default SnakeCursor;
