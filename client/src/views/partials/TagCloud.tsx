import { TagCloud as Tags } from 'react-tagcloud';
import { TagInTagCloud } from '../../utils/types';
import { useNavigate } from 'react-router';
import { useMemo } from 'react';
import { TagCloudVM } from '../../viewModels/partials/TagCloud.VM';
import { observer } from 'mobx-react-lite';

const TagCloud = observer(() => {
    const navigate = useNavigate();
    const vm = useMemo(() => new TagCloudVM(navigate), [navigate]);
    return (
        <Tags
            minSize={12}
            maxSize={35}
            tags={vm.tags}
            className={'flex flex-row flex-wrap justify-center font-bold '}
            onClick={(tag: TagInTagCloud) => vm.handleTagOnclick(tag.value)}
        />
    );
});

export default TagCloud;
