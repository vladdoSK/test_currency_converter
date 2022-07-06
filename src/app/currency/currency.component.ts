import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  

  map_rate = ['UAH', 'USD', 'EUR'];
  constructor() { }

  response:any;

  input_amount_1 = 1;
  input_amount_2 = 1;

  currency_1 = "UAH";
  currency_2 = "UAH";

  usd:any;
  eur:any;

  ngAfterViewInit() {
    fetch('https://v6.exchangerate-api.com/v6/cec12839d52cd42b56fabfe5/latest/USD')
    .then(r => r.json())
    .then(j => { 
      this.response = j.conversion_rates; 
      this.usd = this.format(this.response['UAH']/this.response['USD']);
      this.eur = this.format(this.response['UAH']/this.response['EUR']);
    });
  }

  format(number) {
    return number.toFixed(4);
  }

  onChangeInput_1(event:any){
    this.input_amount_1 = parseFloat(event.target.value);
    this.input_amount_2 = this.format(this.input_amount_1 * this.response[this.currency_2] / this.response[this.currency_1]); 
  }

  onChangeInput_2(event:any){
    this.input_amount_2 = parseFloat(event.target.value);
    this.input_amount_1 = this.format(this.input_amount_2 * this.response[this.currency_1] / this.response[this.currency_2]); 
  }


  onChangeSelect_1(event:any)
  {
    this.currency_1 = event.target.value;
    this.input_amount_2 = this.format(this.input_amount_1 * this.response[this.currency_2] / this.response[this.currency_1]); 
  }

  onChangeSelect_2(event:any)
  {
    this.currency_2 = event.target.value;
    this.input_amount_1 = this.format(this.input_amount_2 * this.response[this.currency_1] / this.response[this.currency_2]); 
  }

  ngOnInit(): void {
  }

}
