import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface InterfaceEnclos {
  id: number;
  nom: string;
  capaciteMax: number;
  capaciteOccupe: number;
  type: string;
  isActive: boolean;
  description?: string;
}

@Component({
  selector: 'app-enclos',
  standalone: true,
  templateUrl: './enclos.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./enclos.css']
})
export class Enclos {
  enclosList: InterfaceEnclos[] = [
    { id: 1, nom: 'Enclos A', capaciteMax: 2500, capaciteOccupe: 2450, type: 'Bovins', isActive: true },
    { id: 2, nom: 'Enclos B', capaciteMax: 11000, capaciteOccupe: 12, type: 'Ovins', isActive: true },
    { id: 3, nom: 'Enclos C', capaciteMax: 35, capaciteOccupe: 30, type: 'Volaille', isActive: false },
    { id: 4, nom: 'Enclos D', capaciteMax: 12, capaciteOccupe: 9, type: 'Caprins', isActive: true },
  ];

  showModal = false;
  modalTitle = '';
  inputValue: number | string = '';

  // Pour la collecte d'œufs avec tailles séparées
  oeufsPetit: number = 0;
  oeufsGrand: number = 0;

  mortalityDate: string = '';
  selectedEnclosId: number | null = null;

  // Constante pour le nombre d'œufs par plateau
  readonly OEUFS_PAR_PLATEAU = 30;

  openModal(action: string, enclosId?: number) {
    this.modalTitle = action;
    this.showModal = true;
    this.inputValue = '';
    this.oeufsPetit = 0;
    this.oeufsGrand = 0;
    this.mortalityDate = '';
    this.selectedEnclosId = enclosId || null;
    console.log('Modal opened:', action);
  }

  closeModal() {
    this.showModal = false;
    this.inputValue = '';
    this.oeufsPetit = 0;
    this.oeufsGrand = 0;
    this.mortalityDate = '';
    this.selectedEnclosId = null;
  }

  submitModal() {
    console.log('Submit:', {
      action: this.modalTitle,
      enclosId: this.selectedEnclosId,
      value: this.inputValue,
      oeufsPetit: {
        total: this.oeufsPetit,
        plateaux: this.getPlateaux(this.oeufsPetit),
        reste: this.getReste(this.oeufsPetit)
      },
      oeufsGrand: {
        total: this.oeufsGrand,
        plateaux: this.getPlateaux(this.oeufsGrand),
        reste: this.getReste(this.oeufsGrand)
      },
      date: this.mortalityDate
    });

    this.closeModal();
  }

  getOccupationRate(enclos: InterfaceEnclos): number {
    return Math.round((enclos.capaciteOccupe / enclos.capaciteMax) * 100);
  }

  // Calcule le nombre de plateaux
  getPlateaux(nombreOeufs: number): number {
    return Math.floor(nombreOeufs / this.OEUFS_PAR_PLATEAU);
  }

  // Calcule le reste d'œufs
  getReste(nombreOeufs: number): number {
    return nombreOeufs % this.OEUFS_PAR_PLATEAU;
  }

  // Total de tous les œufs
  getTotalOeufs(): number {
    return this.oeufsPetit + this.oeufsGrand;
  }
}
