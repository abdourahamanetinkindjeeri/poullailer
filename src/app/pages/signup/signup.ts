// signup.component.ts
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
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit, AfterViewInit {
  @ViewChild('particleCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  formData = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    codePin: '',
    motDePasse: ''
  };

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

  onSignup(): void {
    console.log('Signup attempt:', this.formData);
    // Ajoutez votre logique d'inscription ici
    // Validation des champs
    if (!this.formData.nom || !this.formData.prenom || !this.formData.email ||
      !this.formData.telephone || !this.formData.adresse ||
      !this.formData.codePin || !this.formData.motDePasse) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Validation du code PIN (doit être numérique et 4-6 chiffres)
    if (!/^\d{4,6}$/.test(this.formData.codePin)) {
      alert('Le code PIN doit contenir 4 à 6 chiffres');
      return;
    }

    // Appel API pour créer le compte
    console.log('Données valides, création du compte...');
  }

  goToLogin(): void {
    console.log('Navigate to login');
    // Navigation vers la page de connexion
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
