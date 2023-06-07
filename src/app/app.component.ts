import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './services/chat/chat.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
  
export class AppComponent implements OnInit, AfterViewInit{
  [x: string]: any;


  @ViewChild('popup', { static: false }) popup: any;

  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string, message: string }[] = [];

  public phone!: string;
  public currentUser: any;
  public selectedUser: any;

  public userList = [
    {
      id: 1,
      name: 'User 1',
      phone: '9446791982',
      image: 'assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'User 2',
      phone: '9074488318',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    },
    {
      id: 3,
      name: 'User 3',
      phone: '9447203211',
      image: 'assets/user/user-3.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6'
      }
    },
    {
      id: 4,
      name: 'User 4',
      phone: '9446583211',
      image: 'assets/user/user-4.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6'
      }
    },
  ]


  constructor(private chatSerivce: ChatService, private modelService:NgModel) {
    this.chatSerivce.getMessage().subscribe((data: { user: string, message: string }) => {
      this.messageArray.push(data);
    })
   }
  

  ngOnInit(): void {
    this.currentUser = this.userList[0]
    
  }

  ngAfterViewInit(): void {
    
  }

  openPopup(content: any):void {
    
  }

  selectUserHandler(phone: string): void{
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.selectedUser.id];
    this.messageArray = [];

    this.join(this.currentUser.name,this.roomId)
  }

  join(username:string, roomId: string): void{
    this.chatSerivce.joinRoom({ user: username, roomId: roomId });
  }

  sendMessage(): void{
    this.chatSerivce.sendMessage(
      {
        data: this.currentUser.name,
        room: this.roomId,
        message: this.messageText
      });
    this.messageText = '';
  }
}
