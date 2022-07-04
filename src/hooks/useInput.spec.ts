import { renderHook, act } from '@testing-library/react-hooks';
import { useInput } from './useInput';

describe('useInput', () => {
    it('should change the value when onChange gets triggered', () => {
        // setup hook and render first time
        const { result } = renderHook(() => useInput('Rick'));

        // current is the return value of the hook
        expect(result.current[0]).toBe('Rick');

        // act is used to ensure the code runs within the component and updates result.current
        act(() => result.current[1]({ target: { value: 'Morty' } } as any));

        // result.current now has the latest return value of the hook
        expect(result.current[0]).toBe('Morty');
    });
});
