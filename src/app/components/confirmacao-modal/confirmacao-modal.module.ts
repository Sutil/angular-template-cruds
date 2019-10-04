import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmacaoModalComponent } from './confirmacao-modal.component';


const MATERIAL_MODULES = [MatButtonModule, MatDialogModule]
@NgModule({
  imports: [...MATERIAL_MODULES],
  declarations: [ConfirmacaoModalComponent],
  exports: [ConfirmacaoModalComponent],
  entryComponents: [ConfirmacaoModalComponent],
})
export class ConfirmacaoModalModule {}
