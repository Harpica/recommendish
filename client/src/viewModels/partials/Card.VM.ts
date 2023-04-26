import { NavigateFunction } from 'react-router';

export class CardVM {
    private navigate: NavigateFunction;

    constructor(navigate: NavigateFunction) {
        this.navigate = navigate;
    }

    public navigateToRecommendationPage(id: string) {
        this.navigate('/' + id);
    }
}
