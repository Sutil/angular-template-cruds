import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DataModule } from './data/data.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...DataModule.forRoot().providers,
      ],
    };
  }
}
