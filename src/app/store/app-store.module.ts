import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityStoreModule } from './/entity-store.module';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument(),
		EntityStoreModule
	],
	declarations: []
})
export class AppStoreModule {
}
