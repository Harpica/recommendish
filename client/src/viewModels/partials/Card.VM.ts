import { NavigateFunction } from 'react-router';
import { Recommendation } from '../../utils/types';

export class CardVM {
    private navigate: NavigateFunction;
    // private setCurrentRecommendation: (recommendation: Recommendation) => void;
    constructor(
        navigate: NavigateFunction
        // setCurrentRecommendation: (recommendation: Recommendation) => void
    ) {
        this.navigate = navigate;
        // this.setCurrentRecommendation = setCurrentRecommendation;
    }

    public navigateToRecommendationPage(
        id: string,
        recommendation: Recommendation
    ) {
        this.navigate('/' + id);
        // this.setCurrentRecommendation(recommendation);
    }
}
