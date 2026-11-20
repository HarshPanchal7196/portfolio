"use client";

import { useEffect, useRef } from "react";
import { theme } from "@/content/theme";

/**
 * Lightweight WebGL aurora shader (no three.js needed).
 * Colors come from theme.shader. Reacts softly to the mouse.
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

const FRAG = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;
uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 bg;

vec3 hash3(vec2 p){ vec3 q = vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*(3.-2.*f);
  float a=hash3(i).x, b=hash3(i+vec2(1,0)).x, c=hash3(i+vec2(0,1)).x, d=hash3(i+vec2(1,1)).x;
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = (gl_FragCoord.xy - .5*r) / min(r.x,r.y);
  p += (m - .5) * .15;
  float tt = t * .06;
  vec2 q = vec2(fbm(p*1.4 + tt), fbm(p*1.4 - tt + 3.1));
  vec2 w = vec2(fbm(p*1.8 + q*1.6 + vec2(1.7,9.2) + tt*1.3), fbm(p*1.8 + q*1.6 + vec2(8.3,2.8) - tt));
  float f = fbm(p*1.2 + w*1.8);

  vec3 col = mix(c1, c2, clamp(f*1.6,0.,1.));
  col = mix(col, c3, clamp(length(w)*.55 - .2, 0., 1.));
  float glow = smoothstep(1.25, .1, length(p - vec2(.35, .1) - (m-.5)*.3));
  float intensity = (f*f*1.4) * glow;
  vec3 outc = mix(bg, col, clamp(intensity, 0., .9));
  // vignette + fade to bottom
  outc *= smoothstep(1.4, .2, length(uv - .5) * 1.6);
  outc = mix(bg, outc, smoothstep(0., .35, uv.y));
  gl_FragColor = vec4(outc, 1.);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export default function HeroShader({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const [c1, c2, c3] = theme.shader.map(hexToRgb);
    gl.uniform3fv(u("c1"), c1);
    gl.uniform3fv(u("c2"), c2);
    gl.uniform3fv(u("c3"), c3);
    gl.uniform3fv(u("bg"), hexToRgb(theme.bg));

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    // Render at reduced resolution — it's a soft blurry field anyway, saves GPU.
    const scale = 0.5;
    const resize = () => {
      cv.width = Math.floor(cv.clientWidth * scale);
      cv.height = Math.floor(cv.clientHeight * scale);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(u("r"), cv.width, cv.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(u("t"), reduce ? 10 : (performance.now() - start) / 1000);
      gl.uniform2f(u("m"), mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvas} className={`h-full w-full ${className}`} aria-hidden />;
}
