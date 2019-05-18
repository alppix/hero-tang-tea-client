import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [CoreModule, GraphQLModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
