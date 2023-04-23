import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { Product, Tag } from '../../utils/types';
import { UseFormGetValues } from 'react-hook-form';

export class RecommendationFieldsetVM {
    private api: Api = api;
    public tags: Array<Tag> = [];
    public products: Array<Product> = [];
    public isLoading: boolean = false;

    constructor(groupInputValue: string) {
        this.getAllTags();
        this.getAllProducts();
        makeAutoObservable(this);
    }

    private getAllTags() {
        this.isLoading = true;
        this.api.tags
            .getAllTags()
            .then(
                action((response) => {
                    this.tags = response.data.tags;
                })
            )
            .catch((err) => console.log(err))
            .finally(action(() => (this.isLoading = false)));
    }

    public getOptionLabel(option: any) {
        if (typeof option === 'string') {
            return option;
        }
        return option.name;
    }

    public isOptionEqualToValue(option: any | string, value: any) {
        return option.name === value.name || option === value.name;
    }

    private getAllProducts() {
        this.isLoading = true;
        this.api.products
            .getAllProducts()
            .then(
                action((response) => {
                    this.products = response.data.products;
                })
            )
            .catch((err) => console.log(err))
            .finally(action(() => (this.isLoading = false)));
    }

    public getProductOptions(groupInputValue: string) {
        return this.products.filter((product) => {
            return product.group === groupInputValue;
        });
    }
}
