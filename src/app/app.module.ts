import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { RegularCard } from './card/regular-card.component';
import { OnpushCardComponent } from './card/onpush-card.component';
import { LifecycleHooksComponent } from './hooksmanager/lifecycle-hooks.component';
import { LifecycleHooksManagerService } from './hooksmanager/lifecycle-hooks-manager.service';


@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		AppComponent,
		NodeComponent,
		RegularCard,
		OnpushCardComponent,
		LifecycleHooksComponent
	],
	providers: [
		LifecycleHooksManagerService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
