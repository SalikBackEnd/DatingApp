import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink, RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit{
  protected memberService = inject(MemberService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected member = signal<Member | undefined>(undefined);
  protected title = signal<String | undefined>('Profile');
  protected isLoggedInUser = computed(()=>{
    console.log(this.accountService.currentUser()?.id);
    console.log(this.route.snapshot.paramMap.get('id'))
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member.set(data['member'])
    })
    this.title.set(this.route.snapshot.firstChild?.title);

    this.router.events.pipe(
      filter(event =>event instanceof NavigationEnd)
    ).subscribe({
      next: ()=>{
        this.title.set(this.route.snapshot.firstChild?.title);
      }
    })
  }

  loadMember(){
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;

    return this.memberService.getMember(id);
  }
}
