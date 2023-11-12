import { renderHook, act } from '@testing-library/react-hooks'
import useDynamicInputs from '../src/useDynamicInputs'

describe('useDynamicInputs', () => {
	it('sets _destroy flag for existing records', () => {
		const { result } = renderHook(() => useDynamicInputs({
			model: 'test',
			emptyData: {}
		}))

		// Mock form data with an existing record
		const mockData = [{ id: 1, value: 'test' }]
		result.current.setData('test', mockData)

		// Remove the existing record
		act(() => {
			result.current.handleRemoveInputs(0)
		})

		// Check that the _destroy flag is set
		expect(result.current.getData('test')).toEqual([{ id: 1, value: 'test', _destroy: true }])
	})

	it('removes non-existing records', () => {
		const { result } = renderHook(() => useDynamicInputs({
			model: 'test',
			emptyData: {}
		}))

		// Mock form data with a non-existing record
		const mockData = [{ value: 'test' }]
		result.current.setData('test', mockData)

		// Remove the non-existing record
		act(() => {
			result.current.handleRemoveInputs(0)
		})

		// Check that the record is removed
		expect(result.current.getData('test')).toEqual([])
	})
})
