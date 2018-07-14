import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { RegularCard } from './card/regular-card.component';
import { OnpushCardComponent } from './card/onpush-card.component';
import { LifecycleHooksManagerService } from './leftsidebar/hooksmanager/lifecycle-hooks-manager.service';
import { CardCreationActionsComponent } from './card/cardcreationactions/card-creation-actions.component';
import { AppStoreModule } from './store/app-store.module';
import { LifecycleStreamManager } from './streammanager/LifecycleStreamManager';
import { CollectingTypeComponent } from './leftsidebar/collectingstrategy/CollectingTypeComponent';
import { CardRootComponent } from './card/CardRootComponent';
import { CollectingTypeService } from './leftsidebar/collectingstrategy/CollectingTypeService';
import { LeftSidebarComponent } from './leftsidebar/LeftSidebarComponent';
import { LifecycleHooksComponent } from './leftsidebar/hooksmanager/LifecycleHooksComponent';
import { DividerComponent } from './leftsidebar/divider/DividerComponent';
import { DelayComponent } from './leftsidebar/delay/DelayComponent';
import { DelayService } from './leftsidebar/delay/DelayService';
import { PlayerComponent } from './bottomconsole/player/PlayerComponent';
import { BottomConsoleComponent } from './bottomconsole/BottomConsoleComponent';
import { TimelineComponent } from './bottomconsole/timeline/TimelineComponent';
import { LoggerComponent } from './bottomconsole/logger/LoggerComponent';

@NgModule({
	imports: [
		BrowserModule,
		AppStoreModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		NodeComponent,
		RegularCard,
		OnpushCardComponent,
		LifecycleHooksComponent,
		CardCreationActionsComponent,
		CollectingTypeComponent,
		CardRootComponent,
		LeftSidebarComponent,
		DividerComponent,
		DelayComponent,
		PlayerComponent,
		BottomConsoleComponent,
		TimelineComponent,
		LoggerComponent
	],
	providers: [
		LifecycleHooksManagerService,
		LifecycleStreamManager,
		CollectingTypeService,
		DelayService
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
