import { useState, useEffect } from 'react';
import ContextMenu from './components/ContextMenu';
import I18nProvider from './components/I18nProvider';
import { type StatusType } from './components/StatusSection';
import { type Language } from './i18n/translations';
import './styles.css';

// Import demo utilities for development testing
if (import.meta.env.DEV) {
	import('./utils/demo');
}

// Extend Window interface for WebView2 integration
declare global {
	interface Window {
		chrome?: {
			webview?: {
				hostObjects?: {
					csharpHost?: {
						OnRefreshClick?: () => void;
						OnSettingsClick?: () => void;
						OnAboutClick?: () => void;
						OnExitClick?: () => void;
					};
				};
			};
		};
	}
}

interface StatusUpdateMessage {
	type: 'updateStatus';
	payload: {
		connection: StatusType;
		status: StatusType;
	};
}

interface LanguageUpdateMessage {
	type: 'updateLanguage';
	payload: {
		language: Language;
	};
}

type MessageData = StatusUpdateMessage | LanguageUpdateMessage;

function App() {
	const [connectionStatus, setConnectionStatus] =
		useState<StatusType>('Disconnected');
	const [appStatus, setAppStatus] = useState<StatusType>('Initializing');
	const [language, setLanguage] = useState<Language>('en');

	useEffect(() => {
		// Listen for messages from C# backend
		const handleMessage = (e: MessageEvent<MessageData>) => {
			if (e.data?.type === 'updateStatus') {
				setConnectionStatus(e.data.payload.connection);
				setAppStatus(e.data.payload.status);
			} else if (e.data?.type === 'updateLanguage') {
				setLanguage(e.data.payload.language);
				// Update document direction
				document.documentElement.dir =
					e.data.payload.language === 'he' ? 'rtl' : 'ltr';
				// Update document language
				document.documentElement.lang = e.data.payload.language;
			}
		};

		window.addEventListener('message', handleMessage);

		// Cleanup listener on unmount
		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	// Handler functions for button clicks
	const handleRefresh = () => {
		try {
			window.chrome?.webview?.hostObjects?.csharpHost?.OnRefreshClick?.();
		} catch (error) {
			console.warn('C# host not available:', error);
		}
	};

	const handleSettings = () => {
		try {
			window.chrome?.webview?.hostObjects?.csharpHost?.OnSettingsClick?.();
		} catch (error) {
			console.warn('C# host not available:', error);
		}
	};

	const handleAbout = () => {
		try {
			window.chrome?.webview?.hostObjects?.csharpHost?.OnAboutClick?.();
		} catch (error) {
			console.warn('C# host not available:', error);
		}
	};

	const handleExit = () => {
		try {
			window.chrome?.webview?.hostObjects?.csharpHost?.OnExitClick?.();
		} catch (error) {
			console.warn('C# host not available:', error);
		}
	};

	return (
		<I18nProvider language={language}>
			<div className='app'>
				<ContextMenu
					connectionStatus={connectionStatus}
					appStatus={appStatus}
					onRefresh={handleRefresh}
					onSettings={handleSettings}
					onAbout={handleAbout}
					onExit={handleExit}
				/>
			</div>
		</I18nProvider>
	);
}

export default App;
