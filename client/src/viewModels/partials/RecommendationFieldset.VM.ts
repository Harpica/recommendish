import { action, makeAutoObservable } from 'mobx';
import { Api, api } from '../../utils/HTTP/Api';
import { Tag } from '../../utils/types';

export class RecommendationFieldsetVM {
    private api: Api = api;
    public tags: Array<Tag> = [];
    public isLoading: boolean = false;
    constructor() {
        this.getAllTags();
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

    public getTagOptionLabel(option: any) {
        if (typeof option === 'string') {
            return option;
        }
        return option.name;
    }
}
