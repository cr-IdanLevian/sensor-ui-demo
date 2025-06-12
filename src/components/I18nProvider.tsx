import React from 'react';
import { I18nContext, getTranslation } from '../hooks/useTranslation';
import { type Language, getLanguageDirection } from '../i18n/translations';

interface I18nProviderProps {
	language: Language;
	children: React.ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ language, children }) => {
	const translation = getTranslation(language);
	const direction = getLanguageDirection(language);

	return (
		<I18nContext.Provider value={{ language, translation, direction }}>
			{children}
		</I18nContext.Provider>
	);
};

export default I18nProvider;
