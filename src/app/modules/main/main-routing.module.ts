import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { ChatmainComponent } from 'src/app/pages/main/chatmain/chatmain.component';
import { HomeComponent } from 'src/app/pages/main/home/home.component';
import { MyprofileComponent } from 'src/app/pages/main/myprofile/myprofile.component';
import { ProfileComponent } from 'src/app/pages/main/profile/profile.component';

const routes: Routes = [{
  path:'',component:HomeComponent,canActivate:[LoginGuard]
},
{
  path:'profile',component:MyprofileComponent,canActivate:[LoginGuard]
},
{
  path:'profile/:id',component:ProfileComponent,canActivate:[LoginGuard]
},
{path:'chat/:id',component:ChatmainComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
