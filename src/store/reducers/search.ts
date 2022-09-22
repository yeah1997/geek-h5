import { Article } from './home'

// action type
type searchType = {
  suggestions: string[]
  searchHistory: string[]
  searchResults: Article[]
}

export type SearchAction =
  | {
      type: 'search/saveSuggustions'
      payload: string[]
    }
  | {
      type: 'search/clearSuggustions'
    }
  | {
      type: 'search/saveHitoryList'
      payload: string[]
    }
  | {
      type: 'search/clearitoryList'
    }
  | {
      type: 'search/saveSearchResults'
      payload: Article[]
    }
const initValue: searchType = {
  suggestions: [],
  searchHistory: [],
  searchResults: [],
}

export default function search(state = initValue, action: SearchAction) {
  switch (action.type) {
    case 'search/saveSuggustions':
      return {
        ...state,
        suggestions: action.payload,
      }
    case 'search/clearSuggustions':
      return {
        ...state,
        suggestions: [],
      }

    case 'search/saveHitoryList':
      return {
        ...state,
        searchHistory: action.payload,
      }
    case 'search/clearitoryList':
      return {
        ...state,
        searchHistory: [],
      }
    case 'search/saveSearchResults':
      return {
        ...state,
        searchResults: [...state.searchResults, ...action.payload],
      }

    default:
      break
  }
  return state
}
