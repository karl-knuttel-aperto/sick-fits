function Person(name, foods) {
    this.name  = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function () {
    return new Promise((resolve, reject) => {
        // simulate an API call
        setTimeout(() => resolve(this.foods), 2000);
    });
}

describe('mocking learning', () => {
    it('mocks a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs();
        expect(fetchDogs).toHaveBeenCalled();
    });

    it('can create a person', () => {
        const me = new Person('Karl', ['pizza', 'curry']);
        expect(me.name).toBe('Karl');
    });

    it('can fetch foods', async () => {
        const me = new Person('Karl', ['pizza', 'curry']);

        // mock the favFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);

        const favFoods = await me.fetchFavFoods();
        console.log(favFoods);
        expect(favFoods).toContain('sushi');
    });
});