import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id         : 'ABC123',
    title      : 'Amazing Thing',
    price      : 6000,
    description: 'The best, really.',
    image      : 'cool.jpg',
    largeImage : 'coolLarge.jpg'
};

describe('<Item/>', () => {
    it('renders and matches the snapshot', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    })
    // it('renders and displays properly', () => {
    //     const wrapper  = shallow(<ItemComponent item={fakeItem} />);
    //     const PriceTag = wrapper.find('PriceTag');

    //     expect(PriceTag.children().text()).toBe('$60');
    //     expect(wrapper.find('Title a').text()).toBe(fakeItem.title);

    //     const img = wrapper.find('img');

    //     expect(img.props().src).toBe(fakeItem.image);
    //     expect(img.props().alt).toBe(fakeItem.title);
    // });

    // it('render the buttons properly', () => {
    //     const wrapper    = shallow(<ItemComponent item={fakeItem} />);
    //     const buttonList = wrapper.find('.buttonList');
    //     expect(buttonList.children()).toHaveLength(3);
    //     expect(buttonList.find('Link').exists()).toBe(true);
    //     expect(buttonList.find('AddToCart').exists()).toBe(true);
    //     expect(buttonList.find('DeleteItem').exists()).toBe(true);
    // });
})