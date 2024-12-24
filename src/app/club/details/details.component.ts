import { Component } from '@angular/core';
import { Club } from '../../club';
import { ClubService } from '../../club.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  id!: number;
  club!: Club;
constructor(public clubService : ClubService, private route: ActivatedRoute,  private router: Router){}
ngOnInit(): void {
  this.id = this.route.snapshot.params['clubId'];      
  console.log(this.id);   
  this.clubService.find(this.id).subscribe((data: Club)=>{
    this.club = data;
  });
}
}
