import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../model/service/products.service';
import { Iproduct } from '../../model/service/iproduct';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  providers:[ProductsService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Iproduct[] = [];
  filteredProducts:Iproduct[] = [];

  selectedButton: string ='featured';

  constructor(private productService: ProductsService) {
    this.loadProducts(this.selectedButton); // Carregar produtos ao inicilalizar o componente
  }

  loadProducts(selectedButton: string): void {
    this.productService.getProducts().subscribe(
      (data: Iproduct[]) => {
        this.products = data; //Atualiza os produtos com os dados recebidos
        if (selectedButton === 'featured') {
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts =
          this.products.filter(product => product.filter === selectedButton);
        }
        this.selectedButton = selectedButton;
      },
      (error) => {
        console.error('Erro ao carregar os produtos', error)
      }
    );
  }

}
