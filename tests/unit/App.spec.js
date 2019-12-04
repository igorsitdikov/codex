import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import App from '@/App.vue'

describe("App", () => {
    test('is a Vue instance', () => {
        const wrapper = mount(App)
        expect(wrapper.isVueInstance()).toBeTruthy()
    });

    test('matches snapshot', () => {
        const wrapper = shallowMount(App)
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('should be init table', () => {
        const expected = [
            [, , ,],
            [, , ,],
            [, , ,]
        ];
        const localVue = createLocalVue();
        const wrapper = shallowMount(App, {
            localVue,
            propsData: {
                canvas: []
            }
        });
        wrapper.vm.$data.canvas;
        wrapper.vm.initTable(3, 3);
        expect(wrapper.vm.canvas).toEqual(expected);
    });
    it('should fullFill function', () => {
        const expected = [
            ["o", "o", "x"],
            ["x", "o", "x"],
            ["x", "o", "x"]
        ];
        const input = [
            [undefined, undefined, "x"],
            ["x", undefined, "x"],
            ["x", undefined, "x"]
        ];
        const localVue = createLocalVue();
        const wrapper = shallowMount(App, {
            localVue
        });
        wrapper.vm.$data.canvas = input;
        wrapper.vm.bucketFill({x: 1, y: 1}, "o");
        expect(wrapper.vm.$data.canvas).toStrictEqual(expected);
    });

});