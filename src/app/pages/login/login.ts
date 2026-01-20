// login.component.ts
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-container">
      <canvas #particleCanvas class="particle-canvas"></canvas>

      <div class="content-wrapper">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-7">
              <div class="login-card">
                <div class="row g-0">
                  <!-- Left Panel -->
                  <div class="col-md-5 left-panel">
                    <div class="left-content">
                      <div class="logo-container">
                        <div class="logo-circle">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
                                  fill="#047857" stroke="#047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 14V22" stroke="#047857" stroke-width="2" stroke-linecap="round"/>
                            <path d="M8 18H16" stroke="#047857" stroke-width="2" stroke-linecap="round"/>
                          </svg>
                        </div>
                      </div>
                      <h4 class="brand-name">blueflame</h4>
                      <h3 class="welcome-title">Welcome Back!</h3>
                      <p class="welcome-text">
                        To stay connected with us<br />
                        please login with your personal info
                      </p>
                      <button class="btn-sign-in" (click)="onSignIn()">SIGN IN</button>
                      <div class="footer-links">
                        <a href="#" class="link">PRIVACY POLICY</a>
                        <span class="separator">|</span>
                        <a href="#" class="link">TERMS OF USE</a>
                      </div>
                    </div>
                  </div>

                  <!-- Right Panel -->
                  <div class="col-md-7 right-panel">
                    <div class="right-content">
                      <h2 class="title">welcome</h2>
                      <p class="subtitle">Login in to your account to continue</p>

                      <div class="form-container">
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-input"
                            placeholder="Email"
                            [(ngModel)]="email"
                            name="email"
                          />
                        </div>

                        <div class="form-group">
                          <input
                            type="password"
                            class="form-input"
                            placeholder="Password"
                            [(ngModel)]="password"
                            name="password"
                          />
                        </div>

                        <div class="forgot-password">
                          <a href="#" class="forgot-link">Forgot your password?</a>
                        </div>

                        <div class="submit-container">
                          <button
                            class="btn-login"
                            (click)="onLogin()"
                            (mouseenter)="isHovered = true"
                            (mouseleave)="isHovered = false"
                            [class.hovered]="isHovered"
                          >
                            LOG IN
                          </button>
                        </div>

                        <p class="signup-text">
                          Don't have an account? <a [routerLink]="['/signup']" class="signup-link">sign up</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .login-container {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      background: linear-gradient(135deg, #0f766e 0%, #065f46 100%);
    }

    .particle-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .content-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      z-index: 2;
      padding: 15px;
    }

    .login-card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 900px;
    }

    /* Left Panel */
    .left-panel {
      background: linear-gradient(135deg, #047857 0%, #065f46 100%);
      padding: 3rem 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      min-height: 400px;
    }

    .left-content {
      text-align: center;
      width: 100%;
    }

    .logo-container {
      margin-bottom: 1.5rem;
    }

    .logo-circle {
      width: 70px;
      height: 70px;
      background: white;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .brand-name {
      font-weight: bold;
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
    }

    .welcome-title {
      font-weight: bold;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .welcome-text {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .btn-sign-in {
      background: transparent;
      color: white;
      border: 2px solid white;
      border-radius: 50px;
      padding: 0.5rem 3rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-sign-in:hover {
      background: white;
      color: #047857;
    }

    .footer-links {
      margin-top: 1.5rem;
      font-size: 0.85rem;
    }

    .footer-links .link {
      color: white;
      text-decoration: none;
      margin: 0 0.5rem;
    }

    .separator {
      opacity: 0.5;
    }

    /* Right Panel */
    .right-panel {
      background: white;
      padding: 3rem 2rem;
    }

    .right-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      max-width: 450px;
      margin: 0 auto;
    }

    .title {
      color: #047857;
      font-weight: 600;
      text-align: center;
      margin-bottom: 0.5rem;
      font-size: 1.75rem;
    }

    .subtitle {
      text-align: center;
      color: #6b7280;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .form-container {
      width: 100%;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-input {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background-color: #d1fae5;
      border: none;
      border-radius: 50px;
      font-size: 0.95rem;
      outline: none;
      transition: box-shadow 0.3s ease;
    }

    .form-input:focus {
      box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.1);
    }

    .form-input::placeholder {
      color: #6b7280;
    }

    .forgot-password {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .forgot-link {
      color: #047857;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .submit-container {
      margin-bottom: 1rem;
    }

    .btn-login {
      width: 100%;
      padding: 0.875rem;
      background-color: #047857;
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 1rem;
    }

    .btn-login.hovered {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
    }

    .signup-text {
      text-align: center;
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0;
    }

    .signup-link {
      color: #047857;
      font-weight: 500;
      text-decoration: none;
    }

    .signup-link:hover {
      text-decoration: underline;
    }

    /* Responsive Design */
    @media (max-width: 991px) {
      .login-card {
        max-width: 600px;
      }
    }

    @media (max-width: 767px) {
      .left-panel {
        min-height: 300px;
        padding: 2rem 1.5rem;
      }

      .logo-circle {
        width: 60px;
        height: 60px;
      }

      .logo-circle svg {
        width: 35px;
        height: 35px;
      }

      .brand-name {
        font-size: 1rem;
      }

      .welcome-title {
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
      }

      .welcome-text {
        font-size: 0.85rem;
        margin-bottom: 1rem;
      }

      .btn-sign-in {
        padding: 0.5rem 2rem;
        font-size: 0.9rem;
      }

      .footer-links {
        font-size: 0.75rem;
        margin-top: 1rem;
      }

      .footer-links .link {
        margin: 0 0.25rem;
      }

      .right-panel {
        padding: 2rem 1.5rem;
      }

      .title {
        font-size: 1.5rem;
      }

      .subtitle {
        font-size: 0.85rem;
        margin-bottom: 1.5rem;
      }

      .form-input {
        padding: 0.75rem 1.25rem;
        font-size: 0.9rem;
      }

      .btn-login {
        padding: 0.75rem;
        font-size: 0.95rem;
      }

      .signup-text {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 575px) {
      .content-wrapper {
        padding: 10px;
      }

      .login-card {
        border-radius: 16px;
      }

      .left-panel {
        min-height: 250px;
        padding: 1.5rem 1rem;
      }

      .logo-container {
        margin-bottom: 1rem;
      }

      .logo-circle {
        width: 50px;
        height: 50px;
      }

      .logo-circle svg {
        width: 30px;
        height: 30px;
      }

      .brand-name {
        font-size: 0.9rem;
      }

      .welcome-title {
        font-size: 1.1rem;
      }

      .welcome-text {
        font-size: 0.8rem;
        line-height: 1.5;
      }

      .btn-sign-in {
        padding: 0.4rem 1.5rem;
        font-size: 0.85rem;
      }

      .footer-links {
        font-size: 0.7rem;
      }

      .right-panel {
        padding: 1.5rem 1rem;
      }

      .title {
        font-size: 1.35rem;
      }

      .subtitle {
        font-size: 0.8rem;
        margin-bottom: 1.25rem;
      }

      .form-group {
        margin-bottom: 0.875rem;
      }

      .form-input {
        padding: 0.7rem 1rem;
        font-size: 0.85rem;
      }

      .forgot-password {
        margin-bottom: 1.25rem;
      }

      .forgot-link {
        font-size: 0.8rem;
      }

      .btn-login {
        padding: 0.7rem;
        font-size: 0.9rem;
      }

      .signup-text {
        font-size: 0.8rem;
      }
    }

    @media (max-width: 400px) {
      .left-panel {
        min-height: 180px;
        padding: 1rem 0.5rem;
      }

      .logo-container {
        margin-bottom: 0.5rem;
      }

      .logo-circle {
        width: 45px;
        height: 45px;
      }

      .logo-circle svg {
        width: 25px;
        height: 25px;
      }

      .brand-name {
        font-size: 0.85rem;
        margin-bottom: 0.15rem;
      }

      .welcome-title {
        font-size: 1rem;
        margin-bottom: 0.4rem;
      }

      .welcome-text {
        font-size: 0.7rem;
        line-height: 1.4;
        margin-bottom: 0.75rem;
      }

      .btn-sign-in {
        padding: 0.35rem 1.25rem;
        font-size: 0.75rem;
      }

      .footer-links {
        font-size: 0.65rem;
        margin-top: 0.75rem;
      }

      .right-panel {
        padding: 1rem 0.5rem;
      }

      .title {
        font-size: 1.2rem;
        margin-bottom: 0.25rem;
      }

      .subtitle {
        font-size: 0.75rem;
        margin-bottom: 1rem;
      }

      .form-group {
        margin-bottom: 0.75rem;
      }

      .form-input {
        padding: 0.6rem 0.75rem;
        font-size: 0.75rem;
      }

      .forgot-password {
        margin-bottom: 1rem;
      }

      .forgot-link {
        font-size: 0.75rem;
      }

      .submit-container {
        margin-bottom: 0.75rem;
      }

      .btn-login {
        padding: 0.6rem;
        font-size: 0.8rem;
      }

      .signup-text {
        font-size: 0.75rem;
      }
    }

    @media (max-width: 360px) {
      .content-wrapper {
        padding: 5px;
      }

      .login-card {
        border-radius: 12px;
      }

      .left-panel {
        min-height: 160px;
        padding: 0.75rem 0.4rem;
      }

      .logo-circle {
        width: 40px;
        height: 40px;
      }

      .logo-circle svg {
        width: 22px;
        height: 22px;
      }

      .brand-name {
        font-size: 0.8rem;
      }

      .welcome-title {
        font-size: 0.95rem;
      }

      .welcome-text {
        font-size: 0.65rem;
        margin-bottom: 0.6rem;
      }

      .btn-sign-in {
        padding: 0.3rem 1rem;
        font-size: 0.7rem;
      }

      .footer-links {
        font-size: 0.6rem;
        margin-top: 0.6rem;
      }

      .right-panel {
        padding: 0.75rem 0.4rem;
      }

      .title {
        font-size: 1.1rem;
      }

      .subtitle {
        font-size: 0.7rem;
        margin-bottom: 0.85rem;
      }

      .form-group {
        margin-bottom: 0.65rem;
      }

      .form-input {
        padding: 0.55rem 0.65rem;
        font-size: 0.7rem;
      }

      .forgot-password {
        margin-bottom: 0.85rem;
      }

      .forgot-link {
        font-size: 0.7rem;
      }

      .submit-container {
        margin-bottom: 0.65rem;
      }

      .btn-login {
        padding: 0.55rem;
        font-size: 0.75rem;
      }

      .signup-text {
        font-size: 0.7rem;
      }
    }

    @media (max-width: 320px) {
      .content-wrapper {
        padding: 3px;
        min-height: 100vh;
      }

      .login-card {
        border-radius: 10px;
        max-height: 95vh;
        overflow-y: auto;
      }

      .left-panel {
        min-height: 140px;
        padding: 0.6rem 0.3rem;
      }

      .logo-container {
        margin-bottom: 0.4rem;
      }

      .logo-circle {
        width: 38px;
        height: 38px;
      }

      .logo-circle svg {
        width: 20px;
        height: 20px;
      }

      .brand-name {
        font-size: 0.75rem;
        margin-bottom: 0.1rem;
      }

      .welcome-title {
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }

      .welcome-text {
        font-size: 0.6rem;
        line-height: 1.3;
        margin-bottom: 0.5rem;
      }

      .btn-sign-in {
        padding: 0.25rem 0.85rem;
        font-size: 0.65rem;
        border-width: 1.5px;
      }

      .footer-links {
        font-size: 0.55rem;
        margin-top: 0.5rem;
      }

      .footer-links .link {
        margin: 0 0.2rem;
      }

      .right-panel {
        padding: 0.6rem 0.3rem;
      }

      .title {
        font-size: 1rem;
        margin-bottom: 0.2rem;
      }

      .subtitle {
        font-size: 0.65rem;
        margin-bottom: 0.75rem;
      }

      .form-group {
        margin-bottom: 0.6rem;
      }

      .form-input {
        padding: 0.5rem 0.6rem;
        font-size: 0.65rem;
        border-radius: 40px;
      }

      .forgot-password {
        margin-bottom: 0.75rem;
      }

      .forgot-link {
        font-size: 0.65rem;
      }

      .submit-container {
        margin-bottom: 0.6rem;
      }

      .btn-login {
        padding: 0.5rem;
        font-size: 0.7rem;
        border-radius: 40px;
      }

      .signup-text {
        font-size: 0.65rem;
      }
    }
  `]
})
export class Login implements OnInit, AfterViewInit {
  @ViewChild('particleCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  email: string = '';
  password: string = '';
  isHovered: boolean = false;

  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initParticles();
  }

  initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    this.animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  animate(): void {
    const canvas = this.canvasRef.nativeElement;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;

      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  onLogin(): void {
    console.log('Login attempt:', { email: this.email, password: this.password });
    // Ajoutez votre logique de connexion ici
  }

  onSignIn(): void {
    console.log('Sign in clicked');
    // Logique pour le bouton Sign In
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
