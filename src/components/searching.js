import {createComparison, defaultRules} from "../lib/compare.js";
import {rules} from "../lib/compare.js"; // Для rules.searchMultipleFields

export function initSearching(searchField) {
    // Создаем правила для поиска
    const searchRules = {
        skipEmptyTargetValues: defaultRules.skipEmptyTargetValues,
        search: rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
    };
    
    // Создаем компаратор для поиска
    const compare = createComparison(searchRules);

    return (data, state, action) => {
        // Применяем поиск только если есть поисковый запрос
        if (state[searchField] && state[searchField].trim()) {
            return data.filter(row => compare(row, state));
        }
        
        // Если поискового запроса нет - возвращаем все данные
        return data;
    }
}