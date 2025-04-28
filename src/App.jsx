import { useEffect, useRef, useState } from 'react';
import Lobby from './components/Lobby.jsx';
import SignIn from './components/SignIn.jsx';
import Menu from './components/Menu.jsx';
import AddChat from './components/AddChat.jsx';
import Chat from './components/Chat.jsx';
import chatBackground from './assets/chatBackground.png';
import './style/App.css';
import './style/style.css';

function App() {

  const canvasRef = useRef(null);
  const bgRef = useRef(null);

  const [view, setView] = useState('lobby');
  const viewRef = useRef(view);
  //const [, setBackgroundRadius] = useState(0.01);
  const [imgOpacity, setImgOpacity] = useState(0);
  const imgOpacityRef = useRef(0);

  const [isChat, setIsChat] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const bg = bgRef.current;
    const ctx = canvas.getContext('2d');

    let backgroundRadius = 0.01;

    viewRef.current = view;

    let dots = [];
    let stars = [];

    function ResizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if(!isChat) {
        CreateDots();
        CreateStars();
        if(view === 'chat')
          setIsChat(true);
      }
    }

    function CreateDots() {
      dots = [];
      for(let i=0; i<150; ++i) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,

          radius: Math.random() * 4 + 2,

          dx: Math.random() * 0.5 - 0.25,
          dy: Math.random() * 0.5 - 0.25,

          color: `rgba(${200 + Math.random() * 50}, 200, ${200 + Math.random() * 50}, 1)`,
        })
      }
    }

    function CreateStars() {
      stars = [];
      for(let i=0; i<200; ++i) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,

          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.2,
          brightness: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.01,

          color: `${150 + Math.random() * 100}, 150, ${150 + Math.random() * 100}`
        })
      }
    }

    let mouseX = -100, mouseY = -100;
    bg.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    })

    function DrawBackground() {
      let gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 50,
        canvas.width/2, canvas.height/2, canvas.width
      )

      let color1 = "rgb(5, 5, 10)";
      let color2 = "rgb(10, 10, 20)";
      let color3 = "rgb(15, 15, 30)";

      gradient.addColorStop(0, color1);
      gradient.addColorStop(0.5, color2);
      gradient.addColorStop(1, color3);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function DrawStars() {
      stars.forEach(star => {
        star.x -=star.speed;

        if(star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }

        star.brightness += star.twinkleSpeed;
        if(star.brightness > 1 || star.brightness < 0)
          star.twinkleSpeed *= -1;

        ctx.fillStyle = `rgba(${star.color}, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      })
    }

    function DrawLines() {
      for(let i=0; i<dots.length; ++i)
        for(let j=i+1; j<dots.length; ++j) {
          let dist = Math.sqrt((dots[i].x - dots[j].x) ** 2 + (dots[i].y - dots[j].y) ** 2);
          if(dist < 100) {
            let alpha = 1 - (dist/100);
            let hue = 200 - (dist/2);

            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
    }

    function animateDots() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      DrawBackground();
      DrawStars();

      dots.forEach(dot => {
        let dist = Math.sqrt((dot.x - mouseX) ** 2 + (dot.y - mouseY) ** 2);
        if(dist < 80) {
          let angle = Math.atan2(dot.y - mouseY, dot.x - mouseX);
          dot.x += Math.cos(angle) * 1;
          dot.y += Math.sin(angle) * 1;
        } else {
          dot.x += dot.dx;
          dot.y += dot.dy; 
        }

        if(dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if(dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;

        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      DrawLines();
      if(viewRef.current !== 'chat') 
        requestAnimationFrame(animateDots);
      else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        DrawBackground();
      }
    }

    function drawChatBackground() {
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(drawChatBackground);
    }

    function endingTransition() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      imgOpacityRef.current = -1;
      setImgOpacity(imgOpacityRef.current);
      // const chatImg = new Image();
      // chatImg.src = chatBackground;
      // chatImg.onload = () => {
      //   ctx.drawImage(chatImg, 0, 0, canvas.width, canvas.height);
      // }
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawChatBackground();
    }

    function chatTransitionAnim() {
      dots.forEach(dot => {
        dot.x += dot.dx;
        dot.y += dot.dy;
        if(dot.x < 0 || dot.x > canvas.width || dot.y < 0 || dot.y > canvas.height) dot.dx = 0, dot.dy = 0;
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
        ctx.fill();

        dot.dx *= 1.05;
        dot.dy *= 1.05;
      })
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, backgroundRadius, 0, 2 * Math.PI);
      ctx.fill();

      backgroundRadius *= 1.085;
      imgOpacityRef.current += backgroundRadius<canvas.width ? 0 : 0.003;
      setImgOpacity(imgOpacityRef.current); 
      if(imgOpacityRef.current < 1.5)
        requestAnimationFrame(chatTransitionAnim);
      else
        endingTransition();
    }

    function toChatTransition() {
      dots.forEach(dot => {
        let angle = Math.atan2(dot.y - canvas.height/2, dot.x - canvas.width/2);
        dot.dx = Math.cos(angle) * 0.25;
        dot.dy = Math.sin(angle) * 0.25;
      });
      chatTransitionAnim();
    }

    ResizeCanvas();

    if (view === 'chat') {
      toChatTransition();
    } else {
      animateDots();
    }

    window.addEventListener('resize', ResizeCanvas);
  }, [view]);

 return <div className="container" ref={bgRef}>
    <canvas id="dotcanvas" ref={canvasRef}></canvas>
    {view === 'lobby' && <Lobby onNavigate={setView} />}
    {view === 'signin' && <SignIn onNavigate={setView} />}
    {view === 'menu' && <Menu onNavigate={setView} />}
    {view === 'addchat' && <AddChat onNavigate={setView} />}
    {view === 'chat' && <Chat onNavigate={setView} imgOpacity={imgOpacity}/>}
 </div>
}

export default App;