import { NavigateFunction } from 'react-router';
import { Tag, TagInTagCloud } from '../../utils/types';
import { action, makeAutoObservable } from 'mobx';
import { randomNumber } from '../../utils/utils';
import { api } from '../../utils/utils';

export class TagCloudVM {
    private navigate: NavigateFunction;
    private api = api;
    public tags: Array<TagInTagCloud> = [];
    private colors = ['rgb(245 158 11)', 'rgb(244 63 94)', 'rgb(192 38 211)'];

    constructor(navigate: NavigateFunction) {
        this.navigate = navigate;
        this.getPopularTags();
        makeAutoObservable(this);
    }

    private getPopularTags() {
        this.api.tags
            .getPopularTags()
            .then(
                action((response) => {
                    const tags: Array<Tag> = response.data.tags;
                    this.tags = tags.map((tag) => this.tagToCloud(tag));
                })
            )
            .catch(action((err) => console.log(err)));
    }

    private tagToCloud(tag: Tag): TagInTagCloud {
        return {
            value: tag.name,
            count: tag.count!,
            color: this.getColor(),
            props: {
                className: this.getTagStyles(),
            },
        };
    }

    public handleTagOnclick(value: string) {
        this.navigate(`/search/${encodeURIComponent(value)}`, {
            replace: true,
        });
    }

    private getColor() {
        const index = randomNumber(0, this.colors.length - 1);
        return this.colors[index];
    }

    private getTagStyles() {
        return 'hover:scale-105 transition-all cursor-pointer';
    }
}
