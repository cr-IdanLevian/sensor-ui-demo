import { type Language } from '../i18n/translations';
import { type StatusType } from '../components/StatusSection';

// Demo function to test language switching
export const switchLanguageDemo = (language: Language) => {
	const message = {
		type: 'updateLanguage',
		payload: {
			language: language,
		},
	};
	window.postMessage(message, '*');
};

// Demo function to test status updates
export const updateStatusDemo = (
	connection: StatusType,
	status: StatusType
) => {
	const message = {
		type: 'updateStatus',
		payload: {
			connection: connection,
			status: status,
		},
	};
	window.postMessage(message, '*');
};

// Attach demo functions to window for browser console testing
declare global {
	interface Window {
		demoSwitchLanguage?: (language: Language) => void;
		demoUpdateStatus?: (connection: StatusType, status: StatusType) => void;
	}
}

// Only attach in development mode
if (import.meta.env.DEV) {
	window.demoSwitchLanguage = switchLanguageDemo;
	window.demoUpdateStatus = updateStatusDemo;

	console.log('🚀 Demo functions available:');
	console.log('- demoSwitchLanguage("en" | "he" | "ja")');
	console.log('- demoUpdateStatus("Connected", "Ready")');
	console.log('');
	console.log('Examples:');
	console.log('demoSwitchLanguage("he") // Switch to Hebrew (RTL)');
	console.log('demoSwitchLanguage("ja") // Switch to Japanese');
	console.log('demoUpdateStatus("Connected", "Ready")');
}
