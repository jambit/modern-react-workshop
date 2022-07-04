import { renderHook, act } from '@testing-library/react-hooks';
import { useToggle } from './useToggle';

describe('useToggle', () => {
    it('should toggle the value', () => {
        const { result } = renderHook(() => useToggle(false));

        expect(result.current[0]).toBe(false);

        act(() => result.current[1]());
        expect(result.current[0]).toBe(true);

        act(() => result.current[1]());
        expect(result.current[0]).toBe(false);
    });

    it('should toggle the value too', () => {
        const { result } = renderHook(() => useToggle(false));

        // Maybe adding helpers makes this more readable
        const getValue = () => result.current[0];
        const toggle = () => result.current[1]();

        expect(getValue()).toBe(false);

        act(toggle);
        expect(getValue()).toBe(true);

        act(toggle);
        expect(getValue()).toBe(false);
    });
});
