import { createContext, useContext } from 'react';
import {
	type Language,
	type Translation,
	translations,
} from '../i18n/translations';

interface I18nContextType {
	language: Language;
	translation: Translation;
	direction: 'ltr' | 'rtl';
}

export const I18nContext = createContext<I18nContextType | undefined>(
	undefined
);

export const useTranslation = () => {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error('useTranslation must be used within an I18nProvider');
	}
	return context;
};

export const getTranslation = (language: Language): Translation => {
	return translations[language] || translations.en;
};
