import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { ClubService } from '../club.service';
import { Club } from '../club';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent {
  //List
  clubs : Club[] = [];
  //Create
  form!: FormGroup;

 constructor(public clubService : ClubService,  private router: Router){}
 ngOnInit(): void {

  //List
  this.clubService.getAll().subscribe((data: Club[])=>{
    this.clubs = data;
    console.log(this.clubs);
  })  

  //Create
  this.form = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    clubName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    yearFounded: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
    country: new FormControl('', Validators.required)
  });
}

//Create / Update
submit(){
  console.log(this.form.value);
  this.clubService.create(this.form.value).subscribe((res:any) => {
       console.log('Club created successfully!');
       this.router.navigateByUrl('club');
  })
}

//Edit
selectClub(club: any): void {
  if (club) {
    this.form.patchValue({
      id: club.id,
      clubName: club.clubName || '',
      yearFounded: club.yearFounded || '',
      country: club.country || ''
    });
  }
}

//Delete
deletePost(id:number){
  this.clubService.delete(id).subscribe(res => {
       this.clubs = this.clubs.filter(item => item.id !== id);
       console.log('Club deleted successfully!');
  })
}

}
