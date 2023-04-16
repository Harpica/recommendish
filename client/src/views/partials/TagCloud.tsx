import { TagCloud as Tags } from 'react-tagcloud';

const data = [
    { value: 'JavaScript', count: 38, color: 'rgb(245 158 11)' },
    { value: 'React', count: 30, color: 'rgb(244 63 94)' },
    { value: 'Nodejs', count: 28, color: 'rgb(192 38 211)' },
    { value: 'Express.js', count: 25, color: 'rgb(192 38 211)' },
    { value: 'HTML5', count: 33, color: 'rgb(192 38 211)' },
    { value: 'MongoDB', count: 18, color: 'rgb(244 63 94)' },
    { value: 'CSS3', count: 20, color: 'rgb(245 158 11)' },
];

const TagCloud = () => {
    return (
        <Tags
            minSize={12}
            maxSize={35}
            tags={data}
            className='flex flex-row flex-wrap justify-center font-bold'
            // onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
    );
};

export default TagCloud;
