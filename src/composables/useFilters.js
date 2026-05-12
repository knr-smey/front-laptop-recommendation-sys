import { reactive, computed } from 'vue'
import { FILTER_OPTIONS } from '../constants'

export function useFilters() {
  const filters = reactive({ brand: '', budget: '', ram: '', type: '' })

  const options = FILTER_OPTIONS

  function setFilter(key, value) {
    filters[key] = filters[key] === value ? '' : value
  }

  function clearFilters() {
    Object.keys(filters).forEach((k) => (filters[k] = ''))
  }

  const activeFilterCount = computed(() => Object.values(filters).filter(Boolean).length)

  return { filters, options, setFilter, clearFilters, activeFilterCount }
}
