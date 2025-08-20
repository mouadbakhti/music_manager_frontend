import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HelloService } from '../../services/hello.service';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent {

  message = '';
  title = 'hello';

  constructor(private helloService: HelloService) {
    this.helloService.getHelloWorld().subscribe(
      (data) => this.message = data
    );
  }
}
