import { action, makeAutoObservable } from 'mobx';
import { api } from '../../utils/utils';
import { Product, Tag } from '../../utils/types';

export class RecommendationFieldsetVM {
    private api = api;
    public tags: Array<Tag> = [];
    public products: Array<Product> = [];
    public fileLoaderMessage = '';
    public isLoading: boolean = false;

    constructor() {
        this.getAllTags();
        this.getAllProducts();
        makeAutoObservable(this);
    }

    private getAllTags() {
        this.isLoading = true;
        this.api.tags
            .getAllTags()
            .then(action((response) => (this.tags = response.data.tags)))
            .catch((err) => console.log(err))
            .finally(action(() => (this.isLoading = false)));
    }

    public getOptionLabel(
        option:
            | string
            | { name: string; inputValue?: string; [key: string]: any }
    ) {
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
                action((response) => (this.products = response.data.products))
            )
            .catch((err) => console.log(err))
            .finally(action(() => (this.isLoading = false)));
    }

    public getProductOptions(groupInputValue: string) {
        return this.products.filter(
            (product) => product.group === groupInputValue
        );
    }
    public onImageUploadSizeError() {
        this.fileLoaderMessage = 'File size is too big. Max size is 10MB';
    }
}
