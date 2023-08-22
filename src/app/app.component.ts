import { Component } from '@angular/core';

interface Total { amount: string; commission: string; };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public fixedFeeValue = 4;
  public dynamicFeeValue = 3.95;
  public taxFeeValue = 16;
  public amountValue = 0;
  public total: Total = { amount: "0", commission: "0" };

  private calculate(value: number): Total {
    const dynamicFeeValue = (this.dynamicFeeValue || 0) * 0.010;
    const taxFeeValue = (this.taxFeeValue || 0) * 0.010;
    const fixedFeeValue = this.fixedFeeValue || 0;
    const dynamicPlatformFee = value * dynamicFeeValue;
    const totalPlatformFee = dynamicPlatformFee + fixedFeeValue;
    const totalIvaFee = totalPlatformFee * taxFeeValue;
    const platformFeeWithIvaFee = totalPlatformFee + totalIvaFee;
    const finalAmountWithIva = value - platformFeeWithIvaFee;
    const finalAmountWithIvaRounded = finalAmountWithIva.toFixed(2);

    return {
      amount: finalAmountWithIvaRounded,
      commission: platformFeeWithIvaFee.toFixed(2)
    };
  }

  public onChange(): void {
    this.total = this.calculate(this.amountValue);
  }
}
