import { Component, inject,  OnInit,  signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../types/member';
import { ImageUpload } from '../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit{
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos= signal<Photo[]>([]);
  protected loading = signal<boolean>(false);
  ngOnInit(): void {
     const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if(memberId){
       this.memberService.getMemberPhotos(memberId).subscribe({
        next:(response)=>{
          this.photos.set(response);
        }
       });
    }
  }

  get photoMocks(){
    return Array.from({length:20},(_,i)=>({
      url: '/user.png'
  }))
  }
  onUploadPhoto(file: File){
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: photo =>{
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos=>[...photos,photo])
      }
    });
  }
}
