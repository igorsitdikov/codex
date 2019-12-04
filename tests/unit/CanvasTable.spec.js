import {createLocalVue, mount, shallowMount} from '@vue/test-utils'
import CanvasTable from '@/components/CanvasTable.vue'

describe("CanvasTable", () => {
    test('is a CanvasTable instance', () => {
        const expected = [
            ["o", "o", "x"],
            ["x", "o", "x"],
            ["x", "o", "x"]
        ];
        const wrapper = mount(CanvasTable, {
            propsData: {
                canvas: expected
            }
        });
        expect(wrapper.isVueInstance()).toBeTruthy()
    });

    test('matches snapshot', () => {
        const expected = [
            ["o", "o", "x"],
            ["x", "o", "x"],
            ["x", "o", "x"]
        ];
        const wrapper = shallowMount(CanvasTable, {
            propsData: {
                canvas: expected
            }
        });
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('matches snapshot', () => {
        const expected = [
            ["o", "o", "o"],
            ["o", "o", "o"],
            ["o", "o", "o"]
        ];
        const wrapper = shallowMount(CanvasTable, {
            propsData: {
                canvas: expected
            }
        });
        expect(wrapper.html()).toMatchSnapshot()
    });
});