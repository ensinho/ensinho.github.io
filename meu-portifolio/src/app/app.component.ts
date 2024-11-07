import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgScrollbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meu-portifolio';

  ngOnInit() {
    //this.typeWriter(document.querySelector(".heading-primary span"), "Enzo Esmeraldo", 0);
    this.typeWriter(document.querySelector(".heading-secundary"), "Um desenvolvedor web de Fortaleza Ceará.", 0);
  }

  // Função que cria o efeito de digitação
  typeWriter(element: HTMLElement | null, text: string, i: number) {
    if (!element) return;

    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => {
        this.typeWriter(element, text, i);
      }, 65);  
    }
  }

  // Função para abrir o PDF
  openPDF() {
    window.open('images/curriculo2024-enzo.pdf', '_blank');
  }
  
}
